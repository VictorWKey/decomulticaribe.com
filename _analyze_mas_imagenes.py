#!/usr/bin/env python3

import base64
import getpass
import json
import os
from pathlib import Path

from openai import OpenAI


ROOT = Path(__file__).resolve().parent
IMAGES_DIR = ROOT / "mas-imagenes"
ANALYSIS_OUTPUT = ROOT / "_mas_imagenes_analysis.json"
SELECTION_OUTPUT = ROOT / "_mas_imagenes_selection.json"
MODEL = os.environ.get("OPENAI_MODEL", "gpt-5-nano")


ANALYSIS_PROMPT = """Eres un director de arte y editor de galería web para una empresa mexicana que vende servicios para hoteles, residenciales y playa.

Vas a analizar UNA sola imagen de trabajo real del cliente. Responde SOLO JSON válido con esta estructura exacta:
{
  "descripcion": "resumen breve de lo que se ve",
  "servicio_principal": "categoria concreta como cama balinesa, camastro, sillon lobby, instalacion, tapiceria, silla, etc.",
  "etapa": "terminado|instalacion|revision|proceso",
  "calidad": "buena|aceptable|mala",
  "profesionalismo": 1,
  "util_para_galeria": true,
  "grupo_duplicado": "nombre corto del grupo visual si parece parte del mismo trabajo/angulo, o 'unico'",
  "preferencia_en_grupo": 1,
  "titulo_es": "titulo corto y profesional en espanol",
  "titulo_en": "short professional English title",
  "categoria_es": "categoria corta en espanol",
  "categoria_en": "short category in English",
  "razon": "por que conviene o no conviene mostrarla"
}

Reglas:
- Prefiere imagenes terminadas sobre fotos de revision o proceso, salvo que el proceso aporte confianza comercial.
- Penaliza fotos con autos, conos, bolsas, escaleras, demasiada gente, rotacion rara o encuadre descuidado.
- Si hay varias del mismo proyecto, usa el mismo valor de grupo_duplicado.
- preferencia_en_grupo: 1 es la mejor del grupo, 2 segunda, etc.
- profesionalismo: 1 a 5.
- util_para_galeria debe ser estricto; solo true si ayuda a una galeria comercial profesional.
"""


SELECTION_PROMPT = """Eres editor final de una galeria comercial.

Recibiras el analisis de varias imagenes nuevas de trabajos de cliente. Ya existen otras fotos en el sitio, asi que no quieres llenar la galeria de angulos repetidos.

Selecciona SOLO las imagenes nuevas que realmente mejoren la galeria actual.

Responde SOLO JSON valido con esta estructura:
{
  "selected": [
    {
      "filename": "nombre archivo",
      "why": "por que entra",
      "slot_es": "donde encaja en la galeria actual en espanol",
      "slot_en": "where it fits in the current gallery in English"
    }
  ],
  "rejected": [
    {
      "filename": "nombre archivo",
      "why": "por que no entra"
    }
  ],
  "notes": ["notas cortas sobre duplicados, mejores angulos y balance visual"]
}

Reglas:
- Selecciona pocas pero buenas; no metas angulos redundantes.
- Prefiere terminados limpios, composicion clara y contexto hotelero fuerte.
- Puedes elegir fotos de proceso solo si ayudan a demostrar instalacion a medida y se ven suficientemente profesionales.
- Rechaza imagenes tipo catalogo/stock o donde el trabajo no se entienda bien.
"""


def get_api_key() -> str:
    api_key = os.environ.get("OPENAI_API_KEY") or os.environ.get("OPENAI_KEY")
    if api_key:
        return api_key
    return getpass.getpass("OpenAI API key: ").strip()


def encode_image(path: Path) -> str:
    return base64.b64encode(path.read_bytes()).decode("utf-8")


def mime_type(path: Path) -> str:
    suffix = path.suffix.lower()
    if suffix == ".png":
        return "image/png"
    if suffix in {".jpg", ".jpeg"}:
        return "image/jpeg"
    return "application/octet-stream"


def image_size(path: Path):
    try:
        from PIL import Image

        with Image.open(path) as image:
            return {"width": image.width, "height": image.height}
    except Exception:
        return None


def parse_json(text: str):
    text = text.strip()
    if text.startswith("```"):
        text = text.strip("`")
        first_brace = text.find("{")
        last_brace = text.rfind("}")
        if first_brace != -1 and last_brace != -1:
            text = text[first_brace:last_brace + 1]
    return json.loads(text)


def analyze_image(client: OpenAI, path: Path):
    response = client.responses.create(
        model=MODEL,
        input=[
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": ANALYSIS_PROMPT},
                    {
                        "type": "input_image",
                        "image_url": f"data:{mime_type(path)};base64,{encode_image(path)}",
                        "detail": "low",
                    },
                ],
            }
        ],
    )
    parsed = parse_json(response.output_text)
    parsed["filename"] = path.name
    parsed["resolution"] = image_size(path)
    return parsed


def select_images(client: OpenAI, analyses):
    response = client.responses.create(
        model=MODEL,
        input=[
            {
                "role": "user",
                "content": [
                    {"type": "input_text", "text": SELECTION_PROMPT},
                    {"type": "input_text", "text": json.dumps(analyses, ensure_ascii=False, indent=2)},
                ],
            }
        ],
    )
    return parse_json(response.output_text)


def main():
    api_key = get_api_key()
    client = OpenAI(api_key=api_key)

    images = sorted(path for path in IMAGES_DIR.iterdir() if path.suffix.lower() in {".jpg", ".jpeg", ".png"})
    analyses = []

    for path in images:
        print(f"Analizando {path.name}...", flush=True)
        analysis = analyze_image(client, path)
        analyses.append(analysis)
        print(
            f"  -> {analysis.get('servicio_principal', '?')} | "
            f"{analysis.get('etapa', '?')} | "
            f"{analysis.get('calidad', '?')} | "
            f"usar={analysis.get('util_para_galeria', '?')} | "
            f"grupo={analysis.get('grupo_duplicado', '?')}"
        )

    ANALYSIS_OUTPUT.write_text(json.dumps(analyses, ensure_ascii=False, indent=2))
    selection = select_images(client, analyses)
    SELECTION_OUTPUT.write_text(json.dumps(selection, ensure_ascii=False, indent=2))

    print(f"\nAnalisis guardado en: {ANALYSIS_OUTPUT}")
    print(f"Seleccion guardada en: {SELECTION_OUTPUT}")


if __name__ == "__main__":
    main()
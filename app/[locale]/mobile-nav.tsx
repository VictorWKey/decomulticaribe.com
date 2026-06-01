"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

type NavItem = { href: string; label: string };

export function MobileNav({
  items,
  homeLabel,
}: {
  items: readonly NavItem[];
  homeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Botón hamburguesa/X — solo visible debajo del breakpoint lg */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-caribe-navy text-white shadow-md transition hover:bg-caribe-teal lg:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <>
          {/* Backdrop transparente que cierra el menú al tocar fuera */}
          <div className="fixed inset-0 z-40" onClick={close} />

          {/* Panel — aparece justo debajo del header */}
          <div className="fixed right-3 top-[4.5rem] z-50 w-56 overflow-hidden rounded-2xl border border-caribe-navy/10 bg-white shadow-xl shadow-caribe-navy/20">
            <nav className="flex flex-col p-2">
              <button
                onClick={() => {
                  close();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="rounded-xl px-4 py-3 text-left text-sm font-bold text-caribe-navy transition hover:bg-caribe-sand"
              >
                {homeLabel}
              </button>
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="rounded-xl px-4 py-3 text-sm font-bold text-caribe-navy transition hover:bg-caribe-sand"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}

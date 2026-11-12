import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Armchair,
  ArrowRight,
  BadgeCheck,
  BedDouble,
  Blinds,
  Building2,
  CheckCircle2,
  Clock3,
  Factory,
  Hotel,
  Lamp,
  Languages,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  Send,
  ShieldCheck,
  Sofa,
  Sparkles,
  Waves,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { brand, content, isLocale, locales, mailtoUrl, type Locale, whatsappUrl } from "@/lib/site-content";
import { MobileNav } from "./mobile-nav";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const serviceIcons: Record<string, LucideIcon> = {
  Armchair,
  BedDouble,
  Blinds,
  Lamp,
  Sofa,
  Wrench,
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "es";
  const t = content[locale];

  return {
    metadataBase: new URL("https://decomulticaribe.com"),
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      title: t.metadata.title,
      description: t.metadata.description,
      locale: locale === "es" ? "es_MX" : "en_US",
      siteName: brand.name,
      images: [
        {
          url: brand.logoStacked,
          width: 1254,
          height: 1254,
          alt: brand.name,
        },
      ],
    },
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  const t = content[locale];
  const alternateLocale: Locale = locale === "es" ? "en" : "es";
  const serviceId = locale === "es" ? "servicios" : "services";
  const workId = locale === "es" ? "trabajos" : "work";
  const processId = locale === "es" ? "proceso" : "process";
  const contactId = locale === "es" ? "contacto" : "contact";

  return (
    <main className="min-h-screen bg-caribe-shell text-caribe-ink">
      <Header locale={locale} alternateLocale={alternateLocale} />
      <Hero locale={locale} serviceId={serviceId} contactId={contactId} />

      <section className="relative overflow-hidden px-5 py-18 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="animate-float-in">
            <SectionKicker>{t.intro.eyebrow}</SectionKicker>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.02] text-caribe-navy text-balance sm:text-5xl lg:text-6xl">
              {t.intro.title}
            </h2>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/70 p-6 shadow-2xl shadow-caribe-navy/10 backdrop-blur md:p-8">
            <p className="text-lg leading-8 text-slate-700">{t.intro.body}</p>
            <div className="mt-7 grid gap-4">
              {t.intro.bullets.map((item) => (
                <div key={item} className="flex gap-3 text-sm font-medium leading-6 text-slate-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-caribe-teal" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id={serviceId} className="bg-caribe-deep px-5 py-18 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionKicker dark>{t.servicesEyebrow}</SectionKicker>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.03] text-balance sm:text-5xl">{t.servicesTitle}</h2>
            </div>
            <div className="flex max-w-md items-center gap-3 rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm text-white/80">
              <ShieldCheck className="h-5 w-5 text-caribe-gold" />
              <span>{t.hero.note}</span>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {t.services.map((service, index) => {
              const Icon = serviceIcons[service.icon] ?? Sparkles;
              return <ServiceCard key={service.title} icon={Icon} service={service} index={index} />;
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-18 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <SectionKicker>{t.proof.eyebrow}</SectionKicker>
            <h2 className="mt-4 font-serif text-4xl leading-[1.04] text-caribe-navy text-balance sm:text-5xl">{t.proof.title}</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[Ruler, Waves, BadgeCheck, Factory].map((Icon, index) => {
              const item = t.proof.items[index];
              return (
                <article key={item.title} className="group rounded-[2rem] border border-white/75 bg-white/80 p-7 shadow-xl shadow-caribe-navy/8 transition duration-300 hover:-translate-y-1 hover:bg-white">
                  <div className="mb-7 flex h-13 w-13 items-center justify-center rounded-2xl bg-caribe-navy text-white shadow-lg shadow-caribe-navy/20 transition duration-300 group-hover:bg-caribe-teal">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-caribe-navy">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-650">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id={workId} className="overflow-hidden bg-[#f8f3e9] px-5 py-18 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <SectionKicker>{t.galleryEyebrow}</SectionKicker>
              <h2 className="mt-4 font-serif text-4xl leading-[1.04] text-caribe-navy text-balance sm:text-5xl">{t.galleryTitle}</h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">{t.galleryIntro}</p>
          </div>
          <div className="mt-12 grid auto-rows-[18rem] gap-5 md:grid-cols-3 lg:auto-rows-[20rem]">
            {t.gallery.map((item) => {
              const colSpan = "colSpan" in item ? (item.colSpan as number) : 1;
              const rowSpan = "rowSpan" in item ? (item.rowSpan as number) : 1;
              const contain = "contain" in item && item.contain;
              const sizes =
                colSpan === 3
                  ? "100vw"
                  : colSpan === 2
                    ? "(min-width: 768px) 66vw, 100vw"
                    : "(min-width: 768px) 33vw, 100vw";

              return (
              <article
                key={item.title}
                className={cn(
                  "group relative overflow-hidden rounded-[1.7rem] bg-caribe-navy shadow-2xl shadow-caribe-navy/12",
                  colSpan === 2 && "md:col-span-2",
                  colSpan === 3 && "md:col-span-3",
                  rowSpan === 2 && "md:row-span-2",
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={sizes}
                  className={cn(
                    "transition duration-700 group-hover:scale-105",
                    contain ? "object-contain p-6" : "object-cover",
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-caribe-deep/82 via-caribe-deep/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-caribe-gold">{item.category}</p>
                  <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id={processId} className="px-5 py-18 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <SectionKicker>{t.processEyebrow}</SectionKicker>
            <h2 className="mt-4 font-serif text-4xl leading-[1.04] text-caribe-navy text-balance sm:text-5xl">{t.processTitle}</h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {t.process.map((step, index) => {
              const StepIcon = [MessageCircle, Ruler, Send, CheckCircle2][index];

              return (
                <article key={step.title} className="relative rounded-[1.7rem] border border-caribe-navy/10 bg-white/80 p-6 shadow-xl shadow-caribe-navy/8">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="font-serif text-5xl text-caribe-gold/80">0{index + 1}</span>
                    <StepIcon className="h-7 w-7 text-caribe-teal" />
                  </div>
                  <h3 className="text-xl font-semibold text-caribe-navy">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-650">{step.body}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-12 grid gap-8 rounded-[2rem] bg-caribe-navy p-7 text-white shadow-2xl shadow-caribe-navy/20 md:grid-cols-[0.85fr_1.15fr] md:p-10">
            <div>
              <h3 className="font-serif text-3xl leading-tight text-balance">{t.audiences.title}</h3>
              <p className="mt-5 flex items-center gap-2 text-white/72">
                <MapPin className="h-5 w-5 text-caribe-gold" />
                {t.footer.coverage}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {t.audiences.items.map((item) => (
                <div key={item} className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold text-white/88">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id={contactId} className="relative overflow-hidden bg-caribe-deep px-5 py-18 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="absolute inset-0 opacity-24 [background-image:linear-gradient(135deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionKicker dark>{t.contact.eyebrow}</SectionKicker>
            <h2 className="mt-4 font-serif text-4xl leading-[1.04] text-balance sm:text-5xl">{t.contact.title}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">{t.contact.body}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl(locale)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-caribe-gold px-6 py-4 text-sm font-bold text-caribe-deep shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d2a64c]">
                <MessageCircle className="h-5 w-5" />
                {t.contact.whatsapp}
              </a>
              <a href={mailtoUrl(locale)} className="inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/16">
                <Mail className="h-5 w-5 shrink-0" />
                <span className="min-w-0 text-center">
                  <span className="block">{t.contact.email}</span>
                  <span className="block break-all text-xs font-medium text-white/75">{brand.emailGeneral}</span>
                </span>
              </a>
            </div>
          </div>

          <div className="grid gap-5">
            {t.contact.cards.map((card) => (
              <article key={card.email} className="rounded-[1.8rem] border border-white/14 bg-white/9 p-6 backdrop-blur">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold">{card.name}</h3>
                    <p className="mt-1 text-white/62">{card.role}</p>
                  </div>
                  <div className="flex gap-2">
                    {card.contact ? (
                      <a href={whatsappUrl(locale, card.contact)} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${card.name}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-caribe-teal text-white transition hover:bg-caribe-gold hover:text-caribe-deep">
                        <MessageCircle className="h-5 w-5" />
                      </a>
                    ) : null}
                    <a href={mailtoUrl(locale, card.email)} aria-label={`Email ${card.name}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white hover:text-caribe-navy">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 text-sm text-white/82 sm:grid-cols-2">
                  <a href={`tel:${card.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 rounded-2xl bg-white/8 px-4 py-3 transition hover:bg-white/12">
                    <Phone className="h-4 w-4 text-caribe-gold" />
                    {card.phone}
                  </a>
                  <a href={`mailto:${card.email}`} className="flex min-w-0 items-center gap-2 rounded-2xl bg-white/8 px-4 py-3 transition hover:bg-white/12">
                    <Mail className="h-4 w-4 flex-none text-caribe-gold" />
                    <span className="min-w-0 break-all">{card.email}</span>
                  </a>
                </div>
              </article>
            ))}

            <div className="rounded-[1.8rem] border border-white/14 bg-white p-6 text-caribe-ink shadow-2xl shadow-black/18">
              <h3 className="text-xl font-bold text-caribe-navy">{t.contact.checklistTitle}</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {t.contact.checklist.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-caribe-sand px-4 py-3 text-sm font-semibold">
                    <CheckCircle2 className="h-5 w-5 text-caribe-teal" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-caribe-navy px-4 py-4 text-white">
                <MapPin className="mt-1 h-5 w-5 flex-none text-caribe-gold" />
                <div>
                  <p className="text-sm font-bold">{t.footer.office}</p>
                  <p className="mt-1 text-sm leading-6 text-white/76">{brand.address}</p>
                  <div className="mt-1 flex flex-col text-sm leading-6 text-white/76">
                    {[brand.phoneOffice, brand.phoneOfficeAdditional].map((phone) => (
                      <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="w-fit hover:text-white">
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
      <MobileContactBar locale={locale} />
    </main>
  );
}

function Header({ locale, alternateLocale }: { locale: Locale; alternateLocale: Locale }) {
  const t = content[locale];
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="glass-line mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-white/65 bg-white/82 px-3 py-2 backdrop-blur-xl sm:px-5">
        <Link href={`/${locale}`} className="flex items-center gap-3" aria-label={brand.name}>
          <Image src={brand.logoMark} alt="" width={56} height={56} priority className="h-10 w-10 rounded-full bg-white object-contain p-0.5 sm:h-11 sm:w-11" />
          <span className="hidden max-w-48 text-sm font-black leading-tight text-caribe-navy sm:inline-block">
            {brand.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {t.nav.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-semibold text-caribe-navy/76 transition hover:bg-caribe-sand hover:text-caribe-navy">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href={`/${alternateLocale}`} className="inline-flex items-center gap-2 rounded-full border border-caribe-navy/10 bg-white px-3 py-2 text-sm font-bold text-caribe-navy transition hover:border-caribe-teal/30 hover:text-caribe-teal">
            <Languages className="h-4 w-4" />
            <span className="hidden sm:inline">{t.languageLabel}</span>
            <span className="sm:hidden">{alternateLocale.toUpperCase()}</span>
          </Link>
          <a href={whatsappUrl(locale)} target="_blank" rel="noreferrer" className="hidden rounded-full bg-caribe-navy px-5 py-3 text-sm font-bold text-white shadow-lg shadow-caribe-navy/20 transition hover:-translate-y-0.5 hover:bg-caribe-teal lg:inline-flex">
            {locale === "es" ? "Cotizar" : "Quote"}
          </a>
          <MobileNav
            items={t.nav}
            homeLabel={locale === "es" ? "Inicio" : "Home"}
          />
        </div>
      </div>
    </header>
  );
}

function Hero({ locale, serviceId, contactId }: { locale: Locale; serviceId: string; contactId: string }) {
  const t = content[locale];
  const representativeLabel = locale === "es" ? "Gerencia general" : "General management";
  const contactsLabel = locale === "es" ? "Contactos y ubicación" : "Contacts and location";

  return (
    <section className="relative overflow-hidden bg-caribe-shell px-5 pb-16 pt-32 sm:px-8 lg:px-12">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">

          {/* LEFT — logo + pills + stats */}
          <div className="flex flex-col items-start gap-6">
            {/* Location + year pills */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-caribe-teal/12 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-caribe-teal">
                  <MapPin className="h-3 w-3" />
                  {t.hero.eyebrow}
                </span>
                <span className="rounded-full bg-caribe-navy px-3 py-1 text-xs font-semibold text-white">
                  {locale === "es" ? "Desde 1993" : "Est. 1993"}
                </span>
              </div>
              <p className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.04em] text-caribe-navy/65 sm:text-xs">
                <ShieldCheck className="h-4 w-4 flex-none text-caribe-teal" aria-hidden="true" />
                <span>{representativeLabel} · Lic. Víctor Romero</span>
              </p>
            </div>

            {/* Logo — mix-blend-mode:multiply makes white pixels invisible on light bg */}
            <Image
              src={brand.logoHorizontal}
              alt={brand.name}
              width={1594}
              height={581}
              priority
              className="h-auto w-full max-w-[520px] object-contain [mix-blend-mode:multiply]"
            />

            {/* Stats */}
            <div className="grid w-full grid-cols-3 gap-3 sm:max-w-[520px]">
              {t.hero.stats.map((stat) => (
                <div key={stat.value} className="rounded-2xl border border-caribe-navy/10 bg-white p-4 shadow-sm">
                  <p className="font-serif text-xl leading-tight text-caribe-navy sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-xs leading-5 text-caribe-ink/55">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — headline, body, CTAs */}
          <div className="animate-float-in">
            <h1 className="font-serif text-5xl leading-[1.0] text-balance text-caribe-navy sm:text-6xl lg:text-6xl xl:text-7xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-caribe-ink/65 sm:text-xl">
              {t.hero.body}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl(locale)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-caribe-gold px-6 py-4 text-sm font-bold text-caribe-deep shadow-lg shadow-caribe-gold/30 transition hover:-translate-y-0.5 hover:bg-[#d3a64c]"
              >
                <MessageCircle className="h-5 w-5" />
                {t.hero.primary}
              </a>
              <a
                href={`#${serviceId}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-caribe-navy/22 px-6 py-4 text-sm font-bold text-caribe-navy transition hover:-translate-y-0.5 hover:bg-caribe-navy/6"
              >
                {t.hero.secondary}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <a
              href={`#${contactId}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-caribe-navy/62 underline-offset-4 transition hover:text-caribe-teal hover:underline"
            >
              <MapPin className="h-4 w-4" />
              {contactsLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

function SectionKicker({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={cn("text-xs font-black uppercase tracking-[0.28em]", dark ? "text-caribe-gold" : "text-caribe-teal")}>
      {children}
    </p>
  );
}

function ServiceCard({ icon: Icon, service, index }: { icon: LucideIcon; service: (typeof content)[Locale]["services"][number]; index: number }) {
  return (
    <article className="group rounded-[1.8rem] border border-white/12 bg-white/8 p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white text-caribe-navy shadow-xl">
          <Icon className="h-6 w-6" />
        </div>
        <span className="font-serif text-5xl text-white/25">0{index + 1}</span>
      </div>
      <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
      <p className="mt-3 leading-7 text-white/70">{service.description}</p>
    </article>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <footer className="bg-[#000d21] px-5 py-10 pb-32 text-white sm:px-8 md:pb-10 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Image src={brand.logoMark} alt={brand.name} width={96} height={96} className="h-14 w-14 rounded-full bg-white object-contain p-1" />
          <div>
            <p className="font-semibold">{brand.name}</p>
            <p className="mt-1 text-sm text-white/62">{t.footer.coverage}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-white/68">
          <a href={`tel:${brand.phoneGeneral.replace(/\s/g, "")}`} className="hover:text-white">{brand.phoneGeneral}</a>
          <span>/</span>
          <a href={`tel:${brand.phoneAdmin.replace(/\s/g, "")}`} className="hover:text-white">{brand.phoneAdmin}</a>
          <span>/</span>
          <a href={`tel:${brand.phoneOffice.replace(/\s/g, "")}`} className="hover:text-white">{brand.phoneOffice}</a>
          <span>/</span>
          <a href={`mailto:${brand.emailGeneral}`} className="hover:text-white">{brand.emailGeneral}</a>
          <span>/</span>
          <span>© {new Date().getFullYear()} {t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}

function MobileContactBar({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 overflow-hidden rounded-3xl border border-white/70 bg-white/92 shadow-2xl shadow-caribe-navy/20 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a href={whatsappUrl(locale)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-caribe-teal px-4 py-3 text-sm font-bold text-white">
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <a href={mailtoUrl(locale)} className="flex items-center justify-center gap-2 rounded-2xl bg-caribe-navy px-4 py-3 text-sm font-bold text-white">
          <Mail className="h-4 w-4" />
          {t.contact.email}
        </a>
      </div>
    </div>
  );
}

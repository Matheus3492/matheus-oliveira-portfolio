'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

const Avatar3DCanvas = dynamic(() => import('./Avatar3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] flex items-center justify-center text-xs text-cyan-400 font-mono animate-pulse">
      Loading 3D Avatar...
    </div>
  ),
});

type Language = 'pt' | 'en' | 'fr';

// Dicionário de Traduções da Interface e do Portfólio
const translations = {
  pt: {
    role: 'Engenharia de Software & Design',
    downloadPdf: 'Download PDF',
    location: 'Brasil (Disponível para Relocação / Remoto)',
    prev: '← Anterior',
    next: 'Próximo Capítulo →',
    step: 'PASSO',
    timeline: [
      {
        id: 'intro',
        badge: '01. Apresentação',
        title: 'Matheus Oliveira',
        subtitle: 'Graphic Designer · Marketing Strategist · Software Developer',
        description:
          'Profissional híbrido com mais de 6 anos de experiência unindo estética, posicionamento de marca, automação de dados, inteligência artificial e ecossistemas ERP.',
        tags: ['Next.js', 'Engineering', 'FastAPI', 'NOMUS ERP', 'Design'],
        avatarPose: 'Wave',
      },
      {
        id: 'branding',
        badge: '02. Design & Marketing',
        title: 'Branding & Peças B2B',
        subtitle: 'Aladin Iluminação & Projetos Corporativos',
        description:
          'Criação de identidades visuais, anúncios para campanhas de tráfego pago e modelagem/renderização 3D de produtos (Blender) para catálogos do setor industrial e civil.',
        tags: ['Blender 3D', 'Adobe Suite', 'Copywriting', 'Social Media'],
        avatarPose: 'Talk',
      },
      {
        id: 'data-engineering',
        badge: '03. Arquitetura de Dados & IA',
        title: 'API RESTful & Agente de IA',
        subtitle: 'Sincronização ERP NOMUS & Agente Autônomo',
        description:
          'Desenvolvimento de pipelines ETL em Python para integração com o ERP NOMUS, APIs de alta performance com FastAPI e um Agente de IA autônomo com LangChain.',
        tags: ['Python', 'FastAPI', 'SQLite', 'LangChain', 'Machine Learning'],
        avatarPose: 'Thinking',
      },
      {
        id: 'bi-dashboards',
        badge: '04. Business Intelligence',
        title: 'Dashboard Comercial & GenIA',
        subtitle: 'Painel Analítico de Vendas',
        description:
          'Construção de painel interativo em Streamlit e Plotly para análise de faturamento, com integração da GenIA Aladin para diagnósticos e insights preditivos em tempo real.',
        tags: ['Streamlit', 'Plotly', 'Pandas', 'Scikit-Learn', 'Analytics'],
        avatarPose: 'Point',
      },
    ],
  },
  en: {
    role: 'Software Engineering & Design',
    downloadPdf: 'Download Resume',
    location: 'Brazil (Open for Relocation / Remote)',
    prev: '← Previous',
    next: 'Next Chapter →',
    step: 'STEP',
    timeline: [
      {
        id: 'intro',
        badge: '01. Introduction',
        title: 'Matheus Oliveira',
        subtitle: 'Graphic Designer · Marketing Strategist · Software Developer',
        description:
          'Hybrid professional with 6+ years of experience combining visual design, brand strategy, data automation, artificial intelligence, and ERP ecosystems.',
        tags: ['Next.js', 'Engineering', 'FastAPI', 'NOMUS ERP', 'Design'],
        avatarPose: 'Wave',
      },
      {
        id: 'branding',
        badge: '02. Design & Marketing',
        title: 'Branding & B2B Assets',
        subtitle: 'Aladin Lighting & Corporate Projects',
        description:
          'Visual identity design, paid traffic ad campaigns, and 3D product modeling/rendering (Blender) for industrial and civil engineering product catalogs.',
        tags: ['Blender 3D', 'Adobe Suite', 'Copywriting', 'Social Media'],
        avatarPose: 'Talk',
      },
      {
        id: 'data-engineering',
        badge: '03. Data Architecture & AI',
        title: 'RESTful API & AI Agent',
        subtitle: 'NOMUS ERP Sync & Autonomous Agent',
        description:
          'Python ETL pipeline development for NOMUS ERP integration, high-performance RESTful APIs built with FastAPI, and an autonomous AI Agent powered by LangChain.',
        tags: ['Python', 'FastAPI', 'SQLite', 'LangChain', 'Machine Learning'],
        avatarPose: 'Thinking',
      },
      {
        id: 'bi-dashboards',
        badge: '04. Business Intelligence',
        title: 'Commercial Dashboard & GenAI',
        subtitle: 'Sales Analytics Dashboard',
        description:
          'Interactive dashboard with Streamlit and Plotly for revenue tracking, featuring GenAI Aladin integration for automated real-time predictive insights.',
        tags: ['Streamlit', 'Plotly', 'Pandas', 'Scikit-Learn', 'Analytics'],
        avatarPose: 'Point',
      },
    ],
  },
  fr: {
    role: 'Génie Logiciel & Design',
    downloadPdf: 'Télécharger CV',
    location: 'Brésil (Disponible pour Réinstallation / Télétravail)',
    prev: '← Précédent',
    next: 'Chapitre Suivant →',
    step: 'ÉTAPE',
    timeline: [
      {
        id: 'intro',
        badge: '01. Présentation',
        title: 'Matheus Oliveira',
        subtitle: 'Graphic Designer · Marketing Strategist · Software Developer',
        description:
          'Professionnel hybride avec plus de 6 ans d’expérience combinant design visuel, stratégie de marque, automatisation de données, IA et écosystèmes ERP.',
        tags: ['Next.js', 'Engineering', 'FastAPI', 'NOMUS ERP', 'Design'],
        avatarPose: 'Wave',
      },
      {
        id: 'branding',
        badge: '02. Design & Marketing',
        title: 'Branding & Supports B2B',
        subtitle: 'Aladin Éclairage & Projets Corporatifs',
        description:
          'Création d’identités visuelles, campagnes publicitaires ciblées et modélisation/rendu 3D de produits (Blender) pour catalogues industriels.',
        tags: ['Blender 3D', 'Adobe Suite', 'Copywriting', 'Social Media'],
        avatarPose: 'Talk',
      },
      {
        id: 'data-engineering',
        badge: '03. Architecture de Données & IA',
        title: 'API RESTful & Agent IA',
        subtitle: 'Synchronisation ERP NOMUS & Agent Autonome',
        description:
          'Développement de pipelines ETL en Python pour l’ERP NOMUS, création d’APIs haute performance avec FastAPI et un agent IA autonome basé sur LangChain.',
        tags: ['Python', 'FastAPI', 'SQLite', 'LangChain', 'Machine Learning'],
        avatarPose: 'Thinking',
      },
      {
        id: 'bi-dashboards',
        badge: '04. Business Intelligence',
        title: 'Tableau de Bord Commercial & GenIA',
        subtitle: 'Analyse des Ventes & Prédictions',
        description:
          'Tableau de bord interactif en Streamlit et Plotly pour le suivi du chiffre d’affaires, intégrant GenIA Aladin pour des diagnostics prédictifs en temps réel.',
        tags: ['Streamlit', 'Plotly', 'Pandas', 'Scikit-Learn', 'Analytics'],
        avatarPose: 'Point',
      },
    ],
  },
};

export default function Home() {
  const [lang, setLang] = useState<Language>('pt');
  const [activeStep, setActiveStep] = useState(0);

  const t = translations[lang];
  const storyTimeline = t.timeline;
  const currentStory = storyTimeline[activeStep];

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % storyTimeline.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + storyTimeline.length) % storyTimeline.length);
  };

  return (
    <main className="min-h-screen bg-[#050814] text-white flex flex-col justify-between p-6 md:p-12 relative overflow-hidden font-sans">
      {/* Luzes de Fundo (Glow) */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header com Seletor de Idioma e Links */}
      <header className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 z-10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
              Matheus · Portfolio
            </h1>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">{t.role}</p>
        </div>

        {/* Links, Seletor de Língua e Download PDF */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center">
          {/* Seletor de Idiomas (PT / EN / FR) */}
          <div className="flex bg-slate-900/80 p-1 rounded-full border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setLang('pt')}
              className={`px-2.5 py-1 rounded-full transition ${
                lang === 'pt' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              PT
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full transition ${
                lang === 'en' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-2.5 py-1 rounded-full transition ${
                lang === 'fr' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              FR
            </button>
          </div>

          <a
            href="https://www.linkedin.com/in/matheus-oliveira-8bba1a86"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-900/60 hover:border-cyan-500/50 hover:text-cyan-400 transition text-slate-300"
          >
            LinkedIn
          </a>

          <a
            href="https://wa.me/5511945696051"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-900/60 hover:border-emerald-500/50 hover:text-emerald-400 transition text-slate-300"
          >
            WhatsApp
          </a>

          <a
            href="mailto:matheusoliveirahm@hotmail.com"
            className="text-xs font-mono px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-900/60 hover:border-slate-700 transition text-slate-300"
          >
            Email
          </a>

          <a
            href={`/Portfolio_Matheus_Oliveira_${lang.toUpperCase()}.pdf`}
            download
            className="text-xs font-mono px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition flex items-center gap-1.5 font-semibold"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            {t.downloadPdf}
          </a>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-auto z-10 py-8">
        <div className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentStory.id}-${lang}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {currentStory.badge}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {t.step} 0{activeStep + 1} / 0{storyTimeline.length}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {currentStory.title}
              </h2>

              <h3 className="text-sm md:text-base font-semibold text-emerald-400">
                {currentStory.subtitle}
              </h3>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {currentStory.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {currentStory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 transition border border-slate-800 text-xs font-mono font-medium text-slate-300 active:scale-95"
            >
              {t.prev}
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:opacity-90 text-slate-950 font-semibold text-xs font-mono shadow-lg shadow-cyan-500/20 transition active:scale-95"
            >
              {t.next}
            </button>
          </div>
        </div>

        {/* Renderizador 3D */}
        <div className="w-full h-[500px] flex items-center justify-center relative">
          <Avatar3DCanvas pose={currentStory.avatarPose} />
        </div>
      </div>

      {/* Rodapé */}
      <footer className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 border-t border-slate-900 pt-6 z-10">
        <div>© {new Date().getFullYear()} Matheus Oliveira · +55 (11) 94569-6051</div>
        <div className="font-mono text-[11px] text-slate-400">{t.location}</div>
      </footer>
    </main>
  );
}
'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AvatarViewer from './AvatarViewer';

type Language = 'pt' | 'en' | 'fr';

const translations = {
  pt: {
    role: 'Engenharia de Software & Design Gráfico',
    downloadPdf: 'Download PDF',
    location: 'Brasil (Disponível para Relocação / Remoto)',
    prev: '← Anterior',
    next: 'Próximo Capítulo →',
    step: 'PASSO',
    galleryTitle: 'Galeria 3D & Projetos Visuais',
    gallerySubtitle: 'Renders fotorrealistas de produtos e visualização arquitetural (ArchViz) no Blender',
    certsTitle: 'Certificações Especializadas & Cursos',
    certsSubtitle: 'Credenciais recentes em RAG, IA Generativa, Python e Nuvem (AWS)',
    copyId: 'Copiar ID',
    copied: '✓ Copiado',
    viewFull: 'Ver em ecrã inteiro',
    timeline: [
      {
        id: 'intro',
        badge: '01. Apresentação',
        title: 'Matheus Oliveira',
        subtitle: 'Graphic Designer · Marketing Strategist · Software Developer',
        description:
          'Profissional híbrido com mais de 6 anos de experiência unindo estética visual, branding B2B, automação de dados, inteligência artificial e ecossistemas ERP/CRM.',
        tags: ['Graphic Design', 'Software Engineering', 'Next.js', 'FastAPI', 'ERP/CRM'],
        avatarPose: 'Wave',
      },
      {
        id: 'branding',
        badge: '02. Design, 3D & Marketing B2B',
        title: 'Branding & Peças B2B',
        subtitle: 'Aladin Iluminação & Projetos Corporativos',
        description:
          'Criação de identidades visuais e materiais para engenheiros, arquitetos e construtoras. Modelação/Animação 3D em Blender e edição de vídeo para campanhas digitais e Google Ads.',
        tags: ['Blender 3D', 'Photoshop', 'Illustrator', 'Premiere Pro', 'Google Ads'],
        avatarPose: 'Talk',
      },
      {
        id: 'data-engineering',
        badge: '03. Arquitetura de Dados & IA',
        title: 'API RESTful & Agente de IA',
        subtitle: 'Sincronização ERP NOMUS & Agente Autônomo',
        description:
          'Desenvolvimento de pipelines ETL em Python para integração com o ERP NOMUS e sistemas CRM, APIs de alta performance com FastAPI, PHP/HTML e Agente de IA com LangChain.',
        tags: ['Python', 'FastAPI', 'PHP', 'APIs REST', 'LangChain', 'ERP NOMUS'],
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
    role: 'Software Engineering & Graphic Design',
    downloadPdf: 'Download Resume',
    location: 'Brazil (Open for Relocation / Remote)',
    prev: '← Previous',
    next: 'Next Chapter →',
    step: 'STEP',
    galleryTitle: '3D Gallery & Visual Projects',
    gallerySubtitle: 'Photorealistic product renders and architectural visualization (ArchViz) in Blender',
    certsTitle: 'Specialized Certifications & Courses',
    certsSubtitle: 'Recent credentials in RAG, Generative AI, Python, and Cloud (AWS)',
    copyId: 'Copy ID',
    copied: '✓ Copied',
    viewFull: 'View full screen',
    timeline: [
      {
        id: 'intro',
        badge: '01. Introduction',
        title: 'Matheus Oliveira',
        subtitle: 'Graphic Designer · Marketing Strategist · Software Developer',
        description:
          'Hybrid professional with 6+ years of experience combining visual design, B2B branding, data automation, artificial intelligence, and ERP/CRM ecosystems.',
        tags: ['Graphic Design', 'Software Engineering', 'Next.js', 'FastAPI', 'ERP/CRM'],
        avatarPose: 'Wave',
      },
      {
        id: 'branding',
        badge: '02. Design, 3D & B2B Marketing',
        title: 'Branding & B2B Assets',
        subtitle: 'Aladin Lighting & Corporate Projects',
        description:
          'Visual communication materials for engineers, architects, and construction companies. 3D modeling/animation in Blender and video editing for Google Ads and digital campaigns.',
        tags: ['Blender 3D', 'Photoshop', 'Illustrator', 'Premiere Pro', 'Google Ads'],
        avatarPose: 'Talk',
      },
      {
        id: 'data-engineering',
        badge: '03. Data Architecture & AI',
        title: 'RESTful API & AI Agent',
        subtitle: 'NOMUS ERP Sync & Autonomous Agent',
        description:
          'Python ETL pipeline development for NOMUS ERP & CRM integration, high-performance RESTful APIs built with FastAPI, PHP/HTML, and an autonomous AI Agent powered by LangChain.',
        tags: ['Python', 'FastAPI', 'PHP', 'REST APIs', 'LangChain', 'NOMUS ERP'],
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
    role: 'Génie Logiciel & Graphic Design',
    downloadPdf: 'Télécharger CV',
    location: 'Brésil (Disponible pour Réinstallation / Télétravail)',
    prev: '← Précédent',
    next: 'Chapitre Suivant →',
    step: 'ÉTAPE',
    galleryTitle: 'Galerie 3D & Projets Visuels',
    gallerySubtitle: 'Rendus 3D photoréalistes de produits et visualisation architecturale (ArchViz) sur Blender',
    certsTitle: 'Certifications Spécialisées & Cours',
    certsSubtitle: 'Qualifications récentes en RAG, IA Générative, Python et Cloud (AWS)',
    copyId: 'Copier ID',
    copied: '✓ Copié',
    viewFull: 'Plein écran',
    timeline: [
      {
        id: 'intro',
        badge: '01. Présentation',
        title: 'Matheus Oliveira',
        subtitle: 'Graphic Designer · Marketing Strategist · Software Developer',
        description:
          'Professionnel hybride avec plus de 6 ans d’expérience combinant design visuel, branding B2B, automatisation de données, IA et écosystèmes ERP/CRM.',
        tags: ['Graphic Design', 'Software Engineering', 'Next.js', 'FastAPI', 'ERP/CRM'],
        avatarPose: 'Wave',
      },
      {
        id: 'branding',
        badge: '02. Design, 3D & Marketing B2B',
        title: 'Branding & Supports B2B',
        subtitle: 'Aladin Éclairage & Projets Corporatifs',
        description:
          'Création de supports visuels pour ingénieurs, architectes et entreprises de construction. Modélisation/Animation 3D sur Blender et montage vidéo pour Google Ads.',
        tags: ['Blender 3D', 'Photoshop', 'Illustrator', 'Premiere Pro', 'Google Ads'],
        avatarPose: 'Talk',
      },
      {
        id: 'data-engineering',
        badge: '03. Architecture de Données & IA',
        title: 'API RESTful & Agent IA',
        subtitle: 'Synchronisation ERP NOMUS & Agent Autonome',
        description:
          'Développement de pipelines ETL en Python pour l’ERP NOMUS et CRM, création d’APIs avec FastAPI, PHP/HTML et agent IA autonome basé sur LangChain.',
        tags: ['Python', 'FastAPI', 'PHP', 'APIs REST', 'LangChain', 'ERP NOMUS'],
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

const galleryProjects = [
  {
    id: '1',
    title: 'Render de Produto - Portátil 3D',
    category: 'Blender 3D / Product Design',
    src: '/projects/3d-laptop.png',
  },
  {
    id: '2',
    title: 'Design de Interiores & Painel Mármore',
    category: 'ArchViz / Iluminação Técnica',
    src: '/projects/interior-tv.png',
  },
  {
    id: '3',
    title: 'Sala de Jantar & Texturização em Madeira',
    category: 'ArchViz / Blender 3D',
    src: '/projects/dining-table.png',
  },
  {
    id: '4',
    title: 'Ambiente Estilo Contemporâneo & Iluminação Embutida',
    category: 'ArchViz / Layout Residencial',
    src: '/projects/living-room.png',
  },
];

const certificates = [
  {
    id: '1',
    title: 'Santander - RAG com ChromaDB, LlamaIndex e Python',
    issuer: 'Santander / DIO',
    date: '27/09/2026',
    code: 'NMDWD7VD',
    category: 'IA & RAG',
    hours: '2h',
    tags: ['RAG', 'ChromaDB', 'LlamaIndex', 'Python'],
    pdf: encodeURI('/certificates/RAG com ChromaDB, LlamaIndex e Python.pdf'),
  },
  {
    id: '2',
    title: 'Criando seu Primeiro RAG: Conectando Dados à IA Generativa',
    issuer: 'Santander / DIO',
    date: '27/09/2026',
    code: 'IEIYGLTL',
    category: 'IA Generativa',
    hours: '1h',
    tags: ['IA Generativa', 'RAG', 'Vector DB', 'Python'],
    pdf: encodeURI('/certificates/Criando seu Primeiro RAG Conectando Dados à IA Generativa.pdf'),
  },
  {
    id: '3',
    title: 'Boas vindas à Aceleração Santander - RAG com ChromaDB, LlamaIndex e Python',
    issuer: 'Santander / DIO',
    date: '24/09/2026',
    code: 'LK6R2GEG',
    category: 'IA & RAG',
    hours: '1h',
    tags: ['RAG', 'LlamaIndex', 'AI Infrastructure'],
    pdf: encodeURI('/certificates/Santander - RAG com ChromaDB, LlamaIndex e Python (Aceleração).pdf'),
  },
  {
    id: '4',
    title: 'Aceleração Santander - Dados com Python e IA',
    issuer: 'Santander / DIO',
    date: '27/09/2026',
    code: 'MVCELWIE',
    category: 'Engenharia de Dados',
    hours: '2h',
    tags: ['Python', 'Engenharia de Dados', 'IA'],
    pdf: encodeURI('/certificates/Aceleração Santander - Dados com Python e IA.pdf'),
  },
  {
    id: '5',
    title: 'AWS SimuLearn: Economias na Nuvem',
    issuer: 'AWS Training & Certification',
    date: '11/09/2026',
    code: 'c597073f-67bb-42e1-9e16-3d290ed69d34',
    category: 'Cloud AWS',
    hours: 'Simulação',
    tags: ['AWS', 'Cloud Economics', 'FinOps'],
    pdf: encodeURI('/certificates/AWS SimuLearn Economias na Nuvem.pdf'),
  },
  {
    id: '6',
    title: 'AWS SimuLearn: Conceitos de Rede',
    issuer: 'AWS Training & Certification',
    date: '10/09/2026',
    code: 'fd808edd-8b14-4892-b695-c25876872054',
    category: 'Cloud AWS',
    hours: 'Simulação',
    tags: ['AWS', 'VPC', 'Networking', 'Arquitetura'],
    pdf: encodeURI('/certificates/AWS SimuLearn Conceitos de Rede.pdf'),
  },
];

export default function Home() {
  const [lang, setLang] = useState<Language>('pt');
  const [activeStep, setActiveStep] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const t = translations[lang];
  const storyTimeline = t.timeline;
  const currentStory = storyTimeline[activeStep];

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % storyTimeline.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + storyTimeline.length) % storyTimeline.length);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#050814] text-white flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Background Video Layer */}
      <AvatarViewer activeStep={activeStep} pose={currentStory.avatarPose} />

      {/* Header Fixo Adaptável */}
      <header className="fixed top-0 left-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
                Matheus Oliveira
              </h1>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <span className="hidden lg:inline text-xs text-slate-400 font-mono border-l border-slate-700/60 pl-3">
              {t.role}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center w-full md:w-auto">
            {/* Seletor de Idioma */}
            <div className="flex bg-slate-900/90 p-0.5 rounded-full border border-slate-800 text-[10px] sm:text-xs font-mono">
              {(['pt', 'en', 'fr'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase transition ${
                    lang === l ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <a
              href="https://www.linkedin.com/in/matheus-oliveira-8bba1a86"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] sm:text-xs font-mono px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-slate-800 bg-slate-900/80 hover:border-cyan-500/50 hover:text-cyan-400 transition text-slate-300"
            >
              LinkedIn
            </a>

            <a
              href="https://wa.me/5511945696051"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] sm:text-xs font-mono px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-slate-800 bg-slate-900/80 hover:border-emerald-500/50 hover:text-emerald-400 transition text-slate-300"
            >
              WhatsApp
            </a>

            <a
              href="mailto:matheusoliveirahm@hotmail.com"
              className="hidden sm:inline-block text-[11px] sm:text-xs font-mono px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-slate-800 bg-slate-900/80 hover:border-slate-700 transition text-slate-300"
            >
              Email
            </a>

            <a
              href={`/Portfolio_Matheus_Oliveira_${lang.toUpperCase()}.pdf`}
              download
              className="text-[11px] sm:text-xs font-mono px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition flex items-center gap-1 font-semibold"
            >
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>{t.downloadPdf}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Conteúdo Centralizado Responsivo (Apresentação / Passo a Passo) */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-start z-10 relative px-4 md:px-8 pt-32 sm:pt-28 pb-12 min-h-screen">
        <div className="max-w-lg w-full flex flex-col gap-4 sm:gap-5 bg-slate-950/80 p-5 sm:p-8 rounded-2xl backdrop-blur-xl border border-slate-800/80 shadow-2xl my-auto hover:border-cyan-500/30 transition-all duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentStory.id}-${lang}`}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="flex flex-col gap-2.5 sm:gap-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {currentStory.badge}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-slate-400">
                  {t.step} 0{activeStep + 1} / 0{storyTimeline.length}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {currentStory.title}
              </h2>

              <h3 className="text-xs sm:text-sm font-semibold text-emerald-400">
                {currentStory.subtitle}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {currentStory.description}
              </p>

              <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                {currentStory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botões de Navegação */}
          <div className="flex items-center gap-2 sm:gap-3 mt-1 pt-2 border-t border-slate-800/50">
            <button
              onClick={handlePrev}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 transition border border-slate-800 text-[11px] sm:text-xs font-mono font-medium text-slate-300 active:scale-95 text-center"
            >
              {t.prev}
            </button>

            <button
              onClick={handleNext}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:opacity-90 text-slate-950 font-semibold text-[11px] sm:text-xs font-mono shadow-lg shadow-cyan-500/20 transition active:scale-95 text-center"
            >
              {t.next}
            </button>
          </div>
        </div>
      </div>

      {/* SEÇÃO 1: Galeria de Projetos 3D & ArchViz */}
      <section className="w-full z-20 relative bg-slate-950/70 backdrop-blur-xl border-t border-slate-800/60 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              {t.galleryTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              {t.gallerySubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {galleryProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedImage(project.src)}
                className="group relative h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 cursor-pointer hover:border-cyan-500/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-end"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.src})` }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                    {project.category}
                  </span>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {project.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    🔍 {t.viewFull}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: Certificações & Cursos Recentes */}
      <section className="w-full z-20 relative bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/60 py-12 px-4 sm:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {t.certsTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              {t.certsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="group relative bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/5"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-3">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-emerald-400 font-semibold">
                      {cert.issuer}
                    </span>
                    <span className="text-slate-400">{cert.date}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-3">
                    {cert.title}
                  </h4>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] sm:text-xs font-mono gap-2">
                  <span className="text-slate-400 truncate max-w-[120px]" title={cert.code}>
                    ID: {cert.code}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Botão de Ver PDF */}
                    {cert.pdf && (
                      <a
                        href={cert.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition text-[10px] active:scale-95 flex items-center gap-1 font-semibold"
                      >
                        📄 PDF
                      </a>
                    )}

                    {/* Botão de Copiar ID */}
                    <button
                      onClick={() => handleCopy(cert.code)}
                      className="px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition text-[10px] active:scale-95"
                    >
                      {copiedCode === cert.code ? t.copied : t.copyId}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Zoom para Imagens da Galeria */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Preview do Projeto 3D"
              className="max-w-full max-h-full rounded-xl object-contain shadow-2xl border border-slate-800"
            />
            <button className="absolute top-2 right-2 text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full font-mono text-xs">
              ✕ Fechar
            </button>
          </div>
        </div>
      )}

      {/* Rodapé Fixo Responsivo */}
      <footer className="fixed bottom-0 left-0 w-full z-40 bg-slate-950/90 backdrop-blur-md border-t border-slate-800/50 px-3 sm:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 text-[10px] sm:text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Matheus Oliveira</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300">+55 (11) 94569-6051</span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 text-center sm:text-right">
            {t.location}
          </div>
        </div>
      </footer>
    </main>
  );
}
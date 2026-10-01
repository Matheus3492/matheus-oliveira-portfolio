'use client';

import React, { useState } from 'react';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  code: string;
  category: 'IA & RAG' | 'Dados & Python' | 'Cloud & AWS';
  skills: string[];
  hours?: string;
}

const certificates: Certificate[] = [
  {
    id: '1',
    title: 'RAG com ChromaDB, LlamaIndex e Python',
    issuer: 'Santander / DIO',
    date: '24/09/2026',
    code: 'LK6R2GEG',
    category: 'IA & RAG',
    skills: ['RAG', 'ChromaDB', 'LlamaIndex', 'Python'],
    hours: '1h',
  },
  {
    id: '2',
    title: 'Criando seu Primeiro RAG: Conectando Dados à IA Generativa',
    issuer: 'Santander / DIO',
    date: '27/09/2026',
    code: 'IEIYGLTL',
    category: 'IA & RAG',
    skills: ['IA Generativa', 'RAG', 'LLMs', 'Vetores'],
    hours: '1h',
  },
  {
    id: '3',
    title: 'Santander - RAG com ChromaDB, LlamaIndex e Python (Aceleração)',
    issuer: 'Santander / DIO',
    date: '27/09/2026',
    code: 'NMDWD7VD',
    category: 'IA & RAG',
    skills: ['RAG', 'ChromaDB', 'LlamaIndex', 'Python'],
    hours: '2h',
  },
  {
    id: '4',
    title: 'Aceleração Santander - Dados com Python e IA',
    issuer: 'Santander / DIO',
    date: '27/09/2026',
    code: 'MVCELWIE',
    category: 'Dados & Python',
    skills: ['Python', 'Engenharia de Dados', 'IA'],
    hours: '2h',
  },
  {
    id: '5',
    title: 'AWS SimuLearn: Economias na Nuvem',
    issuer: 'AWS Training & Certification',
    date: '11/09/2026',
    code: 'c597073f-67bb-42e1-9e16-3d290ed69d34',
    category: 'Cloud & AWS',
    skills: ['AWS', 'Cloud Economics', 'FinOps'],
  },
  {
    id: '6',
    title: 'AWS SimuLearn: Conceitos de Rede',
    issuer: 'AWS Training & Certification',
    date: '10/09/2026',
    code: 'fd808edd-8b14-4892-b695-c25876872054',
    category: 'Cloud & AWS',
    skills: ['AWS', 'VPC', 'Networking', 'Arquitetura'],
  },
];

export default function CertificatesSection() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Certificações & Especializações
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Qualificação comprovada em Arquitetura RAG, IA Generativa e Nuvem AWS
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="group relative bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 shadow-lg hover:shadow-cyan-500/5"
          >
            <div>
              {/* Header do Card */}
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono mb-3">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-semibold">
                  {cert.issuer}
                </span>
                <span className="text-slate-400">{cert.date}</span>
              </div>

              {/* Título do Curso */}
              <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2">
                {cert.title}
              </h4>

              {/* Tags de Tecnologias */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5 my-3">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-800"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer do Card com Código de Validação */}
            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] sm:text-xs font-mono">
              <span className="text-slate-400 truncate max-w-[150px]" title={cert.code}>
                ID: {cert.code}
              </span>

              <button
                onClick={() => handleCopy(cert.code)}
                className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition text-[10px]"
              >
                {copiedCode === cert.code ? '✓ Copiado' : 'Copiar ID'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
'use client';

import React, { useState } from 'react';

interface Project {
  id: string;
  title: string;
  category: string;
  src: string;
}

const projects: Project[] = [
  { id: '1', title: 'Render Produto - Portátil & Modelação', category: 'Blender 3D / Product Render', src: '/projects/3d-laptop.png' },
  { id: '2', title: 'Design de Interiores & Iluminação Embutida', category: 'Arquitetura & Render 3D', src: '/projects/interior-tv.png' },
  { id: '3', title: 'Ambiente de Jantar & Texturização Madeira', category: 'Blender 3D / ArchViz', src: '/projects/dining-table.png' },
  { id: '4', title: 'Sala Estilo Contemporâneo & Sombra Difusa', category: 'Blender 3D / ArchViz', src: '/projects/living-room.png' },
];

export default function ProjectGallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 z-20 relative">
      <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
        Galeria de Renderização 3D & ArchViz
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {projects.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedImg(p.src)}
            className="group relative h-64 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer hover:border-cyan-500/50 transition-all duration-300"
          >
            <img
              src={p.src}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end z-10">
              <span className="text-[10px] font-mono text-cyan-400 font-semibold">{p.category}</span>
              <h4 className="text-xs font-semibold text-white mt-1">{p.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Zoom */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img src={selectedImg} alt="Preview 3D" className="max-w-full max-h-full rounded-xl object-contain shadow-2xl" />
            <button className="absolute top-2 right-2 text-white bg-slate-800/80 hover:bg-slate-700 p-2 rounded-full font-mono text-xs">
              ✕ Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
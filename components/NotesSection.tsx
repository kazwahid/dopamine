'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NoteItem {
  code: string;
  number: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
}

const notesList: NoteItem[] = [
  {
    code: '(S-001)',
    number: '01',
    title: 'THE OPENING SET: TENSION & VISCERAL PACING',
    category: 'DIRECTION',
    date: 'OCT 2026',
    excerpt:
      'How micro-pauses in cinematography hold the viewer’s dopamine levels before explosive action. Analyzing the opening boxing sequence.',
  },
  {
    code: '(S-001)',
    number: '02',
    title: 'LIGHT CHASING SHADOW: SENSORY LIGHTING ARCHITECTURE',
    category: 'CINEMATOGRAPHY',
    date: 'SEP 2026',
    excerpt:
      'Single-source tungsten and anamorphic rim reflections. Balancing low-key contrast ratios in ultra-short film formats.',
  },
  {
    code: '(S-001)',
    number: '03',
    title: 'AUDIO ARCHITECTURE: PROCEDURAL SOUNDSCAPES FOR CINEMA',
    category: 'SOUND DESIGN',
    date: 'AUG 2026',
    excerpt:
      'Synthesizing tactile mechanical film flutter with warm analog sub-bass drones to ground hyper-stylized AI visuals in physical reality.',
  },
  {
    code: '(S-001)',
    number: '04',
    title: 'THE KINETIC REEL: WHY SENSORY TIMING CAPTIVATES ATTENTION',
    category: 'THEORY',
    date: 'JUL 2026',
    excerpt:
      'Moving away from generic AI wrappers toward timeless editorial identity design. Why tactile brand presence outlasts algorithm trends.',
  },
];

export function NotesSection() {
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);

  return (
    <section
      id="notes"
      aria-label="Studio Notes and Dispatches"
      className="relative w-full min-h-screen bg-[#F1F1F1] text-[#252422] p-6 md:p-16 select-none flex flex-col justify-between border-t border-black/10"
      style={{ backgroundColor: '#F1F1F1', color: '#252422' }}
    >
      {/* Top Header of Notes (JAMS Notes inspired) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/15 pb-8 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#777778]">
            (Notes / Dispatches)
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mt-2 uppercase font-sans">
            dopamine©
          </h2>
          <p className="font-mono text-sm tracking-wider text-[#555558] mt-1">
            “It’s a sensory vibe” &bull; Pure Media Architecture
          </p>
        </div>

        <div className="max-w-md font-mono text-xs tracking-wider text-[#444448] space-y-2">
          <div className="font-bold text-black">(What it is)</div>
          <p>
            DOPAMINE NOTES is a creative archive from the media architecture team. What started as
            internal reel tests became a studio journal on cinematic pacing, procedural audio, and
            editorial identity.
          </p>
        </div>
      </div>

      {/* Notes List (Faithful to JAMS Notes (S-001) item structure) */}
      <div className="my-12 divide-y divide-black/15">
        {notesList.map((item) => (
          <div
            key={item.number}
            onClick={() => setSelectedNote(item)}
            data-cursor="[ READ NOTE ]"
            className="group py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between cursor-pointer hover:bg-black/5 px-4 -mx-4 rounded-lg transition-colors"
          >
            {/* Season Code & Index */}
            <div className="font-mono text-xs tracking-widest text-[#777778] w-32 shrink-0">
              <span className="font-bold text-black">{item.code}</span> {item.number}
            </div>

            {/* Note Title */}
            <div className="flex-1 my-2 md:my-0 md:px-6">
              <h3 className="text-lg md:text-2xl font-bold tracking-tight uppercase group-hover:translate-x-2 transition-transform duration-300">
                {item.title}
              </h3>
              <p className="font-mono text-xs text-[#666668] mt-1 line-clamp-1">
                {item.excerpt}
              </p>
            </div>

            {/* Metadata & Arrow */}
            <div className="flex items-center gap-6 shrink-0 font-mono text-xs text-[#555558]">
              <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-black/5 border border-black/10 text-[10px] font-bold">
                {item.category}
              </span>
              <span className="text-[10px] tracking-wider">{item.date}</span>
              <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Note Modal / Drawer */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F6F5F1] text-black w-full max-w-xl p-8 rounded-2xl shadow-2xl border border-black/10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-4 font-mono text-xs">
                <span>
                  {selectedNote.code} {selectedNote.number} &bull; {selectedNote.category}
                </span>
                <button
                  onClick={() => setSelectedNote(null)}
                  className="hover:opacity-60 cursor-pointer font-bold"
                >
                  [ CLOSE &times; ]
                </button>
              </div>

              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                {selectedNote.title}
              </h3>

              <p className="font-mono text-sm leading-relaxed text-[#444448]">
                {selectedNote.excerpt}
              </p>

              <div className="p-4 rounded-lg bg-black/5 border border-black/10 font-mono text-xs text-[#555558]">
                <strong>DISPATCH NOTE:</strong> Every frame crafted at DOPAMINE undergoes rigorous
                kinetic analysis to balance visceral sensory response with timeless editorial clarity.
              </div>

              <button
                onClick={() => setSelectedNote(null)}
                className="w-full py-3 rounded-full bg-black text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                RETURN TO NOTES
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Sub-row */}
      <div className="flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-[#777778] pt-6 border-t border-black/10 gap-2">
        <span>ARCHIVE SEASON 01 &bull; 04 ENTRIES</span>
        <span>CONTINUOUS CURATION &bull; DOPAMINE© STUDIO</span>
      </div>
    </section>
  );
}

'use client'

import { useEffect, useState } from 'react'

export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter')

  useEffect(() => {
    const hold = setTimeout(() => setPhase('hold'), 800)
    const exit = setTimeout(() => setPhase('exit'), 2200)
    const finish = setTimeout(() => onFinish(), 2900)
    return () => {
      clearTimeout(hold)
      clearTimeout(exit)
      clearTimeout(finish)
    }
  }, [onFinish])

  return (
    <div className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background/10 overflow-hidden transition-opacity duration-700 ease-in-out ${phase === 'exit' ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute w-150 h-150 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl bg-[radial-gradient(circle,rgba(236,72,153,0.12)_0%,transparent_70%)]" />

      <div className="absolute w-80 h-80 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-primary/8 animate-pulse" />
      <div className="absolute w-80 h-80 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-primary/8 animate-pulse delay-500" />

      <div className={`relative flex flex-col items-center gap-7 transition-all duration-700 ease-out ${phase === 'enter' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>

        <div className="relative w-27.5 h-27.5">
          <div className="absolute -inset-0.75 rounded-full bg-[conic-gradient(from_0deg,rgba(236,72,153,0.6),rgba(168,85,247,0.4),rgba(236,72,153,0.2),rgba(236,72,153,0.6))] animate-spin animation-duration-[4s]" />
          <img
            src="/atelie.jpeg"
            alt="Ateliê"
            className="relative w-27.5 h-27.5 rounded-full object-cover border-[3px] border-background/10 block"
          />
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-[32px] font-light tracking-[0.25em] text-zinc-50 uppercase m-0" style={{ fontFamily: 'Georgia, serif' }}>
            Ateliê
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-primary/70 uppercase font-normal m-0">
            Encantos do Arcanjo
          </p>
        </div>
      </div>

      <div className={`absolute bottom-12 w-30 h-px bg-foreground/6 rounded-full overflow-hidden transition-opacity duration-500 delay-300 ${phase === 'enter' ? 'opacity-0' : 'opacity-100'}`}>
        <div className="h-full w-full bg-[linear-gradient(90deg,transparent,rgba(236,72,153,0.8),transparent)] animate-[shimmer_1.4s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}
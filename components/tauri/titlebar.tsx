'use client'

import { routeNames } from '@/types/record'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { Minus, Square, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Titlebar() {
    const appWindow = getCurrentWindow()
    const pathname = usePathname()

    return (
        <div data-tauri-drag-region className="h-8 flex items-center justify-between px-4 bg-background border-b border-border select-none">
            <div className="flex items-center justify-center flex-row gap-2">
                <img src="/favicon.ico" alt="Ateliê" width={16} height={16} />
                <span data-tauri-drag-region className="text-xs text-muted-foreground tracking-wider uppercase">
                    Ateliê - {routeNames[pathname] || "Desktop"}
                </span>
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => appWindow.minimize()}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                    <Minus size={13} />
                </button>
                <button
                    onClick={() => appWindow.toggleMaximize()}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                    <Square size={12} />
                </button>
                <button
                    onClick={() => appWindow.close()}
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-destructive hover:text-white text-muted-foreground transition-colors"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    )
}
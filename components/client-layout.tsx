'use client'

import { useState, useEffect, useLayoutEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SplashScreen } from "./tauri/splash-screen"
import { Titlebar } from "./tauri/titlebar"
import { OfflineBanner } from "./offline-banner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

const useSafeLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function ClientLayoutInner({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false)
  const [isTauri, setIsTauri] = useState(false)
  const [splashDone, setSplashDone] = useState(false)
  const [shortcutsEnabled, setShortcutsEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const router = useRouter()
  const { logout } = useAuth()

  useSafeLayoutEffect(() => {
    setMounted(true)
    const tauri = '__TAURI_INTERNALS__' in window
    if (tauri) {
      setIsTauri(true)
      document.documentElement.style.setProperty('--titlebar-height', '32px')
      const shown = sessionStorage.getItem('splash-shown')
      if (!shown) {
        setShowSplash(true)
        sessionStorage.setItem('splash-shown', 'true')
      } else {
        setSplashDone(true)
      }
    } else {
      setSplashDone(true)
    }
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('shortcuts-enabled')
    setShortcutsEnabled(stored !== null ? stored === 'true' : true)

    const handleChange = (e: Event) => {
      setShortcutsEnabled((e as CustomEvent).detail)
    }

    window.addEventListener('shortcuts-changed', handleChange)
    return () => window.removeEventListener('shortcuts-changed', handleChange)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!shortcutsEnabled) return
      const tag = (e.target as HTMLElement).tagName.toLowerCase()
      if (["input", "textarea", "select"].includes(tag)) return

      if (e.ctrlKey && e.key === "d") { e.preventDefault(); router.push("/admin/dashboard") }
      if (e.ctrlKey && e.key === "p") { e.preventDefault(); router.push("/admin/orders") }
      if (e.ctrlKey && e.key === "u") { e.preventDefault(); router.push("/admin/clients") }
      if (e.ctrlKey && e.key === "i") { e.preventDefault(); router.push("/admin/itens") }
      if (e.ctrlKey && e.key === "t") { e.preventDefault(); router.push("/admin/about") }
      if (e.ctrlKey && e.key === "y") { e.preventDefault(); router.push("/admin") }
      if (e.ctrlKey && e.key === ",") { e.preventDefault(); router.push("/admin/settings") }
      if (e.ctrlKey && e.key === "l") { e.preventDefault(); setShowLogoutDialog(true) }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [shortcutsEnabled, router, logout])

  const handleSplashFinish = async () => {
    if (isTauri) {
      const { getCurrentWindow } = await import('@tauri-apps/api/window')
      await new Promise(resolve => setTimeout(resolve, 100))
      await getCurrentWindow().show()
    }
    setSplashDone(true)
    setShowSplash(false)
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      <div className="flex flex-col h-screen overflow-hidden">
        {mounted && isTauri && <Titlebar />}
        <div className={`flex-1 overflow-hidden ${mounted && isTauri && !splashDone ? 'invisible' : 'visible'}`}>
          {children}
        </div>
      </div>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Encerrar sessão?</AlertDialogTitle>
            <AlertDialogDescription>
              Você pressionou <strong>Ctrl+L</strong>. Deseja realmente sair do sistema?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowLogoutDialog(false)
              logout()
            }}>
              Sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <OfflineBanner />
      <Toaster position="top-right" richColors closeButton />
    </ThemeProvider>
  )
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ClientLayoutInner>{children}</ClientLayoutInner>
    </AuthProvider>
  )
}
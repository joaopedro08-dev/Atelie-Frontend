'use client'

import { useState, useEffect } from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SplashScreen } from "./tauri/splash-screen"
import { Titlebar } from "./tauri/titlebar"
import { OfflineBanner } from "./offline-banner"
// import { Updater } from "./tauri/updater"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false)
  const [isTauri, setIsTauri] = useState(false)
  const [splashDone, setSplashDone] = useState(false)

  const handleSplashFinish = async () => {
    if (isTauri) {
      const { getCurrentWindow } = await import('@tauri-apps/api/window')
      await new Promise(resolve => setTimeout(resolve, 100))
      await getCurrentWindow().show()
    }
    setSplashDone(true)
    setShowSplash(false)
  }

  useEffect(() => {
    const tauri = '__TAURI_INTERNALS__' in window
    if (tauri) {
      setIsTauri(true)
      const shown = sessionStorage.getItem('splash-shown')
      if (!shown) {
        setShowSplash(true)
        sessionStorage.setItem('splash-shown', 'true')
      } else {
        setSplashDone(true)
      }
    }
  }, [])

  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
        {/* {isTauri && <Updater />} */}

        <div
          className="flex flex-col h-screen overflow-hidden"
          style={isTauri ? { '--titlebar-height': '32px' } as React.CSSProperties : {}}
        >
          {isTauri && <Titlebar />}
          <div className={`flex-1 overflow-hidden ${isTauri && !splashDone ? 'invisible' : 'visible'}`}>
            {children}
          </div>
        </div>

        <OfflineBanner />
        <Toaster position="top-right" richColors closeButton />
      </ThemeProvider>
    </AuthProvider>
  )
}
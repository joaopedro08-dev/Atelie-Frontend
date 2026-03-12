'use client'
import { useOnline } from '@/hooks/use-online'
import { WifiOff, Wifi } from 'lucide-react'
import { useEffect, useState } from 'react'

export function OfflineBanner() {
  const isOnline = useOnline()
  const [visible, setVisible] = useState(false)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    if (!isOnline) {
      setVisible(true)
      setWasOffline(true)
    } else if (wasOffline) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setWasOffline(false)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [isOnline, wasOffline])

  if (!visible) return null

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 ${
      isOnline
        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
        : 'bg-destructive/15 text-destructive border border-destructive/20'
    } animate-in slide-in-from-bottom-4`}>
      {isOnline ? (
        <>
          <Wifi size={15} />
          Conexão restabelecida
        </>
      ) : (
        <>
          <WifiOff size={15} />
          Sem conexão com a internet
        </>
      )}
    </div>
  )
}
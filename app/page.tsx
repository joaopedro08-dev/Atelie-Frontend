'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from "@/components/web/footer"
import Header from "@/components/web/header"
import Main from "@/components/web/main"

export default function Page() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if ('__TAURI_INTERNALS__' in window) {
      router.replace('/signin')
    } else {
      setReady(true)
    }
  }, [router])

  if (!ready) return null

  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-background text-foreground">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
'use client'
import { useEffect } from 'react'
import { check } from '@tauri-apps/plugin-updater'
import { toast } from 'sonner'

export function Updater() {
  useEffect(() => {
    const checkUpdate = async () => {
      if (!('__TAURI_INTERNALS__' in window)) return
      
      const update = await check()
      if (update?.available) {
        toast.info(`Nova versão ${update.version} disponível!`, {
          action: {
            label: 'Atualizar',
            onClick: async () => {
              await update.downloadAndInstall()
            }
          },
          duration: Infinity
        })
      }
    }

    checkUpdate()
  }, [])

  return null
}
'use client'

import { useEffect } from 'react'
import { check } from '@tauri-apps/plugin-updater'
import { relaunch } from '@tauri-apps/plugin-process'
import { toast } from 'sonner'

export function Updater() {
  useEffect(() => {
    const checkUpdate = async () => {
      if (!('__TAURI_INTERNALS__' in window)) return

      try {
        const update = await check()
        if (update) {
          toast.info(`Nova versão ${update.version} disponível!`, {
            action: {
              label: 'Atualizar',
              onClick: async () => {
                const toastId = toast.loading('Baixando atualização...')
                try {
                  await update.downloadAndInstall()
                  toast.success('Atualização instalada! Reiniciando...', { id: toastId })
                  await relaunch()
                } catch {
                  toast.error('Erro ao instalar atualização.', { id: toastId })
                }
              }
            },
            duration: Infinity
          })
        }
      } catch {}
    }

    checkUpdate()
  }, [])

  return null
}
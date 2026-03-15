import { writeFileSync } from 'fs'

const backendUrl = process.env.NEXT_PUBLIC_PRODUCTION_API || 'https://your-backend-url.com'
const pubkey = process.env.TAURI_SIGNING_PUBLIC_KEY || ''

const tauriConfig = {
  $schema: "../node_modules/@tauri-apps/cli/config.schema.json",
  productName: "Atelie-Admin",
  version: "1.0.6",
  identifier: "com.atelie.arcanjo",
  build: {
    frontendDist: "../out",
    devUrl: "http://localhost:3000",
    beforeDevCommand: "pnpm dev",
    beforeBuildCommand: "pnpm build"
  },
  app: {
    windows: [{
      title: "Ateliê - Encantos do Arcanjo",
      width: 1280, height: 800,
      minWidth: 800, minHeight: 600,
      resizable: true, fullscreen: false,
      visible: false, decorations: false,
      devtools: false, backgroundColor: "#1a1a1a"
    }],
    security: {
      csp: {
        "default-src": "'self' customprotocol: asset:",
        "connect-src": `ipc: http://ipc.localhost http://tauri.localhost ${backendUrl}`,
        "font-src": ["'self' data:"],
        "img-src": "'self' asset: http://asset.localhost blob: data:",
        "style-src": "'unsafe-inline' 'self'",
        "script-src": "'self' 'unsafe-inline'"
      }
    }
  },
  bundle: {
    active: true,
    targets: "all",
    createUpdaterArtifacts: true,
    icon: ["icons/32x32.png", "icons/128x128.png", "icons/128x128@2x.png", "icons/icon.icns", "icons/icon.ico"],
    windows: {
      nsis: {
        languages: ["PortugueseBR"],
        displayLanguageSelector: false,
        installerIcon: "icons/icon.ico",
        sidebarImage: "icons/installer-sidebar.bmp",
        headerImage: "icons/installer-header.bmp",
        installMode: "currentUser",
        startMenuFolder: "Atelie Admin",
        compression: "lzma"
      }
    }
  },
  plugins: {
    updater: {
      endpoints: [
        "https://github.com/joaopedro08-dev/Atelie-Frontend/releases/latest/download/latest.json"
      ],
      dialog: false,
      pubkey
    }
  }
}

writeFileSync('src-tauri/tauri.conf.json', JSON.stringify(tauriConfig, null, 2))
console.log('✅ tauri.conf.json gerado com sucesso!')
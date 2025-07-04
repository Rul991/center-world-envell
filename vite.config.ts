import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// const ZEROTIER_IP = 'http://10.147.17.244:8080/'
const RADMIN_IP = 'http://26.8.57.245:8080/'
const AE_IP = RADMIN_IP

class Server {
  static Ae = 0
  static My = 1
  static Vite = 2
}

const usedServer = Server.Ae
const serverIp = usedServer == Server.My ? 'http://127.0.0.1:8080/' : AE_IP
const proxy = usedServer != Server.Vite ? 
    {
      '/api': {
        changeOrigin: true,
        target: serverIp,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
        localAddress: '0.0.0.0'
      }
    } :
    undefined

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy
  },
  plugins: [
    react(),
  ],
})

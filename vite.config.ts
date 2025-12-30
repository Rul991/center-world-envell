import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const AE_IP = 'http://26.8.57.245:8080/'
const MY_IP = 'http://127.0.0.1:8080/'

class Server {
  static Ae = 0
  static My = 1
  static Vite = 2
}

const usedServer = Server.My
const serverIp = usedServer == Server.My ? MY_IP : AE_IP
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

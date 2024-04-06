import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '',
    plugins: [react(), viteTsconfigPaths()],
    server: {    
        // this ensures that the browser opens upon server start
        open: true,
        proxy: {
            '/foo' : "",
            '/api': {
              target: 'https://server-419501.uc.r.appspot.com/',// this is the port where the server is running
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
        // this sets a default port to 3000  
        port: 3000,
    },
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '',

    plugins: [react(), viteTsconfigPaths()],
    server: {    
        open: true,
        proxy: {
            '/api': {
              target: 'https://aiducator-421817.de.r.appspot.com',// this is the port where the server is running
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
})

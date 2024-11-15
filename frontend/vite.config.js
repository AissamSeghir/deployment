import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine if we are in production or development
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: isProduction
          ? "https://deployment-z54s.onrender.com" // Deployed backend URL
          : "http://localhost:5000", // Local backend URL
        changeOrigin: true,
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Determine if we are in production or development
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [react()],
});

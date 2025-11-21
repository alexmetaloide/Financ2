import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Apenas carrega as variáveis de ambiente, mas não retorna nada ainda
  const env = loadEnv(mode, '.', '');
  
  return {
    // 1. Base path para o GitHub Pages (AGORA está no lugar certo)
    base: '/Financ/', 
    
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    
    // 2. Plugins definidos uma única vez
    plugins: [react()], 
    
    // 3. Bloco 'define' removido/simplificado, pois 'import.meta.env.VITE_GEMINI_API_KEY'
    // já é acessível diretamente sem ele.
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Глобальное подключение стилей scss
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
              @import '../src/assets/scss/_variables.scss';
              @import "../src/assets/scss/main.scss";
            `
      }
    }
  },
  plugins: [vue()],

})

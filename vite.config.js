import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'About.html'),
        products: resolve(__dirname, 'Products.html'),
        contact: resolve(__dirname, 'Contact.html'),
        cart: resolve(__dirname, 'addToCart.html')
      }
    }
  }
})

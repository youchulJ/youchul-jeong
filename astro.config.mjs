// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  base: process.env.SITE_BASE_PATH || '/youchul-jeong/',
  trailingSlash: 'always'
});

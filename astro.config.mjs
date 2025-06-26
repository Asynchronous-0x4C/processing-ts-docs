// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  outDir:"./docs",
  base:"/processing-ts-docs/",
  build:{
    assets:"astro"
  },
  vite:{
    esbuild:{
      minifyIdentifiers:false
    }
  },
	integrations: [
		starlight({
			title: 'Processing.ts Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://asynchronous-0x4c.github.io/processing-ts/' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Setup', slug: 'guides/setup' },
					],
				},
			],
		})
	]
});

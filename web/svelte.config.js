import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		paths: {
			base: '', // falls du im Unterverzeichnis deployst, hier anpassen
		}
	},
	preprocess: vitePreprocess()
};

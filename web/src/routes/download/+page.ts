// src/routes/deine-seite/+page.ts
import type { PageLoad } from './$types';
import PocketBase from 'pocketbase';

export const prerender = false

export const load: PageLoad = async () => {
    const pb = new PocketBase('http://backend.edelweißpiraten.de');
    const files = await pb.collection('public_files').getFullList({
        sort: '-updated',
        filter: 'visible=true'
    });
    return { files };
};

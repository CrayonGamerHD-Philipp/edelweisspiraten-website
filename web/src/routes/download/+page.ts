import type { PageLoad } from './$types';
import PocketBase from 'pocketbase';

export const prerender = false;

export const load: PageLoad = async () => {
    const pb = new PocketBase('https://backend.xn--edelweipiraten-6fb.de');

    const files = await pb.collection('public_files').getFullList({
        sort: '-updated',
        filter: 'visible=true',
        expand: 'tags'
    });

    return { files };
};
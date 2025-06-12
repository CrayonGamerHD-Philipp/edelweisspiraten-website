export const prerender = false;

import type { PageServerLoad } from './$types';
import PocketBase from 'pocketbase';

export const load: PageServerLoad = async () => {
    const pb = new PocketBase('https://backend.edelweißpiraten.de');

    const records = await pb.collection('faqs').getFullList({
        sort: '+created',
        filter: 'visible = true'
    });

    // Optional: Standardzustand `open = false` ergänzen
    const faqs = records.map((faq) => ({
        ...faq,
        open: false
    }));

    return { faqs };
};

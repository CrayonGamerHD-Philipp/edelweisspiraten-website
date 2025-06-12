import PocketBase from 'pocketbase';
import type { PageLoad } from './$types';

export const prerender = false

const pb = new PocketBase('https://backend.edelweißpiraten.de');

export const load: PageLoad = async () => {
    const appointments = await pb.collection('appointments').getFullList({
        sort: 'date',
        expand: 'tags',
    });

    const tags = await pb.collection('tags').getFullList({
        sort: 'name',
    });

    const years = [...new Set(appointments.map(a => new Date(a.date).getFullYear()))];

    return {
        appointments,
        tags,
        years
    };
};

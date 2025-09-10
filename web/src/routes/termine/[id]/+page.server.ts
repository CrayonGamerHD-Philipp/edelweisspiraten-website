import type { PageServerLoad } from './$types';
import PocketBase from 'pocketbase';
import { error } from '@sveltejs/kit';

export const prerender = false;

export const load: PageServerLoad = async ({ params }) => {
    const { id } = params;
    const pb = new PocketBase('https://backend.edelweißpiraten.de');


    try {
        const record = await pb.collection('appointments').getOne(id, {
            expand: 'tags'
        });


        if (!record) throw error(404, 'Termin nicht gefunden');


        const appointment = {
            id: record.id,
            title: record.title as string,
            description: (record.description ?? '') as string,
            date: record.date as string,
            end_date: (record.end_date ?? null) as string | null,
            pictures: (record.pictures ?? []) as string[],
            tags: (record.tags ?? []) as string[],
            expand: {
                tags: (record.expand?.tags ?? []).map((t: any) => ({
                    id: t.id,
                    name: t.name,
                    color: t.color ?? null
                }))
            }
        };


        return { appointment };
    } catch (e: any) {
        throw error(e?.status || 500, e?.message || 'Fehler beim Laden des Termins');
    }
};
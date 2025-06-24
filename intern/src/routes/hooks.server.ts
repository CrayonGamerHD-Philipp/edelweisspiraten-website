// src/hooks.server.ts
import PocketBase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const pb = new PocketBase('https://backend.xn--edelweipiraten-6fb.de');

    const rawCookies = event.request.headers.get('cookie') || '';
    console.log('🍪 Alle Cookies:', rawCookies);


    pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        await pb.collection('users').authRefresh(); // prüft Token
        event.locals.user = pb.authStore.model;
        console.log('✅ Eingeloggt als:', pb.authStore.model.email);
    } catch (err) {
        pb.authStore.clear();
        event.locals.user = null;
        console.log('❌ Ungültiger Token oder Fehler:', err);
    }

    return resolve(event);
};

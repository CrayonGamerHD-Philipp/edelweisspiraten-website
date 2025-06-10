import PocketBase from 'pocketbase';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types'; // 👈 korrekt für diese Route

export const config = {
    layout: false // ✅ verhindert Vererbung
};

export const load: LayoutServerLoad = async ({ cookies }) => {
    const pb = new PocketBase('http://localhost:8090');

    // 🧠 Auth-Token aus Cookie (wird von Login gesetzt)
    const token = cookies.get('pb_auth');

    if (token) {
        // Korrektes Format setzen für loadFromCookie
        pb.authStore.loadFromCookie(`pb_auth=${token}`);
    }

    if (!pb.authStore.isValid) {
        throw redirect(302, '/login');
    }

    return {
        user: pb.authStore.model
    };
};

// src/routes/login/+page.server.ts
import { pb } from '$lib/pocketbase';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = Object.fromEntries(await request.formData());
        const email = data.email as string;
        const password = data.password as string;

        try {
            // ✨ Wichtig: frische Instanz erzeugen (nicht aus globalem Import!)
            const PocketBase = (await import('pocketbase')).default;
            const pbInstance = new PocketBase('https://backend.xn--edelweipiraten-6fb.de');

            const authData = await pbInstance.collection('users').authWithPassword(email, password);

            console.log('✅ Login erfolgreich:', authData);

            cookies.set('pb_auth', pbInstance.authStore.token, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: false,
                maxAge: 60 * 60 * 24 * 7
            });

            return redirect(303, '/');
        } catch (e: any) {
            console.error('❌ Login fehlgeschlagen:', e?.response?.data || e.message || e);
            return fail(400, {
                error: 'Login fehlgeschlagen. Bitte überprüfe deine Daten.',
                values: { email }
            });
        }
    }
};

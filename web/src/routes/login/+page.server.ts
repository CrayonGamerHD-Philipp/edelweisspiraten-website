import type { Actions, PageServerLoad } from './$types';
import PocketBase from 'pocketbase';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    // Optional: Weiterleitung, wenn bereits eingeloggt
    if (locals.pb?.authStore?.isValid) {
        throw redirect(302, '/intern');
    }
    return {};
};

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
            return fail(400, { error: 'E-Mail und Passwort sind erforderlich.' });
        }

        const pb = new PocketBase('http://localhost:8090');

        try {
            const authData = await pb.collection('users').authWithPassword(email, password);

            // Auth-Token als Cookie speichern
            cookies.set('pb_auth', pb.authStore.token, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: false, // auf true setzen, wenn du HTTPS nutzt
                maxAge: 60 * 60 * 24 * 30 // 30 Tage
            });

            // Weiterleitung in den internen Bereich
            throw redirect(302, '/intern');

        } catch (err) {
            return fail(401, { error: 'Login fehlgeschlagen. Überprüfe deine Daten.' });
        }
    }
};

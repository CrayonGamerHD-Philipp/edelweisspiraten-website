import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
    console.log('🔒 Zugriff auf:', url.pathname, '| Nutzer:', locals.user?.email ?? 'nicht eingeloggt');

    if (!locals.user && url.pathname !== '/login') {
        throw redirect(302, '/login');
    }

    return {
        user: locals.user
    };
};

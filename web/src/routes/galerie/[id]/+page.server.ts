export const prerender = false;

import { fetchAppointmentById } from '$lib/api/appointments';

const backendUrl = 'https://backend.edelweißpiraten.de';

export const load = async ({ params }) => {
    const appointment = await fetchAppointmentById(params.id);

    const firstImage = appointment?.pictures?.[0]
        ? `${backendUrl}/api/files/appointments/${appointment.id}/${appointment.pictures[0]}`
        : null;

    const pageUrl = `https://edelweisspiraten-bremen.de/galerie/${appointment.id}`;

    return {
        appointment,
        firstImage,
        pageUrl
    };
};

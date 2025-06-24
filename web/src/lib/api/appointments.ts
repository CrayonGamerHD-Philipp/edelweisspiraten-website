const base = 'https://backend.edelweißpiraten.de/api';

export async function fetchAppointments() {
    const res = await fetch(`${base}/collections/appointments/records?sort=-date&expand=tags`);
    const data = await res.json();
    return data.items;
}

export async function fetchAppointmentById(id: string) {
    const res = await fetch(`${base}/collections/appointments/records/${id}?expand=tags`);
    return await res.json();
}

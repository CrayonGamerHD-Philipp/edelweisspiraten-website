<script lang="ts">
    import {onMount} from 'svelte';
    import {fetchAppointments} from '$lib/api/appointments';

    let appointments = [];

    onMount(async () => {
        appointments = await fetchAppointments();
    });

    function getFirstImage(appointment) {
        return appointment.pictures?.[0]
            ? `https://backend.edelweißpiraten.de/api/files/appointments/${appointment.id}/${appointment.pictures[0]}`
            : '/placeholder.jpg';
    }
</script>

<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">
    <h1 class="text-2xl font-bold mb-4">Bildergalerie</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each appointments.filter(a => a.pictures?.length) as appointment}
            <a href={`/galerie/${appointment.id}`} class="block border rounded shadow hover:shadow-lg">
                <img src={getFirstImage(appointment)} alt="Bild" class="w-full h-48 object-cover rounded-t"/>
                <div class="p-4">
                    <h2 class="font-semibold">{appointment.title}</h2>
                    <p class="text-sm text-gray-500">{new Date(appointment.date).toLocaleDateString()}{#if appointment.end_date}&nbsp;–&nbsp;{new Date(appointment.end_date).toLocaleDateString()}{/if}</p>
                </div>
            </a>
        {/each}
    </div>
</section>
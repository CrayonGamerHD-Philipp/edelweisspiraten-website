<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchAppointments } from '$lib/api/appointments';

    let appointments = [];
    let years: string[] = [];
    let groups: { id: string; name: string; color?: string }[] = [];

    let selectedYear = '';
    let selectedGroup = '';

    onMount(async () => {
        appointments = await fetchAppointments();

        // verfügbare Jahre extrahieren
        years = Array.from(
            new Set(appointments.map(a => new Date(a.date).getFullYear().toString()))
        ).sort((a, b) => b.localeCompare(a));

        // Gruppen aus expand sammeln (falls vorhanden)
        const tagMap = new Map();
        appointments.forEach(a => {
            a.expand?.tags?.forEach(t => tagMap.set(t.id, t));
        });
        groups = Array.from(tagMap.values());
    });

    function getFirstImage(appointment) {
        return appointment.pictures?.[0]
            ? `https://backend.edelweißpiraten.de/api/files/appointments/${appointment.id}/${appointment.pictures[0]}`
            : '/placeholder.jpg';
    }

    function fmtDateRange(start: string, end?: string) {
        const s = new Date(start);
        const e = end ? new Date(end) : null;
        if (e) {
            if (s.toDateString() === e.toDateString()) {
                return s.toLocaleDateString('de-DE');
            }
            return `${s.toLocaleDateString('de-DE')} – ${e.toLocaleDateString('de-DE')}`;
        }
        return s.toLocaleDateString('de-DE');
    }

    $: filteredAppointments = appointments
        .filter(a => a.pictures?.length)
        .filter(a => !selectedYear || new Date(a.date).getFullYear().toString() === selectedYear)
        .filter(a => !selectedGroup || a.tags.includes(selectedGroup));
</script>

<section class="max-w-6xl mx-auto px-6 py-12 space-y-8">
    <header class="text-center space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">📸 Bildergalerie</h1>
        <p class="text-gray-600 text-sm">Einblicke in unsere Aktionen und Termine</p>
    </header>

    <div class="flex flex-wrap gap-4 justify-center">
        <select bind:value={selectedYear} class="border border-gray-300 rounded px-3 py-2 text-sm">
            <option value="">Alle Jahre</option>
            {#each years as year}
                <option value={year}>{year}</option>
            {/each}
        </select>

        <select bind:value={selectedGroup} class="border border-gray-300 rounded px-3 py-2 text-sm">
            <option value="">Alle Gruppen</option>
            {#each groups as g}
                <option value={g.id}>{g.name}</option>
            {/each}
        </select>

        <button
                class="text-sm text-gray-600 underline hover:text-blue-700"
                on:click={() => { selectedYear = ''; selectedGroup = ''; }}
        >
            Filter zurücksetzen
        </button>
    </div>

    {#if filteredAppointments.length > 0}
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {#each filteredAppointments as appointment}
                <a
                        href={`/galerie/${appointment.id}`}
                        class="group block border border-gray-200 bg-white overflow-hidden transition hover:shadow-md hover:-translate-y-1"
                >
                    <div class="aspect-[4/3] overflow-hidden">
                        <img
                                src={getFirstImage(appointment)}
                                alt="Bild"
                                class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div class="p-4 space-y-1">
                        <h2 class="font-semibold text-gray-900 group-hover:text-blue-700 transition line-clamp-2">
                            {appointment.title}
                        </h2>
                        <p class="text-sm text-gray-500">
                            {fmtDateRange(appointment.date, appointment.end_date)}
                        </p>
                    </div>
                </a>
            {/each}
        </div>
    {:else}
        <p class="text-center text-gray-500">Keine Einträge gefunden.</p>
    {/if}
</section>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>

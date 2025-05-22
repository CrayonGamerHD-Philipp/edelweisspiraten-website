<svelte:head>
    <title>Stamm Edelweißpiraten – Sippe</title>
</svelte:head>

<script>
    import termine from '$lib/data/sippe-termine.json';

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('de-DE', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
</script>

<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">
    <div class="bg-white border border-gray-300 p-8 w-full">
        <h2 class="text-2xl font-bold text-green-700">Sippe</h2>
        <p class="text-gray-700 mt-2">Gruppenname</p>
        <p class="text-sm text-gray-500">Die Goldenen Löwenzähne</p>
        <p class="text-gray-700 mt-2">Gruppenleiter</p>
        <p class="text-sm text-gray-500">Melina und Sebastian</p>
        <p class="text-gray-700 mt-2">Urzeit</p>
        <p class="text-sm text-gray-500">Freitags 16:30 Uhr - 18:00 Uhr</p>
        <p class="text-gray-700 mt-2">Ort</p>
        <p class="text-sm text-gray-500">Evangelische Auferstehungsgemeinde Bremen-Hastedt</p>
        <p class="text-gray-700 mt-2">Alter</p>
        <p class="text-sm text-gray-500">10 - 14 Jahre</p>
    </div>

    <h2 class="text-3xl font-bold text-gray-800 mb-6">Das sind wir</h2>
    <p>....</p>

    <h2 class="text-3xl font-bold text-gray-800 mb-6">Termine</h2>
    <div class="bg-white border border-gray-300 p-8 w-full">
        <div class="space-y-4">
            {#each termine as termin}
                <div class="border p-4 rounded shadow hover:shadow-md transition border-green-700">
                    <p class="text-gray-600 font-medium">
                        {#if termin.end}
                            {formatDate(termin.start)} – {formatDate(termin.end)}
                        {:else}
                            {formatDate(termin.start)}
                        {/if}
                    </p>
                    <h3 class="text-lg font-semibold">{termin.title}</h3>
                    <p class="text-sm text-gray-500">{termin.location}</p>
                </div>
            {/each}
        </div>
    </div>
</section>
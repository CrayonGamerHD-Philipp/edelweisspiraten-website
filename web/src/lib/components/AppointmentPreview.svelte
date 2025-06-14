<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import PocketBase from 'pocketbase';

    export let gruppe: string;

    let upcoming = [];
    let tagId = '';
    const now = new Date();

    onMount(async () => {
        const pb = new PocketBase('https://backend.edelweißpiraten.de');

        // Tag-ID zur Gruppe finden
        const tags = await pb.collection('tags').getFullList();
        tagId = tags.find(t => t.name.toLowerCase() === gruppe?.toLowerCase())?.id;

        if (!tagId) return;

        const events = await pb.collection('appointments').getFullList({
            sort: 'date',
            expand: 'tags'
        });

        upcoming = events
            .filter(e =>
                new Date(e.date) >= now &&
                e.tags.includes(tagId)
            )
            .slice(0, 3);
    });

    function openFullView() {
        const year = new Date().getFullYear();
        goto(`/termine?tags=${gruppe}&year=${year}`);
    }
</script>

<section class="bg-white border border-gray-300 p-5 w-full">
    <h2 class="text-lg font-bold mb-4">Nächste Termine der {gruppe.charAt(0).toUpperCase() + gruppe.slice(1)}</h2>

    {#if upcoming.length > 0}
        <ul class="space-y-3">
            {#each upcoming as e}
                <li class="border rounded p-1 bg-gray-50 p-2">
                    <h3 class="font-semibold">{e.title}</h3>
                    <p>{e.description}</p>
                    <p class="text-sm text-gray-500">
                        {new Date(e.date).toLocaleDateString()}
                    </p>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="text-gray-500">Keine anstehenden Termine.</p>
    {/if}

    <button
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            on:click={openFullView}
    >
        Alle Termine der {gruppe.charAt(0).toUpperCase() + gruppe.slice(1)}
    </button>
</section>

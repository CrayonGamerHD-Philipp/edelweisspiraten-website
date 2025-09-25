<script lang="ts">
    import Lightbox from '$lib/components/Lightbox.svelte';
    import Share from '$lib/components/Share.svelte';
    import { page as pageStore } from '$app/stores';

    export let data: {
        appointment: any;
        firstImage: string | null;
        pageUrl: string;
    };

    const { appointment, firstImage, pageUrl } = data;

    let selectedIndex: number | null = null;
    let shareOpen = false;

    const backendUrl = 'https://backend.edelweißpiraten.de';
</script>

<svelte:head>
    <!-- Grundlegendes -->
    <title>{appointment?.title ?? 'Galerie'}</title>
    <meta name="description" content={appointment?.description ?? 'Bildergalerie'} />

    <!-- Open Graph -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content={`Bilder von ${appointment?.title ?? 'unserer Aktion'}`} />
    <meta property="og:description" content={appointment?.description ?? ''} />
    <meta property="og:url" content={pageUrl} />
    {#if firstImage}
        <meta property="og:image" content={firstImage} />
        <meta property="og:image:alt" content={`Vorschaubild: ${appointment.title}`} />
    {/if}

    <meta name="twitter:card" content={firstImage ? 'summary_large_image' : 'summary'} />
    <meta name="twitter:title" content={`Bilder von ${appointment?.title ?? 'unserer Aktion'}`} />
    <meta name="twitter:description" content={appointment?.description ?? ''} />
    {#if firstImage}
        <meta name="twitter:image" content={firstImage} />
    {/if}
</svelte:head>

<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">
    {#if appointment}
        <div class="flex items-center justify-between">
            <a href="/galerie" class="text-sm text-blue-600 hover:underline flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>
                Zurück
            </a>

            <button class="text-sm text-blue-600 hover:underline flex items-center gap-1" on:click={() => shareOpen = true}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                </svg>
                Teilen
            </button>
        </div>

        <h1 class="text-2xl font-bold mb-2">{appointment.title}</h1>
        <p class="text-gray-500 mb-4">
            {new Date(appointment.date).toLocaleDateString()}
            {#if appointment.end_date}
                – {new Date(appointment.end_date).toLocaleDateString()}
            {/if}
        </p>
        <p class="mb-6">{appointment.description}</p>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            {#each appointment.pictures as pic, i}
                <img
                        src={`${backendUrl}/api/files/appointments/${appointment.id}/${pic}`}
                        alt="Bild"
                        class="rounded shadow cursor-zoom-in object-cover h-48 w-full"
                        on:click={() => selectedIndex = i}
                />
            {/each}
        </div>

        {#if selectedIndex !== null}
            <Lightbox
                    images={appointment.pictures.map(p => `${backendUrl}/api/files/appointments/${appointment.id}/${p}`)}
                    index={selectedIndex}
                    on:close={() => selectedIndex = null}
            />
        {/if}

        <Share
                url={pageUrl}
                title={`Bilder von ${appointment.title}`}
                whatsappMessage={`Schau dir die Bilder von der Aktion ${appointment.title} an: ${pageUrl}`}
                open={shareOpen}
                onClose={() => shareOpen = false}
        />
    {/if}
</section>

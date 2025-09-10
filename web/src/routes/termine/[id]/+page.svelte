<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    const a = data.appointment;


    function fmtDateRange(startStr: string, endStr?: string | null) {
        const start = new Date(startStr);
        const hasEnd = !!endStr;
        const end = hasEnd ? new Date(endStr as string) : null;


        const fmtFull = new Intl.DateTimeFormat('de-DE', {
            weekday: 'short', day: '2-digit', month: 'long', year: 'numeric'
        });
        const fmtShort = new Intl.DateTimeFormat('de-DE', {
            day: '2-digit', month: 'long', year: 'numeric'
        });


        if (hasEnd && end) {
            if (start.toDateString() === end.toDateString()) return fmtFull.format(start);
            if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
                return `${start.getDate().toString().padStart(2,'0')}.–${fmtShort.format(end)}`;
            }
            return `${fmtFull.format(start)} – ${fmtFull.format(end)}`;
        }
        return fmtFull.format(start);
    }


    function fileUrl(file: string) {
        return `https://backend.edelweißpiraten.de/api/files/appointments/${a.id}/${file}`;
    }


    function getTextColor(bg?: string | null) {
        if (!bg) return '#1f2937';
        const m = bg.trim().match(/^#?([\da-f]{6})$/i);
        if (!m) return '#111827';
        const hex = m[1];
        const r = parseInt(hex.slice(0, 2), 16) / 255;
        const g = parseInt(hex.slice(2, 4), 16) / 255;
        const b = parseInt(hex.slice(4, 6), 16) / 255;
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return lum > 0.6 ? '#111827' : '#ffffff';
    }


    let lightboxOpen = false;
    let lightboxIndex = 0;
    function openLightbox(i: number) { lightboxIndex = i; lightboxOpen = true; }
    function closeLightbox() { lightboxOpen = false; }
    function prev() { if (!a.pictures?.length) return; lightboxIndex = (lightboxIndex - 1 + a.pictures.length) % a.pictures.length; }
    function next() { if (!a.pictures?.length) return; lightboxIndex = (lightboxIndex + 1) % a.pictures.length; }
</script>


<svelte:head>
    <title>{a.title} – Termine</title>
    <meta name="description" content={a.description?.slice(0, 150) || 'Termin'} />
</svelte:head>


<section class="max-w-5xl mx-auto px-6 py-8">
    <button class="text-sm text-blue-700 hover:underline mb-4" on:click={() => history.back()}>
        ← Zurück
    </button>


    <div class="w-full border border-gray-200 bg-white p-6">
        <h1 class="text-2xl font-bold mb-1">{a.title}</h1>
        <p class="text-sm text-gray-600 mb-3">{fmtDateRange(a.date, a.end_date)}</p>


        {#if a.expand?.tags?.length}
            <div class="flex flex-wrap gap-2 mb-4">
                {#each a.expand.tags as t}
<span
        class="inline-flex items-center px-2 py-0.5 text-xs font-medium"
        style={`background-color: ${t.color || '#e5e7eb'}; color: ${getTextColor(t.color)}`}
>
{t.name}
</span>
                {/each}
            </div>
        {/if}


        {#if a.description}
            <p class="text-gray-800 leading-relaxed whitespace-pre-line">{a.description}</p>
        {/if}


        {#if a.pictures?.length}
            <div class="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                {#each a.pictures as pic, i}
                    <img src={fileUrl(pic)} alt="Bild" class="w-full h-40 md:h-48 object-cover cursor-zoom-in border border-gray-200"
                         on:click={() => openLightbox(i)} />
                {/each}
            </div>
        {/if}
    </div>
</section>


{#if lightboxOpen}
    <div class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <button class="absolute top-4 right-6 text-white text-4xl" on:click={closeLightbox}>×</button>
        <button class="absolute left-4 text-white text-4xl" on:click={prev}>‹</button>
        <img src={fileUrl(a.pictures[lightboxIndex])} class="max-w-[92vw] max-h-[90vh] object-contain" alt="Bild groß" />
        <button class="absolute right-4 text-white text-4xl" on:click={next}>›</button>
    </div>
{/if}
<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import PocketBase from 'pocketbase';

    export let gruppe: string;

    type Tag = { id: string; name: string; color?: string };
    type Appointment = {
        id: string;
        title: string;
        description?: string;
        date: string;
        end_date?: string | null;
        tags: string[];
        expand?: { tags?: Tag[] };
    };

    let upcoming: Appointment[] = [];
    let tagId = '';
    let loading = true;
    let error = '';

    const now = new Date();

    onMount(async () => {
        try {
            const pb = new PocketBase('https://backend.edelweißpiraten.de');

            const tags = (await pb.collection('tags').getFullList()) as Tag[];
            tagId = tags.find((t) => t.name.toLowerCase() === gruppe?.toLowerCase())?.id || '';

            if (!tagId) {
                loading = false;
                return;
            }

            const events = (await pb.collection('appointments').getFullList({
                sort: 'date',
                expand: 'tags'
            })) as Appointment[];

            upcoming = events
                .filter((e) => new Date(e.date) >= now && e.tags.includes(tagId))
                .slice(0, 3);
        } catch (e) {
            error = 'Termine konnten nicht geladen werden.';
            console.error(e);
        } finally {
            loading = false;
        }
    });

    function openFullView() {
        const year = new Date().getFullYear();
        goto(`/termine?tags=${gruppe}&year=${year}`);
    }

    function openAppointment(id: string) {
        goto(`/termine/${id}`);
    }

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

    function getTextColor(bg?: string) {
        if (!bg) return '#1f2937';
        const m = bg.trim().match(/^#?([\da-f]{6})$/i);
        if (!m) return '#fff';
        const hex = m[1];
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#111' : '#fff';
    }
</script>

<section class="w-full border border-gray-200 bg-white p-5">
    <header class="mb-4 flex items-center justify-between gap-3">
        <h2 class="text-xl font-semibold tracking-tight">
            <span class="mr-2 inline-block">📅</span>
            Nächste Termine der {gruppe.charAt(0).toUpperCase() + gruppe.slice(1)}
        </h2>
        <button
                class="hidden sm:inline-flex items-center gap-2 rounded border border-blue-600 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50 active:bg-blue-100 transition"
                on:click={openFullView}
                aria-label="Alle Termine anzeigen"
        >
            Alle Termine
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M13.5 4.5 21 12l-7.5 7.5m-9-15L12 12l-7.5 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
    </header>

    {#if loading}
        <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {#each Array(3) as _}
                <li class="animate-pulse border border-gray-200 bg-gray-50 p-4">
                    <div class="mb-3 h-5 w-2/3 rounded bg-gray-200"></div>
                    <div class="mb-2 h-4 w-full rounded bg-gray-200"></div>
                    <div class="mb-4 h-4 w-5/6 rounded bg-gray-200"></div>
                    <div class="h-6 w-32 rounded-full bg-gray-200"></div>
                </li>
            {/each}
        </ul>
    {:else if error}
        <div class="border border-red-200 bg-red-50 p-4 text-red-800">
            {error}
        </div>
    {:else}
        {#if upcoming.length > 0}
            <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {#each upcoming as e}
                    <li class="group border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                        on:click={() => openAppointment(e.id)}>
                        <h3 class="mb-1 line-clamp-2 text-base font-semibold text-gray-900">{e.title}</h3>
                        {#if e.description}
                            <p class="mb-3 line-clamp-3 text-sm leading-relaxed text-gray-600">{e.description}</p>
                        {/if}

                        <div class="flex flex-wrap items-center gap-2">
                            <time datetime={e.date} class="inline-flex items-center rounded-full border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-700">
                                {fmtDateRange(e.date, e.end_date)}
                            </time>

                            {#if e.expand?.tags}
                                {#each e.expand.tags as t}
                  <span class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium shadow"
                        style="background-color: {t.color || '#999'}; color: {getTextColor(t.color)}">
                    {t.name}
                  </span>
                                {/each}
                            {/if}
                        </div>
                    </li>
                {/each}
            </ul>
        {:else}
            <p class="border border-dashed border-gray-300 bg-gray-50 p-4 text-gray-600">
                Keine anstehenden Termine.
            </p>
        {/if}
    {/if}

    <div class="mt-4">
        <button
                class="inline-flex w-full items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 active:bg-blue-800 sm:hidden"
                on:click={openFullView}
        >
            Alle Termine der {gruppe.charAt(0).toUpperCase() + gruppe.slice(1)}
        </button>
    </div>
</section>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>

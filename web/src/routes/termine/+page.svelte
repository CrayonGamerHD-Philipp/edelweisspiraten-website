<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    export let data;
    const usedTagIds = new Set(data.appointments.flatMap(a => a.tags));

    let selectedYear = '';
    let selectedTags: string[] = [];
    let dropdownOpen = false;

    let currentPage = 1;
    let itemsPerPage = 12;
    let columns = 3;

    let filtersInitialized = false;
    let goto: typeof import('$app/navigation').goto;

    // Dynamischen goto-Import nur im Browser
    if (browser) {
        import('$app/navigation').then(mod => {
            goto = mod.goto;
        });
    }

    // URL einmalig auslesen & in IDs umwandeln
    $: if (!filtersInitialized && data?.tags && browser) {
        const url = $page.url;
        const yearParam = url.searchParams.get('year');
        const tagParam = url.searchParams.getAll('tags');

        if (yearParam) {
            selectedYear = yearParam;
        }

        if (tagParam.length > 0) {
            const lowerParam = tagParam.map(t => t.toLowerCase());
            selectedTags = data.tags
                .filter(t => lowerParam.includes(t.name.toLowerCase()))
                .map(t => t.id);
        }

        filtersInitialized = true;
    }

    function updateUrl() {
        if (!browser || !goto) return;

        const params = new URLSearchParams();

        if (selectedYear) {
            params.set('year', selectedYear);
        }

        for (const id of selectedTags) {
            const tag = data.tags.find(t => t.id === id);
            if (tag) {
                params.append('tags', tag.name);
            }
        }

        const query = params.toString();
        goto(`/termine${query ? '?' + query : ''}`, {
            replaceState: true,
            keepfocus: true,
            noscroll: true
        });
    }

    function toggleTag(id: string) {
        if (selectedTags.includes(id)) {
            selectedTags = selectedTags.filter(t => t !== id);
        } else {
            selectedTags = [...selectedTags, id];
        }
        currentPage = 1;
        updateUrl();
    }

    // Jahr-Auswahl reagiert automatisch
    $: if (filtersInitialized && browser) {
        updateUrl();
    }

    function resetFilters() {
        selectedTags = [];
        selectedYear = '';
        currentPage = 1;
        updateUrl();
    }

    function closeDropdown() {
        dropdownOpen = false;
    }

    function handleClickOutside(event: MouseEvent) {
        const dropdown = document.getElementById('tag-dropdown');
        if (dropdown && !dropdown.contains(event.target as Node)) {
            closeDropdown();
        }
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('resize', updateColumns);
        };
    });

    function updateColumns() {
        const width = window.innerWidth;
        if (width >= 1024) {
            columns = 3;
        } else if (width >= 768) {
            columns = 2;
        } else {
            columns = 1;
        }
        itemsPerPage = columns * 4;
    }

    $: filteredAppointments = data.appointments.filter(a =>
        (selectedTags.length === 0 || selectedTags.some(t => a.tags.includes(t))) &&
        (!selectedYear || new Date(a.date).getFullYear().toString() === selectedYear)
    );

    $: totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
    $: paginatedAppointments = filteredAppointments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
</script>


<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">
    <h1 class="text-2xl font-bold">Termine</h1>

    <!-- Filter -->
    <div class="flex flex-wrap gap-4 items-center">
        <!-- Jahr Dropdown -->
        <select bind:value={selectedYear} class="border rounded h-10 min-w-[12rem] p-2 border-gray-300">
            <option value="">Alle Jahre</option>
            {#each data.years as year}
                <option value={year.toString()}>{year}</option>
            {/each}
        </select>

        <!-- Tags Dropdown mit Checkboxen -->
        <div class="relative inline-block h-10 min-w-[12rem] border-gray-300" id="tag-dropdown">
            <button
                    class="border rounded px-4 py-2 bg-white border-gray-300"
                    on:click={() => dropdownOpen = !dropdownOpen}
            >
                {selectedTags.length > 0
                    ? `${selectedTags.length} Gruppe(n) gewählt`
                    : 'Gruppen auswählen'}
            </button>

            {#if dropdownOpen}
                <div class="absolute z-10 mt-2 w-56 bg-white border rounded shadow-md max-h-60 overflow-auto border-gray-300">
                    {#each data.tags.filter(tag => usedTagIds.has(tag.id)) as tag}
                        <label class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <input
                                    type="checkbox"
                                    class="mr-2"
                                    checked={selectedTags.includes(tag.id)}
                                    on:change={() => toggleTag(tag.id)}
                            />
                            <span>{tag.name}</span>
                        </label>
                    {/each}
                </div>
            {/if}
        </div>

        <button
                class="text-sm underline text-gray-600 hover:text-blue-800 ml-1 mt-1"
                on:click={resetFilters}
        >
            Filter zurücksetzen
        </button>
    </div>

    <!-- Termine -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each paginatedAppointments as appointment}
            <div class="bg-white border border-gray-300 p-4">
                <h2 class="text-xl font-semibold">{appointment.title}</h2>

                <p class="text-sm text-gray-500 mb-2">
                    {new Date(appointment.date).toLocaleDateString()}
                    {#if appointment.end_date}
                        &nbsp;–&nbsp;{new Date(appointment.end_date).toLocaleDateString()}
                    {/if}
                </p>

                <p class="mb-2">{appointment.description}</p>

                <div class="flex flex-wrap gap-2 mt-2">
                    {#each appointment.expand?.tags as tag}
            <span
                    class="px-2 py-1 rounded text-xs font-medium opacity-75 shadow-md"
                    style="background-color: {tag.color || '#999'}; color: white;"
            >
              {tag.name}
            </span>
                    {/each}
                </div>
            </div>
        {/each}
    </div>

    <!-- Pagination -->
    {#if totalPages > 1}
        <div class="flex justify-center gap-2 mt-6">
            <button
                    on:click={() => currentPage = Math.max(currentPage - 1, 1)}
                    class="px-3 py-1 border rounded"
                    disabled={currentPage === 1}
            >
                ◀
            </button>

            {#each Array(totalPages).fill(0).map((_, i) => i + 1) as page}
                <button
                        on:click={() => currentPage = page}
                        class="px-3 py-1 border rounded {currentPage === page ? 'bg-blue-500 text-white' : ''}"
                >
                    {page}
                </button>
            {/each}

            <button
                    on:click={() => currentPage = Math.min(currentPage + 1, totalPages)}
                    class="px-3 py-1 border rounded"
                    disabled={currentPage === totalPages}
            >
                ▶
            </button>
        </div>
    {/if}
</section>

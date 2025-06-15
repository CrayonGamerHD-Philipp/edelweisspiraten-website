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
    let selectedAppointment: any = null;

    let lightboxOpen = false;
    let lightboxImageIndex = 0;

    let touchStartX = 0;
    let touchEndX = 0;

    let goto: typeof import('$app/navigation').goto;

    if (browser) {
        import('$app/navigation').then(mod => {
            goto = mod.goto;
        });
    }

    $: if (!filtersInitialized && data?.tags && browser) {
        const url = $page.url;
        const yearParam = url.searchParams.get('year');
        const tagParam = url.searchParams.getAll('tags');

        if (yearParam) selectedYear = yearParam;
        else selectedYear = new Date().getFullYear().toString();

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

        if (selectedYear) params.set('year', selectedYear);

        for (const id of selectedTags) {
            const tag = data.tags.find(t => t.id === id);
            if (tag) params.append('tags', tag.name);
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

    $: if (filtersInitialized && browser) updateUrl();

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

    function openAppointmentDetails(appointment: any) {
        selectedAppointment = appointment;
    }

    function closeDetailsPopup() {
        selectedAppointment = null;
        lightboxOpen = false;
    }

    function handleOverlayClick(event: MouseEvent) {
        const modal = document.getElementById('appointment-popup');
        if (modal && !modal.contains(event.target as Node)) {
            closeDetailsPopup();
        }
    }

    function openLightbox(index: number) {
        lightboxImageIndex = index;
        lightboxOpen = true;
    }

    function closeLightbox() {
        lightboxOpen = false;
    }

    function nextImage() {
        if (!selectedAppointment?.pictures?.length) return;
        lightboxImageIndex = (lightboxImageIndex + 1) % selectedAppointment.pictures.length;
    }

    function prevImage() {
        if (!selectedAppointment?.pictures?.length) return;
        lightboxImageIndex = (lightboxImageIndex - 1 + selectedAppointment.pictures.length) % selectedAppointment.pictures.length;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (!lightboxOpen) return;
        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'ArrowLeft') prevImage();
        if (event.key === 'ArrowRight') nextImage();
    }

    function handleTouchStart(event: TouchEvent) {
        touchStartX = event.changedTouches[0].screenX;
    }

    function handleTouchEnd(event: TouchEvent) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextImage();
            else prevImage();
        }
    }

    function scrollToNextUpcoming() {
        const cards = document.querySelectorAll('[data-date]');
        const now = new Date();
        for (const el of cards) {
            const date = new Date(el.getAttribute('data-date') || '');
            if (date >= now) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                break;
            }
        }
    }

    function findPageOfNextAppointment() {
        const now = new Date();
        const index = filteredAppointments.findIndex(a => new Date(a.date) >= now);
        if (index >= 0) {
            currentPage = Math.floor(index / itemsPerPage) + 1;
        }
    }

    function updateColumns() {
        const width = window.innerWidth;
        columns = width >= 1024 ? 3 : width >= 768 ? 2 : 1;
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

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleKeydown);
        updateColumns();
        window.addEventListener('resize', updateColumns);
        findPageOfNextAppointment();
        setTimeout(scrollToNextUpcoming, 500);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('resize', updateColumns);
        };
    });
</script>


<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">
    <h1 class="text-2xl font-bold">Termine</h1>

    <!-- Filter -->
    <div class="flex flex-wrap gap-4 items-center">
        <select bind:value={selectedYear} class="border rounded h-10 min-w-[12rem] p-2 border-gray-300">
            <option value="">Alle Jahre</option>
            {#each data.years as year}
                <option value={year.toString()}>{year}</option>
            {/each}
        </select>

        <div class="relative inline-block h-10 min-w-[12rem] border-gray-300" id="tag-dropdown">
            <button class="border rounded px-4 py-2 bg-white border-gray-300" on:click={() => dropdownOpen = !dropdownOpen}>
                {selectedTags.length > 0 ? `${selectedTags.length} Gruppe(n) gewählt` : 'Gruppen auswählen'}
            </button>

            {#if dropdownOpen}
                <div class="absolute z-10 mt-2 w-56 bg-white border rounded shadow-md max-h-60 overflow-auto border-gray-300">
                    {#each data.tags.filter(tag => usedTagIds.has(tag.id)) as tag}
                        <label class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" class="mr-2" checked={selectedTags.includes(tag.id)} on:change={() => toggleTag(tag.id)} />
                            <span>{tag.name}</span>
                        </label>
                    {/each}
                </div>
            {/if}
        </div>

        <button class="text-sm underline text-gray-600 hover:text-blue-800 ml-1 mt-1" on:click={resetFilters}>
            Filter zurücksetzen
        </button>
    </div>

    <!-- Termin-Karten -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each paginatedAppointments as appointment}
            <div
                    data-date={appointment.date}
                    class="bg-white border border-gray-300 p-4 hover:shadow cursor-pointer transition-opacity duration-300"
                    class:opacity-50={new Date(appointment.date) < new Date()}
                    on:click={() => openAppointmentDetails(appointment)}
            >
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
                    <span class="px-2 py-1 rounded text-xs font-medium opacity-75 shadow-md" style="background-color: {tag.color || '#999'}; color: white;">
                        {tag.name}
                    </span>
                    {/each}
                </div>
            </div>
        {/each}
    </div>

    <!-- Termin-Detail-Popup -->
    {#if selectedAppointment}
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" on:click={handleOverlayClick}>
            <div id="appointment-popup" class="bg-white max-w-2xl w-[95%] max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative" on:click|stopPropagation>
                <button class="absolute top-3 right-4 text-gray-700 hover:text-red-600 text-3xl font-bold" on:click={closeDetailsPopup}>×</button>

                <h2 class="text-2xl font-bold mb-2">{selectedAppointment.title}</h2>
                <p class="text-sm text-gray-500 mb-2">
                    {new Date(selectedAppointment.date).toLocaleDateString()}
                    {#if selectedAppointment.end_date}
                        &nbsp;–&nbsp;{new Date(selectedAppointment.end_date).toLocaleDateString()}
                    {/if}
                </p>
                <p class="mb-4">{selectedAppointment.description}</p>

                <div class="flex flex-wrap gap-2 mb-4">
                    {#each selectedAppointment.expand?.tags ?? [] as tag}
                        <span class="px-2 py-1 rounded text-xs font-medium opacity-75 shadow-md" style="background-color: {tag.color || '#999'}; color: white;">
                            {tag.name}
                        </span>
                    {/each}
                </div>

                {#if selectedAppointment.pictures?.length}
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {#each selectedAppointment.pictures as pic, i}
                            <img
                                    src={`https://backend.edelweißpiraten.de/api/files/appointments/${selectedAppointment.id}/${pic}`}
                                    alt="Bild"
                                    class="rounded shadow object-cover w-full h-48 cursor-zoom-in"
                                    on:click={() => openLightbox(i)}
                            />
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    {/if}

    <!-- Lightbox mit Pfeilen + Touch -->
    {#if lightboxOpen}
        <div
                class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-60"
                on:touchstart={handleTouchStart}
                on:touchend={handleTouchEnd}
        >
            <button
                    class="absolute top-4 right-6 text-white font-bold text-4xl sm:text-5xl md:text-6xl"
                    on:click={closeLightbox}
            >×</button>

            <button
                    class="absolute left-4 text-white text-4xl sm:text-5xl md:text-6xl"
                    on:click={prevImage}
            >‹</button>

            <img
                    src={`https://backend.edelweißpiraten.de/api/files/appointments/${selectedAppointment.id}/${selectedAppointment.pictures[lightboxImageIndex]}`}
                    class="max-w-[90vw] max-h-[90vh] object-contain rounded"
            />

            <button
                    class="absolute right-4 text-white text-4xl sm:text-5xl md:text-6xl"
                    on:click={nextImage}
            >›</button>
        </div>
    {/if}

    <!-- Pagination -->
    {#if totalPages > 1}
        <div class="flex justify-center gap-2 mt-6">
            <button on:click={() => currentPage = Math.max(currentPage - 1, 1)} class="px-3 py-1 border rounded" disabled={currentPage === 1}>◀</button>
            {#each Array(totalPages).fill(0).map((_, i) => i + 1) as page}
                <button on:click={() => currentPage = page} class="px-3 py-1 border rounded {currentPage === page ? 'bg-blue-500 text-white' : ''}">{page}</button>
            {/each}
            <button on:click={() => currentPage = Math.min(currentPage + 1, totalPages)} class="px-3 py-1 border rounded" disabled={currentPage === totalPages}>▶</button>
        </div>
    {/if}
</section>

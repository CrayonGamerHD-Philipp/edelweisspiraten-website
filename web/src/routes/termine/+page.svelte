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

    // --- Helpers ---
    function fmtDateRange(startStr: string, endStr?: string | null) {
        const s = new Date(startStr);
        const e = endStr ? new Date(endStr) : null;

        const full = new Intl.DateTimeFormat('de-DE', {
            weekday: 'short', day: '2-digit', month: 'long', year: 'numeric'
        });
        const shortDMY = new Intl.DateTimeFormat('de-DE', {
            day: '2-digit', month: 'long', year: 'numeric'
        });

        if (e) {
            if (s.toDateString() === e.toDateString()) return full.format(s);
            if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
                const d = String(s.getDate()).padStart(2, '0');
                return `${d}.–${shortDMY.format(e)}`;
            }
            return `${full.format(s)} – ${full.format(e)}`;
        }
        return full.format(s);
    }

    function getTextColor(bg?: string | null) {
        if (!bg) return '#1f2937';
        const m = bg.trim().match(/^#?([\da-f]{6})$/i);
        if (!m) return '#1f2937';
        const hex = m[1];
        const r = parseInt(hex.slice(0,2),16)/255;
        const g = parseInt(hex.slice(2,4),16)/255;
        const b = parseInt(hex.slice(4,6),16)/255;
        const lum = 0.2126*r + 0.7152*g + 0.0722*b;
        return lum > 0.6 ? '#111827' : '#ffffff';
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
        if (event.key === 'Escape') {
            closeLightbox();
            closeDetailsPopup();
            closeDropdown();
        }
        if (!lightboxOpen) return;
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

<section class="max-w-6xl mx-auto px-6 py-12 space-y-6">
    <header class="flex items-center justify-between gap-3 flex-wrap">
        <h1 class="text-2xl font-bold">Termine</h1>

        <!-- Filter -->
        <div class="flex flex-wrap gap-3 items-center">
            <select bind:value={selectedYear} class="border border-gray-300 px-3 py-2 text-sm">
                <option value="">Alle Jahre</option>
                {#each data.years as year}
                    <option value={year.toString()}>{year}</option>
                {/each}
            </select>

            <div class="relative inline-block" id="tag-dropdown">
                <button
                        class="border border-gray-300 px-3 py-2 text-sm bg-white"
                        aria-haspopup="listbox"
                        aria-expanded={dropdownOpen}
                        on:click={() => dropdownOpen = !dropdownOpen}
                >
                    {selectedTags.length > 0 ? `${selectedTags.length} Gruppe(n)` : 'Gruppen auswählen'}
                </button>

                {#if dropdownOpen}
                    <div
                            class="absolute right-0 z-10 mt-2 w-56 bg-white border border-gray-300 shadow-md max-h-60 overflow-auto"
                            role="listbox"
                    >
                        {#each data.tags.filter(tag => usedTagIds.has(tag.id)) as tag}
                            <label class="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm">
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

            <button class="text-sm underline text-gray-600 hover:text-blue-800"
                    on:click={resetFilters}>
                Filter zurücksetzen
            </button>
        </div>
    </header>

    <!-- Termin-Karten -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each paginatedAppointments as appointment}
            <div
                    data-date={appointment.date}
                    class="bg-white border border-gray-200 p-4 transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                    class:opacity-50={new Date(appointment.date) < new Date()}
                    on:click={() => openAppointmentDetails(appointment)}
            >
                <h2 class="text-lg font-semibold text-gray-900">{appointment.title}</h2>
                <p class="text-sm text-gray-500 mb-2">
                    {fmtDateRange(appointment.date, appointment.end_date)}
                </p>
                {#if appointment.description}
                    <p class="mb-2 text-gray-700 line-clamp-3">{appointment.description}</p>
                {/if}
                <div class="flex flex-wrap gap-2 mt-2">
                    {#each appointment.expand?.tags as tag}
                        <span
                                class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                                style="background-color: {tag.color || '#e5e7eb'}; color: {getTextColor(tag.color)}; border: 1px solid {tag.color || '#e5e7eb'};"
                                title={tag.name}
                        >
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
            <div id="appointment-popup" class="bg-white w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto p-6 border border-gray-200 relative" on:click|stopPropagation>
                <button class="absolute top-3 right-4 text-gray-700 hover:text-red-600 text-3xl font-bold" on:click={closeDetailsPopup}>×</button>

                <h2 class="text-2xl font-bold mb-2">{selectedAppointment.title}</h2>
                <p class="text-sm text-gray-500 mb-3">
                    {fmtDateRange(selectedAppointment.date, selectedAppointment.end_date)}
                </p>

                {#if selectedAppointment.expand?.tags?.length}
                    <div class="flex flex-wrap gap-2 mb-4">
                        {#each selectedAppointment.expand.tags as tag}
                            <span
                                    class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
                                    style="background-color: {tag.color || '#e5e7eb'}; color: {getTextColor(tag.color)}; border: 1px solid {tag.color || '#e5e7eb'};"
                            >
                                {tag.name}
                            </span>
                        {/each}
                    </div>
                {/if}

                {#if selectedAppointment.description}
                    <p class="mb-4 text-gray-800 whitespace-pre-line">{selectedAppointment.description}</p>
                {/if}

                {#if selectedAppointment.pictures?.length}
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {#each selectedAppointment.pictures as pic, i}
                            <img
                                    src={`https://backend.edelweißpiraten.de/api/files/appointments/${selectedAppointment.id}/${pic}`}
                                    alt="Bild"
                                    class="border border-gray-200 object-cover w-full h-48 cursor-zoom-in"
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
                    class="max-w-[90vw] max-h-[90vh] object-contain"
                    alt="Bild groß"
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
            <button on:click={() => currentPage = Math.max(currentPage - 1, 1)} class="px-3 py-1 border text-sm" disabled={currentPage === 1}>◀</button>
            {#each Array(totalPages).fill(0).map((_, i) => i + 1) as page}
                <button
                        on:click={() => currentPage = page}
                        class="px-3 py-1 border text-sm {currentPage === page ? 'bg-blue-600 text-white' : 'bg-white'}"
                >{page}</button>
            {/each}
            <button on:click={() => currentPage = Math.min(currentPage + 1, totalPages)} class="px-3 py-1 border text-sm" disabled={currentPage === totalPages}>▶</button>
        </div>
    {/if}
</section>

<style>
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
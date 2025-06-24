<script lang="ts">
    export let images: string[];
    export let index: number;

    let current = index;
    let touchStartX = 0;
    let touchEndX = 0;

    import { onMount, onDestroy } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    function next() {
        current = (current + 1) % images.length;
    }

    function prev() {
        current = (current - 1 + images.length) % images.length;
    }

    function handleKey(event: KeyboardEvent) {
        if (event.key === 'Escape') dispatch('close');
        if (event.key === 'ArrowRight') next();
        if (event.key === 'ArrowLeft') prev();
    }

    function handleTouchStart(event: TouchEvent) {
        touchStartX = event.changedTouches[0].screenX;
    }

    function handleTouchEnd(event: TouchEvent) {
        touchEndX = event.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) next();
            else prev();
        }
    }

    onMount(() => {
        document.addEventListener('keydown', handleKey);
    });

    onDestroy(() => {
        document.removeEventListener('keydown', handleKey);
    });
</script>

<div
        class="fixed inset-0 bg-black flex items-center justify-center z-50"
        on:touchstart={handleTouchStart}
        on:touchend={handleTouchEnd}
>
    <!-- Close Button -->
    <button class="absolute top-4 right-6 text-white font-bold text-4xl sm:text-5xl md:text-6xl" on:click={() => dispatch('close')}>×</button>

    <!-- Prev Button -->
    <button class="absolute left-4 text-white text-4xl sm:text-5xl md:text-6xl" on:click={prev}>‹</button>

    <!-- Image -->
    <img src={images[current]} class="max-w-[90vw] max-h-[90vh] object-contain rounded" />

    <!-- Next Button -->
    <button class="absolute right-4 text-white text-4xl sm:text-5xl md:text-6xl" on:click={next}>›</button>
</div>

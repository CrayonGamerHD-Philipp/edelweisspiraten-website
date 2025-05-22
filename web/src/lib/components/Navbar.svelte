<script>
    let open = false;
</script>

<nav class="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <a href="/" class="text-xl font-extrabold text-blue-600">Edelweipiraten</a>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex gap-6 items-center">
                <a href="/meute" class="nav-link">Meute</a>
                <a href="/sippe" class="nav-link">Sippe</a>
                <a href="/faq" class="nav-link">FAQ</a>
                <a href="/kontakt" class="nav-link">Kontakt</a>
            </div>

            <!-- Mobile Toggle Button -->
            <div class="md:hidden">
                <button on:click={() => (open = !open)} class="text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Navigation -->
    {#if open}
        <div class="md:hidden px-4 pb-4 bg-white border-t border-gray-200 space-y-2">
            <a href="/meute" class="mobile-link">Meute</a>
            <a href="/sippe" class="mobile-link">Sippe</a>
            <a href="/faq" class="mobile-link">FAQ</a>
            <a href="/kontakt" class="mobile-link">Kontakt</a>
        </div>
    {/if}

    <style>
        .nav-link {
            @apply text-gray-700 hover:text-blue-600 font-medium transition;
        }

        .mobile-link {
            @apply block text-gray-700 hover:text-blue-600 font-medium;
        }
    </style>
</nav>

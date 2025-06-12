<script>
    let open = false;
    let sippeOpen = false;

    const toggleSippe = () => {
        sippeOpen = !sippeOpen;
    };
</script>

<nav class="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <a href="/" class="text-xl font-extrabold text-indigo-900">Edelweißpiraten</a>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex gap-6 items-center relative">
                <a href="/meute" class="nav-link">Meute</a>

                <!-- Dropdown Trigger -->
                <div class="relative">
                    <button class="nav-link flex items-center gap-2" on:click={toggleSippe}>
                        Sippe
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    <!-- Dropdown Content -->
                    {#if sippeOpen}
                        <div class="absolute top-full left-0 bg-white border border-gray-200 shadow-md z-50 w-64 p-3">
                            <a href="/sippe/die-goldenen-loewenzaehne" class="dropdown-link" on:click={() => (sippeOpen = false)}>Die goldenen Löwenzähne</a>
                            <hr class="border-gray-200 mt-3 mb-3" />
                            <a href="/sippe/funkelfuechse" class="dropdown-link" on:click={() => (sippeOpen = false)}>Funkelfüchse</a>
                        </div>
                    {/if}
                </div>

                <a href="/termine" class="nav-link">Termine</a>
                <a href="/kontakt" class="nav-link">Kontakt</a>
                <a href="/download" class="nav-link">Download</a>
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
        <div class="md:hidden px-4 pb-4 bg-white border-t border-gray-200 space-y-3">
            <p class="text-sm text-gray-500 uppercase font-semibold tracking-wide mt-2">Gruppen</p>
            <div class="flex flex-col space-y-2 ml-2">
                <p class="text-sm text-gray-500 uppercase font-semibold tracking-wide mt-2">Meuten</p>
                <div class="flex flex-col space-y-2 ml-2">
                    <a href="/meute" class="mobile-link text-lg py-2" on:click={() => (open = false)}>Meute</a>
                </div>

                <p class="text-sm text-gray-500 uppercase font-semibold tracking-wide mt-2">Sippen</p>
                <div class="flex flex-col space-y-2 ml-2">
                    <a href="/sippe/die-goldenen-loewenzaehne" class="mobile-link text-lg py-2" on:click={() => (open = false)}>Die goldenen Löwenzähne</a>
                    <a href="/sippe/funkelfuechse" class="mobile-link text-lg py-2" on:click={() => (open = false)}>Funkelfüchse</a>
                </div>
            </div>

            <hr class="my-3 border-gray-300" />

            <a href="/termine" class="mobile-link text-lg py-2" on:click={() => (open = false)}>Termine</a>

            <hr class="my-3 border-gray-300" />

            <a href="/kontakt" class="mobile-link text-lg py-2" on:click={() => (open = false)}>Kontakt</a>

            <hr class="my-3 border-gray-300" />

            <a href="/download" class="mobile-link text-lg py-2" on:click={() => (open = false)}>Download</a>
        </div>
    {/if}

    <style>
        .nav-link {
            @apply text-gray-700 hover:text-blue-600 font-medium text-lg transition;
        }

        .mobile-link {
            @apply block text-gray-700 hover:text-blue-600 font-semibold transition;
        }

        .dropdown-link {
            @apply block px-5 py-3 text-gray-800 hover:bg-gray-100 font-medium text-base transition;
        }
    </style>
</nav>

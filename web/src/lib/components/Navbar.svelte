<script>
    import { onMount } from 'svelte';

    let open = false;
    let gruppenOpen = false;

    const toggleGruppen = () => {
        gruppenOpen = !gruppenOpen;
    };

    function handleClickOutside(event) {
        const dropdown = document.getElementById('gruppen-dropdown');
        const button = document.getElementById('gruppen-button');
        if (
            dropdown &&
            !dropdown.contains(event.target) &&
            button &&
            !button.contains(event.target)
        ) {
            gruppenOpen = false;
        }
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    });
</script>

<nav class="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <a href="/" class="text-xl font-extrabold text-indigo-900">Edelweißpiraten</a>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex gap-6 items-center relative">
                <!-- Gruppen Dropdown -->
                <div class="relative">
                    <button
                            class="nav-link flex items-center gap-2"
                            on:click={toggleGruppen}
                            id="gruppen-button"
                    >
                        Gruppen
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {#if gruppenOpen}
                        <div
                                id="gruppen-dropdown"
                                class="absolute top-full left-0 bg-white border border-gray-200 shadow-md z-50 w-64 px-4 py-3"
                        >
                            <p class="text-xs uppercase text-gray-400 font-semibold mb-1">Meute</p>
                            <a href="/meute" class="dropdown-link pl-2 mb-2 block" on:click={() => (gruppenOpen = false)}>Sportliche Panther</a>

                            <hr class="border-gray-200 my-2" />

                            <p class="text-xs uppercase text-gray-400 font-semibold mb-1">Sippe</p>
                            <a href="/sippe/die-goldenen-loewenzaehne" class="dropdown-link pl-4 block" on:click={() => (gruppenOpen = false)}>Die goldenen Löwenzähne</a>
                            <a href="/sippe/funkelfuechse" class="dropdown-link pl-4 mt-2 block" on:click={() => (gruppenOpen = false)}>Funkelfüchse</a>
                        </div>
                    {/if}
                </div>

                <a href="/galerie" class="nav-link">Galerie</a>
                <a href="/termine" class="nav-link">Termine</a>
                <a href="/kontakt" class="nav-link">Kontakt</a>
                <a href="/download" class="nav-link">Download</a>
            </div>

            <!-- Mobile Toggle Button -->
            <div class="md:hidden">
                <button on:click={() => (open = !open)} class="text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Navigation -->
    {#if open}
        <div class="md:hidden px-4 pb-4 bg-white border-t border-gray-200 space-y-3">
            <p class="text-sm text-gray-500 uppercase font-semibold tracking-wide mt-2">Gruppen</p>
            <div class="ml-2">
                <p class="text-xs uppercase text-gray-400 font-semibold mt-2">Meute</p>
                <a href="/meute" class="mobile-link text-lg py-2 block" on:click={() => (open = false)}>Sportliche Panther</a>

                <p class="text-xs uppercase text-gray-400 font-semibold mt-4">Sippe</p>
                <a href="/sippe/die-goldenen-loewenzaehne" class="mobile-link text-lg py-2 block" on:click={() => (open = false)}>Die goldenen Löwenzähne</a>
                <a href="/sippe/funkelfuechse" class="mobile-link text-lg py-2 block" on:click={() => (open = false)}>Funkelfüchse</a>
            </div>

            <hr class="my-4 border-gray-300" />

            <a href="/galerie" class="mobile-link text-lg block" on:click={() => (open = false)}>Galerie</a>
            <a href="/termine" class="mobile-link text-lg block" on:click={() => (open = false)}>Termine</a>
            <a href="/kontakt" class="mobile-link text-lg block" on:click={() => (open = false)}>Kontakt</a>
            <a href="/download" class="mobile-link text-lg block" on:click={() => (open = false)}>Download</a>
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

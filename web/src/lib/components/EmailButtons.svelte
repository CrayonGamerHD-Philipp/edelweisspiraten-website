<script>
    export let email = 'kontakt@example.com';
    export let color = 'indigo'; // z. B. "green", "blue", "indigo"
    let copied = false;

    // Hintergrund- und Hoverfarbe je nach Farbe
    $: bgColor = {
        green: 'bg-green-600 hover:bg-green-700',
        blue: 'bg-blue-600 hover:bg-blue-700',
        indigo: 'bg-indigo-600 hover:bg-indigo-700',
        red: 'bg-red-600 hover:bg-red-700'
    }[color] || 'bg-gray-600 hover:bg-gray-700';

    async function copyEmail() {
        await navigator.clipboard.writeText(email);
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }
</script>

<div class="flex flex-col md:flex-row items-center gap-4 mt-6">
    <!-- Mail senden -->
    <a
            href={`mailto:${email}`}
            class={`flex items-center gap-2 px-4 py-2 ${bgColor} text-white rounded transition`}
    >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4h16v16H4z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M22 6L12 13 2 6"/>
        </svg>
        E-Mail senden
    </a>

    <!-- Mail kopieren -->
    <button
            on:click={copyEmail}
            class="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
    >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8 16h8M8 12h8M8 8h8M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"/>
        </svg>
        {#if copied}
            Kopiert!
        {:else}
            E-Mail kopieren
        {/if}
    </button>
</div>

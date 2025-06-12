<svelte:head>
    <title>Stamm Edelweißpiraten</title>
    <meta name="description" content="Pfadfinder in Bremen-Hastedt – Abenteuer, Gemeinschaft & wöchentliche Gruppenstunden für Kinder und Jugendliche." />
</svelte:head>

<script>

    import Map from '$lib/components/Map.svelte';
    import StammHeader from '$lib/components/StammHeader.svelte';

    export let data;
    let faqs = data.faqs;

    function toggleFAQ(index) {
        faqs = faqs.map((faq, i) => ({
            ...faq,
            open: i === index ? !faq.open : faq.open
        }));
    }
</script>

<!-- HERO -->
<section class="relative h-[70vh] w-full overflow-hidden">
    <img src="/pfadfinder.avif" alt="Stamm Edelweißpiraten"
         class="absolute w-full h-full object-cover brightness-75" />
    <div class="absolute inset-0 flex items-center justify-center">
        <StammHeader/>
    </div>
</section>

<!-- KACHELN: MEUTE UND SIPPE -->
<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Unsere Gruppen</h2>
    <!-- Meute -->
    <div class="bg-white border border-gray-300 p-8 w-full">
        <h2 class="text-2xl font-bold text-green-700">Meute (7–10 Jahre)</h2>
        <p class="text-gray-700 mt-2">Spielen, Basteln und kleine Abenteuer in der Gruppe erleben.</p>
        <p class="text-sm text-gray-500 mt-4">Freitags · 16:30 Uhr - 18 Uhr · Ev. Auferstehungsgemeinde Bremen-Hastedt</p>
        <a href="/meute" class="inline-block mt-4 px-4 py-2 bg-green-100 text-green-700 font-medium border border-green-300 hover:bg-green-200 transition rounded">
            Mehr zur Meute →
        </a>
        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 max-w-5xl mx-auto mt-8 flex items-center space-x-4">
            <div class="mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                     class="bi bi-exclamation-triangle flex-shrink-0 text-yellow-600" viewBox="0 0 16 16">
                    <path
                            d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
                    <path
                            d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                </svg>
            </div>
            <div>
                <p class="font-bold">WICHTIG</p>
                <p>Erste Gruppenstunde am <strong>15.08.2025</strong>!</p>
            </div>
        </div>
    </div>

    <!-- Sippe Die Goldenen Löwenzähne -->
    <div class="bg-white border border-gray-300 p-8 w-full">
        <h2 class="text-2xl font-bold text-blue-700">Sippe (11-14 Jahre)</h2>
        <p class="text-gray-700 mt-2">Zeltlager, Fahrten und echte Gemeinschaft mit Gleichaltrigen.</p>
        <p class="text-sm text-gray-500 mt-4">Montags · 16:30 Uhr - 18 Uhr · Ev. Auferstehungsgemeinde Bremen-Hastedt</p>
        <a href="/sippe/die-goldenen-loewenzaehne" class="inline-block mt-4 px-4 py-2 bg-blue-100 text-blue-700 font-medium border border-blue-300 hover:bg-blue-200 transition rounded">
            Mehr zur Sippen →
        </a>
    </div>

    <!-- Sippe Funkel Füchse-->
    <div class="bg-white border border-gray-300 p-8 w-full">
        <h2 class="text-2xl font-bold text-pink-700">Sippe (ab 15 Jahren)</h2>
        <p class="text-gray-700 mt-2">Zeltlager, Fahrten und echte Gemeinschaft mit Gleichaltrigen.</p>
        <p class="text-sm text-gray-500 mt-4">Freitgas · 18:00 Uhr - 19 Uhr / 19:30 Uhr · Ev. Auferstehungsgemeinde Bremen-Hastedt</p>
        <a href="/sippe/funkelfuechse" class="inline-block mt-4 px-4 py-2 bg-pink-100 text-pink-700 font-medium border border-pink-300 hover:bg-pink-200 transition rounded">
            Mehr zur Sippen →
        </a>
    </div>
</section>

<!-- Über uns -->
<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Über Uns</h2>

    <p class="text-justify">
        Wir sind der <span class="font-bold">Stamm Edelweißpiraten</span> der Christlichen Pfadfinderschaft Deutschlands e.V. (CPD).
        Unser Zuhause ist Bremen Hastedt, wo wir eng mit der Evangelischen Auferstehungsgemeinde zusammenarbeiten.
        Als Teil der CPD bieten wir Kindern und Jugendlichen eine lebendige Gemeinschaft, in der Abenteuer, Freundschaft und
        Verantwortung großgeschrieben werden.
    </p>

    <p class="text-justify">
        Neben unseren wöchentlichen Gruppenstunden unternehmen wir regelmäßig spannende Fahrten und Aktionen. Ob im Wald,
        am Lagerfeuer oder auf einem Zeltplatz – bei uns gibt es immer etwas zu erleben.
    </p>

    <p class="font-bold">
        Jede und jeder ist willkommen – komm vorbei und mach mit!
    </p>
</section>


<!-- FAQ -->
<section class="max-w-5xl mx-auto px-6 py-12">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Häufige Fragen</h2>
    <div class="space-y-4">
        {#each faqs as faq, index}
            <div class="border border-gray-300 overflow-hidden bg-white rounded">
                <button
                        on:click={() => toggleFAQ(index)}
                        class="w-full flex justify-between items-center px-6 py-4 bg-gray-100 hover:bg-gray-200 transition text-left"
                >
                    <span class="font-medium text-gray-800">{faq.question}</span>
                    <span class="text-xl text-gray-500">
                    {faq.open ? '−' : '+'}
                </span>
                </button>
                {#if faq.open}
                    <div class="px-6 py-4 border-t border-gray-300">
                        <p class="text-gray-700">{faq.answer}</p>
                    </div>
                {/if}
            </div>
        {/each}
    </div>

    <div class="mt-10">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Hier findest du uns</h2>
        <Map/>
    </div>
</section>


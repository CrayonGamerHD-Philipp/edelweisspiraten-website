<script>
    let faqs = [
        {
            question: "Wie alt muss ich sein?",
            answer: "Für die Meute: 7–11 Jahre. Für die Sippe: ab 12 Jahren.",
            open: false
        },
        {
            question: "Was kostet es?",
            answer: "Der Jahresbeitrag beträgt aktuell 47€ – Schnuppern ist kostenlos.",
            open: false
        },
        {
            question: "Kann ich mir das mal Anschauen?",
            answer: "Klar komm einfach vorbei! Montags ab 12 Jahren Freitags von 7-11 Jahren (Ab dem 15.08.2025)"
        },
        {
            question: "Was brauche ich?",
            answer: "Bequeme Kleidung, Neugier und Lust auf Abenteuer – das reicht!"
        }
    ];

    function toggleFAQ(index) {
        faqs = faqs.map((faq, i) =>
            i === index ? { ...faq, open: !faq.open } : faq
        );
    }
</script>

<!-- HERO -->
<section class="relative h-[70vh] w-full overflow-hidden">
    <img src="/pfadfinder.jpg" alt="Stamm Edelweißpiraten"
         class="absolute w-full h-full object-cover brightness-75" />
    <div class="absolute inset-0 flex items-center justify-center">
        <h1 class="text-white text-5xl md:text-6xl font-extrabold text-center">
            Stamm Edelweißpiraten
        </h1>
    </div>
</section>

<!-- KACHELN: MEUTE UND SIPPE -->
<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Unsere Gruppen</h2>
    <!-- Meute -->
    <div class="bg-white border border-gray-300 p-8 w-full">
        <h2 class="text-2xl font-bold text-blue-700">Meute (6–10 Jahre)</h2>
        <p class="text-gray-700 mt-2">Spielen, Basteln und kleine Abenteuer in der Gruppe erleben.</p>
        <p class="text-sm text-gray-500 mt-4">Freitags · 16:30 Uhr - 18 Uhr · Auferstehungsgemeinde Bremen Hastedt</p>
        <a href="/meute" class="inline-block mt-4 px-4 py-2 bg-blue-100 text-blue-700 font-medium border border-blue-300 hover:bg-blue-200 transition rounded">
            Mehr zur Meute →
        </a>
        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 max-w-5xl mx-auto mt-8">
            <p class="font-bold">WICHTIG</p>
            <p>Erste Gruppenstunde am <strong>15.08.2025</strong>!</p>
        </div>
    </div>

    <!-- Sippe -->
    <div class="bg-white border border-gray-300 p-8 w-full">
        <h2 class="text-2xl font-bold text-green-700">Sippe (ab 10 Jahren)</h2>
        <p class="text-gray-700 mt-2">Zeltlager, Fahrten und echte Gemeinschaft mit Gleichaltrigen.</p>
        <p class="text-sm text-gray-500 mt-4">Montags · 16:30 Uhr - 18 Uhr · Auferstehungsgemeinde Bremen Hastedt</p>
        <a href="/sippe" class="inline-block mt-4 px-4 py-2 bg-green-100 text-green-700 font-medium border border-green-300 hover:bg-green-200 transition rounded">
            Mehr zur Sippe Sippen →
        </a>
    </div>
</section>

<!-- Über uns -->
<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Über Uns</h2>
    <p>TEST TSt</p>
</section>

<!-- FAQ -->
<section class="max-w-5xl mx-auto px-6 py-12">
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Häufige Fragen</h2>
    <div class="space-y-4">
        {#each faqs as faq, index}
            <div class="border border-gray-300 overflow-hidden bg-white">
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
</section>

<!-- INSTAGRAM-KACHEL -->
<section class="max-w-5xl mx-auto py-12 px-6">
    <div class="bg-gradient-to-br from-pink-500 to-purple-600 text-white p-8 w-full shadow-md">
        <h3 class="text-2xl font-bold mb-4">📸 Folge uns auf Instagram!</h3>
        <p class="mb-6">Erlebe unsere Aktionen, Fahrten und Gruppenstunden mit – auch online.</p>
        <a href="https://instagram.com/dein_profil" target="_blank"
           class="inline-block bg-white text-pink-600 font-bold px-6 py-2 rounded-full hover:bg-gray-100 transition">
            @edelweipiraten
        </a>
    </div>
</section>

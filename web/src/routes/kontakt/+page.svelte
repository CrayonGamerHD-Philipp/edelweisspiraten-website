<svelte:head>
    <title>Stamm Edelweißpiraten – Kontakt</title>
    <meta name="description" content="Nimm Kontakt mit dem Stamm Edelweißpiraten auf. Hier findest du unser Formular, E-Mail-Adresse und Standort in Bremen-Hastedt." />
</svelte:head>

<script>
    import Map from '$lib/components/Map.svelte';
</script>

<section class="max-w-5xl mx-auto px-6 py-12 space-y-10">

    <!-- Intro -->
    <h1 class="text-3xl font-bold text-gray-800">Kontakt</h1>
    <p class="text-gray-700 leading-relaxed">
        Du hast Fragen oder möchtest bei uns reinschnuppern? Melde dich gerne bei unseren Ansprechpartnern oder komm direkt zu einer Gruppenstunde vorbei.
    </p>

    <!-- Adresse -->
    <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-gray-800">Unser Treffpunkt</h2>
        <p class="text-gray-600">
            Evangelische Auferstehungsgemeinde Bremen-Hastedt<br />
            Bennigsenstraße 7<br />
            28207 Bremen
        </p>
        <div class="mt-4">
            <Map />
        </div>
    </div>

    <!-- Ansprechpartner -->
    <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800">Ansprechpartner</h2>

        <!-- Meute -->
        <div class="border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <h3 class="text-xl font-bold text-yellow-700">Meute (7–10 Jahre)</h3>
            <p class="text-gray-700 mt-1">Larissa und Fipsi (Philipp)</p>
            <a href="mailto:meute@edelweisspiraten-bremen.de" class="inline-block mt-2 px-4 py-2 bg-yellow-200 text-yellow-900 rounded hover:bg-yellow-300 transition">
                ✉️ E-Mail an die Gruppenleitung der Meute
            </a>
        </div>

        <!-- Sippe -->
        <div class="border-l-4 border-blue-400 bg-blue-50 p-4">
            <h3 class="text-xl font-bold text-blue-700">Sippe (11–14 Jahre)</h3>
            <p class="text-gray-700 mt-1">Melina und Sebastian</p>
            <a href="mailto:sippe@edelweisspiraten-bremen.de" class="inline-block mt-2 px-4 py-2 bg-blue-200 text-blue-900 rounded hover:bg-blue-300 transition">
                ✉️ E-Mail an die Gruppenleitung der Sippe
            </a>
        </div>

        <!-- Stammesführung -->
        <div class="border-l-4 border-indigo-400 bg-indigo-50 p-4">
            <h3 class="text-xl font-bold text-indigo-700">Stammesführung</h3>
            <p class="text-gray-700 mt-1">Melina, Lina und Emma</p>
            <a href="mailto:stafue@edelweisspiraten-bremen.de" class="inline-block mt-2 px-4 py-2 bg-indigo-200 text-indigo-900 rounded hover:bg-indigo-300 transition">
                ✉️ E-Mail an die Stammesführung
            </a>
        </div>
    </div>

</section>
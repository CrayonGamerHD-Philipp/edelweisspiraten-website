<svelte:head>
    <title>Stamm Edelweißpiraten – Kontakt</title>
    <meta name="description"
          content="Nimm Kontakt mit dem Stamm Edelweißpiraten auf. Hier findest du unser Formular, E-Mail-Adresse und Standort in Bremen-Hastedt."/>
</svelte:head>

<script>
    import Map from '$lib/components/Map.svelte';
    import EmailButtons from '$lib/components/EmailButtons.svelte';
</script>

<section class="max-w-5xl mx-auto px-6 py-12 space-y-10">

    <!-- Intro -->
    <h1 class="text-3xl font-bold text-gray-800">Kontakt</h1>
    <p class="text-gray-700 leading-relaxed">
        Du hast Fragen oder möchtest bei uns reinschnuppern? Melde dich gerne bei unseren Ansprechpartnern oder komm
        direkt zu einer Gruppenstunde vorbei.
    </p>

    <!-- Adresse -->
    <div class="space-y-2">
        <h2 class="text-2xl font-semibold text-gray-800">Unser Treffpunkt</h2>
        <p class="text-gray-600">
            Evangelische Auferstehungsgemeinde Bremen-Hastedt<br/>
            Stamm Edelweißpiraten<br/>
            Drakenburger Str. 42<br/>
            28207 Bremen
        </p>
        <div class="mt-4">
            <Map/>
        </div>
    </div>

    <!-- Ansprechpartner -->
    <div class="space-y-6">
        <h2 class="text-2xl font-semibold text-gray-800">Ansprechpartner</h2>

        <!-- Meute -->
        <div class="border-l-4 border-green-400 bg-green-50 p-4">
            <h3 class="text-xl font-bold text-green-700">Meute (7–10 Jahre)</h3>
            <p class="text-gray-700 mt-1"><span class="font-bold">Ansprechpartner</span><br>Larissa und Fipsi (Philipp)
            </p>
            <p class="text-gray-700 mt-1"><span class="font-bold">E-Mail</span><br>meute@edelweisspiraten-bremen.de</p>
            <EmailButtons email="meute@edelweisspiraten-bremen.de" color="green"/>
        </div>

        <!-- Sippe -->
        <div class="border-l-4 border-blue-400 bg-blue-50 p-4">
            <h3 class="text-xl font-bold text-blue-700">Sippe (11–14 Jahre)</h3>
            <p class="text-gray-700 mt-1"><span class="font-bold">Ansprechpartner</span><br>Melina und Sebastian</p>
            <p class="text-gray-700 mt-1"><span class="font-bold">E-Mail</span><br>sippe@edelweisspiraten-bremen.de</p>
            <EmailButtons email="sippe@edelweisspiraten-bremen.de" color="blue"/>
        </div>

        <div class="border-l-4 border-pink-400 bg-pink-50 p-4">
            <h3 class="text-xl font-bold text-pink-700">Sippe (ab 15 Jahren)</h3>
            <p class="text-gray-700 mt-1"><span class="font-bold">Ansprechpartner</span><br>Larissa, Elisabeth und Fipsi (Philipp)</p>
            <p class="text-gray-700 mt-1"><span class="font-bold">E-Mail</span><br>funkelfuechse@edelweisspiraten-bremen.de</p>
            <EmailButtons email="funkelfuechse@edelweisspiraten-bremen.de" color="pink"/>
        </div>

        <!-- Stammesführung -->
        <div class="border-l-4 border-red-400 bg-red-50 p-4">
            <h3 class="text-xl font-bold text-red-700">Stammesführung</h3>
            <p class="text-gray-700 mt-1"><span class="font-bold">Ansprechpartner</span><br>Melina, Emma und Lina</p>
            <p class="text-gray-700 mt-1"><span class="font-bold">E-Mail</span><br>stafues@edelweisspiraten-bremen.de
            </p>
            <EmailButtons email="stafues@edelweisspiraten-bremen.de" color="red"/>
        </div>
    </div>

</section>
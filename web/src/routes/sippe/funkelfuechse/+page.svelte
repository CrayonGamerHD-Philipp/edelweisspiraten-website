<svelte:head>
    <title>Stamm Edelweißpiraten – Sippe</title>
    <meta name="description" content="Die Sippe der Edelweißpiraten – Pfadfindergruppe für Jugendliche ab 11 Jahren. Lagerfeuer, Fahrten und echte Gemeinschaft in Bremen-Hastedt." />
</svelte:head>

<script>
    import Map from '$lib/components/Map.svelte';
    import EmailButtons from "$lib/components/EmailButtons.svelte";
    import AppointmentPreview from "$lib/components/AppointmentPreview.svelte";
</script>

<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">
    <h2 class="text-2xl font-bold text-blue-700">Sippe</h2>
    <div class="bg-white border border-gray-300 p-8 w-full">
        <p class="text-gray-700">Gruppenname</p>
        <p class="text-sm text-gray-500">Funkelfüchse</p>
        <p class="text-gray-700 mt-2">Gruppenleiter</p>
        <p class="text-sm text-gray-500">Melina und Sebastian</p>
        <p class="text-gray-700 mt-2">Urzeit</p>
        <p class="text-sm text-gray-500">Montags 16:30 Uhr - 18:00 Uhr</p>
        <p class="text-gray-700 mt-2">Ort</p>
        <p class="text-sm text-gray-500">Ev. Auferstehungsgemeinde Bremen-Hastedt</p>
        <p class="text-gray-700 mt-2">Alter</p>
        <p class="text-sm text-gray-500">11 - 14 Jahre</p>
    </div>

    <h2 class="text-2xl mb-2 font-bold text-blue-700">Das sind wir</h2>
    <p class="text-gray-700 leading-relaxed text-justify">
        Wir sind die <span class="font-semibold">Sippe der Edelweißpiraten</span> – eine Pfadfindergruppe für Jugendliche ab 11 Jahren.
        In unseren wöchentlichen Gruppenstunden und auf Fahrten erleben wir echte Abenteuer, wachsen als Team zusammen und entdecken die Natur.
        Ob Lagerfeuer, Zeltlager oder Geländespiel – bei uns ist immer etwas los!
    </p>

    <h2 class="text-2xl mb-2 font-bold text-blue-700">Treffpunkt</h2>
    <Map/>

    <div class="space-y-6 mt-20">
        <div class="border-l-4 border-blue-400 bg-blue-50 p-4">
            <h3 class="text-xl font-bold text-blue-700">Sippe (11–14 Jahre)</h3>
            <p class="text-gray-700 mt-1"><span class="font-bold">Ansprechpartner</span><br>Melina und Sebastian</p>
            <p class="text-gray-700 mt-1"><span class="font-bold">E-Mail</span><br>sippe@edelweisspiraten-bremen.de</p>
            <EmailButtons email="sippe@edelweisspiraten-bremen.de" color="blue" />
        </div>
    </div>

    <AppointmentPreview gruppe="Sippe (ab 15 Jahren)"/>
</section>
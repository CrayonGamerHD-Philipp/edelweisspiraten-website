<svelte:head>
    <title>Stamm Edelweißpiraten – Meute</title>
    <meta name="description" content="Die Meute der Edelweißpiraten – Pfadfinderprogramm für Kinder von 7 bis 10 Jahren. Spielen, Basteln und Abenteuer in Bremen-Hastedt." />
</svelte:head>

<script>
    import Map from '$lib/components/Map.svelte';
    import EmailButtons from "$lib/components/EmailButtons.svelte";
    import AppointmentPreview from "$lib/components/AppointmentPreview.svelte";
</script>

<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">

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

    <h2 class="text-2xl font-bold text-green-700">Meute</h2>
    <div class="bg-white border border-gray-300 p-8 w-full">
        <p class="text-gray-700">Gruppenname</p>
        <p class="text-sm text-gray-500">- (Noch nicht Festgelegt)</p>
        <p class="text-gray-700 mt-2">Gruppenleiter</p>
        <p class="text-sm text-gray-500">Larissa und Fipsi (Philipp)</p>
        <p class="text-gray-700 mt-2">Urzeit</p>
        <p class="text-sm text-gray-500">Freitags 16:30 Uhr - 18:00 Uhr</p>
        <p class="text-gray-700 mt-2">Ort</p>
        <p class="text-sm text-gray-500">Ev. Auferstehungsgemeinde Bremen-Hastedt</p>
        <p class="text-gray-700 mt-2">Alter</p>
        <p class="text-sm text-gray-500">7 - 10 Jahre</p>
    </div>

    <h2 class="text-2xl mb-2 font-bold text-green-700">Das sind wir</h2>
    <p class="text-gray-700 leading-relaxed text-justify">
        Wir sind die <span class="font-semibold">Meute der Edelweißpiraten</span> – unsere Pfadfindergruppe für Kinder im Alter von 7 bis 10 Jahren.
        In unseren Gruppenstunden wird gespielt, gebastelt, gesungen und draußen getobt.
        Die Kinder erleben kleine Abenteuer, wachsen spielerisch als Gruppe zusammen und entdecken mit viel Freude, was es heißt, Teil einer Gemeinschaft zu sein.
    </p>

    <h2 class="text-2xl font-bold text-green-700 mb-4">Warum zur Meute kommen?</h2>
    <p class="text-gray-700 leading-relaxed text-justify">
        Die Meute bietet Kindern einen Ort zum Austoben, Entdecken und Freundschaften schließen.
        Mit spannenden Spielen, Kreativaktionen und Abenteuern in der Natur fördern wir Selbstvertrauen, Fantasie und soziales Miteinander.
        Für Eltern ist die Meute ein sicherer Rahmen mit festen Bezugspersonen, in dem Werte wie Gemeinschaft, Verantwortung und Rücksichtnahme ganz praktisch gelebt werden.
    </p>

    <h2 class="text-2xl mb-2 font-bold text-green-700">Treffpunkt</h2>
    <Map/>

    <div class="space-y-6 mt-20">
        <div class="border-l-4 border-green-400 bg-green-50 p-4">
            <h3 class="text-xl font-bold text-green-700">Meute (7–10 Jahre)</h3>
            <p class="text-gray-700 mt-1"><span class="font-bold">Ansprechpartner</span><br>Larissa und Fipsi (Philipp)</p>
            <p class="text-gray-700 mt-1"><span class="font-bold">E-Mail</span><br>meute@edelweisspiraten-bremen.de</p>
            <EmailButtons email="meute@edelweisspiraten-bremen.de" color="green" />
        </div>
    </div>

    <AppointmentPreview gruppe="meute"/>
</section>
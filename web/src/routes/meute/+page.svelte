<svelte:head>
    <title>Stamm Edelweißpiraten – Meute</title>
    <meta name="description" content="Die Meute der Edelweißpiraten – Pfadfinderprogramm für Kinder von 7 bis 10 Jahren. Spielen, Basteln und Abenteuer in Bremen-Hastedt." />
</svelte:head>

<script>
    import Map from '$lib/components/Map.svelte';
    import EmailButtons from "$lib/components/EmailButtons.svelte";
</script>

<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">

    <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 max-w-5xl mx-auto mt-8">
        <p class="font-bold">WICHTIG</p>
        <p>Erste Gruppenstunde am <strong>15.08.2025</strong>!</p>
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
</section>
<script lang="ts">
    import {fetchAppointmentById} from '$lib/api/appointments';
    import Lightbox from '$lib/components/Lightbox.svelte';
    import QRCode from 'qrcode';
    import {page} from '$app/stores';
    import {onMount} from 'svelte';

    let appointment;
    let selectedIndex: number | null = null;
    let shareOpen = false;
    let qrDataUrl = '';
    let currentUrl = '';

    const backendUrl = 'https://backend.edelweißpiraten.de';

    $: id = $page.params.id;

    onMount(async () => {
        appointment = await fetchAppointmentById(id);
        currentUrl = `https://edelweißpiraten.de/galerie/${appointment.id}`;
        qrDataUrl = await QRCode.toDataURL(currentUrl);
    });
</script>


<section class="max-w-5xl mx-auto px-6 py-12 space-y-6">
    {#if appointment}
        <div class="flex items-center justify-between">
            <!-- Zurück-Button -->
            <a href="/galerie" class="text-sm text-blue-600 hover:underline flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
                </svg>
                Zurück
            </a>

            <!-- Teilen-Button -->
            <button
                    class="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    on:click={() => shareOpen = true}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                </svg>
                Teilen
            </button>
        </div>

        <h1 class="text-2xl font-bold mb-2">{appointment.title}</h1>
        <p class="text-gray-500 mb-4">{new Date(appointment.date).toLocaleDateString()}</p>
        <p class="mb-6">{appointment.description}</p>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            {#each appointment.pictures as pic, i}
                <img
                        src={`${backendUrl}/api/files/appointments/${appointment.id}/${pic}`}
                        alt="Bild"
                        class="rounded shadow cursor-zoom-in object-cover h-48 w-full"
                        on:click={() => selectedIndex = i}
                />
            {/each}
        </div>

        {#if selectedIndex !== null}
            <Lightbox
                    images={appointment.pictures.map(p => `${backendUrl}/api/files/appointments/${appointment.id}/${p}`)}
                    index={selectedIndex}
                    on:close={() => selectedIndex = null}
            />
        {/if}

        {#if shareOpen}
            <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                 on:click={() => shareOpen = false}>
                <div class="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center relative space-y-4"
                     on:click|stopPropagation>
                    <button class="absolute top-2 right-3 text-2xl text-gray-500 hover:text-red-600"
                            on:click={() => shareOpen = false}>×
                    </button>

                    <h2 class="text-xl font-bold mb-2">Teilen</h2>

                    {#if qrDataUrl}
                        <img src={qrDataUrl} alt="QR Code" class="mx-auto rounded shadow w-48 h-48 object-contain"/>

                        <!-- Linkanzeige & Kopieren -->
                        <div class="bg-gray-100 rounded p-2 flex items-center justify-between gap-2 mt-4">
                            <input
                                    readonly
                                    value={`https://edelweißpiraten.de/galerie/${appointment.id}`}
                                    class="flex-1 bg-transparent outline-none text-sm truncate"
                            />
                            <button
                                    class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                                    on:click={async () => {
            await navigator.clipboard.writeText(`https://edelweißpiraten.de/galerie/${appointment.id}`);
            alert('Link kopiert!');
          }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-clipboard" viewBox="0 0 16 16">
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                                </svg>
                            </button>
                        </div>

                        <div class="flex justify-center gap-4 mt-6">
                            <!-- Download Button -->
                            <button
                                    class="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-neutral-600"
                                    title="QR-Code herunterladen"
                                    on:click={() => {
      const link = document.createElement('a');
      link.href = qrDataUrl;
      link.download = 'edelweisspiraten-qr.png';
      link.click();
    }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white"
                                     viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                                </svg>
                            </button>

                            <!-- WhatsApp Button -->
                            <a
                                    class="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-green-600"
                                    title="Per WhatsApp teilen"
                                    href={`https://wa.me/?text=${encodeURIComponent(`Schau dir das an: https://edelweißpiraten.de/galerie/${appointment.id}`)}`}
                                    target="_blank"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white"
                                     viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                </svg>
                            </a>

                            <!-- E-Mail Button -->
                            <a
                                    class="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-blue-600"
                                    title="Per E-Mail teilen"
                                    href={`mailto:?subject=Bilder von ${appointment.title}&body=Hier geht's zur Galerie: https://edelweißpiraten.de/galerie/${appointment.id}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white"
                                     viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                                </svg>
                            </a>
                        </div>
                    {/if}
                </div>
            </div>
        {/if}
    {/if}
</section>
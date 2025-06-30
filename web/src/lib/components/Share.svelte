<script lang="ts">
    import QRCode from 'qrcode';
    import { onMount } from 'svelte';

    export let url: string = '';
    export let title: string = '';
    export let whatsappMessage: string = '';
    export let open: boolean = false;
    export let onClose: () => void;

    let qrDataUrl = '';

    $: if (open && url) {
        generateQR();
    }

    async function generateQR() {
        const qrCanvas = document.createElement('canvas');
        await QRCode.toCanvas(qrCanvas, url, { width: 256 });

        const ctx = qrCanvas.getContext('2d');
        if (ctx && title) {
            ctx.font = '16px sans-serif';
            ctx.fillStyle = '#000';
            ctx.textAlign = 'center';
            ctx.fillText(title, qrCanvas.width / 2, qrCanvas.height - 5);
        }

        qrDataUrl = qrCanvas.toDataURL();
    }
</script>

{#if open}
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" on:click={() => onClose?.()}>
        <div class="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center relative space-y-4" on:click|stopPropagation>
            <button class="absolute top-2 right-3 text-2xl text-gray-500 hover:text-red-600" on:click={() => onClose?.()}>×</button>
            <h2 class="text-xl font-bold mb-2">Teilen</h2>

            {#if qrDataUrl}
                <img src={qrDataUrl} alt="QR Code" class="mx-auto rounded shadow w-48 h-48 object-contain" />

                <div class="bg-gray-100 rounded p-2 flex items-center justify-between gap-2 mt-4">
                    <input readonly value={url} class="flex-1 bg-transparent outline-none text-sm truncate" />
                    <button
                            class="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                            on:click={async () => {
                        await navigator.clipboard.writeText(url);
                        alert('Link kopiert!');
                    }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                        </svg>
                    </button>
                </div>

                <div class="flex justify-center gap-4 mt-6">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                        </svg>
                    </button>

                    <a
                            class="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-green-600"
                            title="Per WhatsApp teilen"
                            href={`https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`}
                            target="_blank"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592"/>
                        </svg>
                    </a>

                    <a
                            class="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-blue-600"
                            title="Per E-Mail teilen"
                            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(whatsappMessage)}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                        </svg>
                    </a>
                </div>
            {/if}
        </div>
    </div>
{/if}

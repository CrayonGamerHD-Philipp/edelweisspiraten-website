<script lang="ts">
    export let data;
    let expandedRows: Record<string, boolean> = {};

    function getFileIcon(fileName: string) {
        const ext = fileName.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'pdf': return '📄';
            case 'doc':
            case 'docx': return '📝';
            case 'jpg':
            case 'jpeg':
            case 'png': return '🖼️';
            case 'zip': return '🗜️';
            default: return '📁';
        }
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
</script>

<section class="max-w-5xl mx-auto px-4 py-8 space-y-6">
    <h1 class="text-2xl font-bold mb-4">📄 Dateien</h1>

    {#if data.files.length === 0}
        <p class="text-gray-500">Keine Dateien gefunden.</p>
    {:else}
        <div class="overflow-x-auto">
            <table class="min-w-full shadow-sm rounded text-sm table-auto">
                <thead class="text-left hidden sm:table-header-group">
                <tr>
                    <th class="p-2">Typ</th>
                    <th class="p-2">Dateiname</th>
                    <th class="p-2">Stand</th>
                    <th class="p-2">Aktionen</th>
                    <th class="p-2">Tags</th>
                </tr>
                </thead>
                <tbody>
                {#each data.files as file}
                    <tr class="border-t hover:bg-gray-50 hidden sm:table-row">
                        <td class="p-2">{getFileIcon(file.file)}</td>
                        <td class="p-2">{file.name}</td>
                        <td class="p-2">{formatDate(file.updated)}</td>
                        <td class="p-2">
                            <a
                                    href={`https://backend.xn--edelweipiraten-6fb.de/api/files/public_files/${file.id}/${file.file}`}
                                    download
                                    class="inline-flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                                </svg>
                                <span class="hidden sm:inline">Download</span>
                            </a>
                        </td>
                        <td class="p-2">
                            <div class="flex flex-wrap gap-2">
                                {#each file.expand?.tags ?? [] as tag}
                                        <span
                                                class="px-2 py-1 rounded text-xs font-medium opacity-75 shadow-md"
                                                style="background-color: {tag.color || '#999'}; color: white;"
                                        >
                                            {tag.name}
                                        </span>
                                {/each}
                            </div>
                        </td>
                    </tr>

                    <!-- Mobile Ansicht -->
                    <tr class="sm:hidden border-t">
                        <td class="p-2">
                            <div class="flex justify-between items-center">
                                <span class="font-medium">{file.name}</span>
                                <a
                                        href={`https://backend.xn--edelweipiraten-6fb.de/api/files/public_files/${file.id}/${file.file}`}
                                        download
                                        class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                                    </svg>
                                </a>
                            </div>
                            <button
                                    class="text-blue-600 text-xs mt-2 underline"
                                    on:click={() => expandedRows[file.id] = !expandedRows[file.id]}
                            >
                                {expandedRows[file.id] ? 'Details ausblenden' : 'Details anzeigen'}
                            </button>

                            {#if expandedRows[file.id]}
                                <div class="mt-2 text-xs text-gray-600 space-y-1">
                                    <p><strong>Typ:</strong> {getFileIcon(file.file)}</p>
                                    <p><strong>Stand:</strong> {formatDate(file.updated)}</p>
                                    <div class="flex flex-wrap gap-1">
                                        {#each file.expand?.tags ?? [] as tag}
                                                <span
                                                        class="px-2 py-0.5 rounded text-xs font-medium opacity-75 shadow-md"
                                                        style="background-color: {tag.color || '#999'}; color: white;"
                                                >
                                                    {tag.name}
                                                </span>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    {/if}
</section>

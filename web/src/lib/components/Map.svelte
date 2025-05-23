<script>
    import { onMount } from 'svelte';

    let map;
    const lat = 53.064289;
    const lng = 8.868496;
    const zoom = 16;

    onMount(async () => {
        const L = await import('leaflet');

        map = L.map('map').setView([lat, lng], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lng])
            .addTo(map)
            .bindPopup('Ev. Auferstehungsgemeinde Bremen Hastedt')
            .openPopup();
    });
</script>

<!-- Karte -->
<div id="map" class="relative z-0 w-full h-[400px] rounded shadow"></div>

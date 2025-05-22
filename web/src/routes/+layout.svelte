<script>
    import '../app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Instagram from '$lib/components/Instagram.svelte';

</script>

<div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
        <slot />
        <Instagram />
    </main>
    <Footer />
</div>


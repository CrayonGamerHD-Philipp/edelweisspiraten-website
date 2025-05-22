<script>
    import '../app.css';
    import Navbar from '$lib/components/Navbar.svelte';

    function toggleDark() {
        document.documentElement.classList.toggle('dark');
    }
</script>

<Navbar {toggleDark} />
<slot />

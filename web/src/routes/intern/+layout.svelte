<script lang="ts">
    import { pb } from '$lib/pocketbase';
    import { goto } from '$app/navigation';

    export let data;

    function logout() {
        pb.authStore.clear();
        goto('/');
    }
</script>

<div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow p-4 mb-6">
        <div class="max-w-5xl mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold">Internbereich</h1>
            <div class="flex gap-4 items-center">
                <a href="/" class="text-sm text-blue-600 hover:underline">Zurück zur Startseite</a>
                <button on:click={logout} class="text-sm text-red-600 hover:underline">
                    Logout
                </button>
            </div>
        </div>
    </header>

    <main class="max-w-5xl mx-auto px-4">
        <slot />
    </main>
</div>

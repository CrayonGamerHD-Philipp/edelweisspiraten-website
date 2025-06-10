<script lang="ts">
    import { pb } from '$lib/pocketbase';
    import { goto } from '$app/navigation';

    let email = '';
    let password = '';
    let errorMessage = '';

    async function login() {
        errorMessage = '';
        try {
            await pb.collection('users').authWithPassword(email, password);
            goto('/intern');
        } catch (err: any) {
            errorMessage = err?.response?.message || 'Login failed';
        }
    }
</script>

<section class="max-w-md mx-auto mt-24 p-6 bg-white shadow rounded">
    <h1 class="text-2xl font-bold mb-4">Login</h1>

    {#if errorMessage}
        <div class="text-red-600 mb-3 text-sm">{errorMessage}</div>
    {/if}

    <form on:submit|preventDefault={login} class="space-y-4">
        <input
                type="email"
                placeholder="Email"
                bind:value={email}
                class="w-full border px-3 py-2 rounded"
                required
        />
        <input
                type="password"
                placeholder="Password"
                bind:value={password}
                class="w-full border px-3 py-2 rounded"
                required
        />
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
        </button>
    </form>
</section>

<!-- src/routes/login/+page.svelte -->
<script lang="ts">
    export let form: any;
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form method="POST" class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-gray-200">
        <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>

        {#if form?.error}
            <div class="bg-red-100 text-red-800 p-3 rounded-md">
                {form.error}
            </div>
        {/if}

        <div>
            <label class="block mb-1 font-medium text-gray-700" for="email">E-Mail</label>
            <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={form?.values?.email ?? ''}
            />
        </div>

        <div>
            <label class="block mb-1 font-medium text-gray-700" for="password">Passwort</label>
            <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    class="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>

        <button
                type="submit"
                class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
            Einloggen
        </button>
    </form>
</div>

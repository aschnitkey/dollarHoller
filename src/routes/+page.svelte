<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/login');
	});
</script>

<h1 class="text-3xl font-bold underline">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<a href="/invoices">Invoices</a><br />
<a href="/invoices/test-invoice">Test Invoice</a>

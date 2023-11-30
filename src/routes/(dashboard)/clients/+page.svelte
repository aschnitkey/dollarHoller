<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ClientRowHeader from './ClientRowHeader.svelte';
	import ClientRow from './ClientRow.svelte';
	import Search from '$lib/components/Search.svelte';
	import { clients, loadClients } from '$lib/stores/ClientStore';
	import { onMount } from 'svelte';

	onMount(() => {
		loadClients();
	});
</script>

<svelte:head>
	<title>Clients | The Dollar Holler</title>
</svelte:head>

<div
	class="flex flex-col-reverse items-start justify-between mb-7 lg:mb-16 lg:flex-row lg:items-center md:gap-y-4 gap-y-6"
>
	<!-- Search field -->
	<!-- {#if $invoices.length > 0} -->
	<Search />
	<!-- {:else}
		<div />
	{/if} -->

	<!-- New Client Button -->
	<div>
		<Button
			label={'+ Client'}
			onClick={() => {
				// isInvoiceFormShowing = true;
			}}
		/>
	</div>
</div>

<!-- List of Clients -->

<div>
	{#if $clients === null}
		Loading...
	{:else if $clients.length <= 0}
		Blank State
	{:else}
		<!-- client header row -->
		<ClientRowHeader />

		<!-- client rows -->
		<div class="flex flex-col-reverse">
			{#each $clients as client}
				<ClientRow {client} />
			{/each}
		</div>
	{/if}
</div>

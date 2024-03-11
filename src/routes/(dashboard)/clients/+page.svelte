<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import ClientRowHeader from './ClientRowHeader.svelte';
	import ClientRow from './ClientRow.svelte';
	import Search from '$lib/components/Search.svelte';
	import { clients, loadClients } from '$lib/stores/ClientStore';
	import { onMount } from 'svelte';
	import BlankState from '$lib/components/BlankState.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import ClientForm from './ClientForm.svelte';
	import NoSearchResults from './NoSearchResults.svelte';

	let isClientFormShowing: boolean = false;
	let clientList: Client[] = [];

	const closePanel = () => {
		isClientFormShowing = false;
	};

	const SearchClients = (event: CustomEvent) => {
		const searchTerms = event.detail.searchTerms;
		clientList = $clients.filter((client) => {
			return (
				client?.name?.toLowerCase().includes(searchTerms.toLowerCase()) ||
				client?.email?.toLowerCase().includes(searchTerms.toLowerCase())
			);
		});
	};

	const ClearSearch = (event: CustomEvent) => {
		if (event.detail.searchTerms === '') {
			clientList = $clients;
		}
	};

	onMount(async () => {
		await loadClients();
		clientList = $clients;
	});
</script>

<svelte:head>
	<title>Clients | The Dollar Holler</title>
</svelte:head>

<div
	class="flex flex-col-reverse items-start justify-between mb-7 lg:mb-16 lg:flex-row lg:items-center md:gap-y-4 gap-y-6"
>
	<!-- Search field -->
	{#if $clients.length > 0}
		<Search on:search={SearchClients} on:clear={ClearSearch} />
	{:else}
		<div />
	{/if}

	<!-- New Client Button -->
	<div>
		<Button
			label={'+ Client'}
			onClick={() => {
				isClientFormShowing = true;
			}}
		/>
	</div>
</div>

<!-- List of Clients -->

<div>
	{#if $clients === null}
		Loading...
	{:else if $clients.length <= 0}
		<BlankState pageType="Client" />
	{:else if clientList.length <= 0}
		<NoSearchResults />
	{:else}
		<!-- client header row -->
		<ClientRowHeader />

		<!-- client rows -->
		<div class="flex flex-col-reverse">
			{#each clientList as client}
				<ClientRow {client} />
			{/each}
		</div>
	{/if}
</div>

{#if isClientFormShowing}
	<SlidePanel on:closePanel={closePanel}>
		<ClientForm {closePanel} />
	</SlidePanel>
{/if}

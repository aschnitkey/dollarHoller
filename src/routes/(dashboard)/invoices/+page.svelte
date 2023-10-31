<script lang="ts">
	import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
	import { onMount } from 'svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import Search from '$lib/components/Search.svelte';
	import InvoiceRow from './InvoiceRow.svelte';
	import { totalAmount, numToCurrency } from '$lib/utils/moneyHelpers';
	import BlankState from './BlankState.svelte';
	import InvoiceRowHeader from './InvoiceRowHeader.svelte';

	onMount(() => {
		loadInvoices();
	});
</script>

<svelte:head>
	<title>Invoices | The Dollar Holler</title>
</svelte:head>

<div
	class="flex flex-col-reverse items-start justify-between mb-7 lg:mb-16 lg:flex-row lg:items-center md:gap-y-4 gap-y-6"
>
	<!-- Search field -->
	{#if $invoices.length > 0}
		<Search />
	{:else}
		<div />
	{/if}

	<!-- New Invoice Button -->
	<div>
		<button
			class="relative px-5 py-2 text-base font-black text-white transition translate-y-0 rounded-lg lg:px-10 lg:py-3 lg:text-xl whitespace-nowrap bg-lavenderIndigo font-sansSerif shadow-colored hover:shadow-coloredHover hover:-translate-y-2"
			>+ Invoice</button
		>
	</div>
</div>

<!-- list of invoices -->
<div>
	<!-- header -->

	{#if $invoices === null}
		Loading...
	{:else if $invoices.length <= 0}
		<BlankState />
	{:else}
		<InvoiceRowHeader className={'text-daisyBush'} />
		<div class="flex flex-col-reverse">
			{#each $invoices as invoice}
				<InvoiceRow {invoice} />
			{/each}
		</div>
		<CircledAmount label={'Total'} amount={numToCurrency(totalAmount($invoices))} />
	{/if}
</div>

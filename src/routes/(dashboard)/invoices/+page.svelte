<script lang="ts">
	import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
	import { onMount } from 'svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import Search from '$lib/components/Search.svelte';
	import InvoiceRow from './InvoiceRow.svelte';

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
	<Search />

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
	<div class="hidden lg:grid text-daisyBush invoice-table table-header">
		<h3>Status</h3>
		<h3>Due Date</h3>
		<h3>ID</h3>
		<h3>Client</h3>
		<h3 class="text-right">Amount</h3>
		<div />
		<div />
	</div>
	{#each $invoices as invoice}
		<InvoiceRow {invoice} />
	{/each}
</div>

<!-- summary row -->
<CircledAmount label={'Total'} amount={'$1044.12'} />

<style lang="postcss">
	.table-header {
		@apply text-xl font-black leading-snug;
	}
</style>

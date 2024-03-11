<script lang="ts">
	import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
	import { onMount } from 'svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import Search from '$lib/components/Search.svelte';
	import InvoiceRow from './InvoiceRow.svelte';
	import { totalAmount, numToCurrency } from '$lib/utils/moneyHelpers';
	import BlankState from '$lib/components/BlankState.svelte';
	import InvoiceRowHeader from './InvoiceRowHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import InvoiceForm from './InvoiceForm.svelte';
	import NoSearchResults from './NoSearchResults.svelte';

	let isInvoiceFormShowing = false;
	let invoiceList: Invoice[] = [];

	const ClearSearch = (event: CustomEvent) => {
		if (event.detail.searchTerms === '') {
			invoiceList = $invoices;
		}
	};

	const SearchInvoices = (event: CustomEvent) => {
		const searchTerms = event.detail.searchTerms;
		invoiceList = $invoices.filter((invoice) => {
			return (
				invoice?.client?.name?.toLowerCase().includes(searchTerms.toLowerCase()) ||
				invoice?.invoiceNumber.toLowerCase().includes(searchTerms.toLowerCase()) ||
				invoice?.subject?.toLowerCase().includes(searchTerms.toLowerCase())
			);
		});
	};

	onMount(async () => {
		await loadInvoices();
		invoiceList = $invoices;
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
		<Search on:search={SearchInvoices} on:clear={ClearSearch} />
	{:else}
		<div />
	{/if}

	<!-- New Invoice Button -->
	<div>
		<Button
			label={'+ Invoice'}
			onClick={() => {
				isInvoiceFormShowing = true;
			}}
		/>
	</div>
</div>

<!-- list of invoices -->
<div>
	{#if $invoices === null}
		Loading...
	{:else if $invoices.length <= 0}
		<BlankState />
	{:else if invoiceList.length <= 0}
		<NoSearchResults />
	{:else}
		<InvoiceRowHeader className={'text-daisyBush'} />
		<div class="flex flex-col-reverse">
			{#each invoiceList as invoice}
				<InvoiceRow {invoice} />
			{/each}
		</div>
		<CircledAmount label={'Total'} amount={numToCurrency(totalAmount(invoiceList))} />
	{/if}
</div>

<!-- Slide Panel -->
{#if isInvoiceFormShowing}
	<SlidePanel on:closePanel={() => (isInvoiceFormShowing = false)}
		><InvoiceForm
			closePanel={() => {
				isInvoiceFormShowing = false;
			}}
		/></SlidePanel
	>
{/if}

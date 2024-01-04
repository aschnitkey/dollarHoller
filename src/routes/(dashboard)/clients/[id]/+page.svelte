<script lang="ts">
	import { invoices, loadInvoices } from '$lib/stores/InvoiceStore';
	import { onMount } from 'svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import Search from '$lib/components/Search.svelte';
	import InvoiceRow from '../../invoices/InvoiceRow.svelte';
	import {
		totalAmount,
		numToCurrency,
		dollarsToCents,
		centsToDollars
	} from '$lib/utils/moneyHelpers';
	import BlankState from '$lib/components/BlankState.svelte';
	import InvoiceRowHeader from '../../invoices/InvoiceRowHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import ClientForm from '../ClientForm.svelte';
	import Edit from '$lib/components/icon/Edit.svelte';
	import { clients } from '$lib/stores/ClientStore';

	let isClientFormShowing = false;
	let isEditingCurrentClient = false;
	export let data;

	let editClient = () => {
		isEditingCurrentClient = true;
		isClientFormShowing = true;
	};

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
	{#if data.client?.invoices && data.client.invoices.length > 0}
		<Search />
	{:else}
		<div />
	{/if}

	<!-- New Invoice Button -->
	<div>
		<Button
			label={'+ Client'}
			onClick={() => {
				isClientFormShowing = true;
			}}
		/>
	</div>
</div>

<div class="flex items-center justify-between w-full mb-7">
	<h1 class="text-3xl font-bold font-sansSerif text-daisyBush">Compressed.fm</h1>
	<Button isAnimated={false} style="textOnly" iconLeft={Edit} onClick={editClient} label="Edit" />
</div>

<div class="grid grid-cols-1 gap-4 px-10 mb-10 rounded-lg lg:grid-cols-4 bg-gallery py-7">
	<div class="summary-block">
		<div class="label">Total Overdue</div>
		<div class="number"><sup>$</sup>300.00</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Outstanding</div>
		<div class="number"><sup>$</sup>300.00</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Draft</div>
		<div class="number"><sup>$</sup>300.00</div>
	</div>
	<div class="summary-block">
		<div class="label">Total Paid</div>
		<div class="number"><sup>$</sup>300.00</div>
	</div>
</div>

<!-- list of clients -->
<div>
	{#if data.client.invoices === null}
		Loading...
	{:else if data.client.invoices.length <= 0}
		<BlankState />
	{:else}
		<InvoiceRowHeader className={'text-daisyBush'} />
		<div class="flex flex-col-reverse">
			{#each data.client.invoices as invoice}
				<InvoiceRow {invoice} />
			{/each}
		</div>
		<CircledAmount
			label={'Total'}
			amount={numToCurrency(centsToDollars(totalAmount(data.client.invoices)))}
		/>
	{/if}
</div>

<!-- Slide Panel -->
{#if isClientFormShowing}
	<SlidePanel on:closePanel={() => (isClientFormShowing = false)}
		><ClientForm
			closePanel={() => {
				isClientFormShowing = false;
			}}
			formState={isEditingCurrentClient ? 'edit' : 'create'}
			client={isEditingCurrentClient ? data.client : undefined}
		/></SlidePanel
	>
{/if}

<style lang="postcss">
	.summary-block {
		@apply text-center;
	}

	.label {
		@apply text-sm font-black text-[#A397AD];
	}

	sup {
		@apply relative -top-2;
	}

	.number {
		@apply text-[2rem] font-black text-purple truncate;
	}
</style>

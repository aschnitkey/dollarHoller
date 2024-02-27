<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { convertDateFormat } from '$lib/utils/dateHelpers';
	import LineItemRows from '../LineItemRows.svelte';
	import { loadSettings, settings } from '$lib/stores/SettingsStore';
	import { onMount } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { page } from '$app/stores';

	export let data: { invoice: Invoice };
	let copyLinkLabel = 'Copy Link';

	const printInvoice = () => {
		window.print();
	};

	const copyLink = () => {
		navigator.clipboard.writeText($page.url.href);
		copyLinkLabel = 'Copied!';

		setTimeout(() => {
			copyLinkLabel = 'Copy Link';
		}, 1250);
	};

	const sendInvoice = () => {
		console.log('sending');
	};

	onMount(() => {
		loadSettings();
	});
</script>

<svelte:head>
	<style>
	</style>
</svelte:head>

<div
	class="fixed z-0 flex flex-col justify-between w-full max-w-screen-lg px-4 mb-16 lg:px-0 gap-y-5 md:flex-row print:hidden"
>
	<h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
	<div class="flex flex-wrap items-center gap-2 sm:gap-4 sm:flex-nowrap">
		<Button
			height="short"
			label="Print"
			style="outline"
			isAnimated={false}
			onClick={printInvoice}
		/>
		<Button
			height="short"
			label={copyLinkLabel}
			onClick={copyLink}
			className="min-w-[100px] sm:min-w-[177px] justify-center"
		/>
		<Button height="short" label="Send" onClick={sendInvoice} />
	</div>
</div>

<div
	class="relative z-10 grid grid-cols-6 px-5 py-8 bg-white md:px-32 md:py-16 top-32 gap-x-5 gap-y-8 shadow-invoice print:py-0 print:shadow-none print:top-0"
>
	<div class="col-span-6 sm:col-span-3 print:col-span-3">
		<img
			src="/images/logo.png"
			srcset="/images/logo@2x.png 2x, /images/logo.png 1x"
			alt="Compressed.fm logo"
		/>
	</div>

	<div class="col-span-6 pt-4 sm:col-span-2 sm:col-start-5 print:col-span-3 print:col-start-5">
		{#if $settings && $settings.myName}
			<div class="label">From</div>
			<p>
				{$settings.myName}<br />
				{#if $settings.street && $settings.city && $settings.state && $settings.zip}
					{$settings.street}<br />
					{$settings.city}, {$settings.state}
					{$settings.zip}
				{/if}
			</p>
		{:else}
			<div class="center min-h-[68px] rounded bg-gallery">
				<a class="underline text-stone-600 hover:no-underline" href="#"
					>Add your contact information.</a
				>
			</div>
		{/if}
	</div>

	<div class="col-span-6 sm:col-span-3 print:col-span-3">
		<div class="label">Bill To:</div>
		<p>
			{#if data.invoice.client.name}<strong>{data.invoice.client.name}</strong><br />{/if}
			{#if data.invoice.client.email}{data.invoice.client.email}<br />{/if}
			{#if data.invoice.client.street}{data.invoice.client.street}<br />{/if}
			{#if data.invoice.client.city}{data.invoice.client.city},{/if}
			{#if data.invoice.client.state}{data.invoice.client.state}{/if}
			{#if data.invoice.client.zip}{data.invoice.client.zip}{/if}
		</p>
	</div>

	<div class="col-span-6 sm:col-span-2 sm:col-start-5 print:col-span-3 print:col-start-5">
		<div class="label">Invoice ID</div>
		<p>{data.invoice.invoiceNumber}</p>
	</div>

	<div class="col-span-3">
		<div class="label">Due Date</div>
		<p>{convertDateFormat(data.invoice.dueDate)}</p>
	</div>

	<div class="col-span-3 sm:col-span-2 sm:col-start-5">
		<div class="label">Issue Date</div>
		<p>{convertDateFormat(data.invoice.issueDate)}</p>
	</div>

	<div class="col-span-6">
		<div class="label">Subject</div>
		<p>{data.invoice.subject}</p>
	</div>

	<div class="col-span-6">
		<!-- Line Items -->
		<LineItemRows
			lineItems={data.invoice.lineItems}
			isEditable={false}
			discount={data?.invoice?.discount || 0}
		/>
	</div>

	{#if data.invoice.notes}
		<div class="col-span-6">
			<div class="label">Notes</div>
			<SvelteMarkdown source={data.invoice.notes} />
		</div>
	{/if}

	{#if data.invoice.terms}
		<div class="col-span-6">
			<div class="label">Terms and Conditions</div>
			<SvelteMarkdown source={data.invoice.terms} />
		</div>
	{/if}
</div>

<style lang="postcss">
	.label {
		@apply font-black text-monsoon;
	}
</style>

<script lang="ts">
	import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Dots from '$lib/components/icon/Dots.svelte';
	import View from '$lib/components/icon/View.svelte';
	import Send from '$lib/components/icon/Send.svelte';
	import Trash from '$lib/components/icon/Trash.svelte';
	import Edit from '$lib/components/icon/Edit.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import InvoiceForm from './InvoiceForm.svelte';
	import { convertDateFormat, isLate } from '$lib/utils/dateHelpers';
	import { numToCurrency, sumLineItems } from '$lib/utils/moneyHelpers';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { deleteInvoice } from '$lib/stores/InvoiceStore';

	export let invoice: Invoice;
	let isAddtionalOptionsShowing = false;
	let isOptionsDisabled = false;
	let isModalShowing = false;
	let isInvoiceFormShowing = false;

	const handleDelete = () => {
		isModalShowing = true;
		isAddtionalOptionsShowing = false;
		console.log('deleting');
	};

	const handleEdit = () => {
		isInvoiceFormShowing = true;
		isAddtionalOptionsShowing = false;
	};

	const handleSendInvoice = () => {
		console.log('sending invoice');
	};

	const getInvoiceLabel = (invoice: Invoice) => {
		if (invoice.invoiceStatus === 'sent' || invoice.invoiceStatus === 'paid') {
			isOptionsDisabled = true;
		}
		return invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate)
			? 'late'
			: invoice.invoiceStatus;
	};
</script>

<!-- invoice rows -->
<div
	class="items-center py-3 bg-white rounded-lg lg:py-6 invoice-table invoice-row shadow-tableRow"
>
	<div class="status">
		<Tag className={'ml-auto lg:ml-0'} label={getInvoiceLabel(invoice)} />
	</div>
	<div class="text-sm lg:text-base duedate">{convertDateFormat(invoice.dueDate)}</div>
	<div class="text-sm lg:text-base invoicenumber">{invoice.invoiceNumber}</div>
	<div class="font-bold truncate text- base lg:text-xl clientname whitespace-nowrap">
		{invoice.client.name}
	</div>
	<div
		class="font-mono text-sm font-bold text-right truncate lg:text-base whitespace-nowrap amount"
	>
		{numToCurrency(sumLineItems(invoice.lineItems))}
	</div>
	<div class="hidden text-sm lg:text-lg viewbutton lg:center lg:flex">
		<a href="#" class=" text-pastelPurple hover:text-daisyBush">
			<View />
		</a>
	</div>
	<div class="relative hidden text-sm lg:text-lg morebutton lg:center lg:flex">
		<button
			on:click={() => {
				isAddtionalOptionsShowing = !isAddtionalOptionsShowing;
			}}
			on:blur={() => (isAddtionalOptionsShowing = false)}
			class=" text-pastelPurple hover:text-daisyBush"
		>
			<Dots />
		</button>
		{#if isAddtionalOptionsShowing}
			<AdditionalOptions
				options={[
					{ label: 'Edit', icon: Edit, onClick: handleEdit, disabled: isOptionsDisabled },
					{ label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false },
					{ label: 'Send', icon: Send, onClick: handleSendInvoice, disabled: isOptionsDisabled }
				]}
			/>
		{/if}
	</div>
</div>

<Modal isVisible={isModalShowing} on:close={() => (isModalShowing = false)}>
	<div class="flex flex-col items-center justify-between gap-6 h-full min-h-[175px]">
		<div class="text-xl font-bold text-center text-daisyBush">
			Are you sure you wish to delete this invoice to
			<span class="text-scarlet">{invoice.client.name}</span> for
			<span class="text-scarlet">{numToCurrency(sumLineItems(invoice.lineItems))}</span>?
		</div>
		<div class="flex gap-4">
			<Button
				label={'Cancel'}
				onClick={() => {
					isModalShowing = false;
				}}
				isAnimated={false}
				style="secondary"
			/>
			<Button
				label={'Yes, Delete It'}
				onClick={() => {
					isModalShowing = false;
					deleteInvoice(invoice);
				}}
				isAnimated={false}
				style="destructive"
			/>
		</div>
	</div>
</Modal>

<!-- Slide Panel -->
{#if isInvoiceFormShowing}
	<SlidePanel on:closePanel={() => (isInvoiceFormShowing = false)}
		><InvoiceForm
			{invoice}
			formState={'edit'}
			closePanel={() => {
				isInvoiceFormShowing = false;
			}}
		/></SlidePanel
	>
{/if}

<style>
	.invoice-row {
		grid-template-areas:
			'invoiceNumber invoiceNumber'
			'clientName amount'
			'dueDate status';
	}

	@media (min-width: 1024px) {
		.invoice-row {
			grid-template-areas: 'status dueDate invoiceNumber clientName amount viewButton moreButton';
		}
	}

	.invoice-row .status {
		grid-area: status;
	}

	.invoice-row .duedate {
		grid-area: dueDate;
	}

	.invoice-row .invoicenumber {
		grid-area: invoiceNumber;
	}

	.invoice-row .clientname {
		grid-area: clientName;
	}

	.invoice-row .amount {
		grid-area: amount;
	}

	.invoice-row .viewbutton {
		grid-area: viewButton;
	}

	.invoice-row .morebutton {
		grid-area: moreButton;
	}
</style>

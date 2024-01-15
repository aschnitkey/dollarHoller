<script lang="ts">
	import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Dots from '$lib/components/icon/Dots.svelte';
	import View from '$lib/components/icon/View.svelte';
	import Send from '$lib/components/icon/Send.svelte';
	import Trash from '$lib/components/icon/Trash.svelte';
	import Edit from '$lib/components/icon/Edit.svelte';
	import Cancel from '$lib/components/icon/Cancel.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';
	import InvoiceForm from './InvoiceForm.svelte';
	import { convertDateFormat, isLate } from '$lib/utils/dateHelpers';
	import {
		centsToDollars,
		invoiceTotal,
		numToCurrency,
		sumLineItems
	} from '$lib/utils/moneyHelpers';
	import ConfirmDelete from './ConfirmDelete.svelte';
	import { clickOutside } from '$lib/actions/ClickOutside';
	import { swipe } from '$lib/actions/Swipe';

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

<div class="relative">
	<!-- invoice rows -->
	<div
		class="relative items-center py-3 bg-white rounded-lg lg:py-6 invoice-table invoice-row shadow-tableRow z-row"
		use:swipe={{}}
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
			{numToCurrency(centsToDollars(invoiceTotal(invoice.lineItems, invoice.discount)))}
		</div>
		<div class="hidden text-sm lg:text-lg viewbutton lg:center lg:flex">
			<a href={`/invoices/${invoice.id}`} class=" text-pastelPurple hover:text-daisyBush">
				<View />
			</a>
		</div>
		<div
			class="relative hidden text-sm lg:text-lg morebutton lg:center lg:flex"
			use:clickOutside={() => {
				isAddtionalOptionsShowing = false;
			}}
		>
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

	<!-- swipe to reveal -->
	<div class="absolute inset-0 flex items-center justify-around w-full h-full z-rowActions">
		<button class="action-button">
			<Cancel width={32} height={32} />
			Cancel
		</button>

		{#if !isOptionsDisabled}
			<button class="action-button" on:click={handleEdit}>
				<Edit width={32} height={32} />
				Edit
			</button>

			<button class="action-button" on:click={handleSendInvoice}>
				<Send width={32} height={32} />
				Send
			</button>
		{/if}

		<button class="action-button" on:click={handleDelete}>
			<Trash width={32} height={32} />
			Delete
		</button>

		<a href={`/invoices/${invoice.id}`} class="action-button">
			<View width={32} height={32} />
			View
		</a>
	</div>
</div>

<ConfirmDelete
	{invoice}
	{isModalShowing}
	on:close={() => {
		isModalShowing = false;
	}}
/>

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

<style lang="postcss">
	.action-button {
		@apply flex flex-col items-center justify-center font-bold text-daisyBush cursor-pointer;
	}

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

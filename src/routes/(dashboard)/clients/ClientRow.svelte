<script lang="ts">
	import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Dots from '$lib/components/icon/Dots.svelte';
	import View from '$lib/components/icon/View.svelte';
	import Edit from '$lib/components/icon/Edit.svelte';
	import Trash from '$lib/components/icon/Trash.svelte';
	import Archive from '$lib/components/icon/Archive.svelte';
	import Activate from '$lib/components/icon/Activate.svelte';
	import { centsToDollars, numToCurrency, totalAmount } from '$lib/utils/moneyHelpers';
	import ClientForm from './ClientForm.svelte';
	import SlidePanel from '$lib/components/SlidePanel.svelte';

	let isAddtionalOptionsShowing: boolean = false;
	let isClientFormShowing: boolean = false;

	export let client: Client;

	const receivedInvoices = () => {
		if (client.invoices) {
			// find invoices that have been paid
			const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus === 'paid');

			// get the sum of them
			return totalAmount(paidInvoices);
		}
		return 0;
	};

	const balanceInvoices = () => {
		if (client.invoices) {
			// find invoices that have not been paid
			const paidInvoices = client.invoices.filter((invoice) => invoice.invoiceStatus !== 'paid');

			// get the sum of them
			return totalAmount(paidInvoices);
		}
		return 0;
	};

	const handleEdit = () => {
		isClientFormShowing = true;
		isAddtionalOptionsShowing = false;
	};

	const handleActivate = () => {
		client.clientStatus = 'active';
		isAddtionalOptionsShowing = false;
	};

	const handleArchive = () => {
		client.clientStatus = 'archive';
		isAddtionalOptionsShowing = false;
	};

	const handleDelete = () => {
		console.log('deleting');
	};
</script>

<!-- invoice rows -->
<div class="items-center py-3 bg-white rounded-lg lg:py-6 client-table client-row shadow-tableRow">
	<div class="status">
		<Tag className={'ml-auto lg:ml-0'} label={client.clientStatus} />
	</div>
	<div class="text-base font-bold truncate lg:text-xl whitespace-nowrap clientName">
		{client.name}
	</div>
	<div class="font-mono text-sm font-bold text-right lg:text-lg received">
		{numToCurrency(centsToDollars(receivedInvoices()))}
	</div>
	<div class="font-mono text-sm font-bold text-right lg:text-lg text-scarlet balance">
		{numToCurrency(centsToDollars(balanceInvoices()))}
	</div>
	<div class="relative items-center justify-center hidden lg:flex">
		<a href="#" class="view text-pastelPurple hover:text-daisyBush">
			<View />
		</a>
	</div>
	<div class="relative items-center justify-center hidden lg:flex">
		<button
			on:click={() => {
				isAddtionalOptionsShowing = !isAddtionalOptionsShowing;
			}}
			class="three-dots text-pastelPurple hover:text-daisyBush"
		>
			<Dots />
		</button>
		{#if isAddtionalOptionsShowing}
			<AdditionalOptions
				options={[
					{ label: 'Edit', icon: Edit, onClick: handleEdit, disabled: false },
					{
						label: 'Activate',
						icon: Activate,
						onClick: handleActivate,
						disabled: client.clientStatus === 'active'
					},
					{
						label: 'Archive',
						icon: Archive,
						onClick: handleArchive,
						disabled: client.clientStatus === 'archive'
					},
					{ label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false }
				]}
			/>
		{/if}
	</div>
</div>

<!-- <ConfirmDelete
	{invoice}
	{isModalShowing}
	on:close={() => {
		isModalShowing = false;
	}}
/> -->

<!-- Slide Panel -->
{#if isClientFormShowing}
	<SlidePanel on:closePanel={() => (isClientFormShowing = false)}
		><ClientForm
			{client}
			formState={'edit'}
			closePanel={() => {
				isClientFormShowing = false;
			}}
		/></SlidePanel
	>
{/if}

<style lang="postcss">
	.client-row {
		grid-template-areas:
			'clientName status'
			'received balance';
	}

	@media (min-width: 1024px) {
		.client-row {
			grid-template-areas: 'status clientName received balance view three-dots';
		}
	}

	.clientName {
		grid-area: clientName;
	}

	.status {
		grid-area: status;
	}

	.received {
		@apply text-left lg:text-right;
		grid-area: received;
	}
	.received::before {
		@apply block text-xs font-bold lg:hidden;
		content: 'Received';
	}

	.balance {
		grid-area: balance;
	}
	.balance::before {
		@apply block text-xs font-bold lg:hidden;
		content: 'Balance';
	}
</style>

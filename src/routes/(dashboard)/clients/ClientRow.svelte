<script lang="ts">
	import AdditionalOptions from '$lib/components/AdditionalOptions.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Dots from '$lib/components/icon/Dots.svelte';
	import View from '$lib/components/icon/View.svelte';
	import Edit from '$lib/components/icon/Edit.svelte';
	import Trash from '$lib/components/icon/Trash.svelte';
	import Archive from '$lib/components/icon/Archive.svelte';
	import Activate from '$lib/components/icon/Activate.svelte';

	let isAddtionalOptionsShowing: boolean = false;
	export let client: Client;

	const handleEdit = () => {
		console.log('editing');
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
	<div class="text-base font-bold truncate lg:text-xl whitespace-nowrap client">{client.name}</div>
	<div class="font-mono text-sm font-bold text-right lg:text-lg received">$504.00</div>
	<div class="font-mono text-sm font-bold text-right lg:text-lg text-scarlet balance">$240.00</div>
	<div class="relative items-center justify-center hidden lg:flex">
		<a href="#" class=" text-pastelPurple hover:text-daisyBush">
			<View />
		</a>
	</div>
	<div class="relative items-center justify-center hidden lg:flex">
		<button
			on:click={() => {
				isAddtionalOptionsShowing = !isAddtionalOptionsShowing;
			}}
			class=" text-pastelPurple hover:text-daisyBush"
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
<!-- {#if isInvoiceFormShowing}
	<SlidePanel on:closePanel={() => (isInvoiceFormShowing = false)}
		><InvoiceForm
			{invoice}
			formState={'edit'}
			closePanel={() => {
				isInvoiceFormShowing = false;
			}}
		/></SlidePanel
	>
{/if} -->

<style>
	.client-row {
		grid-template-areas:
			'clientNumber clientNumber'
			'clientName amount'
			'dueDate status';
	}

	@media (min-width: 1024px) {
		.client-row {
			grid-template-areas: 'status client received balance viewButton moreButton';
		}
	}

	.client-row .status {
		grid-area: status;
	}

	.client-row .client {
		grid-area: client;
	}

	.client-row .received {
		grid-area: received;
	}

	.client-row .balance {
		grid-area: balance;
	}

	.client-row .viewbutton {
		grid-area: viewButton;
	}

	.client-row .morebutton {
		grid-area: moreButton;
	}
</style>

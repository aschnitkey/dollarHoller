<script lang="ts">
	import Tag from '$lib/components/Tag.svelte';
	import Dots from '$lib/components/icon/Dots.svelte';
	import View from '$lib/components/icon/View.svelte';

	export let invoice: Invoice;
</script>

<!-- invoice rows -->
<div
	class="items-center py-3 bg-white rounded-lg lg:py-6 invoice-table invoice-row shadow-tableRow"
>
	<div class="status"><Tag className={'ml-auto lg:ml-0'} label={invoice.invoiceStatus} /></div>
	<div class="text-sm lg:text-lg duedate">{invoice.dueDate}</div>
	<div class="text-sm lg:text-lg invoicenumber">{invoice.invoiceNumber}</div>
	<div class="font-bold text- base lg:text-xl clientname">{invoice.client.name}</div>
	<div class="font-mono text-sm font-bold text-right lg:text-lg amount">0</div>
	<div class="hidden text-sm lg:text-lg viewbutton lg:center lg:block">
		<a href="#" class=" text-pastelPurple hover:text-daisyBush">
			<View />
		</a>
	</div>
	<div class="hidden text-sm lg:text-lg morebutton lg:center lg:block">
		<button class=" text-pastelPurple hover:text-daisyBush">
			<Dots />
		</button>
	</div>
</div>

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

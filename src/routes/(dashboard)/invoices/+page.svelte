<script lang="ts">
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import Search from '$lib/components/Search.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Dots from '$lib/components/icon/Dots.svelte';
	import View from '$lib/components/icon/View.svelte';
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
		<h3>Amount</h3>
		<div />
		<div />
	</div>

	<!-- invoice rows -->
	<div
		class="items-center py-3 bg-white rounded-lg lg:py-6 invoice-table invoice-row shadow-tableRow"
	>
		<div class="status"><Tag className={'ml-auto lg:ml-0'} label={'draft'} /></div>
		<div class="text-sm lg:text-lg duedate">10/19/2023</div>
		<div class="text-sm lg:text-lg invoicenumber">12345</div>
		<div class="font-bold text- base lg:text-xl clientname">Andrew Schnitkey</div>
		<div class="font-mono text-sm font-bold text-right lg:text-lg amount">$123.34</div>
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
</div>

<!-- summary row -->
<CircledAmount label={'Total'} amount={'$1044.12'} />

<style lang="postcss">
	.table-header {
		@apply text-xl font-black leading-snug;
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

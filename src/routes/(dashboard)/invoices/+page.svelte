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

<div class="flex items-center justify-between mb-16">
	<!-- Search field -->
	<Search />

	<!-- New Invoice Button -->
	<div>
		<button
			class="relative px-10 py-3 text-xl font-black text-white transition translate-y-0 rounded-lg whitespace-nowrap bg-lavenderIndigo font-sansSerif shadow-colored hover:shadow-coloredHover hover:-translate-y-2"
			>+ Invoice</button
		>
	</div>
</div>

<!-- list of invoices -->
<div>
	<!-- header -->
	<div class=" text-daisyBush invoice-table table-header">
		<h3>Status</h3>
		<h3>Due Date</h3>
		<h3>ID</h3>
		<h3>Client</h3>
		<h3>Amount</h3>
		<div />
		<div />
	</div>

	<!-- invoice rows -->
	<div class="items-center py-6 bg-white rounded-lg invoice-table shadow-tableRow">
		<div><Tag label={'draft'} /></div>
		<div class="text-lg">10/19/2023</div>
		<div class="text-lg">12345</div>
		<div class="text-xl font-bold">Andrew Schnitkey</div>
		<div class="font-mono text-lg font-bold">$123.34</div>
		<div class="text-lg center">
			<a href="#" class=" text-pastelPurple hover:text-daisyBush">
				<View />
			</a>
		</div>
		<div class="text-lg center">
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
</style>

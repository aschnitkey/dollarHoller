<script lang="ts">
	import Search from '$lib/components/Search.svelte';
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
	<div class="grid gap-4 px-6 mb-3 text-daisyBush grid-cols-invoiceTable table-header">
		<h3>Status</h3>
		<h3>Due Date</h3>
		<h3>ID</h3>
		<h3>Client</h3>
		<h3>Amount</h3>
		<div />
		<div />
	</div>

	<!-- invoice rows -->
	<div>
		<div>Tag</div>
		<div>10/19/2023</div>
		<div>12345</div>
		<div>Andrew Schnitkey</div>
		<div>$123.34</div>
		<div>View</div>
		<div>More</div>
	</div>
</div>

<!-- summary row -->
<div>Total: $1044.34</div>

<style lang="postcss">
	.table-header {
		@apply text-xl font-black leading-snug;
	}
</style>

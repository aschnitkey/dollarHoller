<script lang="ts">
	import LineItemRow from './LineItemRow.svelte';

	export let lineItems: LineItems[] | undefined = [
		{ id: '1', amount: 30000, description: 'test', quantity: 2 },
		{ id: '2', amount: 1500, description: 'another', quantity: 4 }
	];
</script>

<div class="grid pb-2 border-b-2 grid-cols-invoiceLineItem border-daisyBush">
	<div class="table-header">Description</div>
	<div class="table-header">Unit Price</div>
	<div class="table-header">Qty</div>
	<div class="table-header">Amount</div>
</div>
<div class="grid grid-cols-invoiceLineItem">
	{#if lineItems}
		{#each lineItems as lineItem}
			<LineItemRow {lineItem} />
		{/each}
	{/if}
</div>

<style lang="postcss">
	.table-header {
		@apply text-sm font-bold text-daisyBush;
	}
</style>

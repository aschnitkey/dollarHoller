<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import LineItemRow from './LineItemRow.svelte';
	import Button from '$lib/components/Button.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';

	export let lineItems: LineItems[] | undefined = undefined;
	let dispatch = createEventDispatcher();
</script>

<div class="pb-2 border-b-2 invoice-line-item border-daisyBush">
	<div class="table-header">Description</div>
	<div class="text-right table-header">Unit Price</div>
	<div class="text-center table-header">Qty</div>
	<div class="text-right table-header">Amount</div>
</div>

{#if lineItems}
	{#each lineItems as lineItem}
		<LineItemRow {lineItem} on:removeLineItem />
	{/each}
{:else}
	Line Items Go Here
{/if}

<div class="invoice-line-item">
	<div class="col-span-2">
		<Button
			label="+ Line Item"
			style="textOnly"
			onClick={() => {
				dispatch('addLineItem');
			}}
			isAnimated={false}
		/>
	</div>

	<div class="py-5 font-bold text-right text-monsoon">Subtotal</div>
	<div class="py-5 font-mono text-right">$250.00</div>
</div>

<div class="invoice-line-item">
	<div class="col-span-2 py-5 font-bold text-right text-monsoon">Discount</div>
	<div class="relative">
		<input
			class="w-full h-10 pr-4 text-right border-b-2 border-dashed line-item border-stone-300 focus:border-solid focus:border-lavenderIndigo focus:outline-none"
			type="number"
			name="discount"
			min="0"
			max="100"
		/>
		<span class="absolute right-0 font-mono top-2">%</span>
	</div>
	<div class="py-5 font-mono text-right">$10.00</div>
</div>

<div class="invoice-line-item">
	<div class="col-span-6">
		<CircledAmount label="Total: " amount="1,440.00" />
	</div>
</div>

<style lang="postcss">
	.table-header {
		@apply text-sm font-bold text-daisyBush;
	}
</style>

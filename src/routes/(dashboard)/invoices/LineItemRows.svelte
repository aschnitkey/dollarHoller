<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import LineItemRow from './LineItemRow.svelte';
	import Button from '$lib/components/Button.svelte';
	import CircledAmount from '$lib/components/CircledAmount.svelte';
	import { sumLineItems, numToCurrency, currencyToNum } from '$lib/utils/moneyHelpers';

	export let lineItems: LineItems[] | undefined = undefined;
	export let discount: number = 0;
	let dispatch = createEventDispatcher();
	let subtotal: string = '0.00';
	let discountedAmount: string = '$0.00';
	let finalTotal: string = '0.00';

	$: if (sumLineItems(lineItems) > 0) {
		subtotal = numToCurrency(sumLineItems(lineItems));
	}
	$: if (discount === null || discount === 0) {
		discountedAmount = '0.00';
	} else if (subtotal && discount) {
		discountedAmount = numToCurrency(sumLineItems(lineItems) * (discount / 100));
	}
	$: finalTotal = numToCurrency(
		Number(currencyToNum(subtotal)) - Number(currencyToNum(discountedAmount))
	);
</script>

<div class="pb-2 border-b-2 invoice-line-item border-daisyBush">
	<div class="table-header">Description</div>
	<div class="text-right table-header">Unit Price</div>
	<div class="text-center table-header">Qty</div>
	<div class="text-right table-header">Amount</div>
</div>

{#if lineItems}
	{#each lineItems as lineItem, index}
		<LineItemRow
			{lineItem}
			canDelete={index > 0 ? true : false}
			on:removeLineItem
			on:updateLineItem
			isRequired={index === 0}
		/>
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
	<div class="py-5 font-mono text-right">{subtotal}</div>
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
			bind:value={discount}
		/>
		<span class="absolute right-0 font-mono top-2">%</span>
	</div>
	<div class="py-5 font-mono text-right">{discountedAmount}</div>
</div>

<div class="invoice-line-item">
	<div class="col-span-6">
		<CircledAmount label="Total: " amount={finalTotal} />
	</div>
</div>

<style lang="postcss">
	.table-header {
		@apply text-sm font-bold text-daisyBush;
	}
</style>

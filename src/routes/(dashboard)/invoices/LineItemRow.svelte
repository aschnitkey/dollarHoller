<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Trash from '$lib/components/icon/Trash.svelte';
	import { twoDecimals } from '$lib/utils/moneyHelpers';

	const dispatch = createEventDispatcher();

	export let lineItem: LineItems;
	export let canDelete: boolean = false;

	let unitPrice: string = twoDecimals(lineItem.amount / lineItem.quantity);
	let amount: string = twoDecimals(lineItem.amount);

	$: {
		amount = twoDecimals(lineItem.quantity * Number(unitPrice));
		lineItem.amount = Number(amount);
	}
</script>

<div class="py-2 border-b-2 invoice-line-item border-fog">
	<div>
		<input class="line-item" type="text" name="description" bind:value={lineItem.description} />
	</div>

	<div>
		<input
			class="text-right line-item"
			type="number"
			name="unitPrice"
			step="0.01"
			min="0"
			bind:value={unitPrice}
			on:blur={() => {
				unitPrice = twoDecimals(Number(unitPrice));
				dispatch('updateLineItem');
			}}
		/>
	</div>

	<div>
		<input
			class="text-center line-item"
			type="number"
			name="quantity"
			min="0"
			bind:value={lineItem.quantity}
			on:blur={() => {
				dispatch('updateLineItem');
			}}
		/>
	</div>

	<div>
		<input
			class="text-right line-item"
			type="number"
			name="amount"
			step="0.01"
			min="0"
			bind:value={amount}
			disabled
		/>
	</div>

	<div>
		{#if canDelete}
			<button
				on:click|preventDefault={() => {
					dispatch('removeLineItem', lineItem.id);
				}}
				class="w-10 h-10 center text-pastelPurple hover:text-lavenderIndigo"><Trash /></button
			>
		{/if}
	</div>
</div>

<style lang="postcss">
	input[type='text'],
	input[type='number'] {
		@apply h-10 w-full border-b-2 border-dashed border-stone-300;
	}

	input[type='text'] {
		@apply font-sansSerif text-xl font-bold;
	}

	input[type='number'] {
		@apply font-mono text-base;
	}

	input[type='text']:focus,
	input[type='number']:focus {
		@apply border-solid border-lavenderIndigo outline-none;
	}

	input[type='number']:disabled,
	input[type='text']:disabled {
		@apply border-b-0 bg-transparent px-0;
	}
</style>

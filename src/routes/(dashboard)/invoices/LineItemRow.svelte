<script lang="ts">
	import Trash from '$lib/components/icon/Trash.svelte';
	import { numToCurrency } from '$lib/utils/moneyHelpers';

	export let lineItem: LineItems;
</script>

<div>{lineItem.description}</div>
<div>{numToCurrency(lineItem.amount / lineItem.quantity)}</div>
<div>{lineItem.quantity}</div>
<div>{numToCurrency(lineItem.amount)}</div>
<div><Trash /></div>

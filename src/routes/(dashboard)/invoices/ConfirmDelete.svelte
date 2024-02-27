<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';
	import { numToCurrency, sumLineItems } from '$lib/utils/moneyHelpers';
	import { deleteInvoice } from '$lib/stores/InvoiceStore';
	import { createEventDispatcher } from 'svelte';
	import { snackbar } from '$lib/stores/SnackbarStore';

	const dispatch = createEventDispatcher();

	export let isModalShowing: boolean = false;
	export let invoice: Invoice;
</script>

<Modal isVisible={isModalShowing} on:close={() => (isModalShowing = false)}>
	<div class="flex flex-col items-center justify-between gap-6 h-full min-h-[175px]">
		<div class="text-xl font-bold text-center text-daisyBush">
			Are you sure you wish to delete this invoice to
			<span class="text-scarlet">{invoice.client.name}</span> for
			<span class="text-scarlet">{numToCurrency(sumLineItems(invoice.lineItems))}</span>?
		</div>
		<div class="flex gap-4">
			<Button
				label={'Cancel'}
				onClick={() => {
					dispatch('close');
				}}
				isAnimated={false}
				style="secondary"
			/>
			<Button
				label={'Yes, Delete It'}
				onClick={async () => {
					dispatch('close');
					await deleteInvoice(invoice);
					snackbar.send({ message: 'Your invoice was successfully deleted.', type: 'success' });
				}}
				isAnimated={false}
				style="destructive"
			/>
		</div>
	</div>
</Modal>

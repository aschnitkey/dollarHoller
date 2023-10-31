<script lang="ts">
	import BlankRow from '$lib/components/BlankRow.svelte';
	import InvoiceRowHeader from './InvoiceRowHeader.svelte';
</script>

<div>
	<div class="-mt-8 md:-mt-6 lg:-mt-14">
		<h2
			class="pl-24 mb-10 text-2xl font-bold text-left bg-left bg-no-repeat md:text-4xl md:text-right md:bg-right font-handwriting text-caribbeanGreen bg-arrowLeftUp md:bg-arrowRightUp pt-14 md:pl-0 md:pr-28"
		>
			Add Your First Invoice
		</h2>
	</div>

	<!-- invoice header -->
	<InvoiceRowHeader className={'text-fog'} />

	<!-- blank rows -->
	<BlankRow />
	<BlankRow />
	<BlankRow />
</div>

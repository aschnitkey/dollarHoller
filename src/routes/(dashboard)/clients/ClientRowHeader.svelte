<script lang="ts">
	export let className = '';
</script>

<div class={`hidden lg:grid client-table table-header ${className}`}>
	<h3>Status</h3>
	<h3>Client</h3>
	<h3 class="text-right">Received</h3>
	<h3 class="text-right">Balance</h3>
	<div />
	<div />
</div>

<style lang="postcss">
	.table-header {
		@apply text-xl font-black leading-snug;
	}

	h3 {
		@apply text-xl font-black leading-snug text-daisyBush;
	}
</style>

<script lang="ts">
	export let className = '';
</script>

<div class={`hidden lg:grid invoice-table table-header ${className}`}>
	<h3>Status</h3>
	<h3>Due Date</h3>
	<h3>ID</h3>
	<h3>Client</h3>
	<h3 class="text-right">Amount</h3>
	<div />
	<div />
</div>

<style lang="postcss">
	.table-header {
		@apply text-xl font-black leading-snug;
	}
</style>

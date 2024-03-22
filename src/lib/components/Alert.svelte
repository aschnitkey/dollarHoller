<script lang="ts">
	export let message: string = '';
</script>

{#if message}
	<div class="p-4 mb-4 text-base text-center text-white rounded-md min-h-[56px] bg-lavenderIndigo">
		<p>{message}</p>
	</div>
{/if}

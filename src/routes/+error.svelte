<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} Error | The Dollar Holler</title>
</svelte:head>

<div class="flex-col w-screen h-screen overflow-x-hidden text-center center">
	<h1
		class="min-h-[250px] min-w-[430px] bg-error bg-center bg-no-repeat text-[11.25rem] font-black text-daisyBush"
	>
		{$page.status}
	</h1>
	<div class="relative -top-12">
		<h2 class="mb-1 text-2xl font-black text-daisyBush">Sorry</h2>
		<p class="text-lg text-daisyBush">{$page.error?.message}</p>
	</div>
</div>

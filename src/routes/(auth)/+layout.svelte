<script lang="ts">
	import Snackbar from '$lib/components/Snackbar.svelte';
	import Unauthenticated from '$lib/components/Unauthenticated.svelte';
</script>

<Unauthenticated>
	<Snackbar />

	<div class="w-full min-h-screen bg-center bg-daisyBush md:bg-auth">
		<div
			class="grid w-full h-screen grid-cols-12 px-4 md:gap-5 auto-rows-min md:auto-rows-fr xl:px-0"
		>
			<div
				class="col-span-12 pt-8 md:col-span-6 lg:col-span-4 lg:col-start-3 xl:col-span-3 xl:col-start-4 md:my-auto"
			>
				<img src="/images/logo.svg" alt="The Dollar Hollar" class="mx-auto" />
			</div>
			<div class="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 md:my-auto">
				<slot />
			</div>
		</div>
	</div>
</Unauthenticated>

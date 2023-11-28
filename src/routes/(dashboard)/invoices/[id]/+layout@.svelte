<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import Arrow from '$lib/components/icon/Arrow.svelte';

	let previousPage: string | undefined = undefined;

	afterNavigate((navigation) => {
		previousPage = navigation?.from?.url?.pathname;
	});
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			goto(previousPage || '/invoices');
		}
	}}
/>

<div class="w-screen h-full min-h-screen pt-16 pb-32 lg:pt-12 bg-whisper">
	<main class="max-w-screen-lg min-h-screen mx-auto">
		<a
			href={previousPage ? previousPage : '/invoices'}
			class="fixed top-7 left-7 text-pastelPurple"
		>
			<Arrow />
		</a>
		<slot><!-- Optional Fallback --></slot>
	</main>
</div>

<script lang="ts">
	import { fly } from 'svelte/transition';
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

<div
	class="w-screen h-full min-h-screen pt-16 pb-32 lg:pt-12 bg-whisper print:bg-transparent print:pt-0 print:pb-0"
>
	<main class="max-w-screen-lg min-h-screen mx-auto" transition:fly={{ y: 500, duration: 250 }}>
		<a
			href={previousPage ? previousPage : '/invoices'}
			class="fixed top-7 left-7 text-pastelPurple print:hidden"
		>
			<Arrow />
		</a>
		<slot><!-- Optional Fallback --></slot>
	</main>
</div>

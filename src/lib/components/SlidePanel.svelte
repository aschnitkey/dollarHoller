<script lang="ts">
	import { clickOutside } from '$lib/actions/ClickOutside';
	import Overlay from '$lib/components/Overlay.svelte';
	import Portal from '$lib/components/Portal.svelte';
	import Arrow from '$lib/components/icon/Arrow.svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			dispatch('closePanel');
		}
	}}
/>

<!-- Slide Panel -->
<Portal>
	<Overlay />
	<div
		class="fixed top-0 right-0 w-full h-screen px-5 pt-16 overflow-y-scroll bg-white lg:w-3/4 lg:px-32 lg:py-20 z-slidePanel shadow-slidePanel"
		transition:slide={{ duration: 300, axis: 'x' }}
		use:clickOutside={() => {
			dispatch('closePanel');
		}}
	>
		<button
			class="absolute top-5 left-7 text-pastelPurple hover:text-daisyBush"
			on:click={() => {
				dispatch('closePanel');
			}}><Arrow /></button
		>
		<slot><!-- Optional Fallback --></slot>
	</div>
</Portal>

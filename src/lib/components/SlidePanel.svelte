<script lang="ts">
	import Overlay from '$lib/components/Overlay.svelte';
	import Portal from '$lib/components/Portal.svelte';
	import Arrow from '$lib/components/icon/Arrow.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Escape') {
			dispatch('close');
		}
	}}
/>

<!-- Slide Panel -->
<Portal>
	<Overlay />
	<div
		class="fixed top-0 right-0 w-3/4 h-screen px-32 py-20 overflow-y-scroll bg-white z-slidePanel shadow-slidePanel"
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

<script>
	import View from '$lib/components/icon/View.svelte';
</script>

<ul class="absolute left-0 bg-white rounded-lg shadow-lg top-4">
	<li>
		<button
			class="flex w-full p-4 font-bold gap-x-2 font-sansSerif text-pastelPurple hover:text-daisyBush"
		>
			<View />
			Send
		</button>
	</li>
	<li>
		<button
			class="flex w-full p-4 font-bold gap-x-2 font-sansSerif text-pastelPurple hover:text-daisyBush"
		>
			<View />
			Send
		</button>
	</li>
	<li>
		<button
			class="flex w-full p-4 font-bold gap-x-2 font-sansSerif text-pastelPurple hover:text-daisyBush"
		>
			<View />
			Send
		</button>
	</li>
</ul>

<style lang="postcss">
	li {
		@apply border-b-2 border-whisper;
	}

	li:last-child {
		@apply border-b-0;
	}
</style>

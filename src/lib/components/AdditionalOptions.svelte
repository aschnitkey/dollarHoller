<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';

	export let options: {
		label: string;
		icon?: new (...args: any[]) => SvelteComponent;
		disabled: boolean;
		onClick: () => void;
	}[];
</script>

<ul class="absolute left-0 bg-white rounded-lg shadow-lg top-4">
	{#each options as option}
		{#if !option.disabled}
			<li>
				<button
					on:click={option.onClick}
					class="flex w-full p-4 font-bold gap-x-2 font-sansSerif text-pastelPurple hover:text-daisyBush"
					>{#if option.icon}
						<svelte:component this={option.icon} />
					{/if}
					{option.label}
				</button>
			</li>
		{/if}
	{/each}
</ul>

<style lang="postcss">
	li {
		@apply border-b-2 border-whisper;
	}

	li:last-child {
		@apply border-b-0;
	}
</style>

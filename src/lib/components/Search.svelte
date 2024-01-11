<script lang="ts">
	import Search from '$lib/components/icon/Search.svelte';
</script>

<div class="relative flex items-baseline w-full">
	<div class="mt-auto mr-2 text-pastelPurple">
		<Search />
	</div>
	<input
		type="text"
		name="search"
		placeholder="Search by keyword"
		class="search pr-[80px] w-full text-base lg:text-xl text-black bg-transparent border-b-2 border-dashed outline-none md:w-[14rem] lg:w-72 border-b-pastelPurple font-sansSerif focus:border-b-lavenderIndigo focus:border-solid"
	/>
	<button
		class="absolute text-base font-black transition-transform transform pointer-events-none left-8 lg:text-xl font-sansSerif text-pastelPurple"
		>Search</button
	>
</div>

<style lang="postcss">
	::placeholder {
		@apply text-transparent;
	}

	input:not(:placeholder-shown) + button,
	input:focus + button {
		@apply translate-x-[calc(100%-65px)] md:translate-x-[16rem] lg:translate-x-80 left-auto right-0 md:left-0 md:right-auto text-right text-lavenderIndigo pointer-events-auto;
	}

	input + button:focus,
	input:focus + button:hover {
		@apply text-daisyBush;
	}
</style>

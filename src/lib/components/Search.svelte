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
		class="w-full text-base lg:text-xl text-black bg-transparent border-b-2 border-dashed outline-none md:w-[14rem] lg:w-72 border-b-pastelPurple font-sansSerif focus:border-b-lavenderIndigo focus:border-solid"
	/>
	<button class="text-base font-black lg:text-xl font-sansSerif text-pastelPurple">Search</button>
</div>

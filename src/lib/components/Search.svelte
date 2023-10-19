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
		class="text-xl text-black bg-transparent border-b-2 border-dashed outline-none w-72 border-b-pastelPurple font-sansSerif focus:border-b-lavenderIndigo focus:border-solid"
	/>
	<button class="text-xl font-black font-sansSerif text-pastelPurple">Search</button>
</div>

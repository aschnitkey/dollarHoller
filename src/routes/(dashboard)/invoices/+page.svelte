<script lang="ts">
	import Search from '$lib/components/icon/Search.svelte';
	import Dots from '$lib/components/icon/Dots.svelte';
	import View from '$lib/components/icon/View.svelte';
</script>

<svelte:head>
	<title>Invoices | The Dollar Holler</title>
</svelte:head>

<div>
	<!-- Search field -->
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

	<!-- New Invoice Button -->
	<div>
		<button>+ Invoice</button>
	</div>
</div>

<!-- list of invoices -->
<div>
	<!-- header -->
	<div>
		<h3>Status</h3>
		<h3>Issue Date</h3>
		<h3>ID</h3>
		<h3>Client</h3>
		<h3>Amount</h3>
		<div />
		<div />
	</div>

	<!-- invoice rows -->
	<div>
		<div>Tag</div>
		<div>10/19/2023</div>
		<div>12345</div>
		<div>Andrew Schnitkey</div>
		<div>$123.34</div>
		<div>View</div>
		<div>More</div>
	</div>
</div>

<!-- summary row -->
<div>Total: $1044.34</div>

<script>
	import '../app.css';
</script>

<nav class="flex flex-row justify-between w-full py-1 mb-5">
	<h1 class="text-5xl font-bold font-handwriting">Everything Svelte</h1>
	<div>
		<a href="/" class="m-1">Home</a>
		<a href="/signup" class="m-1">Signup</a>
		<a href="/invoices/andrew-schnitkey">Andrew</a>
	</div>
</nav>
<slot />

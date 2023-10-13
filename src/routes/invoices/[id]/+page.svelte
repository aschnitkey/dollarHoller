<script lang="ts">
	export let data;
	console.log(data);
</script>

<h1>Invoice</h1>
<p>Name: {data.id.replaceAll('-', ' ')}</p>

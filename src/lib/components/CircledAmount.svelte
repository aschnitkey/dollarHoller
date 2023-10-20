<script lang="ts">
	export let label: string, amount: string;
</script>

<div class="flex bg-no-repeat gap-x-4 bg-circle min-h-[6rem] min-w-[16rem] center float-right">
	<div class="font-bold">{label}</div>
	<div class="font-mono text-xl font-bold">{amount}</div>
</div>

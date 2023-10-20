<script lang="ts">
	export let label: 'draft' | 'sent' | 'current' | 'late' | 'paid' = 'draft';
</script>

<div
	class="w-20 text-base font-bold text-center capitalize border rounded-full"
	class:inverted={label === 'draft'}
	class:success={label === 'sent' || label === 'current'}
	class:alert={label === 'late'}
	class:archive={label === 'paid'}
>
	{label}
</div>

<style lang="postcss">
	.inverted {
		@apply border-purple text-pastelPurple;
	}

	.success {
		@apply border-robinEggBlue bg-robinEggBlue text-blueGem;
	}

	.alert {
		@apply border-scarlet bg-scarlet text-goldenFizz;
	}

	.archive {
		@apply border-pastelPurple bg-pastelPurple text-white;
	}
</style>

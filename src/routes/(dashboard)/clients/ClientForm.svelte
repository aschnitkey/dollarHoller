<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Trash from '$lib/components/icon/Trash.svelte';
	import { states } from '$lib/utils/states';

	export let closePanel = () => {};
</script>

<h2 class="text-3xl font-bold mb-7 font-sansSerif text-daisyBush">Add a Client</h2>

<form class="grid grid-cols-6 gap-x-5">
	<div class="col-span-6 field">
		<label for="name">Client Name</label>
		<input type="text" name="name" required />
	</div>

	<div class="col-span-6 field">
		<label for="email">Email Address</label>
		<input type="email" name="email" required />
	</div>

	<div class="col-span-6 field">
		<label for="street">Address</label>
		<input type="text" name="street" />
	</div>

	<div class="col-span-2 field">
		<label for="city">City</label>
		<input type="text" name="city" />
	</div>

	<div class="col-span-2 field">
		<label for="state">State</label>
		<select name="state" id="state">
			<option />
			{#each states as state}
				<option value={state.value}>{state.name}</option>
			{/each}
		</select>
	</div>

	<div class="col-span-2 field">
		<label for="zip">Zip Code</label>
		<input type="text" name="zip" />
	</div>

	<div class="col-span-3 field">
		<Button
			label="Delete"
			onClick={() => {}}
			isAnimated={false}
			style="textOnlyDestructive"
			iconLeft={Trash}
		/>
	</div>

	<div class="col-span-3 field">
		<Button label="Cancel" onClick={closePanel} style="secondary" isAnimated={false} />
	</div>
</form>

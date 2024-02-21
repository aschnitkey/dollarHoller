<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Check from '$lib/components/icon/Check.svelte';
	import Trash from '$lib/components/icon/Trash.svelte';
	import { addClient, updateClient } from '$lib/stores/ClientStore';
	import { snackbar } from '$lib/stores/SnackbarStore';
	import { states } from '$lib/utils/states';

	export let client: Client = {} as Client;
	export let formState: 'create' | 'edit' = 'create';
	export let closePanel: () => void = () => {};

	const handleSubmit = async () => {
		if (formState === 'create') {
			await addClient(client);
		} else {
			updateClient(client);
			snackbar.send({ message: 'Client Successfully Modified', type: 'success' });
		}
		closePanel();
	};
</script>

<h2 class="text-3xl font-bold mb-7 font-sansSerif text-daisyBush">
	{formState === 'create' ? 'Add a' : 'Edit'} Client
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
	<div class="col-span-6 field">
		<label for="name">Client Name</label>
		<input type="text" name="name" required bind:value={client.name} />
	</div>

	<div class="col-span-6 field">
		<label for="email">Email Address</label>
		<input type="email" name="email" required bind:value={client.email} />
	</div>

	<div class="col-span-6 field">
		<label for="street">Address</label>
		<input type="text" name="street" bind:value={client.street} />
	</div>

	<div class="col-span-2 field">
		<label for="city">City</label>
		<input type="text" name="city" bind:value={client.city} />
	</div>

	<div class="col-span-2 field">
		<label for="state">State</label>
		<select name="state" id="state" bind:value={client.state}>
			<option />
			{#each states as state}
				<option value={state.value}>{state.name}</option>
			{/each}
		</select>
	</div>

	<div class="col-span-2 field">
		<label for="zip">Zip Code</label>
		<input type="text" name="zip" bind:value={client.zip} />
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

	<div class="flex justify-end col-span-3 field gap-x-5">
		<Button label="Cancel" onClick={closePanel} style="secondary" isAnimated={false} />
		<button
			class="flex items-center justify-center text-white transition-all translate-y-0 button gap-x-2 bg-lavenderIndigo shadow-colored hover:shadow-coloredHover hover:-translate-y-2"
			type="submit"
		>
			<Check />
			Submit
		</button>
	</div>
</form>

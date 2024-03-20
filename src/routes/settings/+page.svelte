<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Snackbar from '$lib/components/Snackbar.svelte';
	import Check from '$lib/components/icon/Check.svelte';
	import { loadSettings, settings } from '$lib/stores/SettingsStore';
	import { states } from '$lib/utils/states';
	import { onMount } from 'svelte';

	let mySettings: Settings = {} as Settings;

	onMount(() => {
		loadSettings();
		mySettings = { ...$settings };
	});
</script>

<Snackbar />
<div class="grid min-h-screen grid-cols-12 md:gap-x-16 bg-whisper">
	<Navbar />
	<main
		class="col-span-12 px-4 pt-4 md:col-span-8 md:pt-10 md:px-0 md:col-start-4 lg:col-span-6 lg:col-start-5"
	>
		<h2>Invoice Details</h2>
		<p class="mb-8">This information gets included on each invoice.</p>

		<form class="grid grid-cols-6 gap-x-5">
			<div class="col-span-6 field">
				<label for="myName">Name</label>
				<input type="text" name="myName" id="myName" bind:value={mySettings.myName} />
			</div>
			<div class="col-span-6 field">
				<label for="street">Street</label>
				<input type="text" name="street" id="street" bind:value={mySettings.street} />
			</div>
			<div class="col-span-6 md:col-span-2 field">
				<label for="city">City</label>
				<input type="text" name="city" id="city" bind:value={mySettings.city} />
			</div>
			<div class="col-span-6 md:col-span-2 field">
				<label for="state">State</label>
				<select name="state" id="state" bind:value={mySettings.state}>
					<option />
					{#each states as state}
						<option value={state.value}>{state.name}</option>
					{/each}
				</select>
			</div>
			<div class="col-span-6 md:col-span-2 field">
				<label for="zip">Zip</label>
				<input type="text" name="zip" id="zip" bind:value={mySettings.zip} />
			</div>
			<div class="flex justify-end col-span-6 field">
				<Button label="Save" iconLeft={Check} onClick={() => {}} />
			</div>
		</form>

		<div class="col-span-6">
			<h2>Update Account Information</h2>
			<p class="mb-8">This information is used to access your account.</p>
		</div>
		<form class="grid grid-cols-6 gap-x-5">
			<div class="col-span-6 field md:col-span-3">
				<label for="email">Email Address</label>
				<input type="email" name="email" id="email" />
			</div>
			<div class="col-span-6 field md:col-span-3">
				<label for="currentPassword">Current Password</label>
				<input type="password" name="currentPassword" id="currentPassword" />
			</div>
			<div class="col-span-6 field md:col-span-3">
				<label for="newPassword">New Password</label>
				<input type="password" name="newPassword" id="newPassword" />
			</div>
			<div class="col-span-6 field md:col-span-3">
				<label for="confirmPassword">Confirm New Password</label>
				<input type="password" name="confirmPassword" id="confirmPassword" />
			</div>
			<div class="flex justify-end col-span-6 field">
				<Button label="Save" iconLeft={Check} onClick={() => {}} />
			</div>
		</form>
	</main>
</div>

<style lang="postcss">
	h2 {
		@apply mb-1 text-3xl font-black text-daisyBush;
	}
	p {
		@apply mb-8;
	}
</style>

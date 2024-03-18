<script lang="ts">
	import { goto } from '$app/navigation';

	let email: string;
	let password: string;
	let message: string = '';
	let isLoading: boolean = false;

	import Alert from '$lib/components/Alert.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import Activate from '$lib/components/icon/Activate.svelte';
	import { displayErrorMessage } from '$lib/utils/handleError';
	import supabase from '$lib/utils/supabase';

	const handleSubmit = async () => {
		isLoading = true;
		message = '';
		let { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			message = error.message;
			console.error(error);
		} else {
			goto('/invoices');
		}
		isLoading = false;
	};
</script>

<h1 class="auth-heading">Login</h1>

<form on:submit|preventDefault={handleSubmit}>
	<Alert {message} />
	<fieldset disabled={isLoading}>
		<div class="field">
			<label for="email" class="text-goldenFizz">Email Address</label>
			<input type="email" name="email" id="email" placeholder="Your Email" bind:value={email} />
		</div>
		<div class="field">
			<div class="flex justify-between">
				<label for="password" class="text-goldenFizz">Password</label>
				<a href="/forgot-password" class="text-sm text-white underline hover:no-underline"
					>Forgot?</a
				>
			</div>
			<input
				type="password"
				name="password"
				id="password"
				placeholder="Your Password"
				bind:value={password}
			/>
		</div>
		<div class="field">
			<button type="submit" class="flex items-center justify-center auth-submit gap-x-2">
				{#if isLoading}
					<Loader /> Loading...
				{:else}
					Let's do this!
				{/if}
			</button>
			<p class="mt-4 text-sm text-center text-white">
				<a href="/signup" class="underline hover:no-underline">Dont' have an account yet?</a>
			</p>
		</div>
	</fieldset>
</form>

<script lang="ts">
	import { displayErrorMessage } from '$lib/utils/handleError';
	import supabase from '$lib/utils/supabase';
	import Alert from '$lib/components/Alert.svelte';

	let email: string;
	let message = '';

	const handleSubmit = async () => {
		let { data, error } = await supabase.auth.resetPasswordForEmail(email);

		if (error) {
			displayErrorMessage(error);
			return;
		}

		message = 'Check email for instructions';
	};
</script>

<h1 class="auth-heading">Forgot Password</h1>

<form on:submit|preventDefault={handleSubmit}>
	<Alert {message} />
	<div class="field">
		<label for="email" class="text-goldenFizz">Email Address</label>
		<input
			type="email"
			name="email"
			id="email"
			placeholder="enter your email address"
			required
			bind:value={email}
		/>
	</div>
	<button type="submit" class="auth-submit">Reset Password</button>
	<p class="mt-4 text-sm text-center text-white">
		<a href="/login" class="underline hover:no-underline">Ready to login?</a>
	</p>
</form>

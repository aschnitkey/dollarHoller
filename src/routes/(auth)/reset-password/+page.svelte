<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import supabase from '$lib/utils/supabase';
	import { redirect } from '@sveltejs/kit';

	let message: string = '';
	let newPassword: string, confirmPassword: string;
	let isLoading = false;

	const handleSubmit = async () => {
		isLoading = true;
		message = '';

		if (newPassword !== confirmPassword) {
			message = 'Passwords Do Not Match';
			isLoading = false;
			return;
		}
		const { data, error } = await supabase.auth.updateUser({
			password: newPassword
		});

		if (error) {
			message = error.message;
			console.error(error);
			isLoading = false;
			return;
		}

		isLoading = false;
		redirect(303, '/login');
	};
</script>

<Alert {message} />
<h1 class="auth-heading">Reset My Password</h1>

<form on:submit={handleSubmit}>
	<div class="field">
		<label for="newPassword" class="text-goldenFizz">New Password</label>
		<input
			type="password"
			name="newPassword"
			id="newPassword"
			placeholder="enter new password"
			required
			bind:value={newPassword}
		/>
	</div>
	<div class="field">
		<label for="confirmPassword" class="text-goldenFizz">Confirm Password</label>
		<input
			type="password"
			name="confirmPassword"
			id="confirmPassword"
			placeholder="confirm your new password"
			required
			bind:value={confirmPassword}
		/>
	</div>
	<button type="submit" class="auth-submit">{isLoading ? 'Loading' : 'Update My Password'}</button>
	<p class="mt-4 text-sm text-center text-white">
		<a href="/login" class="underline hover:no-underline">I'm ready to login</a>
	</p>
</form>

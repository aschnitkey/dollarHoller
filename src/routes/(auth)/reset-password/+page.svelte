<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';

	export let form;
</script>

<h1 class="auth-heading">Reset My Password</h1>

<form method="POST">
	<Alert message={form?.error} />
	<div class="field">
		<label for="newPassword" class="text-goldenFizz">New Password</label>
		<input
			type="password"
			name="newPassword"
			id="newPassword"
			placeholder="enter new password"
			required
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
		/>
	</div>
	<button type="submit" class="auth-submit">Update My Password</button>
	<p class="mt-4 text-sm text-center text-white">
		<a href="/login" class="underline hover:no-underline">I'm ready to login</a>
	</p>
</form>

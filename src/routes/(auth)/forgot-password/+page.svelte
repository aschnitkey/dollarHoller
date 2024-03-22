<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';

	export let form;
	export let email = form?.values?.email || '';
</script>

<h1 class="auth-heading">Forgot Password</h1>

<form method="POST">
	{#if form?.success}
		<Alert message={'Check email for password link'} />
	{:else}
		<Alert message={form?.error} />
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
	{/if}
</form>

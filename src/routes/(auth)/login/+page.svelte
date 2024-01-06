<script lang="ts">
	let email: string;
	let password: string;
	let alertMessage: string = '';

	import Alert from '$lib/components/Alert.svelte';
</script>

<!-- <h1 class="mb-4 text-[2.5rem] text-goldenFizz">Login</h1> -->

<form>
	<Alert message={alertMessage} />
	<div class="field">
		<label for="email" class="text-goldenFizz">Email Address</label>
		<input type="email" name="email" id="email" placeholder="Your Email" bind:value={email} />
	</div>
	<div class="field">
		<div class="flex justify-between">
			<label for="password" class="text-goldenFizz">Password</label>
			<a href="/forgot-password" class="text-sm text-white underline hover:no-underline">Forgot?</a>
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
		<button
			type="submit"
			class="mt-6 min-h-[3.5rem] w-full rounded-lg bg-robinEggBlue text-daisyBush py-3 px-4 text-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
			>Let's do this!</button
		>
		<p class="mt-4 text-sm text-center text-white">
			<a href="/signup" class="underline hover:no-underline">Dont' have an account yet?</a>
		</p>
	</div>
</form>

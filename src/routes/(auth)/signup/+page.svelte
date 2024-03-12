<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import Loader from '$lib/components/Loader.svelte';

	import supabase from '$lib/utils/supabase';

	let fullName: string,
		email: string,
		password: string,
		confirmPass: string,
		message: string = '',
		isSignUpFormShowing: boolean = true,
		isLoading: boolean = false;

	const handleSubmit = async () => {
		isLoading = true;
		message = '';

		if (password !== confirmPass) {
			message = 'Passwords Do Not Match';
			isLoading = false;
			return;
		}

		// Sign up the user
		let userResults = await supabase.auth.signUp({
			email,
			password
		});

		if (userResults.error) {
			message = userResults.error.message;
			console.error(userResults.error);
			isLoading = false;
			return;
		}

		// Add the full name to settings table
		if (userResults?.data?.user?.id) {
			const settingsResults = await supabase
				.from('settings')
				.insert([{ myName: fullName, userId: userResults.data.user.id }])
				.select();

			if (settingsResults.error) {
				message = settingsResults.error.message;
				console.log(settingsResults.error);
				isLoading = false;
				return;
			}
		}

		isSignUpFormShowing = false;
		isLoading = false;
	};
</script>

{#if isSignUpFormShowing}
	<h1 class="auth-heading">Sign Up</h1>

	<Alert {message} />

	<form on:submit|preventDefault={handleSubmit}>
		<fieldset disabled={isLoading}>
			<div class="field">
				<label for="fullName" class="text-goldenFizz">Full Name</label>
				<input
					type="text"
					name="fullName"
					id="fullName"
					placeholder="your name here"
					bind:value={fullName}
				/>
			</div>
			<div class="field">
				<label for="email" class="text-goldenFizz">Email Address</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="your email address"
					required
					bind:value={email}
				/>
			</div>
			<div class="field">
				<label for="createPass" class="text-goldenFizz">Create Password</label>
				<input
					type="password"
					name="createPass"
					id="createPass"
					placeholder="create a password"
					required
					bind:value={password}
				/>
			</div>
			<div class="field">
				<label for="confirmPass" class="text-goldenFizz">Confirm Password</label>
				<input
					type="password"
					name="confirmPass"
					id="confirmPass"
					placeholder="confirm password"
					required
					bind:value={confirmPass}
				/>
			</div>
			<button type="submit" class="flex items-center justify-center gap-x-2 auth-submit"
				>{#if isLoading}<Loader /> Loading{:else}Count Me In{/if}</button
			>
			<p class="mt-4 text-sm text-center text-white">
				<a href="/login" class="underline hover:no-underline">Already have an account?</a>
			</p>
		</fieldset>
	</form>
{:else}
	<Alert message={'Check Email For Confirmation Link'} />
	<a href="/login" class="block text-center auth-submit">Log In</a>
{/if}

<h1 class="auth-heading">Sign Up</h1>

<form>
	<div class="field">
		<label for="fullName" class="text-goldenFizz">Full Name</label>
		<input type="text" name="fullName" id="fullName" placeholder="your name here" />
	</div>
	<div class="field">
		<label for="email" class="text-goldenFizz">Email Address</label>
		<input type="email" name="email" id="email" placeholder="your email address" required />
	</div>
	<div class="field">
		<label for="createPass" class="text-goldenFizz">Create Password</label>
		<input
			type="password"
			name="createPass"
			id="createPass"
			placeholder="create a password"
			required
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
		/>
	</div>
	<button type="submit" class="auth-submit">Count Me In</button>
	<p class="mt-4 text-sm text-center text-white">
		<a href="/login" class="underline hover:no-underline">Already have an account?</a>
	</p>
</form>

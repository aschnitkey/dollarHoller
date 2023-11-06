<script>
	import Button from '$lib/components/Button.svelte';
</script>

<h2 class="text-3xl font-bold mb-7 font-sansSerif text-daisyBush">Add an Invoice</h2>

<form class="grid grid-cols-6 gap-x-5">
	<!-- client -->
	<div class="col-span-2 field">
		<label for="client">Client</label>
		<select name="client" id="client">
			<option value="zeal">Zeal</option>
		</select>
	</div>
	<div class="flex items-end col-span-3 field">
		<div class="text-base font-bold text-monsoon leading-[3.5rem]">or</div>
		<Button label="+ Client" onClick={() => {}} />
	</div>

	<!-- invoice id -->
	<div class="col-span-2 field">
		<label for="id">Invoice ID</label>
		<input type="number" name="id" />
	</div>

	<!-- due date -->
	<div class="col-span-2 field">
		<label for="dueDate">Due Date</label>
		<input type="date" name="dueDate" />
	</div>

	<!-- issue date -->
	<div class="col-span-2 col-start-5 field">
		<label for="issueDate">Issue Date</label>
		<input type="date" name="issueDate" />
	</div>

	<!-- subject -->
	<div class="col-span-6 field">
		<label for="subject">Subject Line</label>
		<input type="text" id="subject" />
	</div>

	<!-- line items -->
	<div class="col-span-6 field">Line Items</div>

	<!-- notes -->
	<div class="col-span-6 field">
		<label for="notes"
			>Notes <span class="font-normal">(optional, displayed on invoice)</span></label
		>
		<textarea name="notes" id="notes" />
	</div>

	<!-- terms -->
	<div class="col-span-6 field">
		<label for="terms"
			>Terms <span class="font-normal">(optional, enter your terms and conditions)</span></label
		>
		<textarea name="terms" id="terms" />
		<div class="text-xs text-gray-400">
			Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>
		</div>
	</div>

	<!-- buttons -->
	<div class="col-span-2 field">
		<!-- only visible if editing -->
		<button>Delete</button>
	</div>
	<div class="flex justify-end col-span-4 field">
		<button>Cancel</button>
		<button>Save</button>
	</div>
</form>

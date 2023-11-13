<script lang="ts">
	import { slide } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';
	import Button from '$lib/components/Button.svelte';
	import Trash from '$lib/components/icon/Trash.svelte';
	import LineItemRows from './LineItemRows.svelte';
	import el from 'date-fns/locale/el';
	import { states } from '$lib/utils/states';

	const blankLineItem = {
		id: uuidv4(),
		description: '',
		quantity: 0,
		amount: 0
	};

	let lineItems: LineItems[] = [{ ...blankLineItem }];
	let isNewClient: boolean = false;

	const addLineItem = () => {
		lineItems = [...lineItems, { ...blankLineItem, id: uuidv4() }];
	};

	const removeLineItem = (event) => {
		lineItems = lineItems.filter((item) => item.id !== event.detail);
	};

	const updateLineItem = () => {
		lineItems = lineItems;
	};
</script>

<h2 class="text-3xl font-bold mb-7 font-sansSerif text-daisyBush">Add an Invoice</h2>

<form class="grid grid-cols-6 gap-x-5">
	<!-- client -->
	<div class="col-span-4 field">
		{#if !isNewClient}
			<label for="client">Client</label>
			<div class="flex items-end gap-x-5">
				<select name="client" id="client">
					<option value="zeal">Zeal</option>
				</select>
				<div class="text-base font-bold text-monsoon leading-[3.5rem]">or</div>
				<Button
					label="+ Client"
					onClick={() => {
						isNewClient = true;
					}}
					style="outline"
					isAnimated={false}
				/>
			</div>
		{:else}
			<label for="NewClient">New Client</label>
			<div class="flex items-end gap-x-5">
				<input type="text" name="newClient" />
				<div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
				<Button
					label="Existing Client"
					onClick={() => {
						isNewClient = false;
					}}
					style="outline"
					isAnimated={false}
				/>
			</div>
		{/if}
	</div>

	<!-- invoice id -->
	<div class="col-span-2 field">
		<label for="id">Invoice ID</label>
		<input type="number" name="id" />
	</div>

	<!-- new client -->
	{#if isNewClient}
		<div class="grid col-span-6 field gap-x-5" transition:slide>
			<div class="col-span-6 field">
				<label for="email">Client's Email</label>
				<input type="email" name="email" id="email" />
			</div>
		</div>

		<div class="col-span-6 field">
			<label for="street">Street</label>
			<input type="text" name="street" id="street" />
		</div>

		<div class="col-span-2 field">
			<label for="city">City</label>
			<input type="text" name="city" id="city" />
		</div>

		<div class="col-span-2 field">
			<label for="state">State</label>
			<select name="state" id="state">
				<option />
				{#each states as state}
					<option value={state.value}>{state.name}</option>
				{/each}
			</select>
		</div>

		<div class="col-span-2 field">
			<label for="zip">Zip</label>
			<input type="text" name="zip" id="zip" />
		</div>
	{/if}

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
	<div class="col-span-6 field">
		<LineItemRows
			{lineItems}
			on:addLineItem={addLineItem}
			on:removeLineItem={removeLineItem}
			on:updateLineItem={updateLineItem}
		/>
	</div>

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
		<Button
			label="Delete"
			onClick={() => {}}
			style="textOnlyDestructive"
			isAnimated={false}
			iconLeft={Trash}
		/>
	</div>
	<div class="flex justify-end col-span-4 field gap-x-5">
		<Button label="Cancel" style="secondary" isAnimated={false} onClick={() => {}} />
		<Button label="Save" onClick={() => {}} />
	</div>
</form>

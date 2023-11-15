<script lang="ts">
	import { addClient, clients, loadClients } from '$lib/stores/ClientStore';
	import { slide } from 'svelte/transition';
	import { v4 as uuidv4 } from 'uuid';
	import Button from '$lib/components/Button.svelte';
	import Trash from '$lib/components/icon/Trash.svelte';
	import LineItemRows from './LineItemRows.svelte';
	import { states } from '$lib/utils/states';
	import { onMount } from 'svelte';
	import { today } from '$lib/utils/dateHelpers';
	import { addInvoice } from '$lib/stores/InvoiceStore';
	import el from 'date-fns/locale/el';

	const blankLineItem = {
		id: uuidv4(),
		description: '',
		quantity: 0,
		amount: 0
	};

	let isNewClient: boolean = false;
	export let invoice: Invoice = {
		client: {} as Client,
		lineItems: [{ ...blankLineItem }] as LineItems[]
	} as Invoice;
	let newClient: Partial<Client> = {};

	export let formState: 'create' | 'edit' = 'create';

	export let closePanel: () => void = () => {};

	const addLineItem = () => {
		invoice.lineItems = [...(invoice.lineItems as []), { ...blankLineItem, id: uuidv4() }];
	};

	const removeLineItem = (event: CustomEvent) => {
		invoice.lineItems =
			invoice?.lineItems && invoice.lineItems.filter((item) => item.id !== event.detail);
	};

	const updateLineItem = () => {
		invoice.lineItems = invoice.lineItems;
	};

	const handleSubmit = () => {
		if (isNewClient) {
			invoice.client = newClient as Client;
			addClient(newClient as Client);
		}

		addInvoice(invoice);

		closePanel();
	};

	onMount(() => {
		loadClients();
	});
</script>

<h2 class="text-3xl font-bold mb-7 font-sansSerif text-daisyBush">
	{#if formState === 'create'}
		Add
	{:else}
		Edit
	{/if} an Invoice
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
	<!-- client -->
	<div class="col-span-4 field">
		{#if !isNewClient}
			<label for="client">Client</label>
			<div class="flex items-end gap-x-5">
				<select
					name="client"
					id="client"
					required={!isNewClient}
					bind:value={invoice.client.id}
					on:change={() => {
						const selectedClient = $clients.find((client) => client.id === invoice.client.id);
						invoice.client.name = selectedClient?.name !== undefined ? selectedClient.name : '';
					}}
				>
					<option />
					{#each $clients as client}
						<option value={client.id}>{client.name}</option>
					{/each}
				</select>
				<div class="text-base font-bold text-monsoon leading-[3.5rem]">or</div>
				<Button
					label="+ Client"
					onClick={() => {
						isNewClient = true;
						invoice.client.name = '';
						invoice.client.email = '';
					}}
					style="outline"
					isAnimated={false}
				/>
			</div>
		{:else}
			<label for="NewClient">New Client</label>
			<div class="flex items-end gap-x-5">
				<input type="text" name="newClient" required={isNewClient} bind:value={newClient.name} />
				<div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
				<Button
					label="Existing Client"
					onClick={() => {
						isNewClient = false;
						newClient = {};
					}}
					style="outline"
					isAnimated={false}
				/>
			</div>
		{/if}
	</div>

	<!-- invoice id -->
	<div class="col-span-2 field">
		<label for="invoiceNumber">Invoice ID</label>
		<input type="number" name="invoiceNumber" required bind:value={invoice.invoiceNumber} />
	</div>

	<!-- new client -->
	{#if isNewClient}
		<div class="grid col-span-6 field gap-x-5" transition:slide>
			<div class="col-span-6 field">
				<label for="email">Client's Email</label>
				<input
					type="email"
					name="email"
					id="email"
					required={isNewClient}
					bind:value={newClient.email}
				/>
			</div>
		</div>

		<div class="col-span-6 field">
			<label for="street">Street</label>
			<input type="text" name="street" id="street" bind:value={newClient.street} />
		</div>

		<div class="col-span-2 field">
			<label for="city">City</label>
			<input type="text" name="city" id="city" bind:value={newClient.city} />
		</div>

		<div class="col-span-2 field">
			<label for="state">State</label>
			<select name="state" id="state" bind:value={newClient.state}>
				<option />
				{#each states as state}
					<option value={state.value}>{state.name}</option>
				{/each}
			</select>
		</div>

		<div class="col-span-2 field">
			<label for="zip">Zip</label>
			<input type="text" name="zip" id="zip" bind:value={newClient.zip} />
		</div>
	{/if}

	<!-- due date -->
	<div class="col-span-2 field">
		<label for="dueDate">Due Date</label>
		<input type="date" name="dueDate" min={today} required bind:value={invoice.dueDate} />
	</div>

	<!-- issue date -->
	<div class="col-span-2 col-start-5 field">
		<label for="issueDate">Issue Date</label>
		<input type="date" name="issueDate" min={today} bind:value={invoice.issueDate} />
	</div>

	<!-- subject -->
	<div class="col-span-6 field">
		<label for="subject">Subject Line</label>
		<input type="text" id="subject" bind:value={invoice.subject} />
	</div>

	<!-- line items -->
	<div class="col-span-6 field">
		<LineItemRows
			discount={invoice.discount}
			lineItems={invoice.lineItems}
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
		<textarea name="notes" id="notes" bind:value={invoice.notes} />
	</div>

	<!-- terms -->
	<div class="col-span-6 field">
		<label for="terms"
			>Terms <span class="font-normal">(optional, enter your terms and conditions)</span></label
		>
		<textarea name="terms" id="terms" bind:value={invoice.terms} />
		<div class="text-xs text-gray-400">
			Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>
		</div>
	</div>

	<!-- buttons -->
	<div class="col-span-2 field">
		<!-- only visible if editing -->
		{#if formState === 'edit'}
			<Button
				label="Delete"
				onClick={() => {}}
				style="textOnlyDestructive"
				isAnimated={false}
				iconLeft={Trash}
			/>
		{/if}
	</div>
	<div class="flex justify-end col-span-4 field gap-x-5">
		<Button
			label="Cancel"
			style="secondary"
			isAnimated={false}
			onClick={() => {
				closePanel();
			}}
		/>
		<button
			type="submit"
			class="text-white transition translate-y-0 button shadow-colored hover:shadow-coloredHover hover:-translate-y-2 bg-lavenderIndigo"
			>Save</button
		>
	</div>
</form>

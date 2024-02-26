import { displayErrorMessage } from '$lib/utils/handleError';
import supabase from '$lib/utils/supabase';
import { writable } from 'svelte/store';
import { snackbar } from './SnackbarStore';

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = async () => {
	const { data, error } = await supabase
		.from('invoice')
		.select('*, client(id, name), lineItems(*)');

	if (error) {
		console.error(error);
		return;
	}

	invoices.set(data as Invoice[]);
};

export const deleteInvoice = (invoiceToDelete: Invoice) => {
	invoices.update((prev: Invoice[]) =>
		prev.filter((cur: Invoice) => cur.id !== invoiceToDelete.id)
	);
	return invoiceToDelete;
};

export const addInvoice = async (invoiceToAdd: Invoice) => {
	const { lineItems, client, ...newInvoice } = invoiceToAdd;

	// add invoice to supabase

	const invoiceResults = await supabase
		.from('invoice')
		.insert([{ ...newInvoice, clientId: client.id }])
		.select();

	if (invoiceResults.error) {
		displayErrorMessage(invoiceResults.error as Error);
		return;
	}

	// get invoice ID
	const invoiceId = invoiceResults.data[0].id;

	const isSuccessful = await addLineItems(lineItems, invoiceId);
	if (!isSuccessful) return;

	//update the store
	invoices.update((prev: Invoice[]) => [...prev, { ...invoiceToAdd, id: invoiceId }]);
	snackbar.send({ message: 'Your invoice was successfully created.', type: 'success' });
	return invoiceToAdd;
};

const addLineItems = async (
	lineItems: LineItems[] | undefined,
	invoiceId: string
): Promise<boolean> => {
	let isSuccessful = true;

	if (lineItems && lineItems.length > 0) {
		const newLineItems = lineItems.map((lineItem: LineItems) => ({ ...lineItem, invoiceId }));

		// add the line items to supabase

		const lineItemResults = await supabase.from('lineItems').insert(newLineItems).select();

		if (lineItemResults.error) {
			displayErrorMessage(lineItemResults.error as Error);
			isSuccessful = false;
		}
	}
	return isSuccessful;
};

const deleteLineItems = async (invoiceId: string): Promise<boolean> => {
	let isSuccessful = true;

	const { error } = await supabase.from('lineItems').delete().eq('invoiceId', invoiceId);

	if (error) {
		displayErrorMessage(error as Error);
		isSuccessful = false;
	}

	return isSuccessful;
};

export const updateInvoice = async (invoiceToUpdate: Invoice) => {
	const { lineItems, client, ...updatedInvoice } = invoiceToUpdate;
	// update the client
	// TODO: update the client

	// delete all the line items
	let isSuccessful = await deleteLineItems(invoiceToUpdate.id);
	if (!isSuccessful) return;

	// add new line items
	isSuccessful = await addLineItems(lineItems, updatedInvoice.id);
	if (!isSuccessful) return;

	// update the invoice within supabase

	// update the store
	invoices.update((prev: Invoice[]) =>
		prev.map((curr: Invoice) => (curr.id === invoiceToUpdate.id ? invoiceToUpdate : curr))
	);
	return invoiceToUpdate;
};

export const getInvoiceById = async (id: string) => {
	let { data, error } = await supabase
		.from('invoice')
		.select('*, client(id, name), lineItems(*)')
		.eq('id', id);

	if (error) {
		console.error(error);
		return;
	}

	if (data && data[0]) {
		return data[0];
	}
	console.warn(`cannot find invoice with id: ` + id);
};

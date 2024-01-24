import supabase from '$lib/utils/supabase';
import { writable } from 'svelte/store';

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = async () => {
	const { data, error } = await supabase
		.from('invoice')
		.select('*, client(id, name), lineItems(*)');

	if (error) {
		console.error(error);
		return;
	}
	console.log(data);

	invoices.set(data as Invoice[]);
};

export const deleteInvoice = (invoiceToDelete: Invoice) => {
	invoices.update((prev: Invoice[]) =>
		prev.filter((cur: Invoice) => cur.id !== invoiceToDelete.id)
	);
	return invoiceToDelete;
};

export const addInvoice = (invoiceToAdd: Invoice) => {
	invoices.update((prev: Invoice[]) => [...prev, invoiceToAdd]);
	return invoiceToAdd;
};

export const updateInvoice = (invoiceToUpdate: Invoice) => {
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

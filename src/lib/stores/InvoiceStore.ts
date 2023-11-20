import { writable } from 'svelte/store';
import data from '../../seed.json';

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = () => {
	invoices.set(data.invoices);
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

export const getInvoiceById = (id: string) => {
	return data.invoices.find((invoice: Invoice) => invoice.id === id);
};

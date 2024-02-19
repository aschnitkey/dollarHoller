import { writable } from 'svelte/store';
import supabase from '$lib/utils/supabase';
import { snackbar } from './SnackbarStore';

export const clients = writable<Client[]>([]);

export const loadClients = async () => {
	const { data, error } = await supabase
		.from('client')
		.select('*, invoice(id, invoiceStatus, lineItems(*))');

	if (error) {
		console.error(error);
		return;
	}

	if (data) {
		clients.set(data as Client[]);
	}

	// clients.set(data.clients);
};

/**
 * Takes in a client and adds to the Client Store
 * @param {Client} clientToAdd
 * @returns {Client} clientToAdd
 */
export const addClient = async (clientToAdd: Client) => {
	const { data, error } = await supabase
		.from('client')
		.insert([{ ...clientToAdd, clientStatus: 'active' }])
		.select();

	if (error) {
		console.error(error);
		snackbar.send({ message: error.message, type: 'error' });
		return;
	}

	const id = data[0].id;

	clients.update((prev: Client[]) => [...prev, { ...clientToAdd, clientStatus: 'active', id }]);
	return clientToAdd;
};

export const updateClient = (clientToUpdate: Client) => {
	clients.update((prev: Client[]) =>
		prev.map((cur: Client) => (cur.id === clientToUpdate.id ? clientToUpdate : cur))
	);
	return clientToUpdate;
};

export const getClientById = async (id: string) => {
	let { data, error } = await supabase
		.from('client')
		.select('*, invoice(id, invoiceStatus, invoiceNumber, dueDate, client(id, name), lineItems(*))')
		.eq('id', id);

	if (error) {
		console.error(error);
		return;
	}

	if (data && data[0]) {
		return data[0] as Client;
	}

	console.warn('cannot find a client');

	// return data.clients.find((client) => client.id === id);
};

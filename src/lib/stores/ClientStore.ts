import { writable } from 'svelte/store';
import data from '../../seed.json';

export const clients = writable<Client[]>([]);

export const loadClients = () => {
	clients.set(data.clients);
};

/**
 * Takes in a client and adds to the Client Store
 * @param {Client} clientToAdd
 * @returns {Client} clientToAdd
 */
export const addClient = (clientToAdd: Client) => {
	clients.update((prev: Client[]) => [...prev, { ...clientToAdd, clientStatus: 'active' }]);
	return clientToAdd;
};

export const updateClient = (clientToUpdate: Client) => {
	clients.update((prev: Client[]) =>
		prev.map((cur: Client) => (cur.id === clientToUpdate.id ? clientToUpdate : cur))
	);
	return clientToUpdate;
};

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
	clients.update((prev: Client[]) => [...prev, clientToAdd]);
	return clientToAdd;
};

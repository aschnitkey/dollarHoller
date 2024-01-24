import { getClientById } from '$lib/stores/ClientStore.js';

export async function load({ params }) {
	const id = params?.id;
	const client = await getClientById(id);
	return { client };
}

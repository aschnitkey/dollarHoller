// src/routes/profile/+page.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { session } = await parent();
	if (!session) {
		redirect(303, '/login');
	}
};

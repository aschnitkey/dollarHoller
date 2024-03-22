import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const newPasword = formData.get('newPassword');
		const confirmPasword = formData.get('confirmPassword');

		if (newPasword !== confirmPasword) {
			const message = 'Passwords do not match';
			return fail(400, { error: message });
		}

		const { data, error } = await supabase.auth.updateUser({
			password: newPasword as string
		});

		if (error) {
			return fail(400, {
				error: error.message
			});
		} else {
			throw redirect(303, '/login');
		}
	}
};

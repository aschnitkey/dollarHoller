import { PUBLIC_BASE_URL } from '$env/static/public';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		const { data, error } = await supabase.auth.resetPasswordForEmail(email as string, {
			redirectTo: `${PUBLIC_BASE_URL}/reset-password`
		});

		if (error) {
			return fail(400, {
				error: error.message,
				values: { email }
			});
		} else {
			return { success: true };
		}
	}
};

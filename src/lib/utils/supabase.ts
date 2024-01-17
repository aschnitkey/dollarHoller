import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
	'https://wfdwkqqeycwdxerzxuyl.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZHdrcXFleWN3ZHhlcnp4dXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1MDcyMzQsImV4cCI6MjAyMTA4MzIzNH0.JVEG5UrQRu2oCn6y3y0eJ3BP_tBRGrkTwUdT7mjAe5Y'
);

export default supabase;

interface Invoice {
	id: string;
	invoiceStatus: InvoiceStatus;
	issueDate: string;
	invoiceNumber: string;
	client: Client;
	dueDate: string;
	subject?: string;
	lineItems?: LineItems[];
	notes?: string;
	terms?: string;
	createdAt: string;
	discount?: number;
}

interface Client {
	clientStatus?: ClientStatus;
	id: string;
	name: string;
	email: string;
	street?: string;
	city?: string;
	state?: string;
	zip?: string;
	invoice?: Invoice[];
}

interface LineItems {
	id: string;
	description: string;
	quantity: number;
	amount: number;
}

interface Settings {
	myName: string;
	email: string;
	street: string;
	city: string;
	state: string;
	zip: string;
}

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Snackbar {
	id: string;
	message: string;
	type: NotificationType;
}

interface Error {
	code: string;
	details: string;
	hint: string;
	message: string;
}

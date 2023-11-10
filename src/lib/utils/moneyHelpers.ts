/**
 * Accepts a collection of line items from invoices and returns the sum of all the line item amounts
 * @param {LineItems[] | undefined} lineItems
 * @returns {number}
 */
export const sumLineItems = (lineItems: LineItems[] | undefined): number => {
	const sum = 0;
	if (!lineItems) return 0;
	return lineItems.reduce((prev, curr) => {
		return prev + curr.amount;
	}, 0);
};

/**
 * Takes in a number and converts it to US currency which is returned as a string
 * @param {number} num
 * @returns {string}
 */
export const numToCurrency = (num: number): string => {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
};

/**
 * Takes in a collection of invoices and returns the total amount of all of the invoices
 * @param {Invoice[] | undefined} invoices
 * @returns {number}
 */
export const totalAmount = (invoices: Invoice[] | undefined): number => {
	if (!invoices) return 0;
	return invoices.reduce((prev, curr) => {
		const invoiceSum = sumLineItems(curr.lineItems);
		return prev + invoiceSum;
	}, 0);
};

/**
 * Takes in a currency string and return the numeric value
 * @param currency
 * @returns number
 */
export const currencyToNum = (currency: string): string => {
	let numericString = currency.replace(/[^0-9.-]+/g, '');
	return parseFloat(numericString).toFixed(2);
};

export const twoDecimals = (num: number): string => {
	return num.toFixed(2);
};

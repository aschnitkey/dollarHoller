export const sumLineItems = (lineItems: LineItems[] | undefined): number => {
	const sum = 0;
	if (!lineItems) return 0;
	return lineItems.reduce((prev, curr) => {
		return prev + curr.amount;
	}, 0);
};

export const numToCurrency = (num: number): string => {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
};

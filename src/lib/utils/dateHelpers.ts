import { isBefore } from 'date-fns';

export const splitDate = (inputDate: string): string[] => {
	return inputDate.split('-');
};

export const convertDateFormat = (inputDate: string): string => {
	const [year, month, day] = splitDate(inputDate);
	return `${parseInt(month)}-${parseInt(day)}-${parseInt(year)}`;
};

export const isLate = (inputDate: string): boolean => {
	const [year, month, day] = splitDate(inputDate);
	const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));
	const currentDate = new Date();
	return isBefore(dueDate, currentDate);
};

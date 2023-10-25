import { isBefore } from 'date-fns';

/**
 * This takes in a date and returns the numeric values as an array of strings
 * @param {string} inputDate
 * @returns {string}
 */

export const splitDate = (inputDate: string): string[] => {
	return inputDate.split('-');
};

/**
 * This takes in a date formatted as yyyy-mm-dd and returns it formated as m-d-yyyy
 * @param {string} inputDate
 * @returns {string}
 */
export const convertDateFormat = (inputDate: string): string => {
	const [year, month, day] = splitDate(inputDate);
	return `${parseInt(month)}-${parseInt(day)}-${parseInt(year)}`;
};

/**
 * Takes in a due date and checks if today's date is past the due date
 * @param {string} inputDate
 * @returns {boolean}
 */
export const isLate = (inputDate: string): boolean => {
	const [year, month, day] = splitDate(inputDate);
	const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));
	const currentDate = new Date();
	return isBefore(dueDate, currentDate);
};

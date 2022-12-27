import { format, parseISO } from 'date-fns';
// https://date-fns.org/

export const Formatdate = ({ date }) => {
	const _date = format(parseISO(date), 'd MMM, yyyy');
	return <>Created on {_date}</>;
};

export const Truncate = (_input, limit) => {
	let input = _input.replace(/<[^>]*>?/gm, '');
	return input.length > limit ? `${input.substring(0, limit)}...` : input;
};

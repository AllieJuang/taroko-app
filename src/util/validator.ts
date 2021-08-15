/* eslint-disable indent */
import { useState } from 'react';

export type ValidatorType = 'required' | 'email';

export type FormError = Error | null;

interface Error {
	[key: string]: string;
}

type useValidatorsFunc = (
	types: ValidatorType[],
	value: string,
) => [FormError, () => void, () => string];

export const useValidators: useValidatorsFunc = (types: ValidatorType[], value: string) => {
	const [error, setError] = useState<FormError>(null);
	const errorMsgCofig = {
		required: 'This field is required',
		email: 'The email format is wrong',
	};

	const validate = () => {
		setError(() => null);
		let errObj = {};

		types.forEach(type => {
			if (type === 'required' && !value.trim()) {
				errObj = { [type]: errorMsgCofig[type] };
			} else if (type === 'email') {
				const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
				if (!emailRegex.test(value)) {
					errObj = { ...errObj, ...{ [type]: errorMsgCofig[type] } };
				}
			}
		});
		setError(() => (Object.keys(errObj).length > 0 ? errObj : null));
	};

	const getErrorMsg = () =>
		typeof error === 'object' && error !== null
			? Object.keys(error)
					.map(k => error[k])
					.reduce((pre, curr) => `${pre}、${curr}`)
			: '';

	return [error, validate, getErrorMsg];
};

import { useState } from 'react';
import { FormError } from './validator';

export type FormFieldValue = string | number;

export interface FormObject {
	[key: string]: FormFieldObject;
}

export interface FormFieldObject {
	value: FormFieldValue;
	error: FormError;
}

export interface FormRawData {
	[key: string]: unknown;
}

type useFormBuilderFunc = <T>(
	initialData: T,
) => [
	T,
	(key: string, value: FormFieldValue, error?: FormError) => void,
	(value: T) => void,
	(formEl: React.RefObject<HTMLFormElement>) => void,
	(form: { [key: string]: FormFieldObject }) => FormRawData,
];

export const useFormBuilder: useFormBuilderFunc = <T>(initialData: T) => {
	const [formObject, setFormObj] = useState<T>(initialData);

	const updateFormValue = (formData: T) => setFormObj(pre => ({ ...pre, ...formData }));

	const handleFormField = (key: string, value: FormFieldValue, error: FormError = null) => {
		setFormObj(pre => ({ ...pre, ...{ [key]: { value, error } } }));
	};

	const makeFormAsTouched = (formRef: React.RefObject<HTMLFormElement>) => {
		if (formRef.current) {
			const inputs = formRef.current.querySelectorAll('input');
			inputs.forEach(input => {
				input.focus();
				input.blur();
			});
		}
	};

	const getRawData = (form: { [key: string]: FormFieldObject }) => {
		return Object.keys(form)
			.map(k => {
				return { [k]: form[k].value as unknown };
			})
			.reduce((pre, curr) => ({ ...pre, ...curr }));
	};

	return [formObject, handleFormField, updateFormValue, makeFormAsTouched, getRawData];
};

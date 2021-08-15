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

	return [formObject, handleFormField, updateFormValue, makeFormAsTouched];
};

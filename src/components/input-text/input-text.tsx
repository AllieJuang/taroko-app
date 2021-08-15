/* eslint-disable react/jsx-props-no-spreading */
import classnames from 'classnames';
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { FormError, useValidators, ValidatorType } from '../../util/validator';
import styles from './input-text.module.scss';



interface InputTextProperty extends InputHTMLAttributes<HTMLInputElement> {
	validators?: ValidatorType[];
	className?: string;
	onChangeValue?: (v: string, error: FormError) => void;
	onBlurValue?: (v: string) => void;
}

const InputText: React.FC<InputTextProperty> = ({
	className = '',
	onChangeValue = () => {},
	onBlurValue = () => {},
	validators = [],
	...props
}) => {
	const { type = 'text', value } = props;
	const [error, validate, getErrorMsg] = useValidators(validators, value as string);
	const firstUpdate = useRef(true);
	const touched = useRef(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const val = e.target.value ? e.target.value : '';
		onChangeValue(val, null);
	};

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		if (touched.current) {
			validate();
		}
	}, [value]);

	useEffect(() => {
		onChangeValue(value as string, error);
	}, [error]);

	return (
		<div
			className={classnames(styles.inputText, styles[className], {
				[styles.invalid]: error,
			})}
		>
			<input
				{...props}
				type={type}
				onChange={handleInputChange}
				onBlur={() => {
					validate();
					touched.current = true;
					onBlurValue(value as string);
				}}
			/>
			<div className={classnames(styles.error)}>
				<span>{getErrorMsg()}</span>
			</div>
		</div>
	);
};

export default InputText;

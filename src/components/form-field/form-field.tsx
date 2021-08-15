import classnames from 'classnames';
import React from 'react';
import styles from './form-field.module.scss';


interface FormFieldProperty {
	label: string;
	required: boolean;
	children: React.ReactNode;
}

const FormField: React.FC<FormFieldProperty> = ({ label, required, children }) => (
	<div className={classnames(styles.formField)}>
		<div className={classnames(styles.label)}>
			<span>{label}</span>
			{required && <span className={classnames(styles.required)}>*</span>}
		</div>
		<>{children}</>
	</div>
);

export default FormField;

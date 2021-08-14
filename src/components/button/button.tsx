import classnames from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import styles from './button.module.scss';


interface ButtonProperty extends InputHTMLAttributes<HTMLButtonElement> {
	name: string;
	action: () => void;
	className: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProperty> = ({
	className = 'primary',
	name,
	action,
	disabled,
	children,
}) => (
	<button
		type="button"
		className={classnames(styles.button, styles[className])}
		onClick={action}
		disabled={disabled}
	>
		{name}
		{children}
	</button>
);

export default Button;

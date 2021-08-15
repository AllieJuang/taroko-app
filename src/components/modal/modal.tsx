/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classnames from 'classnames';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';


const modalElement = document.getElementById('modal-root') as HTMLElement;

interface ModalProperty {
	className?: string;
	children: React.ReactNode;
	fade?: boolean;
	defaultOpened?: boolean;
	hasBackdrop?: boolean;
	disableClose?: boolean;
}

interface ModalHandle {
	open: () => void;
	close: () => void;
}

const Modal = forwardRef<ModalHandle, ModalProperty>(
	(
		{
			className = '',
			children,
			fade = true,
			defaultOpened = false,
			hasBackdrop = false,
			disableClose = true,
		},
		ref,
	) => {
		const [isOpen, setIsOpen] = useState(defaultOpened);
		const close = useCallback(() => setIsOpen(false), []);

		useImperativeHandle(ref, () => ({ open: () => setIsOpen(true), close }), [close]);

		const handleEscape = useCallback(
			event => {
				if (event.keyCode === 27) close();
			},
			[close],
		);

		useEffect(() => {
			if (isOpen) document.addEventListener('keydown', handleEscape, false);
			return () => {
				document.removeEventListener('keydown', handleEscape, false);
			};
		}, [handleEscape, isOpen]);

		return createPortal(
			isOpen ? (
				<div className={classnames(styles.modal, styles[className], { [styles.modalFade]: fade })}>
					<div
						className={classnames(styles.modalOverlay)}
						onClick={() => {
							if (hasBackdrop) {
								close();
							}
						}}
					/>
					{!disableClose && (
						<span
							role="button"
							className={classnames(styles.modalClose)}
							aria-label="close"
							onClick={close}
						>
							x
						</span>
					)}
					<div className={classnames(styles.modalBody)}>{children}</div>
				</div>
			) : (
				<></>
			),
			modalElement,
		);
	},
);

export default Modal;

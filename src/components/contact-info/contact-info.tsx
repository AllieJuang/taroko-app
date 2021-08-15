import classnames from 'classnames';
import React, { useRef } from 'react';
import { FormFieldObject, useFormBuilder } from '../../util/form';
import Button from '../button/button';
import FormField from '../form-field/form-field';
import InputText from '../input-text/input-text';
import styles from './contact-info.module.scss';

interface ContactInfo {
  [key: string]: FormFieldObject;
}

const initialData: ContactInfo = {
	firstName: { value: '', error: null },
	lastName: { value: '', error: null },
  job: { value: '', error: null },
	description: { value: '', error: null },
};

interface ContactInfoProperty {
  close?: () => void;
}


const ContactInfo: React.FC<ContactInfoProperty> = ({close = () => {},}) => {
  const [formObject, handleFormField, updateFormValue] = useFormBuilder<ContactInfo>(
		initialData,
	);
	const formRef = useRef<HTMLFormElement | null>(null);

  const submit = () => {
    if (formRef.current) {
			const inputs = formRef.current.querySelectorAll('input');
			inputs.forEach(input => {
				input.focus();
				input.blur();
			});
		}
  }
  
  return (
    <div className={classnames(styles.contactInfo)}>
      <form ref={formRef}>
        <FormField label="First Name" required>
          <InputText
            key="firstName"
            value={formObject.firstName.value as string}
            validators={['required']}
            onChangeValue={(v, err) => handleFormField('firstName', v, err)}
          />
        </FormField>
        <FormField label="Last Name" required>
          <InputText
            key="lastName"
            value={formObject.lastName.value as string}
            validators={['required']}
            onChangeValue={(v, err) => handleFormField('lastName', v, err)}
          />
        </FormField>
        <FormField label="Job" required>
          <InputText
            key="job"
            value={formObject.job.value as string}
            validators={['required']}
            onChangeValue={(v, err) => handleFormField('job', v, err)}
          />
        </FormField>
        <FormField label="Description" required>
          <InputText
            key="description"
            value={formObject.description.value as string}
            validators={['required']}
            onChangeValue={(v, err) => handleFormField('description', v, err)}
          />
        </FormField>
        <div className={classnames(styles.btns)}>
        <Button name="Cancel" className="secondary" action={close} />
					<Button name="Submit" className="primary" action={submit} />
				</div>
      </form>
    </div>
  )
};

export default ContactInfo;

import classnames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useContact } from '../../redux/contact/contact-reducer';
import { FormFieldObject, useFormBuilder } from '../../util/form';
import Button from '../button/button';
import { ContactCardProperty } from '../contact-card/contact-card';
import FormField from '../form-field/form-field';
import InputText from '../input-text/input-text';
import styles from './contact-info.module.scss';

interface ContactInfo<T> {
  [key: string]: T;
}

const initialData: ContactInfo<FormFieldObject> = {
	firstName: { value: '', error: null },
	lastName: { value: '', error: null },
  job: { value: '', error: null },
	description: { value: '', error: null },
};

interface ContactInfoProperty {
  id?: string;
  firstName?: string;
  lastName?: string;
  job?: string;
  description?: string;
  close: () => void;
}


const ContactInfo: React.FC<ContactInfoProperty> = (
  {
    id, firstName, lastName, job, description,
    close = () => {},
  }
) => {
  const [{ loading }, { addContact, updateContact }] = useContact();
  const [formObject, handleFormField, updateFormValue] = useFormBuilder<ContactInfo<FormFieldObject>>(
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

    const invalid = Object.keys(formObject).map(key => formObject[key].error).some(err => err);
    if (invalid) {
      return;
    }
    
    const formVal = Object.keys(formObject).map(
        key => ({[key]: formObject[key].value})
      ).reduce((pre, curr) => ({ ...pre, ...curr }));
    const { firstName, lastName, job, description } = formVal as ContactInfo<string>;
    const params: ContactCardProperty = {
      first_name: firstName,
      last_name: lastName,
      job,
      description,
    }

    if (id !== undefined) {
      updateContact({...params, id })
    } else {
      addContact(params);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      updateFormValue(
        {
          firstName: { value: firstName || '', error: null },
          lastName: { value: lastName || '', error: null },
          job: { value: job || '', error: null },
          description: { value: description || '', error: null },
        }
      )
    }

  }, [id]);
  
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

import { Dispatch } from 'react';
import { Action, createAction, handleActions } from 'redux-actions';
import { ContactCardProperty } from '../../components/contact-card/contact-card';
import { wrapFetch } from '../../util/api';
import { useRedux } from '../../util/redux';
import { State as GlobalState } from '../root-reducer';
import { ContractActionType } from './contact-action-type';

const mockData = [
	{
		id: '1',
		first_name: 'Allie',
		last_name: 'Juang',
		job: 'Front-end Developer',
		description: 'Front-end Developer',
	},
	{
		id: '2',
		first_name: 'Jack',
		last_name: 'Hung',
		job: 'Back-end Developer',
		description: 'Back-end Developer',
	},
	{
		id: '3',
		first_name: 'Leo',
		last_name: 'Lin',
		job: 'QA Engineer',
		description: 'QA Engineer',
	},
	{
		id: '4',
		first_name: 'Joe',
		last_name: 'Chan',
		job: 'PM',
		description: 'PMPMPMPMPMPMPMPMPMPMPMPMPMPMPMPMPMPMPM',
	},
	{
		id: '5',
		first_name: 'Eva',
		last_name: 'Chang',
		job: 'PM',
		description: 'PMPMPMPMPMPMPMPMPMPMPMPMPMPMPMPMPMPMPM',
	}
]


export interface State {
	contacts: ContactCardProperty[];
	doFetch: boolean;
	contactsLoading: boolean;
	loading: boolean;
}

const initialState: State = {
	contacts: [],
	doFetch: false,
	contactsLoading: false,
	loading: false,
};

export const getContacts = createAction(ContractActionType.GET_CONTACTS, () => async () => {
	const { statusCode, data } = await wrapFetch('api/contacts', 'GET');
	if (statusCode !== 200) {
		return [];
	}
	return data;
});

export const addContact = createAction(ContractActionType.ADD_CONTACT, (contactInfo: ContactCardProperty) => async (dispatch: Dispatch<any>) => {
	const { statusCode, message } = await wrapFetch('api/contacts', 'POST', { headers: {}},  contactInfo);
	return statusCode === 201;
});

export const deleteContact = createAction(ContractActionType.DELETE_CONTACT, (id: string) => async (dispatch: Dispatch<any>) => {
	const { statusCode, message } = await wrapFetch(`api/contacts/${id}`, 'DELETE');
	return statusCode === 200;
});

export const updateContact = createAction(ContractActionType.UPDATE_CONTACT, (id: string, contactInfo: ContactCardProperty) => async (dispatch: Dispatch<any>) => {
	const { statusCode, message } = await wrapFetch(`api/contacts/${id}`, 'PATCH', { headers: {}},  { info: contactInfo });
	return statusCode === 201;
});

export const reducer = {
	contact: handleActions<State, any>(
		{
			GET_CONTACTS_PENDING: (state: State) => ({
				...state,
				contactsLoading: true,
			}),
			GET_CONTACTS_FULFILLED: (state: State, action: Action<ContactCardProperty[]>) => ({
				...state,
				contacts: action.payload,
				contactsLoading: false,
			}),
			GET_CONTACTS_REJECTED: (state: State) => {
				alert(`Server Error. So Display Mock Data`)
				return {
					...state,
					contacts: mockData,
					contactsLoading: false,
				};
			},
			ADD_CONTACT_PENDING: (state: State) => ({
				...state,
				loading: true,
			}),
			ADD_CONTACT_FULFILLED: (state: State, action: Action<boolean>) => ({
				...state,
				doFetch: action.payload,
				loading: false,
			}),
			ADD_CONTACT_REJECTED: (state: State) => ({
				...state,
				doFetch: false,
				loading: false,
			}),
			DELETE_CONTACT_PENDING: (state: State) => ({
				...state,
				loading: true,
			}),
			DELETE_CONTACT_FULFILLED: (state: State, action: Action<boolean>) => ({
				...state,
				doFetch: action.payload,
				loading: false,
			}),
			DELETE_CONTACT_REJECTED: (state: State) => ({
				...state,
				doFetch: false,
				loading: false,
			}),
			UPDATE_CONTACT_PENDING: (state: State) => ({
				...state,
				loading: true,
			}),
			UPDATE_CONTACT_FULFILLED: (state: State, action: Action<boolean>) => ({
				...state,
				doFetch: action.payload,
				loading: false,
			}),
			UPDATE_CONTACT_REJECTED: (state: State) => ({
				...state,
				doFetch: false,
				loading: false,
			}),
		},
		initialState,
	),
};

const mapHooksToState = (state: GlobalState) => state.contact;

const contactActionMap = {
	getContacts,
	addContact,
	deleteContact,
	updateContact,
};

export const useContact = () => useRedux(mapHooksToState, contactActionMap);

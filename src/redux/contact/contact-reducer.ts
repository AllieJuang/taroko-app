import { Dispatch } from 'react';
import { Action, createAction, handleActions } from 'redux-actions';
import { ContactCardProperty } from '../../components/contact-card/contact-card';
import { wrapFetch } from '../../util/api';
import { useRedux } from '../../util/redux';
import { State as GlobalState } from '../root-reducer';
import { ContractActionType } from './contact-action-type';


export interface State {
	contacts: ContactCardProperty[];
	loading: boolean;
}

const initialState: State = {
	contacts: [],
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
	if (statusCode === 201) {
		dispatch(getContacts());
	}
	// if (message) {
	// 	alert(message);
	// }
});

export const reducer = {
	contact: handleActions<State, any>(
		{
			GET_CONTACTS_PENDING: (state: State) => ({
				...state,
				loading: true,
			}),
			GET_CONTACTS_FULFILLED: (state: State, action: Action<ContactCardProperty[]>) => ({
				...state,
				contacts: action.payload,
				loading: false,
			}),
			GET_CONTACTS_REJECTED: (state: State) => ({
				...state,
				loading: false,
			}),
			ADD_CONTACT_PENDING: (state: State) => ({
				...state,
				loading: true,
			}),
			ADD_CONTACT_FULFILLED: (state: State) => ({
				...state,
				loading: false,
			}),
			ADD_CONTACT_REJECTED: (state: State) => ({
				...state,
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
};

export const useContact = () => useRedux(mapHooksToState, contactActionMap);

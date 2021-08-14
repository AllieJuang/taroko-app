import { Action, createAction, handleActions } from 'redux-actions';
import { wrapFetch } from '../../util/api';
import { useRedux } from '../../util/redux';
import { State as GlobalState } from '../root-reducer';
import { ContractActionType } from './contact-action-type';

export interface State {
	contacts: any[];
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

export const reducer = {
	contact: handleActions<State, any>(
		{
			GET_CONTACTS_PENDING: (state: State) => ({
				...state,
				loading: true,
			}),
			GET_CONTACTS_FULFILLED: (state: State, action: Action<any[]>) => ({
				...state,
				contacts: action.payload,
				loading: false,
			}),
			GET_CONTACTS_REJECTED: (state: State) => ({
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
};

export const useContact = () => useRedux(mapHooksToState, contactActionMap);

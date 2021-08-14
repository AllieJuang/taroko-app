import { combineReducers } from 'redux';
import * as contact from './contact/contact-reducer';

export interface State {
	contact: contact.State;
}

export default combineReducers<State>({
	...contact.reducer,
});

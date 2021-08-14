import { useDispatch, useSelector } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { State } from '../redux/root-reducer';

type Selector<ReturnState> = (s: State) => ReturnState;

interface Option {
	shouldHooksUpdate?: (left: unknown, right: unknown) => boolean;
}

interface DefaultActionMap {
	[key: string]: (...params: any[]) => void;
}

type WrapActionDispatch<ActionMap extends DefaultActionMap> = {
	[key in keyof ActionMap]: (...params: Parameters<ActionMap[key]>) => void;
};

export const useRedux = <ReturnState, ActionMap extends DefaultActionMap>(
	selector: Selector<ReturnState>,
	actions: ActionCreatorsMapObject,
	options: Option = {},
): [ReturnState, WrapActionDispatch<ActionMap>] => {
	const state = useSelector(selector, options.shouldHooksUpdate);
	const dispatch = useDispatch();

	// 強制轉型
	const boundActions = bindActionCreators(actions, dispatch) as unknown;

	return [state, boundActions as WrapActionDispatch<ActionMap>];
};

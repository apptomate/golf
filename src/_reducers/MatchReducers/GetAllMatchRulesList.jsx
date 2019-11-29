import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function getAllMatchRulesList(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ALLMATCHRULESLIST_SUCCESS:
            return { data: payload };
        case types.ALLMATCHRULESLIST_ERROR:
            return { data: payload }
        default:
            return state;
    }
}
import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function addMatchRule(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ADDMATCHRULE_SUCCESS:
            return { data: payload };
        case types.ADDMATCHRULE_ERROR:
            return { data: payload }
        default:
            return state;
    }
}
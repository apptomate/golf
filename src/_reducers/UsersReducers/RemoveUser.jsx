import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function removeUser(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.REMOVEUSER_SUCCESS:
            return { data: payload };
        case types.REMOVEUSER_ERROR:
            return { data: payload }
        default:
            return state;
    }
}
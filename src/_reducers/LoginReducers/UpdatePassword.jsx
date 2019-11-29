import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function updatePassword(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.UPDATEPASSWORD_SUCCESS:
            return { data: payload };
        case types.UPDATEPASSWORD_ERROR:
            return { data: payload }
        default:
            return state;
    }
}
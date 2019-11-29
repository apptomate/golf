import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function updateUser(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.UPDATEUSER_SUCCESS:
            return { data: payload };
        case types.UPDATEUSER_ERROR:
            return { data: payload }
        default:
            return state;
    }
}
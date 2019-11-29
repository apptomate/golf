import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function addTeam(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ADDTEAM_SUCCESS:
            return { data: payload };
        case types.ADDTEAM_ERROR:
            return { data: payload }
        default:
            return state;
    }
}
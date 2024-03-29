import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';

export function getAllPlayers(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ALLPLAYERS_SUCCESS:
            return { data: payload };
        case types.ALLPLAYERS_ERROR:
            return { data: payload }
        default:
            return state;
    }
}
import * as types from '../../_actions/ActionTypes';
import { stringInitial } from '../InitialState';

export function addTeamPlayers(state = stringInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ADDTEAMPLAYERS_SUCCESS:
            return { data: payload };
        case types.ADDTEAMPLAYERS_ERROR:
            return { data: payload }
        default:
            return state;
    }
}
import * as types from '../../_actions/ActionTypes';
import { stringInitial } from '../InitialState';
import { getAlertMessage } from '../../_helpers/Functions';
import Swal from 'sweetalert2';

export function addTeamPlayers(state = stringInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ADDTEAMPLAYERS_SUCCESS:
            Swal.fire(getAlertMessage('success', payload));
            return { data: payload, error: false };
        case types.ADDTEAMPLAYERS_ERROR:
            Swal.fire(getAlertMessage('error', payload.errorMessage));
            return { data: payload, error: true }
        default:
            return state;
    }
}
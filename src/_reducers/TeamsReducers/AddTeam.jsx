import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';
import { getAlertMessage } from '../../_helpers/Functions';
import Swal from 'sweetalert2';

export function addTeam(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ADDTEAM_SUCCESS:
            Swal.fire(getAlertMessage('success', 'New Team Added'));
            return { data: payload, error: false };
        case types.ADDTEAM_ERROR:
            Swal.fire(getAlertMessage('error', payload.errorMessage));
            return { data: payload, error: true }
        default:
            return state;
    }
}
import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';
import { getAlertMessage } from '../../_helpers/Functions';
import Swal from 'sweetalert2';

export function addMatch(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.ADDMATCH_SUCCESS:
            Swal.fire(getAlertMessage('success', 'New Match Added'));
            return { data: payload, error: false };
        case types.ADDMATCH_ERROR:
            Swal.fire(getAlertMessage('error', payload.errorMessage));
            return { data: payload, error: true }
        default:
            return state;
    }
}
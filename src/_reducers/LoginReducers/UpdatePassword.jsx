import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';
import { getAlertMessage } from '../../_helpers/Functions';
import Swal from 'sweetalert2';

export function updatePassword(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.UPDATEPASSWORD_SUCCESS:
            Swal.fire(getAlertMessage('success', payload));
            return { data: payload, error: false };
        case types.UPDATEPASSWORD_ERROR:
            Swal.fire(getAlertMessage('error', payload.errorMessage));
            return { data: payload, error: true }
        default:
            return state;
    }
}
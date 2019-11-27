import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';
import { getAlertMessage } from '../../_helpers/Functions';
import Swal from 'sweetalert2';

export function updateUser(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.UPDATEUSER_SUCCESS:
            Swal.fire(getAlertMessage('success', payload));
            return { data: payload, error: false };
        case types.UPDATEUSER_ERROR:
            Swal.fire(getAlertMessage('error', payload.errorMessage));
            return { data: payload, error: true }
        default:
            return state;
    }
}
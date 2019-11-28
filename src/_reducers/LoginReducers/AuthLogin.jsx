import * as types from '../../_actions/ActionTypes';
import { arrayInitial } from '../InitialState';
import { getAlertMessage } from '../../_helpers/Functions';
import Swal from 'sweetalert2';

export function authLogin(state = arrayInitial, action) {
    const { type, payload } = action;
    switch (type) {
        case types.AUTHLOGIN_SUCCESS:
            const { token, user: { email, userWithTypeId } } = payload;
            let loginData = { email, userWithTypeId };
            localStorage.setItem('authToken', token);
            localStorage.setItem('loggedUser', JSON.stringify(loginData));
            Swal.fire(getAlertMessage('success', 'Login Success'));
            return { data: payload, error: false };
        case types.AUTHLOGIN_ERROR:
            const { errorMessage } = payload;
            Swal.fire(getAlertMessage('error', errorMessage));
            return { data: payload, error: true }
        default:
            return state;
    }
}
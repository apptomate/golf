import {
    ALLUSERS_URL, ALLTEAMS_URL, ALLMATCHES_URL, ALLCOUNTRIES_URL,
    COUNTRYSTATES_URL, REMOVEUSER_URL, ALLUSERTYPES_URL, ADDUSER_URL, UPLOADUSERPROFILE_URL,
    ADDTEAM_URL, ALLPLAYERS_URL, ADDTEAMPLAYERS_URL, ALLCOMPETITIONTYPES_URL,
    ALLMATCHRULESLIST_URL, ADDMATCH_URL, ADDMATCHRULE_URL, UPDATEUSER_URL, LOGIN_URL, GENERATEEMAILOTP_URL, UPDATEPASSWORD_URL
} from '../_helpers/Constants';
import { authHeader } from '../_helpers/AuthHeaders';
import {
    ALLUSERS_LOADING, ALLUSERS_SUCCESS, ALLUSERS_ERROR,
    ALLTEAMS_ERROR, ALLTEAMS_LOADING, ALLTEAMS_SUCCESS,
    ALLMATCHES_ERROR, ALLMATCHES_LOADING, ALLMATCHES_SUCCESS,
    ALLCOUNTRIES_SUCCESS, ALLCOUNTRIES_ERROR,
    COUNTRYSTATES_SUCCESS, COUNTRYSTATES_ERROR,
    REMOVEUSER_SUCCESS, REMOVEUSER_ERROR,
    ALLUSERTYPES_SUCCESS, ALLUSERTYPES_ERROR,
    ADDUSER_SUCCESS, ADDUSER_ERROR,
    UPLOADUSERPROFILE_SUCCESS, UPLOADUSERPROFILE_ERROR,
    ADDTEAM_SUCCESS, ADDTEAM_ERROR,
    ALLPLAYERS_SUCCESS, ALLPLAYERS_ERROR,
    ADDTEAMPLAYERS_SUCCESS, ADDTEAMPLAYERS_ERROR,
    ALLCOMPETITIONTYPES_SUCCESS, ALLCOMPETITIONTYPES_ERROR,
    ALLMATCHRULESLIST_SUCCESS, ALLMATCHRULESLIST_ERROR,
    ADDMATCH_SUCCESS, ADDMATCH_ERROR,
    ADDMATCHRULE_SUCCESS, ADDMATCHRULE_ERROR,
    UPDATEUSER_SUCCESS, UPDATEUSER_ERROR,
    AUTHLOGIN_SUCCESS, AUTHLOGIN_ERROR,
    GENERATEEMAILOTP_SUCCESS, GENERATEEMAILOTP_ERROR,
    UPDATEPASSWORD_SUCCESS, UPDATEPASSWORD_ERROR
} from './ActionTypes';
import API from './API';
import Swal from 'sweetalert2';
import { getAlertToast, getAlertMessage } from '../_helpers/Functions';

//Authentication
//Login
export function authLogin(formData) {
    return dispatch => {
        API.post(LOGIN_URL, formData)
            .then(response => {
                const { token, user: { email, userWithTypeId } } = response.data;
                let loginData = { email, userWithTypeId };
                localStorage.setItem('authToken', token);
                localStorage.setItem('loggedUser', JSON.stringify(loginData));
                dispatch({
                    type: AUTHLOGIN_SUCCESS,
                    payload: response.data
                });
                Swal.fire(getAlertToast('success', 'Login Success'));
            })
            .catch(error => {
                if (error.response) {
                    const { data } = error.response;
                    dispatch({
                        type: AUTHLOGIN_ERROR,
                        payload: error.response.data
                    });
                    Swal.fire(getAlertMessage('error', data.errorMessage));
                }
            })
    };
}
//Generate Email OTP
export function generateEmailOTP(formData) {
    return dispatch => {
        API.put(GENERATEEMAILOTP_URL, formData)
            .then(response => {
                dispatch({
                    type: GENERATEEMAILOTP_SUCCESS,
                    payload: response.data
                });
                Swal.fire(getAlertToast('success', response.data));
            })
            .catch(error => {
                if (error.response) {
                    let { data } = error.response;
                    dispatch({
                        type: GENERATEEMAILOTP_ERROR,
                        payload: data
                    });
                    Swal.fire(getAlertMessage('error', data));
                }
            })
    };
}
//Generate Email OTP
export function updatePassword(formData) {
    return dispatch => {
        API.put(UPDATEPASSWORD_URL, formData)
            .then(response => {
                dispatch({
                    type: UPDATEPASSWORD_SUCCESS,
                    payload: response.data
                });
                Swal.fire(getAlertToast('success', response.data));
            })
            .catch(error => {
                if (error.response) {
                    let { data } = error.response;
                    dispatch({
                        type: UPDATEPASSWORD_ERROR,
                        payload: data
                    });
                    Swal.fire(getAlertMessage('error', data.errorMessage));
                }
            })
    };
}

//Users
//Get All Users
export function getAllUsers() {
    return dispatch => {
        dispatch({
            type: ALLUSERS_LOADING
        });
        API.get(ALLUSERS_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLUSERS_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: ALLUSERS_ERROR,
                        payload: error.response
                    });
                }
            })
    };
}
//Get All User Types
export function getAllUserTypes() {
    return dispatch => {
        API.get(ALLUSERTYPES_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLUSERTYPES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: ALLUSERTYPES_ERROR,
                        payload: error.response
                    });
                }
            })
    };
}
//Add Users 
export function addUser(formData) {
    return dispatch => {
        dispatch({
            type: ALLUSERS_LOADING
        });
        API.post(ADDUSER_URL, formData, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ADDUSER_SUCCESS,
                    payload: response.data
                });
                dispatch(getAllUsers());
                Swal.fire(getAlertToast('success', 'New User Added'));
            })
            .catch(error => {
                if (error.response) {
                    let { data } = error.response;
                    dispatch({
                        type: ADDUSER_ERROR,
                        payload: data
                    });
                    Swal.fire(getAlertMessage('error', data.errorMessage));
                }
            })
    };
}
//Upload User Profile
export function uploadProfile(formData) {
    return dispatch => {
        API.post(UPLOADUSERPROFILE_URL, formData, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: UPLOADUSERPROFILE_SUCCESS,
                    payload: response.data
                });
                Swal.fire(getAlertToast('success', 'Profile Added'));
            })
            .catch(error => {
                if (error.response) {
                    let { data } = error.response;
                    dispatch({
                        type: UPLOADUSERPROFILE_ERROR,
                        payload: data
                    });
                    Swal.fire(getAlertMessage('error', data.errorMessage));
                }
            })
    };
}
//Update Users
export function updateUser(formData) {
    return dispatch => {
        API.put(UPDATEUSER_URL, formData, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLUSERS_LOADING
                });
                dispatch({
                    type: UPDATEUSER_SUCCESS,
                    payload: response.data
                });
                dispatch(getAllUsers());
                Swal.fire(getAlertToast('success', response.data));
            })
            .catch(error => {
                if (error.response) {
                    let { data } = error.response;
                    dispatch({
                        type: UPDATEUSER_ERROR,
                        payload: data
                    });
                    Swal.fire(getAlertMessage('error', data.errorMessage));
                }
            })
    };
}
//Remove User
export function removeUser(userId) {
    return dispatch => {
        dispatch({
            type: ALLUSERS_LOADING
        });
        API.delete(REMOVEUSER_URL + '/' + userId, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: REMOVEUSER_SUCCESS,
                    payload: response.data
                });
                dispatch(getAllUsers());
                Swal.fire(getAlertToast('success', response.data));
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: REMOVEUSER_ERROR,
                        payload: error.response
                    });
                    Swal.fire(getAlertMessage('error', error.response));
                }
            })
    };
}


//Teams
//Get All Teams
export function getAllTeams() {
    return dispatch => {
        dispatch({
            type: ALLTEAMS_LOADING
        });
        API.get(ALLTEAMS_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLTEAMS_SUCCESS,
                    payload: response.data
                });
            })
            .catch(function (error) {
                if (error.response) {
                    dispatch({
                        type: ALLTEAMS_ERROR,
                        payload: error.response
                    });
                }
            });
    };
}
//Add Team
export function addTeam(formData) {
    return dispatch => {
        API.post(ADDTEAM_URL, formData, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLTEAMS_LOADING
                });
                dispatch({
                    type: ADDTEAM_SUCCESS,
                    payload: response.data
                });
                dispatch(getAllTeams());
                Swal.fire(getAlertToast('success', 'New Team Added'));
            })
            .catch(error => {
                if (error.response) {
                    let { data } = error.response;
                    dispatch({
                        type: ADDTEAM_ERROR,
                        payload: data
                    });
                    Swal.fire(getAlertMessage('error', data.errorMessage));
                }
            })
    };
}
//Get All Players
export function getAllPlayers() {
    return dispatch => {
        API.get(ALLPLAYERS_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLPLAYERS_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: ALLPLAYERS_ERROR,
                        payload: error.response
                    });
                }
            })
    };
}
//Add Team Players
export function addTeamPlayers(formData) {
    return dispatch => {
        API.put(ADDTEAMPLAYERS_URL, formData, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLTEAMS_LOADING
                });
                dispatch({
                    type: ADDTEAMPLAYERS_SUCCESS,
                    payload: response.data
                });
                dispatch(getAllTeams());
                Swal.fire(getAlertToast('success', response.data));
            })
            .catch(error => {
                if (error.response) {
                    let { data } = error.response;
                    dispatch({
                        type: ADDTEAMPLAYERS_ERROR,
                        payload: data
                    });
                    Swal.fire(getAlertMessage('error', data.errorMessage));
                }
            })
    };
}

//Match
//Get All Matches
export function getAllMatches() {
    return dispatch => {
        dispatch({
            type: ALLMATCHES_LOADING
        });
        API.get(ALLMATCHES_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLMATCHES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(function (error) {
                if (error.response) {
                    dispatch({
                        type: ALLMATCHES_ERROR,
                        payload: error.response
                    });
                }
            });
    };
}
//Get All Competition Types
export function getAllCompetitionTypes() {
    return dispatch => {
        API.get(ALLCOMPETITIONTYPES_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLCOMPETITIONTYPES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(function (error) {
                if (error.response) {
                    dispatch({
                        type: ALLCOMPETITIONTYPES_ERROR,
                        payload: error.response
                    });
                }
            });
    };
}
//Get All Match Rules
export function getAllMatchRulesList() {
    return dispatch => {
        API.get(ALLMATCHRULESLIST_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLMATCHRULESLIST_SUCCESS,
                    payload: response.data
                });
            })
            .catch(function (error) {
                if (error.response) {
                    dispatch({
                        type: ALLMATCHRULESLIST_ERROR,
                        payload: error.response
                    });
                }
            });
    };
}
//Add Match
export function addMatch(formData) {
    return dispatch => {
        API.post(ADDMATCH_URL, formData, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ADDMATCH_SUCCESS,
                    payload: response.data
                });
                dispatch(getAllMatches());
                Swal.fire(getAlertToast('success', 'New Match Added'));
            })
            .catch(error => {
                if (error.response) {
                    let { data } = error.response;
                    dispatch({
                        type: ADDMATCH_ERROR,
                        payload: data
                    });
                    Swal.fire(getAlertMessage('error', data.errorMessage));
                }
            })
    };
}
//Add Match Rule
export function addMatchRule(formData) {
    return dispatch => {
        API.post(ADDMATCHRULE_URL, formData, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ADDMATCHRULE_SUCCESS,
                    payload: response.data
                });
                dispatch(getAllMatchRulesList());
                Swal.fire(getAlertToast('success', 'New Match Rule Added'));
            })
            .catch(error => {
                if (error.response) {
                    let { data } = error.response;
                    dispatch({
                        type: ADDMATCHRULE_ERROR,
                        payload: data
                    });
                    Swal.fire(getAlertMessage('error', data.errorMessage));
                }
            })
    };
}

//Get All Countries
export function getAllCountries() {
    return dispatch => {
        API.get(ALLCOUNTRIES_URL, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: ALLCOUNTRIES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: ALLCOUNTRIES_ERROR,
                        payload: error.response
                    });
                }
            })
    };
}
//Get States List
export function getCountryStates(countryId) {
    return dispatch => {
        API.get(COUNTRYSTATES_URL + '/' + countryId, { headers: authHeader() })
            .then(response => {
                dispatch({
                    type: COUNTRYSTATES_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                if (error.response) {
                    dispatch({
                        type: COUNTRYSTATES_ERROR,
                        payload: error.response
                    });
                }
            })
    };
}
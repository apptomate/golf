import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
export const AuthenticationService = {
    login,
    logout
};
// Login
function login(formData) {
    console.log(formData);
    return 123;
}
//Logout
function logout() {
    localStorage.clear();
    window.location.href = '/login';
}
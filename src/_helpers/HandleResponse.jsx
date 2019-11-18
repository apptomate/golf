import { AuthenticationService } from "../_services/AuthenticationService";

//Handle Response
export function handleResponse(response) {
    const { status } = response;
    if ([401, 403].includes(status)) {
        AuthenticationService.logout();
        return null;
    }
    return response;
}
import { RedirectRoutes } from "../types/routes"

export const Redirect = (routes: RedirectRoutes) => {
    switch(routes) {
        case "/":
            window.location.href = "/";
        break;
        case "/home":
            window.location.href = "/home";
        break;
        case "/login":
            window.location.href = "/login";
        break;
        case "/home":
            window.location.href = "/signup";
        break;
    }
}
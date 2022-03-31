import Router from 'next/router'
import { RedirectRoutes } from "../types/routes"

export const Redirect = (routes: RedirectRoutes) => {
    switch(routes) {
        case "/":
            Router.push("/");
        break;
        case "/home":
            Router.push("/home");
        break;
        case "/login":
            Router.push("/login");
        break;
        case "/home":
            Router.push("/signup");
        break;
    }
}
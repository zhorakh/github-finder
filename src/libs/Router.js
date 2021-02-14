import Users from "../containers/users";
import Repositories from "../containers/repositories";
import UserDetails from "../containers/userDetails";
import NotFound from "../containers/notFound";

class Router {
    constructor(routes) {
        this.routes = routes;
        this.params = {};

        addEventListener("hashchange", () => {
            this.handleHash();
        });

        this.handleHash();
    }

    getRoutePath(path) {
        switch (path) {
            case "Users":
                return Users;
            case "Repositories":
                return Repositories;
            case "UserDetails":
                return UserDetails;
            case "NotFound":
                return NotFound;
            default:
                return Users;
        }
    }

    handleHash() {
        const path = this.getCurrentRoute(this.routes);
        const pathName = this.getRoutePath(path);
        new pathName(this.params);
    }

    getCurrentRoute(routes) {
        let hash = location.hash ? location.hash.slice(1) : '';
        if (hash.indexOf("/") === 0) {
            hash = hash.slice(1)
        }
        let routName;
        if (hash === "" || hash === "/") {
            routName = routes.find((route) => {
                return route.path === "";
            });
        } else {
            routName = routes.find((route) => {
                const multiHash = hash.split("/");
                if (multiHash.length > 1) {
                    let pathParams = route.path.split("/");
                    if (pathParams[0] === multiHash[0]) {
                        this.params = {"id": multiHash[1]};
                        return true;
                    }
                }
                return route.path === hash;
            });
        }

        if (!routName) {
            return "NotFound";
        }

        return routName.pathName;
    }
}

export default Router;
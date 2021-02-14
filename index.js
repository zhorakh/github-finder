import Routes from "./src/libs/Routes";
import Router from './src/libs/Router';

(async () => {
    try {
        new Router(Routes);
    } catch (e) {
        console.error(e);
    }
})();
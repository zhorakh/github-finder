import {getUserUrl} from "../../api/index";
import Template from "./template";
import { httpClient } from "../../services/httpService";

class UserDetails {
    constructor(params) {
        Template.init();
        this.getUser(params.id);
    }

    //Get user info by id
    getUser(id) {
        this.user(id).then((userInfo) => {
            const data = {};
            userInfo = userInfo;
            data['info'] = userInfo;
            this.userRepos(userInfo.repos_url).then((repos) => {
                data['repos'] = repos;
                Template.render(data);
            });
        }).catch((e) => {
            Template.render(e);
        });
    }

    user(id) {
        const url = `${getUserUrl}${id}`;
        return httpClient(url);
    }

    userRepos(url) {
        return httpClient(url);
    }
}

export default UserDetails
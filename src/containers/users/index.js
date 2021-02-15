import Template from "./template.js";
import {pageParam, paramName, perPage, perPageParam, searchUsersUrl} from "../../api";
import { httpClient } from "../../services/httpService";

class Users {
    constructor() {
        Template.init();
        Template.render();
        this.page = 1;
        this.serchValue = "";
        const previewButton = document.getElementsByClassName('preview-page')[0];
        const nextButton = document.getElementsByClassName('next-page')[0];
        const searchInput = document.getElementsByClassName('search-input')[0];

        searchInput.addEventListener("keyup", this.getUsers.bind(this));

        if (nextButton && previewButton) {
            nextButton.addEventListener("click", this.getNextUsers.bind(this));
            previewButton.addEventListener("click", this.getPreviewUsers.bind(this));
        }
    }

    // Get next page users
    getNextUsers(event) {
        if (this.serchValue) {
            this.page += 1;
            this.getUsers(event);
        }
    }

    // Get previews page users
    getPreviewUsers(event) {
        if (this.page !== 1 && this.serchValue) {
            this.page -= 1;
            this.getUsers(event);
        }

    }

    // Get users and render view
    getUsers(event) {
        event.preventDefault();

        if (event.which !== 13 && event.target.innerText !== "Next" && event.target.innerText !== "Preview") {
            return;
        }

        let value = event.target.value;
        const page = this.page;

        if (!value) {
            value = this.serchValue;
        } else {
            this.serchValue = event.target.value;
        }

        if (value) {
            this.users(value, page).then((users) => {
                Template.render(users);
            });
        }
    }

    users(value, page) {
        const url = `${searchUsersUrl}${perPageParam}=${perPage}&${pageParam}=${page}&${paramName}=${value}`;
        return httpClient(url);
    }

}

export default Users
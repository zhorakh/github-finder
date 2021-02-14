import Template from "./template";
import { httpClient } from "../../services/httpService";
import {pageParam, paramName, perPage, perPageParam, searchReposUrl} from "../../api";

class Repositories {
    constructor() {
        Template.init();
        Template.render();
        this.page = 1;
        this.serchValue = "";
        const previewButton = document.getElementsByClassName('preview-repos')[0];
        const nextButton = document.getElementsByClassName('next-repos')[0];
        const searchInput = document.getElementsByClassName('repo-search-input')[0];

        searchInput.addEventListener("keyup", this.getRepos.bind(this));

        if (nextButton && previewButton) {
            nextButton.addEventListener("click", this.getNextRepos.bind(this));
            previewButton.addEventListener("click", this.getPreviewRepos.bind(this));
        }
    }

    // Get next page repositories
    getNextRepos(event) {
        if (this.serchValue) {
            this.page += 1;
            this.getRepos(event);
        }
    }

    // Get previews page repositories
    getPreviewRepos(event) {
        if (this.page !== 1 && this.serchValue) {
            this.page -= 1;

            this.getRepos(event);
        }
    }

    // Get repositories and render view
    getRepos(event) {
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
            this.repos(value, page).then((repos) => {
                Template.render(repos);
            });
        }
    }

    repos(value, page) {
        const url = `${searchReposUrl}${perPageParam}=${perPage}&${pageParam}=${page}&${paramName}=${value}`;
        return httpClient(url);
    }

}

export default Repositories
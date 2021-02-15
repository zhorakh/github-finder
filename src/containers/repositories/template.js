import {RenderNode} from "../../components/renderNode";
import {SearchNode} from "../../components/searchNode";
import {NoResultsNode} from "../../components/noResultsNode";

class Template {

    static init() {
        const nodeName = "repo-search";
        const template = SearchNode(nodeName);
        RenderNode(template, "header-body");
    }

    static repoTemplate(repo) {
        return `
                <div class="repo-info">
                    <h3>Owner: ${repo.owner.login}</h3>
                    <h4>Repository Name${repo.full_name}</h4>
                    <p>URL: <a href="${repo.clone_url}" target="_blank">${repo.clone_url}</a></p>
                    
                </div>
            `;
    }

    static reposTemplate(repos) {
        let singleRepoTemplate = `<div class="repos"><div class="repos-count">Repositories: ${repos.total_count}</div>`;
        repos.items.forEach((repo) => {
            singleRepoTemplate += Template.repoTemplate(repo);
        });

        return singleRepoTemplate += `</div>`;
    }

    static render(repos = []) {
        if (repos.items && repos.items.length) {
            const template = Template.reposTemplate(repos);
            RenderNode(template, "content");
        } else if (repos.items && !repos.items.length) {
            const nodeName = "Repositories"
            const template = NoResultsNode(nodeName);
            RenderNode(template, "content");
        }
    }
}

export default Template;
import {RenderNode} from "../../components/renderNode";

class Template {

    static init() {
        const template = Template.headerBodyTemplate();
        RenderNode(template, "header-body");
    }

    static headerBodyTemplate() {
        return `
            <div class="repos-search">
                <input type="text" class="repo-search-input" name="repo-search" value="" placeholder="Search Repositories...">
            </div>
            <div class="pagination">
                <button class="preview-repos">Preview</button>
                <button class="next-repos">Next</button>
            </div>  
        `;
    }

    static noReposTemplate() {
        return `<h1>No Repositories</h1>`;
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
        } else {
            const template = Template.noReposTemplate();
            RenderNode(template, "content");
        }
    }
}

export default Template;
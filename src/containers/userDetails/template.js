import {RenderNode} from "../../components/renderNode";

class Template {

    static init() {
        RenderNode('', "header-body");
    }

    static notFoundTemplate() {
        return `<h1>User Not Found</h1>`
    }

    static userInfoTemplate(info) {
        return `
            <div class="single-user-info">
                 <div class="single-user">
                    <img src="${info.avatar_url}" alt="">
                    <h1>${this.renderRow(info.name)}</h1>
                 </div>
                 <div class="information">
                    <ul>
                        <li>Location: ${this.renderRow(info.location)}</li>
                        <li>Bio: ${this.renderRow(info.bio)}</li>
                        <li>Company: ${this.renderRow(info.company)}</li>
                        <li>Followers: ${this.renderRow(info.followers)}</li>
                        <li>Following: ${this.renderRow(info.following)}</li>
                        <li>Public Repos: ${this.renderRow(info.public_repos)}</li>
                    </ul>
                 </div>
            </div>
        `;
    }

    static renderRow(row) {
        if (!row) return "-"
        return row;
    }

    static singleRepoTemplate(repo) {

        return `
            <div class="repo-info">
                <h3>Repo Name: ${repo.name}</h3>
                <p>Description: ${repo.description}</p>
                <p>Created: ${repo.created_at}</p>
                <p>URL: <a href="${repo.clone_url}" target="_blank">${repo.clone_url}</a></p>
    			<p>SSH Url: ${repo.ssh_url}</p>
            </div>
        `;
    }

    static userReposTemplate(repos) {
        let template = `<hr><div class="user-repos"><h2>Repositories</h2>`;
        repos.forEach((repo) => {
            template += Template.singleRepoTemplate(repo);
        });

        template += '</div>';
        return template;
    }

    static render(userData = []) {
        if (userData.status && userData.status === 404) {
            const notFoundTemplate = Template.notFoundTemplate(userData.info);
            RenderNode(notFoundTemplate, "content");
        } else {
            let userInfoTemplate = Template.userInfoTemplate(userData.info);
            userInfoTemplate += Template.userReposTemplate(userData.repos);
            RenderNode(userInfoTemplate, "content");
        }
    }
}

export default Template;
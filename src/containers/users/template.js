import {RenderNode} from "../../components/renderNode";
import {SearchNode} from "../../components/searchNode";
import {NoResultsNode} from "../../components/noResultsNode";

class Template {

    static init() {
        const nodeName = "user-search";
        const template = SearchNode(nodeName);
        RenderNode(template, "header-body");
    }

    static userTemplate(user) {
        return `
                <div class="user-info">
                    <a href="#/userdetails/${user.id}">
                        <img src="${user.avatar_url}" alt="">
                        <div>${user.login}</div>
                    </a>
                </div>
            `;
    }

    static usersTemplate(users) {
        let singleUserTemplate = `<div class="users"><div class="users-count">Users: ${users.total_count}</div>`;
        users.items.forEach((user) => {
            singleUserTemplate += Template.userTemplate(user);
        });

        return singleUserTemplate += `</div>`;
    }

    static render(users = []) {
        if (users.items && users.items.length) {
            const template = Template.usersTemplate(users);
            RenderNode(template, "content");
        } else if(users.items && !users.items.length) {
            const nodeName = "Users"
            const template = NoResultsNode(nodeName);
            RenderNode(template, "content");
        }
    }
}

export default Template;
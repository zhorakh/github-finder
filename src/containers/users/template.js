import {RenderNode} from "../../components/renderNode";

class Template {

    static init() {
        const template = Template.headerBodyTemplate();
        RenderNode(template, "header-body");
    }

    static headerBodyTemplate() {
        return `
            <div class="users-search">
                <input type="text" class="user-search-input" name="user-search" value="" placeholder="Search users...">
            </div>
            <div class="pagination">
                <button class="preview-users">Preview</button>
                <button class="next-users">Next</button>
            </div>
        `;
    }

    static noUsersTemplate() {
        return `<h1>No Users</h1>`;
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
        } else {
            const template = Template.noUsersTemplate();
            RenderNode(template, "content");
        }
    }
}

export default Template;
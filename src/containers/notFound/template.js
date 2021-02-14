import {RenderNode} from "../../components/renderNode";

class Template {

    static init() {
        const template = Template.renderTemplate();
        RenderNode("", "header-body");
        RenderNode(template, "content");
    }

    static renderTemplate() {
        return `<h1>404</h1><h2>Not Found</h2>`;
    }
}

export default Template;
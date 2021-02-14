export const RenderNode = (template, elementId) => {
    const resultsNode = document.querySelector(`#${elementId}`);
    resultsNode.innerHTML = "";
    resultsNode.innerHTML = template;
}
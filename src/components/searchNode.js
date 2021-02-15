export const SearchNode = (name) => {
    return `
        <div class="users-search">
            <input type="text" class="search-input" name=${name} placeholder="Search...">
        </div>
        <div class="pagination">
            <button class="preview-page">Preview</button>
            <button class="next-page">Next</button>
        </div>
    `;
}
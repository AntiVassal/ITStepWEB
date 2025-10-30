const selectLayout = (css, layout) => {
    css.href = layout === "grid" ? "./css/grid.css" : "./css/flex.css";
    sessionStorage.setItem("layout-type", layout);
}

const initGridFlexSwitcher = (switcher, css) => {
    switcher.addEventListener("change",
        (event) => selectLayout(css, event.target.value));
    selectLayout(css, switcher.value = sessionStorage.getItem("layout-type"));
}

document.addEventListener("DOMContentLoaded", () => {
    initGridFlexSwitcher(document.getElementById("grid-flex-switcher"), document.getElementById("layout-css"));
});
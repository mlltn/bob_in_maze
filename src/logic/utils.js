export function initBooleanConditions(conditionList) {
    let boolObject = {};
    for (const value of conditionList) {
        boolObject[value] = false;
    }
    return boolObject
}
export function parsePages(rootNode) {
    let pages = {}
    for (const pageId in rootNode) {
        let pageProps = { ...rootNode[pageId] };
        delete pageProps.components //refactor the pages to have the components for cleaner state
        pages[pageId] = pageProps;
    }
}
export function parseComponents(rootNode) {
    let components = {};
    for (const key in rootNode) {
        let candidate = rootNode[key]
        if (isComponentKey(key)) {
            let newComponent = {}
            newComponent[key] = stripComponents(candidate)
            components = {
                ...components,
                ...newComponent
            }
        }
        if (isObject(candidate)) {
            components = {
                ...components,
                ...parseComponents(candidate)
            }
        }

    }
    return components;

}
function isObject(asdf) {
    return Object.prototype.toString.call(asdf) == "[object Object]";
}
function isComponentKey(candidateKey) {
    let isFirstLetterCapital = /^[A-Z]/;
    return isFirstLetterCapital.test(candidateKey);
}
function stripComponents(obj) {
    let result = {}
    for (const key in obj) {
        if (!isComponentKey(key)) {
            result[key] = obj[key];
        }
    }
    return result;
}

export const test = 1337

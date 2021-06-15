import { cloneDeep } from 'lodash';

export function initBooleanConditions(conditionList) {
    let boolObject = {};
    for (const value of conditionList) {
        boolObject[value] = false;
    }
    return boolObject
}
export function parseComposition(composition) {
    for (let pageKey in composition.PAGES) {
        if (isTemplateKey(pageKey)) {
            let templateKey = pageKey.split("#")[0];
            let templateCopy = cloneDeep(composition.TEMPLATES[templateKey]);
            replaceTemplateComponents(templateCopy.components, { ...composition.PAGES[pageKey] });
            composition.PAGES[pageKey] = templateCopy;
        }
    }
    console.log(composition)
    return composition
}
function replaceTemplateComponents(templateCopy, components) {
    for (let key in templateCopy) {
        if (isComponentKey(key) && (key in components)) {
            for (let propertyKey in components[key]) {
                templateCopy[key][propertyKey] = components[key][propertyKey]
            }
        }
        if (isObject(key)) {
            replaceTemplateComponents(templateCopy[key])
        }
    }
}

function isTemplateKey(candidateKey) {
    let isTemplatePrefix = /^&/
    console.log(candidateKey + " " + isTemplatePrefix.test(candidateKey))
    return isTemplatePrefix.test(candidateKey)
}

export function parsePages(pageNodes) {
    let pages = {}
    for (const pageId in pageNodes) {
        let pageProps = { ...pageNodes[pageId] };
        pageProps.components //refactor the pages to have the components for cleaner state
        pages[pageId] = pageProps;
    }
}
export function parseComponents(rootNode) {
    let components = {};
    for (const key in rootNode) {
        let candidate = cloneDeep(rootNode[key]);
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

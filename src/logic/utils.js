import { cloneDeep, startsWith } from 'lodash';

export function initBooleanConditions(conditionList) {
    let boolObject = {};
    for (const value of conditionList) {
        boolObject[value] = false;
    }
    return boolObject
}
export function parseComposition(composition, templates) {
    for (let pageKey in composition.PAGES) {

        if (isTemplateKey(pageKey)) {
            let templateKey = pageKey.split("#")[0];
            let templateCopy = cloneDeep(templates[templateKey]);
            replaceTemplateComponents(templateCopy.components, { ...composition.PAGES[pageKey] });
            replaceTemplateProps(templateCopy, { ...composition.PAGES[pageKey] })
            composition.PAGES[pageKey] = templateCopy;
        }
    }
    return composition
}

function isTemplateKey(candidateKey) {
    let isTemplatePrefix = /^&/
    return isTemplatePrefix.test(candidateKey)
}

function replaceTemplateComponents(templateCopyComponents, compositionComponents) {
    for (let key in templateCopyComponents) {
        if (isComponentKey(key) && (key in compositionComponents)) {
            for (let propertyKey in compositionComponents[key]) {
                templateCopyComponents[key][propertyKey] = compositionComponents[key][propertyKey]
            }
        }
        if (isObject(templateCopyComponents[key])) {
            replaceTemplateComponents(templateCopyComponents[key], compositionComponents)
        }
    }
}

function replaceTemplateProps(templateCopyPage, compositionPage) {
    for (let key in templateCopyPage) {
        if (isPropKey(key) && (key in compositionPage)) {
            templateCopyPage[key] = compositionPage[key];
        }
    }
}

function isPropKey(candidateKey) {
    return startsWith(candidateKey, '_')
}


export function parsePages(pageNodes) {
    let pages = {}
    for (const pageId in pageNodes) {
        let pageProps = { ...pageNodes[pageId] };
        pageProps.components = parseComponents(pageProps.components)
        pages[pageId] = pageProps;
    }
    return pages
}
function parseComponents(rootNode) {
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

export function getMediaObject(media) {
    let mediaObject = {}
    media.keys().forEach((key) => {
        mediaObject[key] = {
            path: media(key),
            fileName: key,
        };
    });
    return mediaObject;
}

export function initResults() {
    let results = {};
    results["feedback"] = {}
    results["info"] = {
        startTime: new Date().toTimeString()
    }
    results["experiment"] = [];
    return results;
}
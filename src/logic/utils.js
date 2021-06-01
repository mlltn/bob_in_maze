export function initBooleanConditions(conditionList) {
    let boolObject = {};
    for (const value of conditionList) {
        boolObject[value] = true;
    }
    return boolObject
}

export const test = 1337

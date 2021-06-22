
const regexp_match_tailwind_styles_in_composition = /(?<= "_styles": *")(.*)(?=")/g

const fs = require("fs");

const compositionSTR = fs.readFileSync("./src/composition.json").toString();

const styles = [...compositionSTR.match(regexp_match_tailwind_styles_in_composition)];

let distinct_styles = []
for (style_names of styles) {
    for (style of style_names.split(" ")) {
        if ((style != '') && !distinct_styles.includes(style)) {
            console.log(style)
            distinct_styles.push(style);
        }
    }
}

console.log(distinct_styles);

const regexToPlurial = new RegExp("y$", "gi");
const regexToSingle = new RegExp("ies$", "gi");
const regexPlurial = new RegExp("s$", "gi");
const regexID = new RegExp("([0-9]+)$", "gi");


/**
 * remplace le 2eme attribut donnée par le 3eme attribut donnée si il est situé a la fin du premier attribut
 */
function replaceEnd(text, replace, add) {
    const regexEnd = new RegExp(replace + "$", "gi");
    return text.replace(regexEnd, add);
}


/**
 * remplace le 2eme attribut donnée par le 3eme attribut donnée si il est situé au début du premier attribut
 */
function replaceFirst(text, replace, add) {
    const regexEnd = new RegExp("^" + replace, "gi");
    return text.replace(regexEnd, add);
}

/**
 * met un mot anglais au pluriel
 */
function toPlurial(text) {
    let formatText = text.trim();
    if (formatText.match(regexToPlurial)) {
        return replaceEnd(formatText, "y", "ies");
    } else if (formatText.match(regexPlurial)) {
        return formatText;
    } else {
        return formatText + "s";
    }
}

/**
 * regarde si le mot est au pluriel
 */
function isPlurial(text) {
    return text.match(regexPlurial);
}

/**
 * met un mot anglais au singulier
 */
function toSingle(text) {
    let formatText = text.trim();
    if (formatText.match(regexToSingle)) {
        return replaceEnd(formatText, "ies", "y");
    } else if (!formatText.match(regexPlurial)) {
        return formatText;
    } else {
        return replaceEnd(formatText, "s", "");
    }
}

/**
 * extrait l'id d'un nom (que si l'id ce trouve a la fin)
 */
function extractId(text) {
    if (text.match(regexID)) {
        return regexID.exec(text)[0];
    }
}

/**
 * créé un objet simpliste nous donnant le nom et son id si il en a un
 */
function splitId(text) {
    if (text.match(regexID)) {
        const id = extractId(text);
        return {
            name: text.replace(id, ""),
            id: id
        }
    } else {
        return {
            name: text
        }
    }
}
function hexToDec(hexString) {
    var x = parseInt(hexString, 16);
    return x ? x : 0;
}

function capitalise(input) {
    var words;
    input.includes("_") && !(input.includes(" ")) ? words = input.split("_") : words = input.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
}

function camelCase(input) {
    const words = input.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join("")[0].toLowerCase() + words.join("").substr(1);
}

function copyFromTextArea(textarea) {
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function jsonEscape(txt) {
    return txt.replaceAll("\\", "\\\\").replaceAll("\"","\\\"");
}
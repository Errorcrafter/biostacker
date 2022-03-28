window.addEventListener("load", startup, false)

// Create all the fields for stats and skills
document.querySelector("table#tableStats").innerHTML = "";
document.querySelector("table#tableSkills").innerHTML = "";
appendStatSelectors(document.querySelector("table#tableStats"), statNames, "stat");
appendStatSelectors(document.querySelector("table#tableSkills"), skillNames, "skill");

// Init variables pointing to specific elements
var itemType = document.querySelector("select#itemType");
var itemNameColour = document.querySelector("input#itemNameColour");
var itemNameColourHex = document.querySelector("input#itemNameColourHex");

var baseSetDropdown = document.querySelector("select#setBaseSet");

var leatherItemColourPicker = document.querySelector("tr.leatherCustomColour");
var leatherColour = document.querySelector("input#leatherCustomColour");
var leatherColourHex = document.querySelector("input#leatherCustomColourHex");

var raritySelector = document.querySelector("select#setRarity");

var abil1Selector = document.querySelector("select#abil1Type");
var abil1NameColour = document.querySelector("input#abil1NameColour");
var abil1NameColourHex = document.querySelector("input#abil1NameColourHex");
var abil2Selector = document.querySelector("select#abil2Type");
var abil2NameColour = document.querySelector("input#abil2NameColour");
var abil2NameColourHex = document.querySelector("input#abil2NameColourHex");

// Init defaults
itemNameColour.value = "#ffffff";
itemNameColourHex.value = "#ffffff";
leatherColour.value = "#ffffff";
leatherColourHex.value = "#ffffff";
abil1NameColour.value = "#ffffff";
abil1NameColourHex.value = "#ffffff";
abil2NameColour.value = "#ffffff";
abil2NameColourHex.value = "#ffffff";

baseSetDropdown.value = "iron";
raritySelector.value = "common";
abil1Selector.value = "unset";
abil2Selector.value = "unset";
document.querySelector("textarea#abil1Description").value = "";
document.querySelector("textarea#abil2Description").value = "";

leatherItemColourPicker.style = "display: none;";
document.querySelector("tbody#abil2Section").style = "display: none;";
document.querySelector("input#abilWrap").value = "5";

itemType.value = "tool";
Array.from(document.getElementsByClassName("nonArmourSetSpecific")).forEach(elem => elem.style.display = "");
Array.from(document.getElementsByClassName("armourSetSpecific")).forEach(elem => elem.style.display = "none");

// On startup
function startup() {
    // Event listeners for syncing colour inputs with hex code inputs
    itemType.addEventListener("input", function () {
        if (itemType.value != "armour") {
            Array.from(document.getElementsByClassName("nonArmourSetSpecific")).forEach(elem => elem.style.display = "");
            Array.from(document.getElementsByClassName("armourSetSpecific")).forEach(elem => elem.style.display = "none");
        } else {
            Array.from(document.getElementsByClassName("armourSetSpecific")).forEach(elem => elem.style.display = "");
            Array.from(document.getElementsByClassName("nonArmourSetSpecific")).forEach(elem => elem.style.display = "none");
            baseSetDropdown.value === "leather" ? leatherItemColourPicker.style = "" : leatherItemColourPicker.style = "display: none;"
        }
    })
    itemNameColour.addEventListener("input", function () { itemNameColourHex.value = itemNameColour.value; }, false);
    itemNameColourHex.addEventListener("input", function () { itemNameColour.value = itemNameColourHex.value; }, false);

    baseSetDropdown.addEventListener("input", function () {
        baseSetDropdown.value === "leather" ? leatherItemColourPicker.style = "" : leatherItemColourPicker.style = "display: none;"
    });
    leatherColour.addEventListener("input", function () { leatherColourHex.value = leatherColour.value; }, false);
    leatherColourHex.addEventListener("input", function () { leatherColour.value = leatherColourHex.value; }, false);

    abil1Selector.addEventListener("input", function () {
        if (abil1Selector.value != "unset") {
            document.querySelector("tbody#abil2Section").style = "";
        } else {
            // Close ability 2 tab
            document.querySelector("tbody#abil2Section").style = "display: none;";
            abil2NameColour.value = "#ffffff";
            abil2NameColourHex.value = "#ffffff";
            abil2Selector.value = "unset";
            document.querySelector("input#abil2Name").value = "";
            document.querySelector("textarea#abil2Description").value = "";
        }
    })
    abil1NameColour.addEventListener("input", function () { abil1NameColourHex.value = abil1NameColour.value; }, false);
    abil1NameColourHex.addEventListener("input", function () { abil1NameColour.value = abil1NameColourHex.value; }, false);

    abil2NameColour.addEventListener("input", function () { abil2NameColourHex.value = abil2NameColour.value; }, false);
    abil2NameColourHex.addEventListener("input", function () { abil2NameColour.value = abil2NameColourHex.value; }, false);

    // Generate modal shitfuckery
    var generateBtn = document.querySelector("button");
    var outputBG = document.querySelector("div.outputBG");

    // shows the output modal when the generate buton gets clicked
    generateBtn.onclick = function () {
        outputBG.style = "display: block;";
        console.log(generateGiveCode(document.querySelector("input#setName").value, 1));
    }

    // closes the modal when clicking elsewhere
    window.onclick = function (event) {
        if (event.target == outputBG) {
            outputBG.style.display = "none";
        }
    }
}

function generateGiveCode(baseItem, scale = 1) {
    var gc;
    var nameSect = `/give @p ${document.querySelector("input#setBaseItem").value}{display:{Name:'{"text":"`;

    if (itemType.value != "armour") {
        nameSect += (document.querySelector("input#setName").value != "" ? document.querySelector("input#setName").value : capitalise(baseItem));
    } else {
        if (!document.querySelector("input#setArmourName").value) nameSect += "Nameless";
        nameSect += document.querySelector("input#setArmourName").value;

        if (baseItem.includes("helmet") || baseItem.includes("cap")) nameSect += " Helmet";
        else if (baseItem.includes("chestplate") || baseItem.includes("tunic")) nameSect += " Chest Piece";
        else if (baseItem.includes("leggings") || baseItem.includes("pants")) nameSect += " Leg Piece";
        else if (baseItem.includes("boots")) nameSect += " Footwear";
        else nameSect += " Armour"; // edge case, hopefully this won't ever trigger
    }
    nameSect += `"`


    var itemTypeSect = `"color":"${itemNameColour.value}","italic":false}',Lore:['{"text":"`;

    let raritySelector = document.querySelector("select#setRarity");
    if (raritySelector.value == "common") itemTypeSect += "Common";
    else if (raritySelector.value == "uncommon") itemTypeSect += "Uncommon";
    else if (raritySelector.value == "rare") itemTypeSect += "*Rare*";
    else if (raritySelector.value == "epic") itemTypeSect += "EPIC";
    else if (raritySelector.value == "legendary") itemTypeSect += "*LEGENDARY*";
    else if (raritySelector.value == "mythical") itemTypeSect += "*MYTHICAL*";
    else itemTypeSect += "⸎UNOBTAINABLE⸎"; // edge case again

    itemTypeSect += ` ${capitalise(itemType.value)}","color":"#`;
    if (itemType.value == "tool") itemTypeSect += "B4C6DB";
    else if (itemType.value == "accessory") itemTypeSect += "FFE180";
    else if (itemType.value == "armour") itemTypeSect += "E3B36B";
    else if (itemType.value == "brewing") itemTypeSect += "D975A";
    else if (itemType.value == "food") itemTypeSect += "E38891";
    else if (itemType.value == "fungus") itemTypeSect += "E6DC9C";
    else if (itemType.value == "pet") itemTypeSect += "FF9054";
    else if (itemType.value == "material") itemTypeSect += "BF9191";
    else if (itemType.value == "mineral") itemTypeSect += "90CBD4";
    else if (itemType.value == "drop") itemTypeSect += "E36D6D";
    else if (itemType.value == "ore") itemTypeSect += "B2B4F0";
    else if (itemType.value == "plant") itemTypeSect += "B3D66D";
    else if (itemType.value == "tool") itemTypeSect += "B4C6DB";
    else if (itemType.value == "weapon") itemTypeSect += "7893DE";
    else itemTypeSect += "FFFFFF"; // edge case yet again
    itemTypeSect += `","italic":${raritySelector.value == "mythical".toString()}}'`;

    // awful section to generate the rest of the lore, TODO: make this less shit
    var statLoreList = [];
    var statNbtList = []
    statNames.forEach(field => {
        var input = document.querySelector("input#" + camelCase(field.name)).value * scale;
        console.log(input);
        var l = `'[{"text":"`;
        if (parseFloat(input)) {
            l += (parseFloat(input) > 0 ? "+" : "") + parseFloat(input).toString();
            l += `${field.name.includes("crit") || field.name.includes("chance") ? "% " : " "}","color":"#`;
            if (field.name.includes("temperature")) l += (parseFloat(input) > 0 ? "e5934f" : "81c4c0");
            else l += (parseFloat(input) > 0 ? "8481B5" : "D65A77");
            l += `","italic":false},{"text":"${capitalise(field.name)} ${field.symbol}","color":"#${field.colour}","italic":false}]'`;
            statLoreList.push(l);
            statNbtList.push(`${field.tag}:${input*field.scale}`);
        }
    })
    var statSect = statLoreList.join(",");
    var skillLorelist = [];
    var skillNbtList = [];
    skillNames.forEach(field => {
        var input = document.querySelector("input#" + camelCase(field.name)).value * scale;
        console.log(input);
        var l = `'[{"text":"`;
        if (parseFloat(input)) {
            l += (parseFloat(input) > 0 ? "+" : "") + parseFloat(input).toString()
            l += `%","color":"#`;
            l += (parseFloat(input) > 0 ? "80AD2D" : "FF5454");
            l += `","italic":false},{"text":" ${capitalise(field.name)} XP","color":"#${field.colour}","italic":false}]'`;
            skillLorelist.push(l);
            skillNbtList.push(`${field.tag}:${input*field.scale}`)
        }
    })
    var skillSect = skillLorelist.join(",");

    var abilityCache = "";
    var abilityLore = "";
    let wrapRegex = new RegExp(`(\\w+\\s*){1,${parseInt(document.querySelector("input#abilWrap").value)}}`, "g");
    if (abil1Selector.value != "unset") {
        abilityCache += `'[{"text":"${capitalise(abil1Selector.value)} Ability - ","color":"${itemNameColour.value}","italic":false},{"text":"${document.querySelector("input#abil1Name").value.toUpperCase()}","color":"${abil1NameColour.value}"}]'`;
        var desc = document.querySelector("textarea#abil1Description").value.split(" ");
        var descList = desc.join(" ").match(wrapRegex);
        descList.forEach(w => {
            abilityCache += `,'{"text":"${w}","color":"dark_gray","italic":false}'`;
        })
        var abilityLore = abilityCache;
    }

    if (abil2Selector.value != "unset") {
        abilityCache = `,'{"text":""}',`
        abilityCache += `'[{"text":"${capitalise(abil2Selector.value)} Ability - ","color":"${itemNameColour.value}","italic":false},{"text":"${document.querySelector("input#abil2Name").value.toUpperCase()}","color":"${abil2NameColour.value}"}]'`;
        var desc = document.querySelector("textarea#abil2Description").value.split(" ");
        var descList = desc.join(" ").match(wrapRegex);
        descList.forEach(w => {
            abilityCache += `,'{"text":"${w}","color":"dark_gray","italic":false}'`;
        })
        abilityLore += abilityCache;
    }

    gc = `${nameSect},${itemTypeSect}${statSect ? "," : ""}${statSect}${skillSect ? "," : ""}${skillSect}${abilityLore ? `,'{"text":""}',` : ""}${abilityLore}]},Description:[${abilityCache.slice(2, -1)}],Stats:{${statNbtList.join(",")}},SkillBonus:{${skillNbtList.join(",")}},HideFlags:2}`;
    return gc
}

function appendStatSelectors(parent, fields, mode) {
    if (mode != "stat" && mode != "skill") { return null; }
    let frag = new DocumentFragment();
    fields.forEach(field => {
        let row = document.createElement("tr");
        let displayName = capitalise(field.name.toLowerCase());
        let tagName = camelCase(field.name.toLowerCase());
        row.innerHTML = `
<td><label for="${tagName}" style="color: #${field.colour.length === 6 ? field.colour : "ffffff"};">${displayName}${mode === "skill" ? " XP Bonus" : ""}</label></td>
<td><p style="text-align: center; color: #${field.colour.length === 6 ? field.colour : "ffffff"}; margin: 0px;">${field.symbol}</p></td>
<td>
    <input type="number" id="${tagName}" name="${tagName}" value="0${field.scale > 1 ? "." + "0".repeat(Math.log10(field.scale)) : ""}" step="${field.scale != undefined ? 1 / field.scale : 1}">
</td>
<td>
        <abbr
            title="The ${mode === "stat" ? field.name : displayName}${mode === "skill" ? " Skill XP" : ""} increase this item gives. If this is an armour set, 100% of this value will be applied to the chestplate, 75% for the leggings and 50% for the boots and helmet.">?</abbr>
</td>
`;
        frag.appendChild(row);
    });

    parent.appendChild(frag);
}

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

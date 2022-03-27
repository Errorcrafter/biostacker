window.addEventListener("load", startup, false)

// On startup
function startup() {
    // Create all the fields for stats and skills
    let statNames = [
        new Field("health", "FF7088", "❤", 10), new Field("defence", "CF967E", "❈", 1),
        new Field("intelligence", "6DBFA7", "❂", 1), new Field("soul", "B6B4C4", "❂", 1), new Field("speed", "EDC25F", "➹", 1),
        new Field("attack damage", "C75D76", "🗡", 10), new Field("knockback resistance", "C4967B", "☗", 1),
        new Field("strength", "C45252", "🪓", 1), new Field("fall limit", "D4C4B6", "☁", 1),
        new Field("bow damage", "C1D7E0", "🏹", 10), new Field("base temperature", "DEAF68", "☀", 10000),
        new Field("crit chance", "8BBBC9", "✧", 1), new Field("crit damage", "C8B0CF", "✦", 1),
        new Field("max sanity", "BAB6A2", "☻", 1), new Field("heat limit", "DB9B76", "❄", 10000),
        new Field("freeze limit", "ADE3DA", "❆", 10000), new Field("lung capacity", "B0CFB9", "⌛", 1),
        new Field("ferocity", "E8864D", "☄", 1), new Field("sea creature chance", "00AAAA", "🎣", 1),
        new Field("immunity", "C5DB6B", "☠", 1), new Field("luck", "4FDB7E", "❉", 1)
    ]
    let skillNames = [
        new Field("woodwork", "B07B5D", "", 100), new Field("mining", "C4B3A7", "", 100),
        new Field("foraging", "9BC22F", "", 100), new Field("agriculture", "7FB874", "", 100),
        new Field("fishing", "7CC9BA", "", 100), new Field("beast taming", "E39191", "", 100),
        new Field("combat", "738CD1", "", 100), new Field("slaying", "FFFFFF", "", 100),
        new Field("necromancy", "886599", "", 100), new Field("gliding", "9FA2D6", "", 100),
        new Field("crafting", "D6A87A", "", 100), new Field("climbing", "B1E0C3", "", 100),
        new Field("riding", "FFFFFF", "", 100), new Field("swimming", "48A9BD", "", 100), new Field("running", "FFFFFF", "", 100),
        new Field("hunting", "FF5555", "", 100), new Field("etomology", "FFFF55", "", 100),
        new Field("husbandry", "FF7083", "", 100), new Field("treasury", "F5A74E", "", 100),
    ]
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

    itemType.value = "tool";
    Array.from(document.getElementsByClassName("nonArmourSetSpecific")).forEach(elem => elem.style.display = "");
    Array.from(document.getElementsByClassName("armourSetSpecific")).forEach(elem => elem.style.display = "none");

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
    }

    // closes the modal when clicking elsewhere
    window.onclick = function (event) {
        if (event.target == outputBG) {
            outputBG.style.display = "none";
        }
    }
}

function generateGiveCode(baseItem, scale = 1) {
    var generatedCommand = `/give @s ${baseItem}{display:{Name:'{"text":"`;

    if (itemType.value != "armour") {
        generatedCommand += (document.querySelector("input#setName").value != "" ? document.querySelector("input#setName").value : capitalise(baseItem));
    } else {
        if (!document.querySelector("input#setArmourName").value) generatedCommand += "Nameless";
        generatedCommand += document.querySelector("input#setArmourName").value;

        if (baseItem.includes("helmet") || baseItem.includes("cap")) generatedCommand += " Helmet";
        else if (baseItem.includes("chestplate") || baseItem.includes("tunic")) generatedCommand += " Chestplate";
        else if (baseItem.includes("leggings") || baseItem.includes("pants")) generatedCommand += " Leggings";
        else if (baseItem.includes("boots")) generatedCommand += " Boots";
        else generatedCommand += " Armour"; // edge case, hopefully this won't ever trigger
    }

    generatedCommand += `","color":"${itemNameColour.value}","italic":false}',Lore:['{"text":"`;

    let raritySelector = document.querySelector("select#setRarity");
    if (raritySelector.value == "common") generatedCommand += "Common";
    else if (raritySelector.value == "uncommon") generatedCommand += "Uncommon";
    else if (raritySelector.value == "rare") generatedCommand += "*Rare*";
    else if (raritySelector.value == "epic") generatedCommand += "EPIC";
    else if (raritySelector.value == "legendary") generatedCommand += "*LEGENDARY*";
    else if (raritySelector.value == "mythical") generatedCommand += "MYTHICAL";
    else generatedCommand += "⸎UNOBTAINABLE⸎"; // edge case again

    generatedCommand += ` ${capitalise(itemType.value)}","color":"`;
    if (itemType.value == "tool") generatedCommand += "";
    else if (itemType.value == "weapon") generatedCommand += "";
    else if (itemType.value == "armour") generatedCommand += "";
    else if (itemType.value == "pet") generatedCommand += "";
    else if (itemType.value == "accessory") generatedCommand += "";
    else if (itemType.value == "food") generatedCommand += "";
    else if (itemType.value == "plant") generatedCommand += "";
    else if (itemType.value == "ore") generatedCommand += "";
    else if (itemType.value == "mineral") generatedCommand += "";
    else if (itemType.value == "fungus") generatedCommand += "";
    else if (itemType.value == "brewing") generatedCommand += "";
    else generatedCommand += ""; // edge case again

    return generatedCommand
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

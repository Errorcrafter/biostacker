window.addEventListener("load", startup, false)

// Create all the fields for stats and skills
appendStatSelectors(document.querySelector("table#tableStats"), statNames, "stat");
appendStatSelectors(document.querySelector("table#tableSkills"), skillNames, "skill");
petTypeBuilder(document.querySelector("select#petType"), skillNames);

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

var unbreakable = document.querySelector("input#unbreakable");
var noDmg = document.querySelector("input#noDamage");
var customDurabilityCheckbox = document.querySelector("input#hasCustomDurability");
var customDurability = document.querySelector("input#customDurability");

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
Array.from(document.getElementsByClassName("petSpecific")).forEach(elem => elem.style.display = "none");

unbreakable.checked = true;
noDmg.checked = true;
customDurabilityCheckbox.checked = false;
document.querySelector("tr.cDurabilityInput").style = "display: none";

// On startup
function startup() {
    // Event listeners for syncing colour inputs with hex code inputs
    itemType.addEventListener("input", function () {
        if (itemType.value === "armour") {
            Array.from(document.getElementsByClassName("armourSetSpecific")).forEach(elem => elem.style.display = "");
            Array.from(document.getElementsByClassName("nonArmourSetSpecific")).forEach(elem => elem.style.display = "none");
            baseSetDropdown.value === "leather" ? leatherItemColourPicker.style = "" : leatherItemColourPicker.style = "display: none;"
            Array.from(document.getElementsByClassName("petSpecific")).forEach(elem => elem.style.display = "none");
        } else if (itemType.value === "pet") {
            Array.from(document.getElementsByClassName("petSpecific")).forEach(elem => elem.style.display = "");
        } else {
            Array.from(document.getElementsByClassName("nonArmourSetSpecific")).forEach(elem => elem.style.display = "");
            Array.from(document.getElementsByClassName("armourSetSpecific")).forEach(elem => elem.style.display = "none");
            Array.from(document.getElementsByClassName("petSpecific")).forEach(elem => elem.style.display = "none");
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
    var generateCmdBtn = document.querySelector("button#generateCmd");
    var generateLootBtn = document.querySelector("button#generateLoot");
    var outputBG = document.querySelector("div.outputBG");

    // shows the output modal when the generate buton gets clicked
    generateCmdBtn.onclick = function () {
        outputBG.style = "display: block;";

        if (document.querySelector("input#setName").value === "" && itemType.value != "armour") {
            //console.log(document.querySelector("input#setName").value === ""); console.log(itemType != "armour");
            document.querySelector("tr#outputHere").innerHTML = "Error: Please specify the custom item name.";
            return;
        }
        if (document.querySelector("input#setBaseItem").value === "" && itemType.value != "armour") {
            document.querySelector("tr#outputHere").innerHTML = "Error: Please specify the base item ID.";
            return;
        }

        if (document.querySelector("input#setArmourName").value === "" && itemType.value == "armour") {
            document.querySelector("tr#outputHere").innerHTML = "Error: Please specify the custom armour name.";
            return;
        }

        if (itemType.value != "armour") {
            appendOutputCells(document.querySelector("tr#outputHere"), [getGiveCmd(document.querySelector("input#setBaseItem").value, 1)], ["Output"]);
            //console.log(document.querySelector("input#setBaseItem").value);
        } else {
            appendOutputCells(document.querySelector("tr#outputHere"), [
                getGiveCmd(baseSetDropdown.value + "_helmet", 0.5),
                getGiveCmd(baseSetDropdown.value + "_chestplate", 1),
                getGiveCmd(baseSetDropdown.value + "_leggings", 0.75),
                getGiveCmd(baseSetDropdown.value + "_boots", 0.5)], ["Helmet", "Chestplate", "Leggings", "Boots"]);
        }
    }

    generateLootBtn.onclick = function () {
        outputBG.style = "display: block;";

        if (document.querySelector("input#setName").value === "" && itemType.value != "armour") {
            //console.log(document.querySelector("input#setName").value === ""); console.log(itemType != "armour");
            document.querySelector("tr#outputHere").innerHTML = "Error: Please specify the custom item name.";
            return;
        }
        if (document.querySelector("input#setBaseItem").value === "" && itemType.value != "armour") {
            document.querySelector("tr#outputHere").innerHTML = "Error: Please specify the base item ID.";
            return;
        }

        if (document.querySelector("input#setArmourName").value === "" && itemType.value == "armour") {
            document.querySelector("tr#outputHere").innerHTML = "Error: Please specify the custom armour name.";
            return;
        }

        if (itemType.value != "armour") {
            appendOutputCells(document.querySelector("tr#outputHere"), [getLootTable(document.querySelector("input#setBaseItem").value, 1)], ["Output"]);
            //console.log(document.querySelector("input#setBaseItem").value);
        } else {
            appendOutputCells(document.querySelector("tr#outputHere"), [
                getLootTable(baseSetDropdown.value + "_helmet", 0.5),
                getLootTable(baseSetDropdown.value + "_chestplate", 1),
                getLootTable(baseSetDropdown.value + "_leggings", 0.75),
                getLootTable(baseSetDropdown.value + "_boots", 0.5)], ["Helmet", "Chestplate", "Leggings", "Boots"]);
        }
    }

    customDurabilityCheckbox.addEventListener("input", function () {
        if (customDurabilityCheckbox.checked) {
            document.querySelector("tr.cDurabilityInput").style = ""
        } else {
            document.querySelector("tr.cDurabilityInput").style = "display: none;"
        }
    })

    // closes the modal when clicking elsewhere
    window.onclick = function (event) {
        if (event.target == outputBG) {
            outputBG.style.display = "none";
        }
    }
}

function getGiveCmd(baseItem, scale = 1) {
    return `give @p ${baseItem}${generateNBT(baseItem, scale)}`;
}

function getLootTable(baseItem, scale = 1) {
    return `{
        "rolls": 1,
        "entries": [
          {
            "type": "minecraft:item",
            "name": "minecraft:${baseItem}"
          }
        ],
        "functions": [
          {
            "function": "minecraft:set_nbt",
            "tag": "${jsonEscape(generateNBT(baseItem, scale))}"
          }
        ]
} `;
}

function generateNBT(baseItem, scale = 1) {
    var gc;
    var nameSect = `{display:{Name:'{"text":"`;
    //console.log(`${nameSect} ${idAndNbtStartSect}`);


    if (itemType.value != "armour") {
        nameSect += (document.querySelector("input#setName").value != "" ? document.querySelector("input#setName").value : capitalise(baseItem));
    } else {
        if (!document.querySelector("input#setArmourName").value) nameSect += "Nameless";
        nameSect += document.querySelector("input#setArmourName").value;

        if (baseItem.includes("helmet")) nameSect += " Helmet";
        else if (baseItem.includes("chestplate")) nameSect += " Chestplate";
        else if (baseItem.includes("leggings")) nameSect += " Leggings";
        else if (baseItem.includes("boots")) nameSect += " Boots";
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

    if (itemType.value === "pet") {
        itemTypeSect += ` ${capitalise(document.querySelector("select#petType").value)}`;
    } else if (itemType.value != "armour") {
        itemTypeSect += ` ${capitalise(itemType.value)}","color":"#`;
    } else {
        if (baseItem.includes("helmet")) itemTypeSect += ` Helmet","color":"#`;
        else if (baseItem.includes("chestplate")) itemTypeSect += ` Chest Piece","color":"#`;
        else if (baseItem.includes("leggings")) itemTypeSect += ` Leg Piece","color":"#`;
        else if (baseItem.includes("boots")) itemTypeSect += ` Footwear","color":"#`;
    }

    if (itemType.value == "tool") itemTypeSect += "B4C6DB";
    else if (itemType.value == "accessory") itemTypeSect += "FFE180";
    else if (itemType.value == "armour") itemTypeSect += "E3B36B";
    else if (itemType.value == "brewing") itemTypeSect += "D975A";
    else if (itemType.value == "food") itemTypeSect += "E38891";
    else if (itemType.value == "fungus") itemTypeSect += "E6DC9C";
    else if (itemType.value == "pet") itemTypeSect += "E09C57";
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
            statNbtList.push(`${field.tag}:${input * field.scale}`);
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
            l += (parseFloat(input) > 0 ? "9AD134" : "FF5454");
            l += `","italic":false},{"text":" ${capitalise(field.name)} XP","color":"#${field.colour}","italic":false}]'`;
            skillLorelist.push(l);
            skillNbtList.push(`${field.tag}:${input * field.scale}`)
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

    var colourSect = baseItem.includes("leather_") ? `,color:${hexToDec(leatherColour.value.slice(1))}` : "";

    console.log(nameSect);
    console.log(itemTypeSect);
    console.log(statSect);
    console.log(skillSect);
    console.log("\n\n");
    console.log(abilityCache);
    console.log(abilityLore);

    gc = `${nameSect},${itemTypeSect}${abilityLore != "" ? `,'{"text":""}'` : ""}${statSect ? "," : ""}${statSect}${skillSect ? "," : ""}${skillSect}${abilityLore ? `,'{"text":""}',` : ""}${abilityLore}]${colourSect}}${abilityLore != "" ? `,Description:['${abilityCache.slice(2, -1)}']` : ""}${statNbtList.length > 0 ? ",Stats:{" + statNbtList.join(",") + "}" : ""}${skillNbtList.length > 0 ? ",SkillBonus:{" + skillNbtList.join(",") + "}" : ""}${unbreakable.checked ? ",Unbreakable:1b" : ""}${noDmg.checked ? `,AttributeModifiers:[{AttributeName:"generic.attack_damage",Name:"generic.attack_damage",Amount:0,Operation:0,UUID:[I;-1632924465,-439598640,-1355487732,-1701297442]}]` : ""},HideFlags:6${customDurabilityCheckbox.checked ? `,MaxDurability:${customDurability.value}` : ""}}`; //TODO: make this less horrible
    console.log(gc);
    return gc
}

window.addEventListener("load", startup, false)

// On startup
function startup() {
    // Create all the fields
    let statNames = ["health", "defence", "intelligence", "soul", "speed", "attack damage", "knockback resistance", "strength",
    "fall limit", "bow damage", "base temperature", "crit chance", "crit damage", "max sanity", "heat limit", "freeze limit",
    "lung capacity", "ferocity", "sea creature chance", "immunity", "luck"];
    let skillNames = ["woodwork", "mining", "fletching", "foraging", "agriculture", "fishing", "taming", "combat", "slaying",
    "necromancy", "pyromancy", "gliding", "crafting", "climbing", "riding", "swimming", "running", "hunting", "etomology", 
    "husbandry"];
    appendStatSelectors(document.querySelector("table#tableStats"), statNames, "stat");
    appendStatSelectors(document.querySelector("table#tableSkills"), statNames, "skill");

    // Init variables pointing to specific elements
    var itemNameColour = document.querySelector("input#itemNameColour");
    var itemNameColourHex = document.querySelector("input#itemNameColourHex");

    var baseSetDropdown = document.querySelector("select#setBaseSet");

    var leatherCustomColourToggleSection = document.querySelector("tr.leatherCustomColourToggle");
    var leatherCustomColourToggle = document.querySelector("input#leatherCustomColourToggle");
    var leatherItemColourPicker = document.querySelector("tr.leatherCustomColour");
    var leatherColour = document.querySelector("input#leatherCustomColour");
    var leatherColourHex = document.querySelector("input#leatherCustomColourHex");

    var raritySelector = document.querySelector("select#setRarity");

    // Init defaults
    itemNameColour.value = "#ffffff";
    itemNameColourHex.value = "#ffffff";
    leatherColour.value = "#ffffff";
    leatherColourHex.value = "#ffffff";

    baseSetDropdown.value = "iron";
    leatherCustomColourToggle.checked = false;
    leatherCustomColourToggleSection.style = "display: none;";
    leatherItemColourPicker.style = "display: none;";

    raritySelector.value = "common";

    // Event listeners for syncing colour inputs with hex code inputs
    itemNameColour.addEventListener("change", function () { itemNameColourHex.value = itemNameColour.value; }, false);
    itemNameColourHex.addEventListener("change", function () { itemNameColour.value = itemNameColourHex.value; }, false);

    baseSetDropdown.addEventListener("change", function () {
        baseSetDropdown.value === "leather" ? leatherCustomColourToggleSection.style = "" : leatherCustomColourToggleSection.style = "display: none;"; leatherItemColourPicker.style = "display: none;"
    });
    leatherCustomColourToggle.addEventListener("change", function () {
        leatherCustomColourToggle.checked ? leatherItemColourPicker.style = "" : leatherItemColourPicker.style = "display: none;"
    });
    leatherColour.addEventListener("change", function () { leatherColourHex.value = leatherColour.value; }, false);
    leatherColourHex.addEventListener("change", function () { leatherColour.value = leatherColourHex.value; }, false);
}

function appendStatSelectors(parent, names, mode) {
    if (mode != "stat" && mode != "skill") { return null; }
    let frag = new DocumentFragment();
    names.forEach(name => {
        let row = document.createElement("tr");
        let displayName = capitalise(name.toLowerCase());
        let tagName = camelCase(name.toLowerCase());
        row.innerHTML = `
<td><label for="${tagName}">${displayName}${mode === "skill" ? " XP Bonus" : ""}</label></td>
<td>
    <input type="number" id="${tagName}" name="${tagName}" value="0">
    <abbr
        title="The ${mode === "stat" ? name : displayName}${mode === "skill" ? " Skill XP" : ""} increase this armour set gives. 100% of this value will be applied to the chestplate, 75% for the leggings and 50% for the boots and helmet.">?</abbr>
</td>
`;
        frag.appendChild(row);
    });

    parent.appendChild(frag);
}

function capitalise(input) {
    const words = input.split(" ");

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

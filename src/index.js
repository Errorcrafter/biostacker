window.addEventListener("load", startup, false)

// On startup
function startup() {
    // Create all the fields for stats and skills
    let statNames = ["health", "defence", "intelligence", "soul", "speed", "attack damage", "knockback resistance", "strength",
        "fall limit", "bow damage", "base temperature", "crit chance", "crit damage", "max sanity", "heat limit", "freeze limit",
        "lung capacity", "ferocity", "sea creature chance", "immunity", "luck"];
    let skillNames = ["woodwork", "mining", "fletching", "foraging", "agriculture", "fishing", "taming", "combat", "slaying",
        "necromancy", "pyromancy", "gliding", "crafting", "climbing", "riding", "swimming", "running", "hunting", "etomology",
        "husbandry"];
    document.querySelector("table#tableStats").innerHTML = "";
    document.querySelector("table#tableSkills").innerHTML = "";
    appendStatSelectors(document.querySelector("table#tableStats"), statNames, "stat");
    appendStatSelectors(document.querySelector("table#tableSkills"), skillNames, "skill");

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

    var abil1NameColour = document.querySelector("input#abil1NameColour");
    var abil1NameColourHex = document.querySelector("input#abil1NameColourHex");
    var abil2NameColour = document.querySelector("input#abil2NameColour");
    var abil2NameColourHex = document.querySelector("input#abil2NameColourHex");
    var enableAbil2 = document.querySelector("input#enableAbil2");

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
    leatherCustomColourToggle.checked = false;
    document.querySelector("select#abil1Type").value = "click";
    document.querySelector("select#abil2Type").value = "click";
    enableAbil2.checked = false;
    document.querySelector("textarea#abil1Description").value = "";
    document.querySelector("textarea#abil2Description").value = "";
    
    leatherCustomColourToggleSection.style = "display: none;";
    leatherItemColourPicker.style = "display: none;";
    document.querySelector("tbody#abil2Section").style = "display: none;";

    // Event listeners for syncing colour inputs with hex code inputs
    itemNameColour.addEventListener("input", function () { itemNameColourHex.value = itemNameColour.value; }, false);
    itemNameColourHex.addEventListener("input", function () { itemNameColour.value = itemNameColourHex.value; }, false);

    baseSetDropdown.addEventListener("input", function () {
        baseSetDropdown.value === "leather" ? leatherCustomColourToggleSection.style = "" : leatherCustomColourToggleSection.style = "display: none;"; leatherItemColourPicker.style = "display: none;"
    });
    leatherCustomColourToggle.addEventListener("input", function () {
        leatherCustomColourToggle.checked ? leatherItemColourPicker.style = "" : leatherItemColourPicker.style = "display: none;"
    });
    leatherColour.addEventListener("input", function () { leatherColourHex.value = leatherColour.value; }, false);
    leatherColourHex.addEventListener("input", function () { leatherColour.value = leatherColourHex.value; }, false);

    abil1NameColour.addEventListener("input", function () { abil1NameColourHex.value = abil1NameColour.value; }, false);
    abil1NameColourHex.addEventListener("input", function () { abil1NameColour.value = abil1NameColourHex.value; }, false);

    enableAbil2.addEventListener("input", function () {
        console.log("a "+enableAbil2.checked)
        enableAbil2.checked ? document.querySelector("tbody#abil2Section").style = "" : document.querySelector("tbody#abil2Section").style = "display: none;"
    });
    abil2NameColour.addEventListener("input", function () { abil2NameColourHex.value = abil2NameColour.value; }, false);
    abil2NameColourHex.addEventListener("input", function () { abil2NameColour.value = abil2NameColourHex.value; }, false);
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
</td>
<td>
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

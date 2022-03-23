window.addEventListener("load", startup, false)

// On startup
function startup() {
    // Init variables pointing to specific elements
    var itemNameColour = document.querySelector("input#itemNameColour");
    var itemNameColourHex = document.querySelector("input#itemNameColourHex");

    var baseSetDropdown = document.querySelector("select#setBaseSet");

    var leatherCustomColourToggleSection = document.querySelector("tr.leatherCustomColourToggle");
    var leatherCustomColourToggle = document.querySelector("input#leatherCustomColourToggle");
    var leatherItemColourPicker = document.querySelector("tr.leatherCustomColour");
    var leatherColour = document.querySelector("input#leatherCustomColour");
    var leatherColourHex = document.querySelector("input#leatherCustomColourHex");

    // Init defaults
    itemNameColour.value = "#ffffff";
    itemNameColourHex.value = "#ffffff";
    leatherColour.value = "#ffffff";
    leatherColourHex.value = "#ffffff";

    baseSetDropdown.value = "iron";
    leatherCustomColourToggle.checked = false;
    leatherCustomColourToggleSection.style = "display: none;";
    leatherItemColourPicker.style = "display: none;";

    // Create event listeners
    itemNameColour.addEventListener("change", function () { itemNameColourHex.value = itemNameColour.value; }, false);
    itemNameColourHex.addEventListener("change", function () { itemNameColour.value = itemNameColourHex.value; }, false);

    baseSetDropdown.addEventListener("change", function () {
        baseSetDropdown.value === "leather" ? leatherCustomColourToggleSection.style = "" : leatherCustomColourToggleSection.style = "display: none;"
    });
    leatherCustomColourToggle.addEventListener("change", function () {
        leatherCustomColourToggle.checked ? leatherItemColourPicker.style = "" : leatherItemColourPicker.style = "display: none"
    });
    leatherColour.addEventListener("change", function () { leatherColourHex.value = leatherColour.value; }, false);
    leatherColourHex.addEventListener("change", function () { leatherColour.value = leatherColourHex.value; }, false);
}
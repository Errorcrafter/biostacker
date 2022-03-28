function appendStatSelectors(parent, fields, mode) {
    if (mode != "stat" && mode != "skill") { return null; }
    parent.innerHTML = "";

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

function appendOutputCells(parent, codes) {
    parent.innerHTML = "";

    let frag = new DocumentFragment();
    for (let i = 0; i < codes.length; i++) {
        let cell = document.createElement("td");
        let ta = document.createElement("textarea");
        ta.id = `outputCell${i}`;
        ta.style = "resize: none; height: 200px; width: auto;";
        let copy = document.createElement("button");
        copy.id = `outputCopy${i}`;
        copy.onclick = `copyFromTextArea(document.querySelector("textarea#outputCell${i}"))`;

        ta.value = codes[i];

        cell.appendChild(ta);
        cell.appendChild(document.createElement("br"));
        cell.appendChild(copy);
        frag.append(cell);
    }
    parent.appendChild(frag);
}
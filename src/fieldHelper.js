class Field {
    constructor(name, colour, symbol, tag, scale) {
        this.name = name;
        this.colour = colour;
        this.symbol = symbol;
        this.scale = scale;
        this.tag = tag;
    }
}

let statNames = [
    new Field("max health", "FF7088", "❤", "Health", 10),
    new Field("defence", "CF967E", "❈", "Defence", 1),
    new Field("intelligence", "6DBFA7", "❂", "IQ", 1),
    new Field("soul", "B6B4C4", "❂", "Soul", 1),
    new Field("speed", "EDC25F", "➹", "Speed", 1),
    new Field("attack damage", "C75D76", "🗡", "AttackDamage", 10),
    new Field("knockback resistance", "C4967B", "☗", "KnockbackR", 1),
    new Field("strength", "C45252", "🪓", "Strength", 1),
    new Field("fall limit", "D4C4B6", "☁", "FallLimit", 1),
    new Field("bow damage", "C1D7E0", "🏹", "BowDamage", 10),
    new Field("base temperature", "DEAF68", "☀", "BaseTemp", 10000),
    new Field("crit chance", "8BBBC9", "✧", "CritChance", 1),
    new Field("crit damage", "C8B0CF", "✦", "CritDamage", 1),
    new Field("max sanity", "BAB6A2", "☻", "Sanity", 1), 
    new Field("heat limit", "DB9B76", "❄", "HeatLimit", 10000),
    new Field("freeze limit", "ADE3DA", "❆", "FreezeLimit", 10000),
    new Field("lung capacity", "B0CFB9", "⌛", "LungCapacity", 1),
    new Field("ferocity", "E8864D", "☄", "Ferocity", 1),
    new Field("sea creature chance", "00AAAA", "🎣", "SeaCreatureChance", 1),
    new Field("immunity", "C5DB6B", "☠", "Immunity", 1),
    new Field("luck", "4FDB7E", "❉", "Luck", 1)
]
let skillNames = [
    new Field("woodwork", "B07B5D", "", "Woodwork", 100),
    new Field("mining", "C4B3A7", "", "Mining", 100),
    new Field("foraging", "9BC22F", "", "Foraging", 100),
    new Field("agriculture", "7FB874", "","Agriculture",  100),
    new Field("fishing", "7CC9BA", "", "Fishing", 100),
    new Field("beast taming", "E39191", "", "BeastTaming", 100),
    new Field("combat", "738CD1", "", "Combat", 100),
    new Field("fletching", "87B3C9", "", "Fletching", 100),
    new Field("swimming", "48A9BD", "", "Swimming", 100),
    new Field("necromancy", "886599", "", "Necromancy", 100),
    new Field("gliding", "9FA2D6", "", "Gliding", 100),
    new Field("crafting", "D6A87A", "", "Crafting", 100),
    new Field("treasury", "F5A74E", "", "Treasury", 100),
    new Field("etomology", "F3CE79", "", "Etomology", 100),
    new Field("slaying", "CCE3BA", "", "Slaying", 100),
    new Field("pyromancy", "FF872B", "", "Pyromancy", 100),
    new Field("hunting", "FF5555", "", "Hunting", 100),
    new Field("husbandry", "FF7083", "", "Husbandry", 100),
    new Field("brewing", "DB87FF", "", "Brewing", 100),
    new Field("climbing", "B1E0C3", "", "Climbing", 100),
]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Explcity empty second argument so the sticky option is not defaulted to true
const matchLabels = new RegExp(/^\(([\w|$|.]+)\)$/, "");
const matchSymbols = new RegExp(/^@(\D[\w|$|.|:]*)$/, "");
const predefinedSymbols = {
    SP: 0,
    LCL: 1,
    ARG: 2,
    THIS: 3,
    THAT: 4,
    SCREEN: 16384,
    KBD: 24576,
};
for (let R = 0; R < 16; R++) {
    const symbol = 'R' + R;
    predefinedSymbols[symbol] = R;
}
const isLabel = (line) => matchLabels.test(line);
const isUserDefinedSymbol = (line) => matchSymbols.test(line);
function makeSymbolTable(assembly) {
    const baseMemoryAddress = 16;
    const symbolTable = Object.assign({}, predefinedSymbols);
    let pc = 0;
    let userDefinedSymbolCount = 0;
    for (let line of assembly) {
        if (isLabel(line)) {
            const symbol = matchLabels.exec(line)[1];
            symbolTable[symbol] = pc; //We want to insert labels unconditionally. I want to overwrite the symbol entry if we previously thought the loading of a label was a user defined symbol.
        }
        else if (isUserDefinedSymbol(line)) {
            const symbol = matchSymbols.exec(line)[1];
            if (!symbolTable.hasOwnProperty(symbol)) {
                symbolTable[symbol] = baseMemoryAddress + userDefinedSymbolCount++;
            }
        }
        if (!isLabel(line)) {
            pc++;
        }
    }
    return symbolTable;
}
exports.makeSymbolTable = makeSymbolTable;
function removeLabels(assembly) {
    return assembly.filter(line => !matchLabels.test(line));
}
exports.removeLabels = removeLabels;
//# sourceMappingURL=scratch.js.map
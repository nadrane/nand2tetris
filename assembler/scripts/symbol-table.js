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
function makeSymbolTable(assembly) {
    return findSymbolAddresses(removeLabels(assembly), findLabelAddresses(assembly, predefinedSymbols));
}
exports.makeSymbolTable = makeSymbolTable;
function removeLabels(assembly) {
    return assembly.filter(line => !matchLabels.test(line));
}
exports.removeLabels = removeLabels;
function findLabelAddresses(assembly, predefinedSymbols) {
    const symbolTableWithLabels = Object.assign({}, predefinedSymbols);
    let pc = 0;
    return assembly.reduce((labels, line) => {
        if (matchLabels.test(line)) {
            return Object.assign(labels, { [matchLabels.exec(line)[1]]: pc });
        }
        else {
            pc++;
            return labels;
        }
    }, symbolTableWithLabels);
}
const isLabel = (line) => matchLabels.test(line);
function findSymbolAddresses(assembly, symbolTable) {
    const baseMemoryAddress = 16;
    const completeSymbolTable = Object.assign({}, symbolTable);
    let symbolCount = 0;
    for (let line of assembly) {
        if (isUserDefinedSymbol(line)) {
            const symbol = matchSymbols.exec(line)[1];
            if (!completeSymbolTable.hasOwnProperty(symbol)) {
                completeSymbolTable[symbol] = symbolCount++ + baseMemoryAddress;
            }
        }
    }
    return completeSymbolTable;
}
const isUserDefinedSymbol = (line) => matchSymbols.test(line);
//# sourceMappingURL=symbol-table.js.map
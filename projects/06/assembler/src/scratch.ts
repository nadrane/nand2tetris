interface SymbolTable {
  [key: string]: number;
}

// Explcity empty second argument so the sticky option is not defaulted to true
const matchLabels: RegExp = new RegExp(/^\(([\w|$|.]+)\)$/, "");
const matchSymbols: RegExp = new RegExp(/^@(\D[\w|$|.|:]*)$/, "");

const predefinedSymbols : SymbolTable = {
  SP: 0,
  LCL: 1,
  ARG: 2,
  THIS: 3,
  THAT: 4,
  SCREEN: 16384,
  KBD: 24576,
}

for (let R=0; R < 16; R++) {
  const symbol = 'R' + R
  predefinedSymbols[symbol] = R
}

const isLabel = (line: string) => matchLabels.test(line)
const isUserDefinedSymbol = (line: string) => matchSymbols.test(line)

export function makeSymbolTable(assembly: Array<string>): SymbolTable {
  const baseMemoryAddress = 16;
  const symbolTable = Object.assign({}, predefinedSymbols);

  let pc = 0;
  let userDefinedSymbolCount = 0;

  for (let line of assembly) {
    if (isLabel(line)) {
      const symbol = matchLabels.exec(line)[1]
      symbolTable[symbol] = pc;  //We want to insert labels unconditionally. I want to overwrite the symbol entry if we previously thought the loading of a label was a user defined symbol.
    } else if (isUserDefinedSymbol(line)) {
      const symbol = matchSymbols.exec(line)[1]
      if (!symbolTable.hasOwnProperty(symbol)) {
        symbolTable[symbol] = baseMemoryAddress + userDefinedSymbolCount++;
      }
    }
    if (!isLabel(line)) {
      pc++
    }
  }
  return symbolTable;
}

export function removeLabels(assembly: Array<string>) {
  return assembly.filter(line => !matchLabels.test(line));
}
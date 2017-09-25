export interface SymbolTable {
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


export function makeSymbolTable(assembly: Array<string>) {
  return findSymbolAddresses(removeLabels(assembly), findLabelAddresses(assembly, predefinedSymbols))
}

export function removeLabels(assembly: Array<string>) {
  return assembly.filter(line => !matchLabels.test(line));
}

function findLabelAddresses(assembly: Array<string>, predefinedSymbols: SymbolTable): SymbolTable {
  const symbolTableWithLabels = Object.assign({}, predefinedSymbols);
  let pc = 0;

  return assembly.reduce((labels, line) => {
    if (matchLabels.test(line)) {
      return Object.assign(labels, { [matchLabels.exec(line)[1]]: pc });
    } else {
      pc++;
      return labels;
    }
  }, symbolTableWithLabels);
}

const isLabel = (line: string) => matchLabels.test(line)

function findSymbolAddresses(assembly: Array<string>, symbolTable: SymbolTable): SymbolTable {
  const baseMemoryAddress = 16;
  const completeSymbolTable = Object.assign({}, symbolTable);
  let symbolCount = 0;

  for (let line of assembly) {
    if (isUserDefinedSymbol(line)) {
      const symbol = matchSymbols.exec(line)[1]
      if (!completeSymbolTable.hasOwnProperty(symbol)) {
        completeSymbolTable[symbol] = symbolCount++ + baseMemoryAddress
      }
    }
  }
  return completeSymbolTable;
}

const isUserDefinedSymbol = (line: string) => matchSymbols.test(line)

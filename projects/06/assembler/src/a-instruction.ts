class AInstruction implements Instruction {
  symbol: string;

  constructor(instruction: string) {
    this.symbol = instruction.slice(1);
  }

  encode(symbolTable: SymbolTable) {
    let symbol = this.symbol;

    // test if it does not begin with a digit
    const isUserdefineSymbol = (symbol: string) => !/^\d/.test(symbol);

    if (isUserdefineSymbol(symbol)) {
      if (symbolTable.hasOwnProperty(symbol)) {
        symbol = symbolTable[symbol].toString();
      } else {
        throw new Error(`Undefinde symbol encountered ${symbol}`);
      }
    }
    return "0" + Number(symbol).toString(2).padStart(15, "0");
  }
}

export default AInstruction;

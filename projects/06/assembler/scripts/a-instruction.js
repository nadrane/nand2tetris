"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AInstruction {
    constructor(instruction) {
        this.symbol = instruction.slice(1);
    }
    encode(symbolTable) {
        let symbol = this.symbol;
        // test if it does not begin with a digit
        const isUserdefineSymbol = (symbol) => !/^\d/.test(symbol);
        if (isUserdefineSymbol(symbol)) {
            if (symbolTable.hasOwnProperty(symbol)) {
                symbol = symbolTable[symbol].toString();
            }
            else {
                throw new Error(`Undefinde symbol encountered ${symbol}`);
            }
        }
        return "0" + Number(symbol).toString(2).padStart(15, "0");
    }
}
exports.default = AInstruction;
//# sourceMappingURL=a-instruction.js.map
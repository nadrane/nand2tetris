"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AInstruction {
    constructor(instruction) {
        const value = instruction.slice(1);
        this.value = Number(value).toString(2); //convert to binary
    }
    encode() {
    }
}
exports.default = AInstruction;
//# sourceMappingURL=AInstruction.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const binary_code_maps_1 = require("./binary-code-maps");
class CInstruction {
    constructor(instruction) {
        const jumpEmpty = !instruction.includes(";");
        const destEmpty = !instruction.includes("=");
        assert(!(jumpEmpty && destEmpty));
        this.dest = destEmpty ? "" : instruction.split("=")[0];
        this.comp = destEmpty ? instruction.split(";")[0] : instruction.split("=")[1];
        this.jump = jumpEmpty ? "" : instruction.split(";")[1];
    }
    encodeCompare() {
        return binary_code_maps_1.default.comp[this.comp];
    }
    encodeDestination() {
        return binary_code_maps_1.default.dest[this.dest];
    }
    encodeJump() {
        return binary_code_maps_1.default.jump[this.jump];
    }
    encode(symbolTable) {
        return "111" + this.encodeCompare() + this.encodeDestination() + this.encodeJump();
    }
}
exports.default = CInstruction;
//# sourceMappingURL=c-instruction.js.map
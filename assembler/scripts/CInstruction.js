"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
class CInstruction {
    constructor(instruction) {
        const jumpEmpty = !instruction.includes(';');
        const destEmpty = !instruction.includes('=');
        assert(!(jumpEmpty && destEmpty));
        console.log('ins', instruction, destEmpty, instruction.split('=')[0], instruction.split(';')[0]);
        this.dest = destEmpty ? "" : instruction.split('=')[0],
            this.comp = destEmpty ? instruction.split(';')[0] : instruction.split('=')[1],
            this.jump = jumpEmpty ? "" : instruction.split(';')[1];
    }
    encode() {
    }
}
exports.default = CInstruction;
//# sourceMappingURL=CInstruction.js.map
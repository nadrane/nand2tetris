import * as assert from "assert";
import binaryCodeMap from "./binary-code-maps";

class CInstruction implements Instruction {
  dest: string;
  comp: string;
  jump: string;

  constructor(instruction: string) {
    const jumpEmpty = !instruction.includes(";");
    const destEmpty = !instruction.includes("=");
    assert(!(jumpEmpty && destEmpty));

    this.dest = destEmpty ? "" : instruction.split("=")[0];
    this.comp = destEmpty ? instruction.split(";")[0] : instruction.split("=")[1];
    this.jump = jumpEmpty ? "" : instruction.split(";")[1];
  }

  private encodeCompare() {
    return binaryCodeMap.comp[this.comp];
  }

  private encodeDestination() {
    return binaryCodeMap.dest[this.dest];
  }

  private encodeJump() {
    return binaryCodeMap.jump[this.jump];
  }
  encode(symbolTable: SymbolTable) {
    return "111" + this.encodeCompare() + this.encodeDestination() + this.encodeJump();
  }
}

export default CInstruction;

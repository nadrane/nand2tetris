"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const a_instruction_1 = require("./a-instruction");
const c_instruction_1 = require("./c-instruction");
const symbol_table_1 = require("./symbol-table");
const readAndSanitizeAssembly = (fileName) => fs_1.readFileSync(fileName)
    .toString("utf-8")
    .split("\n")
    .filter(line => !line.startsWith("//"))
    .map(removeTrailingComments)
    .map(removeWhiteSpace)
    .filter(lengthNotZero);
const removeTrailingComments = (line) => line.indexOf("//") === -1 ? line : line.slice(0, line.indexOf("//"));
const removeWhiteSpace = (line) => line.replace(/\s/g, "");
const lengthNotZero = (line) => line.length > 0;
function constructInstruction(instruction) {
    return instruction.startsWith("@")
        ? new a_instruction_1.default(instruction)
        : new c_instruction_1.default(instruction);
}
const sanitizedAssembly = readAndSanitizeAssembly(process.argv[2]);
const symbolTable = symbol_table_1.makeSymbolTable(sanitizedAssembly);
const binaryCode = symbol_table_1.removeLabels(sanitizedAssembly)
    .map(constructInstruction)
    .map(instruction => instruction.encode(symbolTable));
console.log(binaryCode.join("\n"));
module.exports = {};
//# sourceMappingURL=parser.js.map
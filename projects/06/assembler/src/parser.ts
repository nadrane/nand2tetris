import { readFileSync } from "fs";

import AInstruction from "./a-instruction";
import CInstruction from "./c-instruction";
import { makeSymbolTable, removeLabels } from "./symbol-table";

const readAndSanitizeAssembly = (fileName: string): Array<string> =>
  readFileSync(fileName)
    .toString("utf-8")
    .split("\n")
    .filter(line => !line.startsWith("//"))
    .map(removeTrailingComments)
    .map(removeWhiteSpace)
    .filter(lengthNotZero);

const removeTrailingComments = (line: string) =>
  line.indexOf("//") === -1 ? line : line.slice(0, line.indexOf("//"));

const removeWhiteSpace = (line: string) => line.replace(/\s/g, "");

const lengthNotZero = (line: string) => line.length > 0;

function constructInstruction(instruction: string) {
  return instruction.startsWith("@")
    ? new AInstruction(instruction)
    : new CInstruction(instruction);
}

const sanitizedAssembly = readAndSanitizeAssembly(process.argv[2]);
const symbolTable = makeSymbolTable(sanitizedAssembly);

const binaryCode = removeLabels(sanitizedAssembly)
  .map(constructInstruction)
  .map(instruction => instruction.encode(symbolTable));

console.log(binaryCode.join("\n"));

module.exports = {};

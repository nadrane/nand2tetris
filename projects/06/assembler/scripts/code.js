// function encodeInstruction(instruction, symbolTable) {
//   const isAInstruction = () => instruction.startsWith('@')
//   return isAInstruction() ? encodeAInstruction(instruction, symbolTable) : encodeCInstruction(instruction);
// }
// function encodeAInstruction(instruction, symbolTable) {
//   const value = instruction.slice(1);
//   if (symbolTable.hasOwnProperty(value)) {
//     return '0' + symbolTable[value];
//   } else {
//     return '0' + value
//   }
// }
// function encodeCInstruction(instruction) {
//   return '111' + encodeCompare(instruction) + encodeDestination(instruction) + encodeJump(instruction);
// }
// function encodeCompare(instruction) {
//   const compareMap = {
//     '0': '0101010',
//     '1': '0111111',
//     '-1': '0111010',
//     'D': '0001100',
//     'A': '0110000',
//     '!D': '0001101',
//     '!A': '0110001',
//     '-D': '0001111',
//     '-A': '0110011',
//     'D+1': '0011111',
//     'A+1': '0110111',
//     'D-1': '0001110',
//     'A-1': '0110010',
//     'A+D': '0000010',
//     'D+A': '0000010',
//     'D-A': '0010011',
//     'A-D': '0000111',
//     'D&A': '0000000',
//     'A&D': '0000000',
//     'D|A': '0010101',
//     'A|D': '0010101',
//     'M': '1110000',
//     '!M': '1110001',
//     '-M': '1110011',
//     'M+1': '1110111',
//     'M-1': '1110010',
//     'D+M': '1000010',
//     'M+D': '1000010',
//     'D-M': '1010011',
//     'M-D': '1000111',
//     'D&M': '1000000',
//     'D|M': '1010101',
//     'M&D': '1000000',
//     'M|D': '1010101'
//   }
//   return comp[instruction.slice]
// }
// function encodeDestination(instruction) {
//   const destination = instruction.slice(10, 13)
//   const binaryCode = new Buffer(3);
//   if (destination.includes('M')) binaryCode[0] = 1
//   if (destination.includes('D')) binaryCode[1] = 1
//   if (destination.includes('A')) binaryCode[2] = 1
//   return binaryCode.toString();
// }
// function encodeJump(instruction) {
//   const jump = instruction.slice(13, 16)
//   const codeMap = {
//     JGT: '001',
//     JEQ: '010',
//     JGE: '011',
//     JLT: '100',
//     JNE: '101',
//     JLE: '110',
//     JMP: '111',
//   }
//   return codeMap[jump];
// } 
//# sourceMappingURL=code.js.map
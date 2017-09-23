var readFileSync = require("fs").readFileSync;
var _a = require("lodash"), pickBy = _a.pickBy, zipObject = _a.zipObject, range = _a.range;
var AInstruction = require('./AInstruction');
var CInstruction = require('./CInstruction');
var removeTrailingComments = function (line) {
    return line.indexOf("//") === -1 ? line : line.slice(0, line.indexOf("//"));
};
var lengthNotZero = function (line) { return line.length > 0; };
var baseMemoryAddress = 16;
var readAndSanitizeAssembly = function (fileName) {
    return readFileSync(fileName)
        .toString("utf-8")
        .split("\n")
        .filter(function (line) { return !line.startsWith("//"); })
        .map(removeTrailingComments)
        .map(function (line) { return line.trim(); })
        .filter(lengthNotZero);
};
var sanitizedAssembly = readAndSanitizeAssembly(process.argv[2]);
// Explcity empty second argument so the sticky option is not defaulted to true
var matchLabels = new RegExp('/^\(([\w|\$|\.]+)\)$/', ""); //Making first arg a string instead of RegExp literal to appease ts compiler.
var instructions = sanitizedAssembly.filter(function (line) { return !matchLabels.test(line); }).map(constructInstruction);
function constructInstruction(instruction) {
    return instruction.startsWith('@') ? new AInstruction(instruction) : new CInstruction(instruction);
}
console.log(instructions);
var addressedInstructions = zipObject(range(instructions.length), instructions);
function findLabelAddresses(sanitizedAssembly) {
    var pc = 0;
    return sanitizedAssembly.reduce(function (labels, line) {
        if (matchLabels.test(line)) {
            return Object.assign(labels, (_a = {}, _a[matchLabels.exec(line)[1]] = pc, _a));
        }
        else {
            pc++;
            return labels;
        }
        var _a;
    }, {});
}
var addressedLabels = findLabelAddresses(sanitizedAssembly);
function nextInstruction() {
}
module.exports = {};

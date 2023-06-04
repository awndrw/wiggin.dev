import ErrorStackParser from "error-stack-parser";

import { warnOnce } from "utils/warnOnce";

function getFunctionNames(stack: ErrorStackParser.StackFrame[]) {
  const functions = stack
    .reduce((functionNames, { functionName }, i, arr) => {
      if (i === 0 || functionName !== arr[i - 1].functionName) {
        functionNames.push(functionName || "...");
      }
      return functionNames;
    }, [] as string[])
    .slice(1, 10);
  while (functions[functions.length - 1] === "...") {
    functions.pop();
  }
  return functions;
}

export function warnOnClient(...packages: string[]) {
  const isClient = typeof window !== "undefined";
  if (isClient) {
    let message = "Heavyweight packages ran on client.";
    if (packages.length > 0) {
      message += ` Packages: ${packages.join(", ")}`;
    }
    const stack = ErrorStackParser.parse(new Error());
    const callerFunctions = getFunctionNames(stack);
    message += `
Stack:
${callerFunctions.join("\n")}`;
    warnOnce(message);
  }
}

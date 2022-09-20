//function to parse lua object string to js array by replacing {} with []

export default function parse(str) {
  let result = [];
  let current = "";
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === "{") {
      depth++;
      if (depth === 1) {
        continue;
      }
    }
    if (char === "}") {
      depth--;
      if (depth === 0 && current !== "") {
        result.push(parse(current));
        current = "";
        continue;
      }
    }
    if (depth > 0) {
      current += char;
    } else {
      if (char === "," && current !== "") {
        result.push(current);
        current = "";
      } else {
        current += char;
      }
    }
  }
  if (current) {
    result.push(current);
  }
  return result;
}

export function convertToNumberArray(arr) {
  return arr.map((item) => {
    if (typeof item === "string") {
      return parseFloat(item);
    }
  });
}

//function to parse lua object string to js array by replacing {} with []

/**
 * @param {string} str
 */
export default function parse(str, isColorArray = false) {
  let str1 = str.replace(/{/g, "[");
  str1 = str1.replace(/}/g, "]");
  if (isColorArray) {
    str1 = str1.replace(/\[/g, `["`);
    str1 = str1.replace(/, /g, `", "`);
    str1 = str1.replace(/]/g, `"]`);
  }
  console.log(str1);

  return JSON.parse(str1);
}

module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = {};
  const closeBrackets = {};
  const sameBrackets = new Set();

  bracketsConfig.forEach((config) => {
    const [open, close] = config;

    openBrackets[open] = close;
    closeBrackets[close] = open;

    if (open === close) {
      sameBrackets.add(open);
    }
  });

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];

    if (sameBrackets.has(char)) {
      if (stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (openBrackets[char]) {
      stack.push(char);
    } else if (closeBrackets[char]) {
      const lastOpen = stack.pop();

      if (closeBrackets[char] !== lastOpen) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

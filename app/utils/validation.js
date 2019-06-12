const removeAllButLast = (string, token) => {
  const parts = string.split(token);
  if (parts.length < 2) {
    return string;
  }
  return +parts.slice(0, -1).join('') + token + parts.slice(-1);
};

const onlyNumbersAndDots = value => {
  if (!value) {
    return value;
  }
  const clearedValue = removeAllButLast(value.replace(/[^\d.]/g, ''), '.');
  return clearedValue;
};

export default onlyNumbersAndDots;

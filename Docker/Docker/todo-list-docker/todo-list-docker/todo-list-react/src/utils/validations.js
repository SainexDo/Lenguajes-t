const validateEmpty = (...strings) => {
  let valid = true;
  strings.forEach(str => {
    if (str.trim() === "")
      valid = false
  });
  return valid
}

const validateSpaces = (...strings) => {
  let valid = true;
  strings.forEach(str => {
    if (!(/^\S*$/.test(str)))
      valid = false
  });
  return valid;
}

export { validateEmpty, validateSpaces }
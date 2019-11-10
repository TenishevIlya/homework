let yesOrNo = (value) => {
  if ((value !== null) && (value !== undefined)) {
    if (value === true) {
      return "yes";
    }
    if (value === false) {
      return "no";
    }
  }
  else {
    return null; 
  }
}

module.exports = yesOrNo;
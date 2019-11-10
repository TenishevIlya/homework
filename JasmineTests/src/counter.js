let counter = (total) => {
  if (Number.isInteger(total)) {
    if ((total >= 1) && (total <= 9)) {
      return total;
    }
    if (total > 9) {
      return "9+";
    }
    else {
      return "total is less than 1";
    }
  }
  if ((total === null) || (total === undefined)) {
    return null;
  }
}

module.exports = counter;
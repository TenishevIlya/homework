let calculateAge = (date) => {
    if ((date !== null) && (date !== undefined) && (date.getTime() < Date.now())) {
      let ageDifMs = Date.now() - date.getTime();
      let ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    else {
      return null;  
    }
}

module.exports = calculateAge;

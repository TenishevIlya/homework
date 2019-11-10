let getRandomItem = (list) => {
  let count = list.length;
  let randomItem = Math.floor(Math.random() * count);
  return list[randomItem];
}

module.exports = getRandomItem;
import _ from 'lodash';

class Utils {
  static upperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  static deleteArrayElement(array, deleteArray) {
    for (let i = 0; i < deleteArray?.length; i++) {
      array = array.filter(e => e !== deleteArray[i]);
    }
    return array;
  }

  static removeFromId(array, stringArray) {
    stringArray.map(i => _.remove(array, function (n) {
      return i === n.id
    }))
  }

  static getSingleCount() {
    let cardIds = JSON.parse(window.localStorage.getItem("cardIds")) || [];
    let singleCount = []
    for (let i = 0; i < _.uniq(cardIds).length; i++) {
      singleCount.push(
        {
          [Array.from(new Set(cardIds))[i]]: Array.from(new Set(cardIds)).map(val =>
            cardIds.filter(v => v === val).length)[i]
        }
      );
    }
    return singleCount;
  }

  static getTotalPrice(cardProducts, singleCount) {
    let totalPrice = [];
    for (let i = 0; i < singleCount.length; i++) {
      if (cardProducts && singleCount) {
        totalPrice.push(cardProducts.find(c =>
          +c.id === +Object.keys(singleCount[i])[0])?.salePrice * +Object.values(singleCount[i])[0])
      }
    }
    return _.sum(totalPrice);
  }

  static sliceText(text, maxLetters) {
    if (text.length > maxLetters) {
      return text.slice(0, maxLetters) + '..'
    } else {
      return text
    }
  }
}

export default Utils;

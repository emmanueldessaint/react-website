const { atom } = require("recoil");



  export  const numberOfItemsInCart = atom({
    key: 'numberOfItemsInCart',
    default: 0,
  });
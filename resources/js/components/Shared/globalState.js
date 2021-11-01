const { atom } = require("recoil");



  export  const numberOfItemsInCart = atom({
    key: 'numberOfItemsInCart',
    default: 0,
  });

  export const numberOfPageProducts = atom({
      key: 'numberOfPageProducts',
      default: [],
  })

  export const currentPageProduct = atom({
      key: 'currentPageProduct',
      default: 1,
  })

  var thisWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    export const currentWidth = atom ({
      key: 'currentWidth',
      default: thisWidth,
    })
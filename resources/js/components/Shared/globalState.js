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

  export const shippingFees = atom({
      key: 'shippingFees',
      default: 8,
  })

 
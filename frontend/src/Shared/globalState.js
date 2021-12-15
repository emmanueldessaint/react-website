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

  export const itemsProduct = atom({
      key: 'itemsProduct',
      default: [],
  })

  export const itemsBestSellers = atom({
    key: 'itemsBestSellers',
    default: [],
})

  export const changingPage = atom({
    key: 'changingPage',
    default: false,
})

export const mobileMenuOn = atom({
  key: 'mobileMenuOn',
  default: false,
})

export const averageNoteArticles = atom({
  key: 'averageNoteArticles',
  default: 5,
})

export const allItemsInCart = atom({
  key : 'allItemsInCart',
  default: []
})

// export const newCommentAdded = atom({
//   key : 'newCommentAdded',
//   default: false
// })

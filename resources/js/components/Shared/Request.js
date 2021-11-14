import { useState, useEffect } from 'react';
import * as React from 'react';
import { itemsProduct, itemsBestSellers } from './globalState'
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

export default function Request() {

    const [allItems, setAllItems] = useRecoilState(itemsProduct);
    const [bestSellers, setBestSellers] = useRecoilState(itemsBestSellers);


    useEffect(() => {
        fetch("http://localhost:8000/api/products")
            .then(res => res.json())
            .then(
                (result) => {
                    let averageNote = 0;
                    let allProducts = [];
                    let arrayBestSellers = [];
                    allProducts = result.products
                    for (let j = 0; j < allProducts.length; j++) {
                        let totalNotes = 0;
                        for (let k = 0; k < allProducts[j].reviews.length; k++) {
                            totalNotes += allProducts[j].reviews[k].note;
                        }
                        averageNote = totalNotes / allProducts[j].reviews.length;
                        allProducts[j].updated_at = averageNote;
                    }
                    arrayBestSellers.push(result.products[0]);
                    arrayBestSellers.push(result.products[1]);
                    arrayBestSellers.push(result.products[2]);
                    arrayBestSellers.push(result.products[3]);
                    setBestSellers(arrayBestSellers);
                    setAllItems(allProducts);
                },
                (error) => {
                    console.log('error')
                }
            )
    }, [])

    return (<div></div>)
}
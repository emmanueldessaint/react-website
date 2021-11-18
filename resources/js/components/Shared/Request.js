import { useState, useEffect } from 'react';
import * as React from 'react';
import { itemsProduct, itemsBestSellers, averageNoteArticles } from './globalState'
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
    const [averageNotes, setAverageNotes] = useRecoilState(averageNoteArticles);


    useEffect(() => {
        fetch("http://localhost:8000/api/products")
            .then(res => res.json())
            .then(
                (result) => {
                    let NumberOfNotes = 0;
                    let totalAverageNote = 0;
                    let averageNote = 0;
                    let allProducts = [];
                    let arrayBestSellers = [];
                    allProducts = result.products
                    for (let j = 0; j < allProducts.length; j++) {
                        let totalNotes = 0;
                        for (let k = 0; k < allProducts[j].reviews.length; k++) {
                            totalNotes += allProducts[j].reviews[k].note;
                            totalAverageNote += allProducts[j].reviews[k].note;
                            NumberOfNotes ++;
                        }
                        averageNote = totalNotes / allProducts[j].reviews.length;
                        
                        allProducts[j].avg = averageNote;
                    }
                    setAverageNotes(totalAverageNote/NumberOfNotes);
                    console.log(totalAverageNote/NumberOfNotes);
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
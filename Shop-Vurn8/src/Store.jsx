import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import app from "./firebaseConfig.js"
import { getDatabase, ref, push } from "firebase/database"


const Store = () => {
    const[store, setStore] = useState("")
    const { productId }  = useParams()
    useEffect(() => {
        axios.get (`https://fakestoreapi.com/products/${productId}`, {
            Headers: {
                Authorization: ""
            }
        })
        .then(response => {
            setStore(response.data)
            
        })
        .catch(error => {
            console.log(error)
        })
    },[productId])

    
    const database = getDatabase(app)
    const listInDb = ref(database, "cart")
    

    const addToCart = (storeImage,storeTitle,storePrice,storeDescription, id) => {  
        const stripeProductIdMap = { //all of this is the product ID of the Items provided by stripe for easy tracking
            1: "price_1NEsPUGWPkHHUHwigqiEeKVZ",
            2: "price_1NEsOcGWPkHHUHwi0LQEoYLI",
            3: "price_1NEsNhGWPkHHUHwipOuKczjL",
            4: "price_1NEsN7GWPkHHUHwiws668wSI",
            5: "price_1NEsMXGWPkHHUHwiJkRgPE4j",
            6: "price_1NEsM3GWPkHHUHwi9ooz5caw",
            7: "price_1NEsLTGWPkHHUHwiTRU5E80h",
            8: "price_1NEsKzGWPkHHUHwiO4jXhjL8",
            9: "price_1NEsKeGWPkHHUHwifA7aD6MK",
            10: "price_1NEsJSGWPkHHUHwiLUcNSLq1",
            11: "price_1NEsIsGWPkHHUHwi6wL2vr8X",
            12: "price_1NEsIMGWPkHHUHwiMLZ3jj2v",
            13: "price_1NEsHnGWPkHHUHwiuzs3so5l",
            14: "price_1NEsH7GWPkHHUHwiEsq83axO",
            15: "price_1NEsGdGWPkHHUHwiow9YztEv",
            16: "price_1NEsG2GWPkHHUHwig6eM1XJM",
            17: "price_1NEsFDGWPkHHUHwiPD5rNHpo",
            18: "price_1NEsEIGWPkHHUHwiFwj4UCe3",
            19: "price_1NEsDiGWPkHHUHwiIjL8ItXA",
            20: "price_1NEsD0GWPkHHUHwiiuzNziXj"
        };
          
        if (stripeProductIdMap.hasOwnProperty(id)) {
        const stripeProductId = stripeProductIdMap[id];
        const updateData = {
            id1: stripeProductId,
            image: storeImage,
            title: storeTitle,
            price: storePrice,
            description: storeDescription
        };
        push(listInDb, updateData);
        alert("added to cart");
        } else {
        console.log("Error: " + JSON.stringify());
    }
        
        
    }
    return (
        <>
            <div className="store-items">
                <div className="item-container">
                    <div className="image-tag">
                        <img
                            src={store.image}
                            height={100}
                            alt="image"
                        />
                    </div>

                    <div className="item-details">
                        <h2 className="item-title">{store.title}</h2>
                        <h3 className="item-price">${store.price}</h3>
                    </div>

                </div>

                <div className="item-desc">
                    <p>{store.description}</p>
                </div>

                <button className="add-cart" onClick={() =>addToCart(store.image, store.title, store.price, store.description, store.id )}>Add to Cart</button>
                {/* When clicked, the button changes to a + or - to indicate whether items are being added or removed from the cart */}
            </div>

        </>
    )
}
export default Store
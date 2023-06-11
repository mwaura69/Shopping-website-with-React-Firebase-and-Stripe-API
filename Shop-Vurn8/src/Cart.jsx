import { onValue } from "firebase/database"
import app from "./firebaseConfig"
import { getDatabase, ref, remove, push} from "firebase/database"
import { useState, useEffect, } from "react"


const Cart = () => {
    const[list, setList] = useState([])
    const [price, setPrice] = useState(0)
    const database = getDatabase(app)
    const listInDb = ref(database, "YOUR_DATABASE_NAME")


   const calculateTotalPrice = () => {
    const totalPrice = list.reduce((sum, item) => sum + item[1].price, 0.0) //calculates the total amount in the cart
    setPrice(totalPrice.toFixed(2))
   }

   //gets data fom the firebaseDB
    useEffect(() => {
        onValue(listInDb, (snapshot) => {
            const data = Object.entries(snapshot.val())
            setList(data)
        })
        calculateTotalPrice()
    },[list])



    const deleteProduct = (productId) => {
        // Remove the item from the database based on the product ID
        remove(ref(database, `YOUR_DATABASE_NAME/${productId}`));
        // alert("removed from cart")
    };
    

    //adding item in cart
    const addProduct = (itemImage, itemTitle, itemPrice,itemId1 ) => {
        const updateData = {
            image : itemImage,
            title: itemTitle,
            price: itemPrice,
            id1: itemId1
        }
        push(listInDb, updateData);
    }

    

    const checkoutcart = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({item: list.map(item => item[1].id1)})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url) {
                window.location.assign(response.url); // Forwarding user to Stripe
                disposeCartItemsAfterCheckout();
            }
            
        });
    }

    const disposeCartItemsAfterCheckout = () => {
        list.forEach((item) => {
            deleteProduct(item[0]);
        });
    };

    return (
        <>
        <div className="store-items">
          {list.length > 0 ? (
            list.map((item) => (
                <div key={item[0]} >
                    <div className="item-container">
                        <div className="image-tag">
                            <img 
                                src={item[1].image}
                                height={100}
                                alt="image"
                            />
                        </div>
                        
                       <div className="itembtn-container">
                            <div className="item-details">
                                <h2 className="item-title">{item[1].title}</h2>
                                <h3 className="item-price">${item[1].price}</h3>
                            </div>
                            <div className="cartbtn-container">
                                <button onClick={() => deleteProduct(item[0])} className="cart-button">-</button>{/* this should be used to remove and decrease the item price*/}
                                <p className="cartbtn-container"></p>
                                <button onClick={() => addProduct(item[1].image, item[1].title, item[1].price, item[1].id1 )} className="cart-button"> + </button>{/* also should be used to increase the item price only */}
                            </div> 
                       </div>
                    </div>
                    
                </div>
              
             ))) : (<h1>No Items in Cart</h1>)}

            
            <button type="submit" onClick={checkoutcart} className="add-cart">Checkout ${price}</button>            
          
        </div>
        </>
       
    )
}

export default Cart

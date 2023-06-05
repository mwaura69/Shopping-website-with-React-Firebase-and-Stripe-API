import React from "react"
import axios from "axios"
import {useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

const Products = () => {
    const[product, setProduct] = useState([])
    useEffect(() => {
        axios.get("https://fakestoreapi.com/products", {
        Headers: {
            Authorization: ""
        }
        })
        .then(response => {
            setProduct(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    },[])

        
    const navigate = useNavigate()
    const itemClick = (productId) => {
        navigate(`/Store/${productId}`)
    }
    return (
        <>
            <div className="store-items">
                {product.map((product) => (
                    <div key={product.id} className="item-container">
                        <Link to={`/Store/${product.id}`} onClick={itemClick}>
                            <div className="item-details">
                                <h2 className="item-title">{product.title}</h2>
                                <h3 className="item-price">${product.price}</h3>
                            </div>
                            <div className="image-tag">
                                <img 
                                    src={product.image}
                                    height={100}
                                    alt="image"
                                />
                            </div>
                        </Link>
                    </div>
                ))}
                
                
            </div>
        </>
    )
}


export default Products
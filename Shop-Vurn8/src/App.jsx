import './App.css'
import Products from "./Products"
import Nav from "./Nav"
import Store from "./Store"
import Cart from "./Cart"
import Success from "./Success"
import Cancel from "./Cancel"
import { BrowserRouter, Route, Routes } from "react-router-dom"



const App = () => {
  
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Nav />} >
              <Route index element={<Products />} ></Route>
              <Route path="/Store/:productId" element={<Store />}/>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/success" element={<Success />}></Route>
              <Route path="/cancel" element={<Cancel />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App

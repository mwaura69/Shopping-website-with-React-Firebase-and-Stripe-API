import React from "react"
import { Link, Outlet } from "react-router-dom"

const Nav = () => {
    return (
        <>
            <nav>
                <ul className="nav-list">
                    <li>
                        <Link to="/">Products</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default Nav
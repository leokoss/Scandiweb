import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Header = ({ onDelete }) => {
    let pageText = "";
    let [pageT, setPageT] = useState("");
    const page = useLocation().pathname;

    const btns = (page) => {
        if (page === "/") {
            pageText = "List";
            return (
                <div className="header__btns">
                    <Link to="/add-product"><button id="add" className="header__btn">ADD</button></Link>
                    <button id="delete_product_btn" className="header__btn" onClick={onDelete} >MASS DELETE</button>
                </div>
            )
        } else {
            pageText = "Add";
            return (
                <div className="header__btns">
                    <button id="save" type="submit" className="header__btn" form="product_form">Save</button>
                    <Link to="/"><button id="cancel" className="header__btn">CANCEL</button></Link>
                </div>
            )
        }
    }
    useEffect(() => setPageT(pageText), [page]);
    return (
        <header className="header">
            <div className="container">
                <div className="top_container">
                    <div className="header_box"><h1>Product {pageT}</h1></div>
                    {btns(page)}
                </div>
            </div>
        </header>
    )
}

export default Header;
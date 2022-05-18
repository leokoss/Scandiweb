import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Header = ({ onDelete }) => {
    let pageT = "";
    const [pageText, setPageText] = useState("");
    const page = useLocation().pathname;
    useEffect(() => setPageText(pageT), [pageT]);
    const btns = (page) => {
        if (page === "/") {
            pageT = "List";
            return (
                <div className="header__btns">
                    <Link to="/add-product"><button id="add" className="header__btn">ADD</button></Link>
                    <button id="delete_product_btn" className="header__btn" onClick={onDelete} >MASS DELETE</button>
                </div>
            )
        } else {
            pageT = "Add";
            return (
                <div className="header__btns">
                    <button id="save" type="submit" className="header__btn" form="product_form">Save</button>
                    <Link to="/"><button id="cancel" className="header__btn">CANCEL</button></Link>
                </div>
            )
        }
    }



    return (
        <header className="header">
            <div className="container">
                <div className="top_container">
                    <div className="header_box"><h1>Product {pageText}</h1></div>
                    {btns(page)}
                </div>
            </div>
        </header>
    )
}

export default Header;
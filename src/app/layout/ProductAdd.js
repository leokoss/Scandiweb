import { useState } from "react";

const ProductAdd = (props) => {
    const filledData = props;
    const [addData, setAddData] = useState({
        sku: "",
        name: "",
        price: "",
        productType: "",
        description: {
            size: "",
            weight: "",
            height: "",
            width: "",
            length: ""
        },
        forDelete: false
    });

    const { sku, name, price, productType, description } = addData;

    const onValueChange = (e) => {
        let value = e.target.value;
        let id = e.target.id;
        if (id === "sku" || id === "name") {
            if (value === "" || value === "null") {
                alert('Please insert correct data! Fields')
                e.target.value = "";
            }
        } else {
            if (value <= 0 || isNaN(value)) {
                alert("Please use only digits in fields price and fields of product description...")
                e.target.value = "";
            }
        }


        if (id === "sku" || id === "name" || id === "price") {
            setAddData(addData => ({
                ...addData,
                [id]: value
            }))
        } else {
            setAddData(addData => ({
                ...addData,
                description: {
                    ...description,
                    [id]: value
                }
            }))
        }


    }
    const onTypeChange = (e) => {
        let descr = {};
        switch (e.target.value) {
            case "dvd": {
                descr = { size: "" }
                break;
            }
            case "book": {
                descr = { weight: "" }
                break;
            }
            case "furniture": {
                descr = {
                    height: "",
                    width: "",
                    length: ""
                }
                break;
            }
            default: descr = {};
        }
        setAddData(addData => ({
            ...addData,
            productType: e.target.value,
            description: descr
        }))
    }

    function checkFunc(data) {
        let isNormal = true;

        filledData.data.forEach(item => {
            if (item.sku === addData.sku) isNormal = "sku";
        })

        for (let i in data) {
            if (typeof (data[i]) === 'object') {
                checkFunc(data[i])
            }
            if (data[i] === "" || data[i] === null) {
                isNormal = false;
            }
        }
        return isNormal;
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if (checkFunc(addData) === true) {
            props.onAddItem(addData);
        } else {
            if (checkFunc(addData) === "sku") {
                alert('SKU you entered is already used!')
            } else
                alert("Fields can't be empty, please enter all data required!");
            return;
        }
        setAddData({
            sku: "",
            name: "",
            price: "",
            productType: "",
            description: {
                size: "",
                weight: "",
                height: "",
                width: "",
                length: ""
            },
            forDelete: false
        })
    }


    const setDynamicForm = (type) => {
        switch (type) {
            case "dvd": {
                return (
                    <div className="dvd">
                        <div className="basics_item dvd">
                            <label className="basics_label" >Size (MB)</label>
                            <input id="size" type="text" onChange={onValueChange} value={description.size} />
                        </div>
                        <div className="specific_description">Please, provide size</div>
                    </div>
                )
            }
            case "book": {
                return (
                    <div className="book">
                        <div className="basics_item book">
                            <label className="basics_label" >Weight (Kg)</label>
                            <input id="weight" type="text" onChange={onValueChange} value={description.weight} />

                        </div>
                        <div className="specific_description">Please, provide weight</div>
                    </div>
                )
            }
            case "furniture": {
                return (
                    <div className="furniture">
                        <div className="basics_item">
                            <label className="basics_label" >Height (CM) </label>
                            <input id="height" type="text" onChange={onValueChange} value={description.height} />
                        </div>
                        <div className="basics_item">
                            <label className="basics_label" >Width (CM) </label>
                            <input id="width" type="text" onChange={onValueChange} value={description.width} />
                        </div>
                        <div className="basics_item">
                            <label className="basics_label" >Length (CM) </label>
                            <input id="length" type="text" onChange={onValueChange} value={description.length} />
                        </div>
                        <div className="specific_description">Please, provide dimensions</div>
                    </div>
                )
            }
            default: return <div> Please select type of product</div>
        }
    }


    return (

        <div className="container">
            <form id="product_form" onSubmit={onSubmit}>
                <div className="basics">
                    <div className="basics_item">
                        <label className="basics_label" >SKU</label>
                        <input id="sku" type="text" onChange={onValueChange} value={sku} />
                    </div>
                    <div className="basics_item">
                        <label className="basics_label" >NAME</label>
                        <input id="name" type="text" onChange={onValueChange} value={name} />
                    </div>
                    <div className="basics_item">
                        <label className="basics_label" >PRICE $</label>
                        <input id="price" type="text" onChange={onValueChange} value={price} />
                    </div>
                </div>
                <div className="type_switcher">

                    <label className="basics_label" >Type Switcher</label>

                    <select size={1} id="productType" required onChange={onTypeChange} value={productType}>
                        <option hidden>Choose Type</option>
                        <option id="dvd" value="dvd">DVD</option>
                        <option id="book" value="book">Book</option>
                        <option id="furniture" value="furniture">Furniture</option>
                    </select>
                </div>

                <div className="dynamic_form">
                    {setDynamicForm(productType)}
                </div>
            </form >
        </div >
    )
}
export default ProductAdd;
const ProductItem = (props) => {
    const { sku, name, price, productType, description, onToggleDelete, forDelete } = props;
    let price_number = +price;
    let descr = '';

    switch (productType) {
        default:
            descr = Object.entries(description).map(item => item.join(" : ")) + " MB";
            break;
        case 'book':
            descr = Object.entries(description).map(item => item.join(" : ")) + " Kg";
            break;
        case 'furniture':
            descr = "Dimensions: " + Object.values(description).reduce((curr, next) => curr + "*" + next);
            break;

    }

    return (
        <li className="product_item">
            <input type="checkbox" className="delete-checkbox" defaultChecked={forDelete} onChange={onToggleDelete} />
            <div className="product_info">
                <div id="sku">{sku}</div>
                <div id="name">{name}</div>
                <div id="price">{price_number.toFixed(2) + " $"}</div>
                <div className="description">{descr}</div>
            </div>
        </li>
    )
}


export default ProductItem;
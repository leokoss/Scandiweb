import ProductItem from "./ProductItem";


const ProductList = (props) => {
    const { data, onToggleDelete } = props;
    const itemList = data.map(item => {
        const { sku, ...itemProps } = item;
        return <ProductItem key={sku}{...itemProps} onToggleDelete={() => onToggleDelete(sku)} />
    })

    return (
        <div className="container">
            <ul className="product_list">
                {itemList}
            </ul>
        </div>
    )
}


export default ProductList;
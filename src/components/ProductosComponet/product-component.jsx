import './product-component.css';
function ProductComponent({productId, productName, price, color, date}){
    return (
        <div className="product-fields">
            <p className='product-field-id'>{productId}</p>
            <p className='product-field-name'>{productName}</p>
            <p className='product-field-price'>{price}</p>
            <p className='product-field-color'>{color}</p>
            <p className='product-field-color'>{date}</p>
        </div>
    )
}
export default ProductComponent
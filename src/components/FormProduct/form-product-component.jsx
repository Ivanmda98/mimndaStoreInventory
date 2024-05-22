import ButtonComponent from "../ButtonComponent/button-component";
import './form-product-component.css'
function FormProductComponent({showForm, product, handleChangeProductName, cancelFunction, addNewProduct, updateProduct, method}){
    return(
        <div className={`add-product-container ${showForm && 'active'}`} >
                <form 
                className="form-new-product">
                    <div>
                        <label htmlFor="">Nombre del Producto: </label>
                        <input 
                        type="text"
                        name="product_name"
                        value={product.product_name}
                        onChange={handleChangeProductName}/>
                    </div>
                    <div>
                        <label htmlFor="">Price: </label>
                        <input 
                        type="number" 
                        name="price"
                        value={product.price}
                        onChange={handleChangeProductName}/>
                    </div>
                    <div>
                        <label htmlFor="">Color: </label>
                        <input 
                        type="text" 
                        name="color"
                        value={product.color}
                        onChange={handleChangeProductName}/>
                    </div>
                    <div className="form-buttons-container">
                        <ButtonComponent
                        action={'save'}
                        addNewProduct={addNewProduct}
                        updateProduct={updateProduct}
                        method={method}>
                        </ButtonComponent>
                        <ButtonComponent
                        action={'cancel'}
                        cancelFunction={cancelFunction}>
                        </ButtonComponent>
                    </div>
                    
                </form>
            </div>
    )
}

export default FormProductComponent
import { useEffect } from "react";
import { useState } from "react";
import ProductComponent from "../ProductosComponet/product-component";
import ButtonComponent from "../ButtonComponent/button-component";
import SearchProductComponent from "../SearchProductComponent/search-product-component";
import FormProductComponent from "../FormProduct/form-product-component";
import './form-component.css';

function FormComponent(){
    const [fields, setFields] = useState([]);
    const [showForm, setShowForm] = useState(false)
    const [product, setProduct] = useState({
        "product_name": "",
        "price": "",
        "color": ""
    });
    const [productFilterd, setProductFilterd ]= useState([]);
    const [method, setMethod] = useState('');
    const getProducts = async () => {
        try{
            const response = await fetch('http://localhost:4000/api/v1/products');
            const data = await response.json();
            setFields(data.body);
            setProductFilterd(data.body)
        }catch (error){
            console.log('Error fetching flields', error)
        }
    }
    useEffect(() => {
        getProducts();
    }, [])

    const addNewProduct = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            if (response.ok) {
                getProducts();
                setMethod('')
                setShowForm(false);
                setProduct({ product_name: "", price: "", color: "" });
            } else {
                console.log('Error adding product:', response.status);
            }
        } catch (error) {
            console.error('Error', error);
        }
    }

    const showFormToAddProduct = () => {
        setMethod('post')
        setShowForm(true);
    }
    const handleChangeProductName = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    }
    const cancelFunction = () => {
        setShowForm(false);
        setProduct({ product_name: "", price: "", color: "" })
    }
    const searchProduct = (e) => {
        const productElement = e.target.value;
        if(productElement){
            const filter = fields.filter((dato) => 
                dato.product_name.toLowerCase().includes(productElement.toLocaleLowerCase()));
            setProductFilterd(filter);
        }
        
    }
    const getProductById = async (id) => {
        setMethod('put');
        try{
            const response = await fetch(`http://localhost:4000/api/v1/products/${id}`);
            const data = await response.json();
            setProduct(data.body);
        } catch (error) {
            console.log(error);
        }
        setShowForm(true);
    }
    const updateProduct = async (id) => {
        try{
            const response = await fetch(`http://localhost:4000/api/v1/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            if (response.ok) {
                getProducts();
                setShowForm(false);
                setMethod('');
                setProduct({ product_name: "", price: "", color: "" });
            } else {
                console.log('Error adding product:', response.status);
            }
        } catch(error){
            console.log(error)
        }
    }

    const deleteProduct = async (id) => {
        try{
            const response = await fetch(`http://localhost:4000/api/v1/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.ok){
                getProducts();
                setShowForm(false);
                setMethod('');
                setProduct({ product_name: "", price: "", color: "" });
            }
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div className="form-container">
            <div className="navigation-container">
                <ButtonComponent 
                action={'create'}
                showFormToAddProduct={showFormToAddProduct}
                ></ButtonComponent>
                <SearchProductComponent
                searchProduct={searchProduct}></SearchProductComponent>
            </div>
            <div className="header-container">
                <ul className="header">
                    <li className="item-header-id">Id</li>
                    <li className="item-header-name">Producto</li>
                    <li className="item-header-price">Price</li>
                    <li className="item-header-color">Color</li>
                    <li className="item-header-date">Date</li>
                </ul>
            </div>
            <div className="product-grid">
                {productFilterd.map((field) => 
                    <div key={field.product_id} className="product-container">
                        <ProductComponent
                        productId={field.product_id}
                        productName={field.product_name}
                        price={field.price}
                        color={field.color}
                        date ={field.createdAt}
                        >
                        </ProductComponent>
                        <div className="container-methods">
                            <ButtonComponent action={'update'} getProductById={() => getProductById(field.product_id)}></ButtonComponent>
                            <ButtonComponent action={'delete'} deleteProduct={() => deleteProduct(field.product_id)}></ButtonComponent>
                        </div>
                    </div>
                )}               
            </div>
            <FormProductComponent
            showForm={showForm}
            product={product}
            handleChangeProductName={handleChangeProductName}
            cancelFunction={cancelFunction}
            addNewProduct={addNewProduct}
            updateProduct={() => updateProduct(product.product_id)}
            method={method}>
            </FormProductComponent>

    </div>
    )
}
export default FormComponent
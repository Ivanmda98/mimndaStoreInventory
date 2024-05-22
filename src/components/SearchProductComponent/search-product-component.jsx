import './search-product-component.css';
function SearchProductComponent({searchProduct}){
    return (
        <div className="search-container">
            <form action="" className='search-form'>
                    <label htmlFor="">Search:</label>
                    <input type="text" 
                    onChange={(e) => searchProduct(e)}/>
                </form>
        </div>
    )
}
export default SearchProductComponent 
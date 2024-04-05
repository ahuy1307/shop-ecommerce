function ProductItem() {
    return <>
        <img src="./images/login_img.png" alt=""/>
        <div>
            <h3 className={"text-sm font-bold"}>Adidas</h3>
            <p className={"text-sm"}>Men adi-dash Running Shoes</p>
            <span className={"text-sm"}>$60.00</span>
            <span className={"text-sm ml-2 line-through text-gray-500/50"}>$75.00</span>
        </div>
    </>
}

export default ProductItem
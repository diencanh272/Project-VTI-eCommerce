var listProduct = [];

$(function () {
    loadComponent();

    setTimeout(() => {
        renderListProduct();
    }, 200);
});

function loadComponent(params) {
    $("#header").load("./templates/header.html");
    $("#slider-wrap").load("./templates/slider.html");
    $("#product-wrap").load("./templates/product.html");
    $("#footer").load("./templates/footer.html");
}

function renderListProduct(params) {
    // Render List Product từ localStorage
    if (localStorage && localStorage.getItem("listProductData")) {
        // alert("Yes!");
        var listProductHome = JSON.parse(
            localStorage.getItem("listProductData")
        );

        listProduct = listProductHome;

        for (let i = 0; i < listProductHome.length; i++) {
            $(".product-list").append(`
            <div class="col">
                <article class="product-card">
                    <div class="product-card__img-wrap">
                        <a href="#!">
                            <img
                                src="./src/assets/product/${listProduct[i].imageFile}"
                                alt="${listProduct[i].name}"
                                class="product-card__thumb"
                            />
                        </a>
                    </div>
        
                    <div class="product-card__info">
                        <h3 class="product-card__title line-clamp">
                            <a href="#!"> ${listProduct[i].name} </a>
                        </h3>
                        <p class="product-card__brand">Hãng sản xuất: ${listProduct[i].manufacturerOption}</p>
                        <div class="product-card__value">
                            <button class="product-card__rating">
                                <img
                                    src="./src/assets/icons/star.svg"
                                    alt=""
                                    class="product-card__star"
                                />
                                <img
                                    src="./src/assets/icons/star.svg"
                                    alt=""
                                    class="product-card__star"
                                />
                                <img
                                    src="./src/assets/icons/star.svg"
                                    alt=""
                                    class="product-card__star"
                                />
                                <img
                                    src="./src/assets/icons/star.svg"
                                    alt=""
                                    class="product-card__star"
                                />
                                <img
                                    src="./src/assets/icons/star-half.svg"
                                    alt=""
                                    class="product-card__star"
                                />
                            </button>
                        </div>
                        <div class="product-card__buy">
                            <span class="product-card__cost">${listProduct[i].price}</span>
                            <a href='#!'>
                                <img
                                    class="product-card__cart"
                                    src="./src/assets/icons/cart.svg"
                                    alt="Cart"
                                />
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        `);
        }
    } else {
        alert("No Storage!");
    }
}

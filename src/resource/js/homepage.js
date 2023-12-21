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
    for (let i = 0; i < 8; i++) {
        $(".product-list").append(`

        <div class="col">
                <article class="product-card">
                    <div class="product-card__img-wrap">
                        <a href="#!">
                            <img
                                src="./src/assets/product/iphone-15-pro-blue-thumbnew-600x600.jpg"
                                alt="Iphone 15 Pro Blue"
                                class="product-card__thumb"
                            />
                        </a>
                    </div>

                    <div class="product-card__info">
                        <h3 class="product-card__title line-clamp">
                            <a href="#!"> Iphone 15 Pro 512GB </a>
                        </h3>
                        <p class="product-card__brand">Hãng sản xuất: APPLE</p>
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
                            <span class="product-card__cost">$47.00</span>
                            <img
                                class="product-card__cart"
                                src="./src/assets/icons/cart.svg"
                                alt="Cart"
                            />
                        </div>
                    </div>
                </article>
            </div>
        `);
    }
}

// $(document).ready(function () {
//     $("#admin").click(function () {});
// });

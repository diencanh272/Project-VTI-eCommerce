var listProduct = [];
var username = "admin";
var password = 123456;

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

// Render từ localStorage ra Home
function renderListProduct(params) {
    // // Render List Product từ localStorage
    // if (localStorage && localStorage.getItem("listProductData")) {
    //     // alert("Yes!");
    //     var listProductHome = JSON.parse(
    //         localStorage.getItem("listProductData")
    //     );

    // listProduct = listProductHome;

    //  Thực hiện call API
    $.ajax({
        type: "GET", // method
        url: "http://localhost:8080/api/v1/products", // path BE
        data: "data", //dữ liệu cần truyền kèm về BE
        dataType: "json", // kiểu dữ liệu nhân về

        // xử lý đăng nhập với server
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Basic " + btoa(username + ":" + password)
            );
        },
        success: function (response, status) {
            // console.log("response:", response);
            // console.log("status:", status);

            if (status === "success") {
                listProduct = response.content;

                for (let i = 0; i < listProduct.length; i++) {
                    $(".product-list").append(`
                        <div class="col">
                            <article class="product-card">
                                <div class="product-card__img-wrap">
                                    <a href="#!">
                                        <img
                                            src="./src/assets/product/${listProduct[i].imageName}"
                                            alt="${listProduct[i].name}"
                                            class="product-card__thumb"
                                        />
                                    </a>
                                </div>
            
                                <div class="product-card__info">
                                    <h3 class="product-card__title line-clamp">
                                        <a href="#!"> ${listProduct[i].name} </a>
                                    </h3>
                                    <p class="product-card__brand">Hãng sản xuất: ${listProduct[i].manufacturerName}</p>
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
            }
        },
    });
}

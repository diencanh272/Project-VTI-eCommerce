var listProduct = [];
var listAccountData = [];
var listPhoneProduct = [];
var listTabletProduct = [];
var listLaptopProduct = [];
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
    //  Thực hiện call API Product ra Home age
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
                        <div class="col col-lg-4 col-md-6 col-sm-6">
                            <article class="product-card">
                                <div class="product-card__img-wrap">
                                    <a href="#!">
                                        <img
                                            src="./src/assets/product/${
                                                listProduct[i].imageName
                                            }"
                                            alt="${listProduct[i].name}"
                                            class="product-card__thumb"
                                        />
                                    </a>
                                </div>
            
                                <div class="product-card__info">
                                    <h3 class="product-card__title line-clamp">
                                        <a href="#!"> ${
                                            listProduct[i].name
                                        } </a>
                                    </h3>
                                    <p class="product-card__brand">Hãng sản xuất: ${
                                        listProduct[i].manufacturerName
                                    }</p>
                                    <ul class="product-card__value">
                                        ${showStarRating(
                                            listProduct[i].ratingStar
                                        )} 
                                    </ul>
                                    <div class="product-card__buy">
                                        <span class="product-card__cost">${
                                            listProduct[i].price
                                        }</span>
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

// Handle rating star

function showStarRating(ratingStar) {
    // Khai báo mảng
    let starRating = "";
    // Hiển thị đánh giá có Sao
    for (let index = 1; index <= ratingStar; index++) {
        starRating += `
        <li>
        <img
        src="./src/assets/icons/star.svg"
        alt=""
        class="product-card__star"
    />
        </li>`;
    }
    // Hiển thị các Sao không được đánh gía
    for (let index = 1; index <= 5 - ratingStar; index++) {
        starRating += `
      <li>
      <img
      src="./src/assets/icons/no-star.svg"
      alt=""
      class="product-card__star"
  />
      </li>`;
    }
    //
    return starRating;
}

// Login Admin
function fetchListAccountAdminLogin() {
    listAccountData = [];
    var listCheckEmailAccount = [];
    var listCheckUserAccount = [];
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/accounts",
        data: "data",
        dataType: "json",
        // xử lý đăng nhập với server
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Basic " + btoa(username + ":" + password)
            );
        },
        success: function (response, status) {
            if (status === "success") {
                // console.log(response);
                listAccountData = response;
                for (let i = 0; i < listAccountData.length; i++) {
                    if (listAccountData[i].status == "ACTIVE") {
                        listCheckEmailAccount.push(listAccountData[i].email);
                        listCheckUserAccount.push(listAccountData[i].username);
                        var v_emailLoginAdmin = $("#emailLoginAdmin").val();
                        var v_usernameLoginAdmin = $(
                            "#usernameLoginAdmin"
                        ).val();
                    }
                }
                // console.log(listCheckEmailAccount);
                // console.log(listCheckUserAccount);
                if (
                    listCheckEmailAccount.includes(v_emailLoginAdmin) &&
                    listCheckUserAccount.includes(v_usernameLoginAdmin)
                ) {
                    // alert("hi");
                    window.open("./admin.html");
                } else {
                    alert(
                        v_emailLoginAdmin +
                            " or " +
                            v_usernameLoginAdmin +
                            " Email NOT_ACTIVE!"
                    );
                }
            }
        },
    });
}

// Handle click Phone Product
function handleClickPhoneProduct() {
    //  Thực hiện call API Phone Product ra Home age
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
                // alert("hi");
                listProduct = response.content;

                for (let i = 0; i < listProduct.length; i++) {
                    if (listProduct[i].categoryName == "Điện thoại") {
                        listPhoneProduct.push(listProduct[i]);
                    }
                }
                $(".category-list").empty();
                // console.log(listPhoneProduct);
                for (let i = 0; i < listPhoneProduct.length; i++) {
                    $(".category-list").append(`
                    <div class="col col-lg-4 col-md-6 col-sm-6">
                        <article class="product-card">
                            <div class="product-card__img-wrap">
                                <a href="#!">
                                    <img
                                        src="./src/assets/product/${
                                            listPhoneProduct[i].imageName
                                        }"
                                        alt="${listPhoneProduct[i].name}"
                                        class="product-card__thumb"
                                    />
                                </a>
                            </div>

                            <div class="product-card__info">
                                <h3 class="product-card__title line-clamp">
                                    <a href="#!"> ${
                                        listPhoneProduct[i].name
                                    } </a>
                                </h3>
                                <p class="product-card__brand">Hãng sản xuất: ${
                                    listPhoneProduct[i].manufacturerName
                                }</p>
                                <ul class="product-card__value">
                                    ${showStarRating(
                                        listPhoneProduct[i].ratingStar
                                    )}
                                </ul>
                                <div class="product-card__buy">
                                    <span class="product-card__cost">${
                                        listPhoneProduct[i].price
                                    }</span>
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
                listPhoneProduct = [];
            }
        },
    });
}

// Handle click Tablet Product
function handleClickTabletProduct() {
    //  Thực hiện call API Phone Product ra Home age
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
                // alert("hi");
                listProduct = response.content;
                // console.log(listProduct);

                for (let i = 0; i < listProduct.length; i++) {
                    if (listProduct[i].categoryName == "Tablet") {
                        listTabletProduct.push(listProduct[i]);
                    }
                }
                // console.log(listTabletProduct);
                $(".category-list").empty();
                for (let i = 0; i < listTabletProduct.length; i++) {
                    $(".category-list").append(`
                    <div class="col col-lg-4 col-md-6 col-sm-6">
                        <article class="product-card">
                            <div class="product-card__img-wrap">
                                <a href="#!">
                                    <img
                                        src="./src/assets/product/${
                                            listTabletProduct[i].imageName
                                        }"
                                        alt="${listTabletProduct[i].name}"
                                        class="product-card__thumb"
                                    />
                                </a>
                            </div>

                            <div class="product-card__info">
                                <h3 class="product-card__title line-clamp">
                                    <a href="#!"> ${
                                        listTabletProduct[i].name
                                    } </a>
                                </h3>
                                <p class="product-card__brand">Hãng sản xuất: ${
                                    listTabletProduct[i].manufacturerName
                                }</p>
                                <ul class="product-card__value">
                                    ${showStarRating(
                                        listTabletProduct[i].ratingStar
                                    )}
                                </ul>
                                <div class="product-card__buy">
                                    <span class="product-card__cost">${
                                        listTabletProduct[i].price
                                    }</span>
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
                listTabletProduct = [];
            }
        },
    });
}

// Handle click Laptop Product
function handleClickLaptopProduct() {
    //  Thực hiện call API Phone Product ra Home age
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
                // alert("hi");
                listProduct = response.content;

                for (let i = 0; i < listProduct.length; i++) {
                    if (listProduct[i].categoryName == "Laptop") {
                        listLaptopProduct.push(listProduct[i]);
                    }
                }
                // console.log(listLaptopProduct);
                $(".category-list").empty();

                for (let i = 0; i < listLaptopProduct.length; i++) {
                    $(".category-list").append(`
                        <div class="col col-lg-4 col-md-6 col-sm-6">
                            <article class="product-card">
                                <div class="product-card__img-wrap">
                                    <a href="#!">
                                        <img
                                            src="./src/assets/product/${
                                                listLaptopProduct[i].imageName
                                            }"
                                            alt="${listLaptopProduct[i].name}"
                                            class="product-card__thumb"
                                        />
                                    </a>
                                </div>

                                <div class="product-card__info">
                                    <h3 class="product-card__title line-clamp">
                                        <a href="#!"> ${
                                            listLaptopProduct[i].name
                                        } </a>
                                    </h3>
                                    <p class="product-card__brand">Hãng sản xuất: ${
                                        listLaptopProduct[i].manufacturerName
                                    }</p>
                                    <ul class="product-card__value">
                                        ${showStarRating(
                                            listLaptopProduct[i].ratingStar
                                        )}
                                    </ul>
                                    <div class="product-card__buy">
                                        <span class="product-card__cost">${
                                            listLaptopProduct[i].price
                                        }</span>
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
                listLaptopProduct = [];
            }
        },
    });
}

// Add Account User
// 1. click show form
// 2. validate form
// 3. check acc user post

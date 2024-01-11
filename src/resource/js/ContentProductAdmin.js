var idUpdateProduct = "";
var listManufacturerData = [];
var listCategoryData = [];
var username = "admin";
var password = 123456;

// ---------Save data modal create new--------------

// Hàm đổ dữ liệu vào table
function fetchListProductAdmin(params) {
    var listProductData = [];
    var sliceProductPage = [];
    var totalPage = 0;
    var productPerPage = 10;
    var currentPage = 1;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/products",
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
            // console.log(status);
            // console.log(response);

            if (status === "success") {
                listProductData = response.content;

                // *****Pagination
                // sliceProductPage
                sliceProductPage = listProductData.slice(
                    (currentPage - 1) * productPerPage,
                    currentPage * productPerPage
                );
                renderPageNumber();
                renderProductPageData();
            }
        },
    });
    // Render page number
    function renderPageNumber() {
        $(".pagination").empty();
        // total page
        var rowPage = Math.ceil(listProductData.length / productPerPage);
        //console.log(rowPage);
        for (i = 1; i <= rowPage; i++) {
            $(".pagination").append(`
                        <li class="pagination__item" onclick = "changePage(${i})">
                            ${i}
                        </li>
                `);

            if (currentPage === i) {
                $(".pagination__item").addClass("active-page");
            }
        }

        $(".pagination__item")
            .not(`:nth-child(${currentPage})`)
            .removeClass("active-page");

        // change current page
        changePage = (page) => {
            currentPage = page;
            sliceProductPage = listProductData.slice(
                (currentPage - 1) * productPerPage,
                currentPage * productPerPage
            );
            renderPageNumber();
            renderProductPageData();
        };
    }

    // Render product page data
    function renderProductPageData() {
        $(".product-admin-data").empty();
        //  Lặp qua dữ liệu từ form rồi render
        for (let i = 0; i < sliceProductPage.length; i++) {
            $(".product-admin-data").append(`
                <tr>
                <td>${sliceProductPage[i].id}</td>
                <td>${sliceProductPage[i].name}</td>
                <td>${sliceProductPage[i].price}</td>
                <td>${sliceProductPage[i].info}</td>
                <td>${sliceProductPage[i].detail}</td>
                <td>${sliceProductPage[i].ratingStar}</td>
                <td>${sliceProductPage[i].imageName}</td>
                <td>${sliceProductPage[i].manufacturerName}</td>
                <td>${sliceProductPage[i].categoryName}</td>
                <td><button type="button" class="btn btn-success dfcenter"  onclick = "handleEditProduct(${sliceProductPage[i].id})">
                <img src="./src/assets/icons/edit.svg" alt="" />
                </button></td>
                <td><button type="button" class="btn btn-danger dfcenter" onclick = "handleDeleteProduct(${sliceProductPage[i].id})">
                <img src="./src/assets/icons/delete.svg" alt="" />
                </button></td>
                </tr>

                `);
        }
    }
}

//Tích hợp API cho AdminPage POST Data.
function handleCreateNewProduct(params) {
    // Lấy thông tin dữ liệu
    // var idInput = $("#idInput").val();
    var nameInput = $("#nameInput").val();
    var priceInput = $("#priceInput").val();
    var infoInput = $("#infoInput").val();
    var detailsInput = $("#detailsInput").val();
    var ratingStar = $("#ratingStar").val();
    var imageFile = getImageName($("#imageFile").val());
    var manufacturerOption = $("#manufacturerOption").val();
    var categoryOption = $("#categoryOption").val();

    var listProductDataNew = {
        // id: idInput,
        name: nameInput,
        price: priceInput,
        info: infoInput,
        detail: detailsInput,
        ratingStar: ratingStar,
        imageName: imageFile,
        manufacturerId: manufacturerOption,
        categoryId: categoryOption,
    };
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/products",
        data: JSON.stringify(listProductDataNew),
        // dataType: "json",
        contentType: "application/json; charset=UTF-8",
        // xử lý đăng nhập với server
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Basic " + btoa(username + ":" + password)
            );
        },
        success: function (response, status) {
            if (status === "success") {
                fetchListProductAdmin();
            } else {
                console.log("Error!!");
            }
        },
    });

    // reset lại form
    resetFormProductInput();

    // đổ dữ liệu vào table
    fetchListProductAdmin();
}

//  *************Handle Delete Product ***********
// Tích hợp API cho AdminPage DELETE Data.
function handleDeleteProduct(idDel) {
    var confirmDelete = confirm("Bạn có chắc chắn xóa sản phẩm này không!");

    if (confirmDelete) {
        var indexDelete = listProductData.findIndex(function (product) {
            return product.id == idDel;
        });

        if (indexDelete !== -1) {
            var urlDelete = "http://localhost:8080/api/v1/products/" + idDel;

            $.ajax({
                type: "DELETE",
                url: urlDelete,
                // data: "data",
                // dataType: "dataType",
                // xử lý đăng nhập với server
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Basic " + btoa(username + ":" + password)
                    );
                },
                success: function (response) {
                    fetchListProductAdmin();
                },
            });
        } else {
            alert("Không thể xóa sản phẩm!");
        }
    }
}

//  *************Handle Edit Product ***********
// Tích hợp API cho AdminPage PUT Data.
function handleEditProduct(idEditProduct) {
    idUpdateProduct = idEditProduct;

    // Tìm id sản phẩm cần sửa
    var index = listProductData.findIndex(function (product) {
        return product.id == idUpdateProduct;
    });

    // Tìm manufacturerId của Product cần Update
    var manufacturerUpdate = listManufacturerData.find(
        (manufacturer) =>
            manufacturer.name == listProductData[index].manufacturerName
    );

    // Tìm categoryId của Product cần Update
    var categoryUpdate = listCategoryData.find(
        (category) => category.name == listProductData[index].categoryName
    );

    // gán lại giá trị vào ô input để sửa lại
    $("#idUpdate").val(listProductData[index].id);
    $("#nameUpdate").val(listProductData[index].name);
    $("#priceUpdate").val(listProductData[index].price);
    $("#infoUpdate").val(listProductData[index].info);
    $("#detailsUpdate").val(listProductData[index].detail);
    $("#starUpdate").val(listProductData[index].ratingStar);
    $("#manufacturerOptionUpdate").val(manufacturerUpdate.id);
    $("#categoryOptionUpdate").val(categoryUpdate.id);

    $("#updateProductModal").modal("show");
}

// *** Handle update form
// Tích hợp API cho AdminPage PUT Data.
function handleUpdateProduct() {
    // Tìm id sản phẩm cần update
    var index = listProductData.findIndex(
        (product) => product.id == idUpdateProduct
    );

    var nameUpdate = $("#nameUpdate").val();
    var priceUpdate = $("#priceUpdate").val();
    var infoUpdate = $("#infoUpdate").val();
    var detailUpdate = $("#detailsUpdate").val();
    var starUpdate = $("#starUpdate").val();
    var imageUpdate = getImageName($("#imageUpdate").val());
    var manufacturerUpdate = $("#manufacturerOptionUpdate").val();
    var categoryUpdate = $("#categoryOptionUpdate").val();

    if (imageUpdate == null || imageUpdate == "") {
        imageUpdate = listProductData[index].imageName;
    }

    let productUpdate = {
        name: nameUpdate,
        price: priceUpdate,
        info: infoUpdate,
        detail: detailUpdate,
        ratingStar: starUpdate,
        imageName: imageUpdate,
        manufacturerId: manufacturerUpdate,
        categoryId: categoryUpdate,
    };

    let urlUpdate = "http://localhost:8080/api/v1/products/" + idUpdateProduct;

    $.ajax({
        type: "PUT",
        url: urlUpdate,
        data: JSON.stringify(productUpdate),
        // dataType: "dataType",
        contentType: "application/json; charset=UTF-8",
        // xử lý đăng nhập với server
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Basic " + btoa(username + ":" + password)
            );
        },
        success: function (response, status) {
            // console.log(response);
            // console.log(status);
            if (status === "success") {
                fetchListProductAdmin();
                alert("Update success!!");
            } else {
                console.log("Update not success!!");
            }
        },
    });

    handleResetFormUpdate();
    fetchListProductAdmin();
}
// **** Handle reset form Update
function handleResetFormUpdate() {
    $("#idUpdate").val("");
    $("#nameUpdate").val("");
    $("#priceUpdate").val("");
    $("#infoUpdate").val("");
    $("#detailsUpdate").val("");
    $("#starUpdate").val("");
    $("#imageFile").val("");
    $("#manufacturerOptionUpdate").val(0);
    $("#categoryOptionUpdate").val(0);
}
// Hàm resetForm
function resetFormProductInput(params) {
    $("#idInput").val("");
    $("#nameInput").val("");
    $("#priceInput").val("");
    $("#infoInput").val("");
    $("#detailsInput").val("");
    $("#ratingStar").val("");
    $("#imageFile").val("");
    $("#manufacturerOption").val("");
    $("#categoryOption").val("");
}

// Hàm lấy tên ảnh
function getImageName(pathImage) {
    // Chuyển đường dẫn thành mảng các phần tử
    var itemArray = pathImage.split("\\");

    // Lấy phần tử cuối cùng
    var imageName = itemArray[itemArray.length - 1];

    return imageName;
}

// ToDo ***************** chạy lại web xem lại code
// ToDo ***************** ôn tập
// ToDo *****************
// ToDo *****************
// ToDo *****************

var idUpdateProduct = "";
var listProductData = [];
var listManufacturerData = [];
var listCategoryData = [];
var username = "admin";
var password = 123456;

// ---------Save data modal create new--------------

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

    // listProductData.push(listProductDataNew);
    // // lưu vào local
    // localStorage.setItem("listProductData", JSON.stringify(listProductData));

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
            if (status === "content") {
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

// Hàm đổ dữ liệu vào table
function fetchListProductAdmin(params) {
    listProductData = [];
    // Get data lưu trữ tại localStorage
    // if (localStorage && localStorage.getItem("listProductData")) {
    //     var listProductDataStorage = JSON.parse(
    //         localStorage.getItem("listProductData")
    //     );
    //     // Lưu vào listProductData JS để render dữ liệu
    //     listProductData = listProductDataStorage;
    // }

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

                $(".product-admin-data").empty();
                //  Lặp qua dữ liệu từ form rồi render
                for (let i = 0; i < listProductData.length; i++) {
                    $(".product-admin-data").append(`
                    <tr>
                    <td>${listProductData[i].id}</td>
                    <td>${listProductData[i].name}</td>
                    <td>${listProductData[i].price}</td>
                    <td>${listProductData[i].info}</td>
                    <td>${listProductData[i].detail}</td>
                    <td>${listProductData[i].ratingStar}</td>
                    <td>${listProductData[i].imageName}</td>
                    <td>${listProductData[i].manufacturerName}</td>
                    <td>${listProductData[i].categoryName}</td>
                    <td>
                        <button type="button" class="btn btn-warning btn-edit-product" onclick = "handleEditProduct(${listProductData[i].id})" >
                            Edit
                        </button>
                     </td>
                     <td>
                        <button type="button" class="btn btn-danger"  onclick = "handleDeleteProduct(${listProductData[i].id})">
                            Delete
                        </button>
                     </td>
                    </tr>
                    `);
                }
            }
        },
    });
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

//  Tích hợp API cho AdminPage Get dữ liệu Manufacturer
$.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/manufacturers",
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
            listManufacturerData = response;
            for (let i = 0; i < listManufacturerData.length; i++) {
                $("#manufacturerOption").append(`
                <option value = "${listManufacturerData[i].id}">${listManufacturerData[i].name}</option>
                `);

                $("#manufacturerOptionUpdate").append(`
                <option value = "${listManufacturerData[i].id}">${listManufacturerData[i].name}</option>
                `);
            }
        }
    },
});

//  Tích hợp API cho AdminPage Get dữ liệu Category
$.ajax({
    type: "GET",
    url: "http://localhost:8080/api/v1/categorys",
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
            listCategoryData = response;
            for (let i = 0; i < listCategoryData.length; i++) {
                $("#categoryOption").append(`
                <option value = "${listCategoryData[i].id}">${listCategoryData[i].name}</option>
                `);

                $("#categoryOptionUpdate").append(`
                <option value = "${listCategoryData[i].id}">${listCategoryData[i].name}</option>
                `);
            }
        }
    },
});

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

        // if (indexDelete !== -1) {
        //     listProductData.splice(indexDelete, 1);
        //     localStorage.setItem(
        //         "listProductData",
        //         JSON.stringify(listProductData)
        //     );

        //     fetchListProductAdmin();
        // } else {
        //     alert("Không tìm thấy sản phẩm bạn muốn xóa");
        // }
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
            } else {
                console.log("Update not success!!");
            }
        },
    });

    handleResetFormUpdate();
}

// ToDo ***************** ĐỂ ID SẢN PHẨM TỰ TĂNG VÀO DISABLED
// ToDo ***************** phân trang
// ToDo ***************** đăng kí đăng nhập
// ToDo ***************** navigation
// ! thứ năm kiểm tra bài tập
// ! tuần sau kiểm tra lần 1

// ! cần xử lý
// 1. reset form update modal
// 3. chạy slide home page
// 4. xử lý id của admin

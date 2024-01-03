// ---------Generate data--------------

// ---------Save data modal create new--------------

var listProductData = [];
var idUpdateProduct = "";

function handleCreateNewProduct(params) {
    // Lấy thông tin dữ liệu
    var idInput = $("#idInput").val();
    var nameInput = $("#nameInput").val();
    var priceInput = $("#priceInput").val();
    var infoInput = $("#infoInput").val();
    var detailsInput = $("#detailsInput").val();
    var ratingStar = $("#ratingStar").val();
    var imageFile = getImageName($("#imageFile").val());
    var manufacturerOption = $("#manufacturerOption").val();
    var categoryOption = $("#categoryOption").val();

    var listProductDataNew = {
        id: idInput,
        name: nameInput,
        price: priceInput,
        info: infoInput,
        details: detailsInput,
        star: ratingStar,
        imageFile: imageFile,
        manufacturerOption: manufacturerOption,
        categoryOption: categoryOption,
    };

    listProductData.push(listProductDataNew);

    // lưu vào local
    localStorage.setItem("listProductData", JSON.stringify(listProductData));

    // reset lại form
    resetFormProductInput();

    // đổ dữ liệu vào table
    fetchListProductAdmin();
}

// Hàm đổ dữ liệu vào table
function fetchListProductAdmin(params) {
    $(".product-admin-data").empty();

    // Get data lưu trữ tại localStorage
    if (localStorage && localStorage.getItem("listProductData")) {
        var listProductDataStorage = JSON.parse(
            localStorage.getItem("listProductData")
        );

        // Lưu vào listProductData JS để render dữ liệu
        listProductData = listProductDataStorage;
    }

    //  Lặp qua dữ liệu từ form rồi render
    for (let i = 0; i < listProductData.length; i++) {
        $(".product-admin-data").append(`
        <tr>
        <td>${listProductData[i].id}</td>
        <td>${listProductData[i].name}</td>
        <td>${listProductData[i].price}</td>
        <td>${listProductData[i].info}</td>
        <td>${listProductData[i].details}</td>
        <td>${listProductData[i].star}</td>
        <td>${listProductData[i].imageFile}</td>
        <td>${listProductData[i].manufacturerOption}</td>
        <td>${listProductData[i].categoryOption}</td>
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

//  *************Handle Delete Product ***********

function handleDeleteProduct(idDel) {
    var confirmDelete = confirm("Bạn có chắc chắn xóa sản phẩm này không!");

    if (confirmDelete) {
        var indexDelete = listProductData.findIndex(function (product) {
            return product.id == idDel;
        });

        if (indexDelete !== -1) {
            listProductData.splice(indexDelete, 1);
            localStorage.setItem(
                "listProductData",
                JSON.stringify(listProductData)
            );

            fetchListProductAdmin();
        } else {
            alert("Không tìm thấy sản phẩm bạn muốn xóa");
        }
    }
}

//  *************Handle Edit Product ***********
function handleEditProduct(idEditProduct) {
    idUpdateProduct = idEditProduct;

    // Tìm id sản phẩm cần sửa
    var index = listProductData.findIndex(function (product) {
        return product.id == idUpdateProduct;
    });

    // gán lại giá trị vào ô input để sửa lại
    $("#idUpdate").val(listProductData[index].id);
    $("#nameUpdate").val(listProductData[index].name);
    $("#priceUpdate").val(listProductData[index].price);
    $("#infoUpdate").val(listProductData[index].info);
    $("#detailsUpdate").val(listProductData[index].detail);
    $("#starUpdate").val(listProductData[index].star);
    $("#manufacturerOptionUpdate").val(
        listProductData[index].manufacturerOption
    );
    $("#categoryOptionUpdate").val(listProductData[index].categoryOption);

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
    $("#manufacturerOptionUpdate").val(0);
    $("#categoryOptionUpdate").val(0);
}

// *** Handle update form
function handleUpdateProduct() {
    // Tìm id sản phẩm cần update
    var index = listProductData.findIndex(function (product) {
        return product.id == idUpdateProduct;
    });
}

// ToDo ***************** ĐỂ ID SẢN PHẨM TỰ TĂNG VÀO DISABLED
// ToDo ***************** phân trang
// ToDo ***************** đăng kí đăng nhập
// ToDo ***************** navigation
// ! thứ năm kiểm tra bài tập
// ! tuần sau kiểm tra lần 1

// ! cần xử lý
// 1. reset form update modal
// 2. xử lý số lượng sao trong input
// 3. chạy slide home page
// 4. thêm footer

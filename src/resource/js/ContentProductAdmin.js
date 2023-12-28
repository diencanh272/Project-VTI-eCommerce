// ---------Generate data--------------

// ---------Save data modal create new--------------

var listProductData = [];
function handleCreateNewProduct(params) {
    // Lấy thông tin dữ liệu
    var idInput = $("#idInput").val();
    var nameInput = $("#nameInput").val();
    var priceInput = $("#priceInput").val();
    var infoInput = $("#infoInput").val();
    var detailsInput = $("#detailsInput").val();
    var fieldInput = $("#fieldInput").val();
    var imageFile = getImageName($("#imageFile").val());
    var manufacturerOption = $("#manufacturerOption").val();
    var categoryOption = $("#categoryOption").val();

    var listProductDataNew = {
        id: idInput,
        name: nameInput,
        price: priceInput,
        info: infoInput,
        details: detailsInput,
        field: fieldInput,
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
        <td>${listProductData[i].field}</td>
        <td>${listProductData[i].imageFile}</td>
        <td>${listProductData[i].manufacturerOption}</td>
        <td>${listProductData[i].categoryOption}</td>
        <td>
            <button type="button" class="btn btn-warning btn-edit-product" >
                Edit
            </button>
         </td>
         <td>
            <button type="button" class="btn btn-danger" onclick = "handleDeleteProduct(${listProductData[i].id})">
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
    $("#fieldInput").val("");
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
$(document).ready(function () {
    $(".btn-edit-product").click(function () {
        $(".edit-to-add").addClass("show");
        $(".edit-to-add").css("display", "block");
    });
    // click edit button show form với input cũ
    // edit trực tiếp lại input
    //
});

// ***************** ĐỂ ID SẢN PHẨM TỰ TĂNG VÀO DISABLED

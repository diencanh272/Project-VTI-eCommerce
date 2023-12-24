$(document).ready(function () {
    // ---------Generate data--------------
    $(".product-admin-data").empty();

    for (var i = 0; i < 6; i++) {
        $(".product-admin-data").append(`
    <tr >
        <td>1</td>
        <td>Samsung Galaxy S22 Ultra 5G</td>
        <td>30.990.000₫</td>
        <td>
            6.9 inches, Chip MediaTek Helio G85 (12nm) mạnh
            mẽ, Ram 4G, Pin 7000 mAh
        </td>
        <td>ProductDetail1</td>
        <td>5</td>
        <td>image1.jpg</td>
        <td>SAMSUNG</td>
        <td>Điện thoại</td>
        <td>
            <button type="button" class="btn btn-warning">
                Edit
            </button>
        </td>
        <td>
            <button type="button" class="btn btn-danger">
                Delete
            </button>
        </td>
    </tr>
    `);
    }
    // ---------Save data modal create new--------------

    $(".btn-save-product").click(function () {
        // Lấy thông tin đăng kí
        var idInput = $("#idInput").val();
        var nameInput = $("#nameInput").val();
        var priceInput = $("#priceInput").val();
        var infoInput = $("#infoInput").val();
        var detailsInput = $("#detailsInput").val();
        var fieldInput = $("#fieldInput").val();
        var imageFile = $("#imageFile").val();
        var manufacturerOption = $("#manufacturerOption").val();
        var categoryOption = $("#categoryOption").val();

        var listProductData = {
            idInput: idInput,
            nameInput: nameInput,
            priceInput: priceInput,
            infoInput: infoInput,
            detailsInput: detailsInput,
            imageFile: imageFile,
            manufacturerOption: manufacturerOption,
            categoryOption: categoryOption,
        };

        localStorage.setItem(
            "listProductData",
            JSON.stringify(listProductData)
        );
    });
});

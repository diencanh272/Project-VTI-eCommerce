$(function () {
    loadComponentAdmin();
});

// Load các thành phần của trang Home Page
function loadComponentAdmin(params) {
    $(".header-admin").load("./templates-admin/HeaderAdmin.html");
    $(".sidebar-section").load("./templates-admin/SideBarAdmin.html");
}

// Click showProduct

function showProduct(params) {
    $(".product-admin-section").load(
        "./templates-admin/ContentProductAdmin.html",
        "data",
        function () {}
    );
}

function showManufacturer(params) {
    $(".product-admin-section").load(
        "./templates-admin/ContentManufacturerAdmin.html",
        "data",
        function () {}
    );
}

function showAccount(params) {
    $(".product-admin-section").load(
        "./templates-admin/ContentAccountAdmin.html",
        "data",
        function () {}
    );
}

function showCategory(params) {
    $(".product-admin-section").load(
        "./templates-admin/ContentCategoryAdmin.html",
        "data",
        function () {}
    );
}

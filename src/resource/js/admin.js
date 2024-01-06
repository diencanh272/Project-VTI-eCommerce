$(function () {
    loadComponentAdmin();
});

// Load các thành phần của trang Home Page
function loadComponentAdmin(params) {
    $(".header-admin").load("./templates-admin/HeaderAdmin.html");
    $(".sidebar-section").load("./templates-admin/SideBarAdmin.html");
}

// Load các thành phần của trang Admin Page

function showProduct(params) {
    $(".admin-section").load(
        "./templates-admin/ContentProductAdmin.html",
        "data",
        function () {
            fetchListProductAdmin();
        }
    );
}

function showManufacturer(params) {
    $(".admin-section").load(
        "./templates-admin/ContentManufacturerAdmin.html",
        "data",
        function () {
            fetchListManuAdmin();
        }
    );
}

function showAccount(params) {
    $(".admin-section").load(
        "./templates-admin/ContentAccountAdmin.html",
        "data",
        function () {
            fetchListAccountAdmin();
        }
    );
}

function showCategory(params) {
    $(".admin-section").load(
        "./templates-admin/ContentCategoryAdmin.html",
        "data",
        function () {
            fetchListCategoryAdmin();
        }
    );
}

// Get date
function SetDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var today = year + "-" + month + "-" + day;

    document.getElementById("createDate").value = today;
}

// ***************Login Admin****************

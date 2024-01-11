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

var username = "admin";
var password = 123456;
var listCategoryData = [];

function fetchListCategoryAdmin() {
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
            if (status === "success") {
                // console.log(response);
                listCategoryData = response;
                for (let i = 0; i < listCategoryData.length; i++) {
                    $(".cate-admin-data").append(`
                    <tr>
                        <td scope="row">${listCategoryData[i].id}</td>
                        <td>${listCategoryData[i].name}</td>
                        <td><button type="button" class="btn btn-success dfcenter">
                        <img src="./src/assets/icons/edit.svg" alt="" />
                        </button></td>
                        <td><button type="button" class="btn btn-danger dfcenter">
                        <img src="./src/assets/icons/delete.svg" alt="" />
                        </button></td>
                    </tr>
                    `);
                }
            }
        },
    });
}

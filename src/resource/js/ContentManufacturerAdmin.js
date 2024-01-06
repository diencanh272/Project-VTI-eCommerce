var username = "admin";
var password = 123456;
var listManufacturerData = [];

// GET Manufacturer API
function fetchListManuAdmin() {
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
            $(".manu-admin-data").empty();
            if (status === "success") {
                listManufacturerData = response;
                for (let i = 0; i < listManufacturerData.length; i++) {
                    $(".manu-admin-data").append(`
                    <tr>
                        <td scope="row">${listManufacturerData[i].id}</td>
                        <td>${listManufacturerData[i].name}</td>
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

// Add Manufacturer API
// function handleCreateNewManufacturer() {
//     var manufacturerName = $("#manufacturerName").val();
//     var manufacturerNameDataNew = {
//         name: manufacturerName,
//     };

//     $.ajax({
//         type: "POST",
//         url: "http://localhost:8080/api/v1/manufacturers",
//         data: JSON.stringify(manufacturerNameDataNew),
//         // dataType: "json",
//         contentType: "application/json; charset=UTF-8",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader(
//                 "Authorization",
//                 "Basic " + btoa(username + ":" + password)
//             );
//         },
//         success: function (response, status) {
//             console.log(response);
//             if (status === "success") {
//                 fetchListManuAdmin();
//             } else {
//                 alert("Thêm mới không thành công!!");
//             }
//         },
//     });

//     fetchListManuAdmin();
// }

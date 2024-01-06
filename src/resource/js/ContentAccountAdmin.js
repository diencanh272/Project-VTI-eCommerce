var username = "admin";
var password = 123456;
var listAccountData = [];
var idUpdateAccount = "";

// Call API render data
function fetchListAccountAdmin() {
    listAccountData = [];
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/accounts",
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
                listAccountData = response;
                $(".account-admin-data").empty();
                for (let i = 0; i < listAccountData.length; i++) {
                    $(".account-admin-data").append(`
                    <tr>
                    <td scope="col">${listAccountData[i].id}</td>
                    <td scope="col">${listAccountData[i].email}</td>
                    <td scope="col">${listAccountData[i].username}</td>
                    <td scope="col">${listAccountData[i].fullname}</td>
                    <td scope="col">${listAccountData[i].avatarImageName}</td>
                    <td scope="col">${listAccountData[i].mobile}</td>
                    <td scope="col">${listAccountData[i].address}</td>
                    <td scope="col">${listAccountData[i].createDate}</td>
                    <td scope="col">${listAccountData[i].status}</td>
                    <td><button type="button" class="btn btn-success dfcenter" onclick = "handleEditAccount(${listAccountData[i].id})"
                    data-bs-toggle="modal"
                    data-bs-target="#updateAccountModal"
                    onclick="SetDate()"
                    >
                    <img src="./src/assets/icons/edit.svg" alt="" />
                    </button></td>
                    <td><button type="button" class="btn btn-danger dfcenter" 
                    onclick = "handleDeleteAccount(${listAccountData[i].id})" >
                    <img src="./src/assets/icons/delete.svg" alt="" />
                    </button></td>
                </tr>
                    `);
                }
            }
        },
    });
}

// Add Account
function handleCreateAccount() {
    var v_email = $("#emailAccount").val();
    var v_usernameAccount = $("#usernameAccount").val();
    var v_fullnameAccount = $("#fullnameAccount").val();
    var v_avatarAccount = getImageName($("#avatarAccount").val());
    var v_mobileAccount = $("#mobileAccount").val();
    var v_addressAccount = $("#addressAccount").val();
    var v_createDate = $("#createDate").val();
    var v_passwordAccount = $("#passwordAccount").val();
    var v_confirmPassword = $("#confirmPassword").val();

    var newAccount = {
        email: v_email,
        username: v_usernameAccount,
        fullname: v_fullnameAccount,
        password: v_passwordAccount,
        avatarImageName: v_avatarAccount,
        mobile: v_mobileAccount,
        address: v_addressAccount,
        createDate: v_createDate,
        status: 0,
    };

    // console.log(newAccount);
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/accounts",
        data: JSON.stringify(newAccount), // dữu liệu được gửi lên server
        // dataType: "dataType", // dữ liệu mong đợi nhận được từ server
        contentType: "application/json; charset=UTF-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Basic " + btoa(username + ":" + password)
            );
        },
        success: function (response, status) {
            // console.log(response);
            // console.log(status);
            if (
                status === "success" &&
                v_passwordAccount === v_confirmPassword
            ) {
                fetchListAccountAdmin();
            } else {
                console.log("Thêm tài khoản không thành công!!!");
            }
        },
    });
    resetFormAccount();
    fetchListAccountAdmin();
}

// Delete Account
function handleDeleteAccount(idDelete) {
    var confirmDeleteAccount = confirm(
        "Bạn có chắc chắn xóa Account này không!!"
    );

    if (confirmDeleteAccount) {
        var index = listAccountData.findIndex(
            (product) => product.id == idDelete
        );
        var urlDeleteAccount =
            "http://localhost:8080/api/v1/accounts/" + idDelete;

        if (index !== -1) {
            $.ajax({
                type: "DELETE",
                url: urlDeleteAccount,
                // data: "data",
                // dataType: "dataType",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader(
                        "Authorization",
                        "Basic " + btoa(username + ":" + password)
                    );
                },
                success: function (response, status) {
                    fetchListAccountAdmin();
                },
            });
        }
    }
}

// Edit Account
function handleEditAccount(idEdit) {
    var index = listAccountData.findIndex((account) => account.id == idEdit);
    idUpdateAccount = idEdit;

    if (index !== -1) {
        $("#emailAccountUpdate").val(listAccountData[index].email);
        $("#usernameAccountUpdate").val(listAccountData[index].username);
        $("#fullnameAccountUpdate").val(listAccountData[index].fullname);
        $("#avatarAccountUpdate").val("");
        $("#mobileAccountUpdate").val(listAccountData[index].mobile);
        $("#addressAccountUpdate").val(listAccountData[index].address);
        $("#createDateUpdate").val(listAccountData[index].createDate);
    }
}

// Update Account
function handleUpdateAccount() {
    var v_emailAccountUpdate = $("#emailAccountUpdate").val();
    var v_usernameAccountUpdate = $("#usernameAccountUpdate").val();
    var v_fullnameAccountUpdate = $("#fullnameAccountUpdate").val();
    var v_avatarAccountUpdate = getImageName($("#avatarAccountUpdate").val());
    var v_mobileAccountUpdate = $("#mobileAccountUpdate").val();
    var v_addressAccountUpdate = $("#addressAccountUpdate").val();
    var v_createDateUpdate = $("#createDateUpdate").val();

    var newAccountUpdate = {
        email: v_emailAccountUpdate,
        username: v_usernameAccountUpdate,
        fullname: v_fullnameAccountUpdate,
        avatarImageName: v_avatarAccountUpdate,
        mobile: v_mobileAccountUpdate,
        address: v_addressAccountUpdate,
        createDate: v_createDateUpdate,
    };

    // console.log(newAccountUpdate);

    var urlUpdateAccount =
        "http://localhost:8080/api/v1/accounts/" + idUpdateAccount;

    $.ajax({
        type: "PUT",
        url: urlUpdateAccount,
        data: JSON.stringify(newAccountUpdate),
        // dataType: "dataType",
        contentType: "application/json; charset=UTF-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(
                "Authorization",
                "Basic " + btoa(username + ":" + password)
            );
        },
        success: function (response, status) {
            console.log(response);
            console.log(status);
            if (status === "success") {
                fetchListAccountAdmin();
            } else {
                alert("Update Not Success!!");
            }
        },
    });

    fetchListAccountAdmin();
    resetFormAccountUpdate();
}

function resetFormAccount(params) {
    $("#emailAccount").val("");
    $("#usernameAccount").val("");
    $("#passwordAccount").val("");
    $("#passwordAccount").val("");
    $("#fullnameAccount").val("");
    $("#avatarAccount").val("");
    $("#mobileAccount").val("");
    $("#addressAccount").val("");
    $("#createDate").val("");
}
function resetFormAccountUpdate(params) {
    $("#emailAccountUpdate").val("");
    $("#usernameAccountUpdate").val("");
    $("#passwordAccountUpdate").val("");
    $("#confirmPasswordUpdate").val("");
    $("#fullnameAccountUpdate").val("");
    $("#avatarAccountUpdate").val("");
    $("#mobileAccountUpdate").val("");
    $("#addressAccountUpdate").val("");
    $("#createDateUpdate").val("");
}

//  Kiểm tra confirm password

function checkPassword() {
    var v_passwordAccount = $("#passwordAccount").val();
    var v_confirmPassword = $("#confirmPassword").val();

    if (v_passwordAccount !== v_confirmPassword) {
        $(".check-password").css("display", "block");
    } else {
        $(".check-password").css("display", "none");
    }
}

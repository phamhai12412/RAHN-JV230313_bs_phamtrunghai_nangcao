let data = [
  {
    id: 1,
    name: "hai",
    email: "trunghai@gmail.com",
    phone: 0923008219,
    diachi: "ha noi",
    gioitinh: "nam",
  },
  {
    id: 2,
    name: "hai",
    email: "trunghai1111@gmail.com",
    phone: 09216767,
    diachi: "da nang",
    gioitinh: "nam",
  },
  {
    id: 3,
    name: "ngoc",
    email: "ngocngoc@gmail.com",
    phone: 0923008251,
    diachi: "ca mau",
    gioitinh: "nu",
  },
];
let table = document.getElementById("table");
//hàm truy xuất data và thực hiện in ra toàn bộ danh sách kèm thông tin học sinh
function render(data) {
  table.innerHTML = "";
  table.innerHTML = `<tr>
<td>#</td>
<td>Họ tên</td>
<td>Email</td>
<td>Điện thoại</td>
<td>Địa chỉ</td>
<td>Gender</td>
<td>Hành động</td>
<td rowspan="${data.length}"><button>Sắp xếp</button></td>
</tr>`;
  for (let i = 0; i < data.length; i++) {
    table.innerHTML =
      table.innerHTML +
      `<tr>
    <td>${data[i].id}</td>
    <td>${data[i].name}</td>
    <td>${data[i].email}</td>
    <td>${data[i].phone}</td>
    <td>${data[i].diachi}</td>
    <td>${data[i].gioitinh}</td>
    <td><button id="${data[i].id}" class="chinhsua" href="#">edit</button><b >|</b><button id="${data[i].id}"  class="xoa" href="">delete</button></td>
  </tr>`;
  }
}
render(data);
let btns = document.getElementById("btns");
let seach = document.getElementById("search");
let sua = document.getElementById("container");
let form = document.getElementById("form");

// sử lý tìm kiếm
btns.onclick = function () {
  //   console.log(seach.value);
  if (seach.value != "") {
    let dataseach = [];
    let check = -1;
    for (let i = 0; i < data.length; i++) {
      if (seach.value == data[i].name) {
        dataseach.push(data[i]);
        check = i;
      }
    }
    if (check == -1) {
      seach.value = "";
      alert("ten bạn vừa nhập ko có");
    } else {
      render(dataseach);
    }
  } else {
    alert("bạn chưa nhập gì để seach");
    render(data);
  }
};
table.onclick = function (event) {
  //làm chức nang xóa
  // console.log(event.target.id);
  console.log(event.target.classList.contains("xoa"));
  for (i = 0; i < data.length; i++) {
    if (
      event.target.classList.contains("xoa") &&
      event.target.id == data[i].id
    ) {
      data.splice(i, 1);
      //   console.log(event.target.id);
    }
    render(data);
  }
  //làm chức năng edit
  let checkedit = -1;
  for (let i = 0; i < data.length; i++) {
    if (
      event.target.classList.contains("chinhsua") &&
      event.target.id == data[i].id
    ) {
      sua.style.display = "block";
      checkedit = i;
    }
  }
  if (checkedit != -1) {
    form.onsubmit = function (event) {
      event.preventDefault();

      //   let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      //   if (vnf_regex.test(form.phoneedit.value)) {
      //     alert("sô bạn nhạp ko phải so dien thoại");
      //   }
      if (
        form.tenedit.value != "" &&
        form.emailedit.value != "" &&
        form.phoneedit.value != "" &&
        form.diachiedit.value != "" &&
        form.phoneedit.value.length == 10 &&
        form.phoneedit.value[0] == "0" &&
        form.phoneedit.value[1] > "7" &&
        Number.isInteger(+form.phoneedit.value)
      ) {
        data[checkedit].name = form.tenedit.value;
        data[checkedit].email = form.emailedit.value;
        data[checkedit].phone = form.phoneedit.value;
        data[checkedit].diachi = form.diachiedit.value;
        data[checkedit].gioitinh = form.gioitinhedit.value;
        sua.style.display = "none";
        render(data);
      } else {
        alert("kiểm tra lại xem bạn nhập dúng yeu chưa");
      }
    };
  }
};

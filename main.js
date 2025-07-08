const addToInvModal = document.querySelector(".addToInvModal");
const editToInvModal = document.querySelector(".editToInvModal");
const delModal = document.querySelector(".delModal");
const tbody = document.querySelector("table tbody");
const fileInp = document.querySelector("#fileInp");
const nameInp = document.querySelector("#nameInp");
const qtyInp = document.querySelector("#qtyInp");
const priceInp = document.querySelector("#priceInp");
const companyInp = document.querySelector("#companyInp");
const totalMoneyInp = document.querySelector("#totalMoneyInp");
const paidMoneyInp = document.querySelector("#paidMoneyInp");
const putInInvBtn = document.querySelector("#putInInvBtn");
const fileInpE = document.querySelector("#fileInpE");
const nameInpE = document.querySelector("#nameInpE");
const qtyInpE = document.querySelector("#qtyInpE");
const priceInpE = document.querySelector("#priceInpE");
const companyInpE = document.querySelector("#companyInpE");
const totalMoneyInpE = document.querySelector("#totalMoneyInpE");
const paidMoneyInpE = document.querySelector("#paidMoneyInpE");
const searchInp = document.querySelector("input[type=search]");

let view = [];
let invProducts = JSON.parse(localStorage.getItem("invProducts")) || [];
view = invProducts;
let indexToEdit = null;
let indexToDel = null;
const openAddToInvModal = () => {
  addToInvModal.style.display = "flex";
};
const closeAddToInvModal = () => {
  addToInvModal.style.display = "none";
};
const openEditToInvModal = (index) => {
  indexToEdit = index;
  editToInvModal.style.display = "flex";
  companyInpE.value = invProducts[index].compName;
  totalMoneyInpE.value = invProducts[index].totalMoney;
  paidMoneyInpE.value = invProducts[index].paidMoney;
  nameInpE.value = invProducts[index].name;
  qtyInpE.value = invProducts[index].qty;
  priceInpE.value = invProducts[index].price;
};
const closeEeditToInvModal = () => {
  editToInvModal.style.display = "none";
};

const showInvProd = () => {
  tbody.innerHTML = "";
  view.forEach((el, index) => {
    tbody.innerHTML += `
          <tr>
                <td>${index + 1}</td>
                <td>${el.compName}</td>
                <td>${el.totalMoney} ج.م</td>
                <td>${el.paidMoney} ج.م</td>
                <td>${el.totalMoney - el.paidMoney} ج.م</td>
                <td>${el.name}</td>
                <td>${el.qty}</td>
                <td>${el.price} ج.م</td>
                <td class="d-flex flex-column gap-1">
                    <button onclick="openEditToInvModal(${index})" class="btn btn-primary">تعديل المنتج</button>
                    <button onclick="openDelModal(${index})" class="btn btn-danger">مسح المنتج</button>
                </td>
            </tr>
    `;
  });
};

const putInInv = () => {
  let isHere = invProducts.some(
    (el) =>
      el.name === nameInp.value.toLowerCase() &&
      el.compName == companyInp.value.toLowerCase()
  );
  if (!isHere) {
    if (
      !(
        isNaN(+qtyInp.value) ||
        isNaN(+priceInp.value) ||
        isNaN(+totalMoneyInp.value) ||
        isNaN(+paidMoneyInp.value) ||
        +qtyInp.value <= 0 ||
        +priceInp.value <= 0 ||
        +totalMoneyInp.value <= 0 ||
        +paidMoneyInp.value < 0 ||
        +paidMoneyInp.value > +totalMoneyInp.value ||
        nameInp.value == "" ||
        companyInp.value == ""
      )
    ) {
      let prodObj = {
        compName: companyInp.value.toLowerCase(),
        totalMoney: totalMoneyInp.value.toLowerCase(),
        paidMoney: paidMoneyInp.value.toLowerCase(),
        name: nameInp.value.toLowerCase(),
        qty: +qtyInp.value,
        price: +priceInp.value,
      };
      invProducts.push(prodObj);
      localStorage.setItem("invProducts", JSON.stringify(invProducts));
      companyInp.value = "";
      totalMoneyInp.value = "";
      paidMoneyInp.value = "";
      nameInp.value = "";
      qtyInp.value = "";
      priceInp.value = "";
      closeAddToInvModal();
      showInvProd();
    } else {
      alert("خطأ في الادخال...!!!");
    }
  } else {
    alert("هذا المنتج موجود بالفعل");
  }
};

const openDelModal = (index) => {
  indexToDel = index;
  delModal.style.display = "flex";
};
const closeDelModal = () => {
  delModal.style.display = "none";
};
const delModalFromInv = () => {
  invProducts.splice(indexToDel, 1);
  localStorage.setItem("invProducts", JSON.stringify(invProducts));
  closeDelModal();
  showInvProd();
};
const editInInv = () => {
  let isHere = invProducts.some(
    (el, i) =>
      el.name === nameInpE.value.toLowerCase() &&
      i !== indexToEdit &&
      el.compName == companyInpE.value.toLowerCase()
  );
  if (!isHere) {
    if (
      !(
        isNaN(+qtyInpE.value) ||
        isNaN(+priceInpE.value) ||
        isNaN(+totalMoneyInpE.value) ||
        isNaN(+paidMoneyInpE.value) ||
        +qtyInpE.value <= 0 ||
        +priceInpE.value <= 0 ||
        +totalMoneyInpE.value <= 0 ||
        +paidMoneyInpE.value < 0 ||
        +paidMoneyInpE.value > +totalMoneyInpE.value ||
        nameInpE.value == "" ||
        companyInpE.value == ""
      )
    ) {
      invProducts[indexToEdit].compName = companyInpE.value.toLowerCase();
      invProducts[indexToEdit].totalMoney = totalMoneyInpE.value.toLowerCase();
      invProducts[indexToEdit].paidMoney = paidMoneyInpE.value.toLowerCase();
      invProducts[indexToEdit].name = nameInpE.value.toLowerCase();
      invProducts[indexToEdit].qty = +qtyInpE.value;
      invProducts[indexToEdit].price = +priceInpE.value;
      localStorage.setItem("invProducts", JSON.stringify(invProducts));
      closeEeditToInvModal();
      showInvProd();
    } else {
      alert("خطأ في الادخال...!!!");
    }
  } else {
    alert("هذا المنتج موجود بالفعل");
  }
};
const searchForProd = () => {
  let filteredView = invProducts.filter(
    (el) =>
      el.name.includes(searchInp.value.toLowerCase()) ||
      el.compName.includes(searchInp.value.toLowerCase())
  );
  view = filteredView;
  showInvProd();
};
showInvProd();

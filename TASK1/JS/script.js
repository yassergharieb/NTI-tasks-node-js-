const userForm = document.querySelector("#createUser");
const userInputs = ["name", "age"];
const contentWrap = document.querySelector("#contentWrap");



// to bring data from localStorage
const getItemsFromStorage = (key) => {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(key)) || [];
    if (!Array.isArray(data)) throw new Error(" IS NOT ARRAY!");
  } catch (error) {
    data = [];
  }

  return data;
};
// #########

// to save data in localStorage
const StoreInStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    localStorage.setItem(key, "[]");
  }
};
// ##################

if (userForm) {
  userForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const userData = { id: Date.now(), userStatus: false };
    userInputs.forEach((h) => (userData[h] = userForm.elements[h].value));

    // store users data in storage
    const allUsers = getItemsFromStorage("users");

    allUsers.push(userData);

    StoreInStorage("users", allUsers);
    userForm.reset();
    window.location.href = "index.html";
  });
}

const creatElement = (parent, Ele, text, classes) => {
  const myEle = document.createElement(Ele);
  if (text) myEle.textContent = text;
  if (classes) myEle.classList = classes;
  parent.appendChild(myEle);

  return myEle;
};

const showAllData = (allData) => {
  contentWrap.innerHTML = "";

  if (allData.length == 0) {
    const tr = creatElement(contentWrap, "tr", null, "alert alert-danger");
    const td = creatElement(tr, "td", "not data yet", "alert alert-danger");
    td.setAttribute("colspan", "4");
  }

  allData.forEach((user, i) => {
    const tr = creatElement(contentWrap, "tr", null, null);
    creatElement(tr, "td", user.id, null);
    creatElement(tr, "td", user.name, null);
    creatElement(tr, "td", user.age, null);
    creatElement(tr, "td", user.userStatus, null, null);

    const td = creatElement(tr, "td", null, null);
    const showButton = creatElement(td, "btn", "show", " btn btn-primary mx-3");
    const editButton = creatElement(td, "btn", "edit", " btn btn-warning mx-3");
    const deleteButton = creatElement(
      td,
      "btn",
      "delete",
      " btn btn-danger mx-3"
    );

    if (!user.userStatus) {
      const statusBtn = creatElement( td, "btn","inactive"," btn btn-danger mx-3" );

      statusBtn.addEventListener("click", function (e) {
     
        user.userStatus = true;

        console.log(user.userStatus);
        statusBtn.classList = "";
        statusBtn.textContent = "active";
        statusBtn.classList = "btn btn-success";
     
      
      });
    }

   

    deleteButton.addEventListener("click", function (e) {
      allData.splice(i, 1);
      StoreInStorage("users", allData);
      showAllData(allData);
    });
  });
};

if (contentWrap) {
  const allData = getItemsFromStorage("users");
  showAllData(allData);
  // console.log(allData);
}


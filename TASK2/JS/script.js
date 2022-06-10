const userForm = document.querySelector("#createUser");
const userInputs = ["name", "age"];
const contentWrap = document.querySelector("#contentWrap");
const showwrap = document.querySelector("#showSingle");
const editwrap = document.querySelector("#edituser");



// to bring data from localStorage
const getItemsFromStorage = (key , dataType = "") => {
  let data;

  const  myData =  localStorage.getItem(key)
  if (dataType == "string") return myData
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
// creat new user 
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
// #########################
const creatElement = (parent, Ele, text, classes) => {
  const myEle = document.createElement(Ele);
  if (text) myEle.textContent = text;
  if (classes) myEle.classList = classes;
  parent.appendChild(myEle);

  return myEle;
};
// #########################
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
    const showButton = creatElement(td, "btn", "show", "btn btn-primary mx-3");
    const editButton = creatElement(td, "btn", "edit", "btn btn-warning mx-3");
    const deleteButton = creatElement(
      td,
      "btn",
      "delete",
      " btn btn-danger mx-3"
    );

    showButton.addEventListener("click" , (e)=> showSingle(i))
    editButton.addEventListener("click" ,(e)=> editSingle(i))
    


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

   
// # delet opration 
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

}

const showSingle =  (i) => {
localStorage.setItem("show " , i )
window.location.href = "showSingle.html"


}

if(showwrap){
  const index = getItemsFromStorage('single', "string")
  const allData = getItemsFromStorage("users")
  try{
      const user = allData[index]
      creatElement(showwrap, "h4", user.id,null)
      creatElement(showwrap, "h4", user.name ,null)
      creatElement(showwrap, "h4", user.age,null)    
  }
  catch(e){
      creatElement(showwrap, "div", "no user with this id", "alert alert-danger")
  }
}

const editSingle =  function (i){
  localStorage.setItem("edit" , i )
  window.location.href = "edit.html"
 
  
  }



if (editwrap) {
const Index = getItemsFromStorage('edit' , "string")
const allData = getItemsFromStorage("users")
console.log(Index);
console.log(allData);

const userdata  = allData[Index]  

console.log(userdata)
userInputs.forEach(h => editwrap.elements[h].value = userdata[h])
// taskHeads.forEach( h => editForm.elements[h].value = task[h] )

// to get old values in inputs
editwrap.addEventListener("submit" , (e)=> {
  e.preventDefault();
// console.log(userdata);
// console.log(allData);
console.log(userdata)

  userInputs.forEach( h=> allData[Index][h]= editwrap.elements[h].value ) // to store new value from inputs in localstorage 
  StoreInStorage("users" , allData)
  
  editwrap.reset()
  window.location.href = "index.html"
})

}



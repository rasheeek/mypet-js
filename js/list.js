window.addEventListener("load", loadPets);
window.addEventListener("load", updateCounter);
const searchbar = document.querySelector("ion-searchbar");
searchbar.addEventListener("ionInput", handleInput);

let clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", clearPets);

function handleInput(event) {
  const query = event.target.value.toLowerCase();

  if (query.length == 0) {
    loadPets();
    console.log("empty");
    return;
  }
  let allPets = JSON.parse(localStorage.getItem("allPets"));
  results = allPets.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  // filterItems(results);
  let pets = "";
  document.getElementById("pets").innerHTML = "";
  results.forEach(addItems);
  function addItems(item, index) {
    const dateObj = new Date(item.createdDate);
    const date = item.createdDate.split("T")[0];
    const hour = item.createdDate.split("T")[1].split(":")[0];
    const minute = item.createdDate.split("T")[1].split(":")[1];
    pets += `
         
     
            <ion-item class="pet-item" lines="full" >
                <ion-icon slot="start" name="${getIcon(
                  item.type
                )}" > </ion-icon>
                <ion-list>
                    <h2>${item.name}</h2> 
                    <ion-label  >Type : ${item.type}</ion-label>
                    <ion-label>DOB : ${item.birthday}</ion-label>
                    <ion-text>Created : ${date}  ${hour}:${minute}</ion-text><br/>
                    <ion-text>Medical History : ${item.medicalHistory? item.medicalHistory : '-'}  </ion-text>
                    <br/>
                    <span>
                    <ion-icon class="i-icon"  slot="end" name="add" ></ion-icon>
                    <ion-icon class="i-icon" slot="end" name="eye" ></ion-icon>
                    <ion-icon class="i-icon" onClick="test(${index})" slot="end" name="trash"  color="danger" ></ion-icon>
                    </span>
                </ion-list>
               
            </ion-item>
           
            `;
  }
  document.getElementById("pets").innerHTML = ` 
   <ion-list>
   ${pets}
   </ion-list>
    `;

  console.log("Pets at end", pets);
}

function loadPets() {
  console.log("running here");
  let allPets = JSON.parse(localStorage.getItem("allPets"));

  document.getElementById("pets").innerHTML = "";

  if (allPets != null) {
    let pets = "";
    allPets.forEach(addItems);

    function addItems(item, index) {
      const dateObj = new Date(item.createdDate);
      const date = item.createdDate.split("T")[0];
      const hour = item.createdDate.split("T")[1].split(":")[0];
      const minute = item.createdDate.split("T")[1].split(":")[1];
      pets += `
         
     
            <ion-item class="pet-item" lines="full" >
            <ion-reorder slot="end"></ion-reorder>
                <ion-icon slot="start" name="${getIcon(
                  item.type
                )}" > </ion-icon>
                <ion-list>
                    <h2>${item.name}</h2> 
                    <ion-label  >Type : ${item.type}</ion-label>
                    <ion-label>DOB : ${item.birthday}</ion-label>
                    <ion-text>Created : ${date}  ${hour}:${minute}</ion-text><br/>
                    <ion-text>Medical History : ${item.medicalHistory? item.medicalHistory : '-'}  </ion-text>
                    <br/>
                    <span>
                    <ion-icon class="i-icon"  slot="end" name="add" ></ion-icon>
                    <ion-icon class="i-icon" slot="end" name="eye" ></ion-icon>
                    <ion-icon class="i-icon" onClick="test(${index})" slot="end" name="trash"  color="danger" ></ion-icon>
                    </span>
                </ion-list>
               
            </ion-item>
           
            `;
    }
    document.getElementById("pets").innerHTML = ` 
   <ion-list>
   <ion-reorder-group disabled="false">
   ${pets}
   </ion-reorder-group>
   </ion-list>
    `;
    const reorderGroup = document.querySelector("ion-reorder-group");
    reorderGroup.addEventListener("ionItemReorder", ({ detail }) => {
      console.log("Dragged from index", detail.from, "to", detail.to);
      reOrder(detail.from, detail.to);
      detail.complete();
    });
  } else {
    document.getElementById("pets").innerHTML =
      '<h4 class="ion-text-center">You haven\'t added any pets yet.</h4>';
  }
}

function reOrder(old_index, new_index) {
  let allPets = JSON.parse(localStorage.getItem("allPets"));
  console.log("before", allPets);
  if (new_index >= allPets.length) {
    var k = new_index - allPets.length + 1;
    while (k--) {
      allPets.push(undefined);
    }
  }
  allPets.splice(new_index, 0, allPets.splice(old_index, 1)[0]);
  console.log("after", allPets);
  localStorage.setItem("allPets", JSON.stringify(allPets));
}

function test(index) {
  let allPets = JSON.parse(localStorage.getItem("allPets"));
  allPets.splice(index, 1);
  localStorage.setItem("allPets", JSON.stringify(allPets));
  loadPets();
}

function getIcon(type) {
  switch (type) {
    case "Dog":
      return "paw";
    case "Cat":
      return "nutrition";
    case "Bird":
      return "rocket";
    case "Fish":
      return "fish";
    case "Other":
      return "menu";
  }
}

function updateCounter() {
  let allPets = JSON.parse(localStorage.getItem("allPets"));

  allPets != null
    ? (document.querySelector("#count").textContent = allPets.length)
    : (document.querySelector("#count").textContent = 0);
}

function clearPets() {
  let alert = document.createElement("ion-alert");

  alert.header = "Delete all pets?";
  alert.message = "Are you sure you want to delete all pets?";
  alert.buttons = [
    {
      text: "No",
      role: "cancel",
    },
    {
      text: "Yes",
      handler: () => {
        localStorage.removeItem("allPets");
        presentToast("All pets were cleared");
        loadPets();
        updateCounter();
      },
    },
  ];

  document.body.appendChild(alert);

  return alert.present();
}

function presentToast(message) {
  const toast = document.createElement("ion-toast");
  toast.message = message;
  toast.duration = 5000;
  toast.position = "bottom";

  document.body.appendChild(toast);
  return toast.present();
}

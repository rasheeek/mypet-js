window.addEventListener("load", loadPets);
window.addEventListener("load", updateCounter);

let clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", clearPets)

function loadPets() { 
    let allPets = JSON.parse(localStorage.getItem("allPets"));
    
    document.getElementById("pets").innerHTML = "";

    if (allPets != null) {
        allPets.forEach(addItems);

        function addItems(item, index) {
            document.getElementById("pets").innerHTML += `
            
            <ion-card>
                <ion-card-header>
                    <ion-card-title>${item.name}</ion-card-title>
                </ion-card-header>
                <ion-card-content>Type: ${item.type}<br>Birthday/Adopted: ${item.birthday}</ion-card-content>
            </ion-card>
            `
        }
    }
    else {
        document.getElementById("pets").innerHTML = '<h4 class="ion-text-center">You haven\'t added any pets yet. Please start by clicking on the + icon.</h4>';
    }
}

function updateCounter() {
    let allPets = JSON.parse(localStorage.getItem("allPets"));

    (allPets != null) ?
        document.querySelector("#count").textContent = allPets.length 
        : 
        document.querySelector("#count").textContent = 0;
}

function clearPets() {

    let alert = document.createElement('ion-alert');
    
    alert.header = 'Delete all pets?';
    alert.message = 'Are you sure you want to delete all pets?';
    alert.buttons = [
        {
            text: 'No',
            role: 'cancel'
        }, 
        {
            text: 'Yes',
            handler: () => {
                localStorage.removeItem("allPets");
                presentToast("All pets were cleared");
                loadPets();
                updateCounter();
            }
        }
    ];

    document.body.appendChild(alert);

    return alert.present();
}

function presentToast(message) {
    const toast = document.createElement('ion-toast');
    toast.message = message
    toast.duration = 5000;
    toast.position = "bottom";
    
    document.body.appendChild(toast);
    return toast.present();
}
  
let button = document.querySelector('#saveButton');
button.addEventListener('click', handleButtonClick);

function savePet(name, type, birthday) {
    // Parse any JSON previously stored in allEntries
    let allPets = JSON.parse(localStorage.getItem("allPets"));
    if (allPets == null) 
        allPets = [];

    let pet = {
        "name": name,
        "type": type,
        "birthday": birthday,
    };

    allPets.push(pet);
    localStorage.setItem("allPets", JSON.stringify(allPets));
}

function handleButtonClick() {
    const nameField = document.querySelector('#name');
    
    const typeField = document.querySelector('#type');
    const birthdayField = document.querySelector('#birthday');

    let message, buttons = null

    if (nameField.value == "" || typeField.value == "" || birthdayField.value == "") {
        message = "Please fill in all the details"
        buttons = ['Ok']
    }
    else {
        message = "Are you sure you want to save this pet?"
        buttons = [
            {
                text: 'Cancel',
                role: 'cancel'
            }, 
            {
                text: 'Ok',
                handler: () => {
                    savePet(nameField.value, typeField.value, birthdayField.value);
                    
                    nameField.value = '';
                    typeField.value = '';
                    birthdayField.value = '';

                    window.location.href = "index.html";
                }
            }
        ];
    }

    const alert = document.createElement('ion-alert');
    alert.header = 'MyPets';
    alert.message = message;
    alert.buttons = buttons;
  
    document.body.appendChild(alert);
    return alert.present();
}

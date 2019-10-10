const { Plugins, CameraResultType } = capacitorExports;
const { Camera, Storage } = Plugins;
const modalElement = document.createElement('ion-modal');
let currentImage = "";

async function takePicture() {
  const image = await Camera.getPhoto({
    quality: 100,
    allowEditing: false,
    resultType: CameraResultType.Base64
  });
  currentImage = image.base64String;
  presentModal();
}

customElements.define('modal-page', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <ion-header>
        <ion-toolbar>
          <ion-title>Création d'un article privé</ion-title>
          <ion-buttons slot="primary">
            <ion-button onClick="modalElement.dismiss()">
              <ion-icon slot="icon-only" name="close"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <form>
          <ion-list>
            <ion-item>
              <ion-label position="floating" required>Titre *</ion-label>
              <ion-input name="title"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Description</ion-label>
              <ion-input name="description"></ion-input>
            </ion-item>
            <ion-button expand="block" onClick="addCard()" class="ion-margin-vertical">Enregistrer</ion-button>
          </ion-list>
        </form>
      </ion-content>
    `;
  }
});

function presentModal() {
  modalElement.component = 'modal-page';
  document.body.appendChild(modalElement);
  return modalElement.present();
}

async function addCard() {
  const elems = await Storage.get({ key: 'items' });
  const localItems = elems.value != null ? JSON.parse(elems.value) : [];
  const formData = new FormData(document.querySelector("form"));
  localItems.push({
    title: formData.get('title'),
    image: "data:image/png;base64, " + currentImage,
    brief: formData.get('description'),
  });
  await Storage.set({
    key: 'items',
    value: JSON.stringify(localItems)
  });

  modalElement.dismiss()
  loadData();
}

async function loadData() {
  // await Storage.remove({ key: 'items' });
  const elems = await Storage.get({ key: 'items' });
  const localItems = JSON.parse(elems.value);

  getData((data) => {
    if (localItems != null) {
      data = localItems.concat(data)
    }
    const cardsDiv = document.getElementById("cards")
    let htmlString = "";
    for (let elem of data) {
      let image = elem.image;
      if (image && image.startsWith('/images')) {
        image = `https://devfest2018.gdgnantes.com${image}`;
      }
      htmlString += `
      <ion-card>
        <img src="${image}" />
        <ion-card-header>
          <ion-card-title>${elem.title}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          ${elem.brief}
        </ion-card-content>
      </ion-card>
      `;
    }
    cardsDiv.innerHTML = htmlString;
  });
}

function getData(callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(JSON.parse(xmlHttp.response));
  }
  xmlHttp.open("GET", "https://devfest-nantes-2018-api.cleverapps.io/blog", true);
  xmlHttp.send(null);
}

loadData();
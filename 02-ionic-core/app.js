getData((data) => {
  const cardsDiv = document.getElementById("cards")
  let htmlString = "";
  for (let elem of data) {
    htmlString += `
    <ion-card>
      <img src="https://devfest2018.gdgnantes.com/${elem.image}" />
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

function getData(callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(JSON.parse(xmlHttp.response));
  }
  xmlHttp.open("GET", "https://devfest-nantes-2018-api.cleverapps.io/blog", true);
  xmlHttp.send(null);
}
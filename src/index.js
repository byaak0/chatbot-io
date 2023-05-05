import './index.scss';
import AxiosCall from './api/axiosCall.js';
import Helper from './helper/Helper';

const Bot = class {
  constructor() {
    this.contactList = document.getElementById("contact-list");
    this.bots = [
      {
          name: "Bot1",
          avatar: "https://f1only.fr/wp-content/uploads/2023/04/230012-scuderia-ferrari-australian-gp-thursday-scaled.jpg",
          actions: {
            "Bonjour": "Bonjour !",
            "Comment ça va ?": "la voiture est cassé",
            "help": "Voici la liste des commandes disponibles : Bonjour, Comment ça va ?, chatgpt 'votre message', un potit chat"
          }
      },
      {
          name: "Bot2",
          avatar: "https://f1i.autojournal.fr/wp-content/uploads/sites/17/2023/04/xpb_1199983_1200px-1-615x410.jpg",
          actions: {
            "Bonjour": "Bonjour !",
            "Comment ça va ?": "nickel encore champ",
            "help": "Voici la liste des commandes disponibles : Bonjour, Comment ça va ?, chatgpt 'votre message', weather 'une ville'"
          }
      },
      {
          name: "Bot3",
          avatar: "https://media.nouvelobs.com/referentiel/1200x630/16316280.png",
          actions: {
            "Bonjour": "Bonjour !",
            "Comment ça va ?": "ISSOU",
            "quoi" : "feur",
            "help": "Voici la liste des commandes disponibles : Bonjour, Comment ça va ?, chatgpt 'votre message', blague de fou"
          }
      }
    ]
  }

  render() {
    // Générer la liste des contacts (bots)
    const contactList = document.getElementById("contact-list");
    this.bots.forEach((bot) => {
        const contactItem = document.createElement("li");
        contactItem.classList.add("list-group-item");
        contactItem.innerHTML = `
            <div class="d-flex align-items-center">
                <img class="avatar" src="${bot.avatar}" alt="Avatar" class="rounded-circle me-2">
                <div>
                    <h6 class="mb-0">${bot.name}</h6>
                </div>
            </div>
        `;
        contactList.appendChild(contactItem);
    });
    Helper.getLocalStorageMessage();
  }

  run() {
    this.render();
  }
};

const bot = new Bot();
bot.run();
document.getElementById("btnSave").addEventListener("click", conversation, false);

function conversation() {
  this.input = document.getElementById('inputTxt').value;
  Helper.AddSendMessage(this.input);

  const words = this.input.split(' ');
  //commande perso bot1
  if (words[0] == "weather") {
    const axiosCall = new AxiosCall({}, `https://api.weatherapi.com/v1/current.json?q=${words[1]}&lang=fr`, "394ea750982248caad5112726230505");
    let data = axiosCall.getWeather();
    data.then((response) => 
    Helper.addMessage(bot.bots[1].avatar, 
      "il fait " + response.data.current.temp_c + "c° " + response.data.current.condition.text + " à " + words[1], 
      bot.bots[1].name));
  }
  //commande perso bot2
  if (this.input == "blague de fou") {
    const axiosCall = new AxiosCall({}, "https://api.chucknorris.io/jokes/random", "");
    let data = axiosCall.get();
    data.then((response) => Helper.addMessage(bot.bots[2].avatar, response.data.value, bot.bots[2].name)); 
  }
  //commande bot3
  if (this.input == "un potit chat") {
    const axiosCall = new AxiosCall({}, "https://api.thecatapi.com/v1/images/search", "");
    let data = axiosCall.get();
    data.then((response) => Helper.addMessage(bot.bots[0].avatar,`<img class="avatar" src="${response.data[0].url}">`, bot.bots[0].name)); 
  }
  
  bot.bots.forEach((bot) => {
    // on verifie si c'est un appel chatgpt
    if (words[0] == "chatgpt") {
      let body = {
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: this.input}],
      }
      const axiosCall = new AxiosCall(body, "https://api.openai.com/v1/chat/completions", "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");
      let data = axiosCall.postChatgpt();
      data.then((response) => Helper.addMessage(bot.avatar, response.data.choices[0].message.content, bot.name));
    }
    else if (bot.actions[this.input] != null) {
      Helper.addMessage(bot.avatar, bot.actions[this.input], bot.name);
    }
  });

  document.getElementById('inputTxt').value = "";
}




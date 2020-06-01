st = {
      "an": "Andaman and Nicobar Islands",
      "ap": "Andhra Pradesh",
      "ar": "Arunachal Pradesh",
      "as": "Assam",
      "br": "Bihar",
      "ch": "Chandigarh",
      "ct": "Chhatisgarh",
      "dd": "Daman and Diu",
      "dl": "Delhi",
      "dn": "Dadar and Nagar Haveli",
      "ga": "Goa",
      "gj": "Gujurat",
      "hp": "Himachal Pradesh",
      "hr": "Haryana",
      "jh": "Jharkhand",
      "jk": "Jammu and Kashmir",
      "ka": "Karnataka",
      "kl": "Kerela",
      "la": "Ladakh",
      "ld": "Lakshwadeep",
      "mh": "Maharashtra",
      "ml": "Meghalaya",
      "mn": "Manipur",
      "mp": "Madhya Pradesh",
      "mz": "Mizoram",
      "nl": "Nagaland",
      "or": "Odisha",
      "pb": "Punjab",
      "py": "Puducherry",
      "rj": "Rajasthan",
      "sk": "Sikkim",
      "tg": "Telangana",
      "tn": "Tamil Nadu",
      "tr": "Tripura",
      "tt": "1",
      "un": "Unassigned",
      "up": "Uttar Pradesh",
      "ut": "Uttarakhand",
      "wb": "West Bengal"
}

console.log(Object.keys(st).length)

async function getData(state){
    const result = await fetch(`https://api.covid19india.org/states_daily.json`)
    const data = await result.json();
    const data2 = data.states_daily;

    let active = 0;
    let recovered = 0;
    let ded = 0;

    for (i = 0; i < data2.length; i++){
        if(data2[i].status === 'Confirmed'){
            active += parseInt(data2[i][state]);
        }
        if(data2[i].status === 'Recovered'){
            recovered += parseInt(data2[i][state]);
        }
        if(data2[i].status === 'Deceased'){
            ded += parseInt(data2[i][state]);
        }
    }
  
   // console.log(`Number of cases in ${state} is ${count}`)
   document.getElementById("active-cases").innerText = active-recovered-ded;
   document.getElementById("confirmed-cases").innerText = active;
   document.getElementById("recovered-cases").innerText = recovered;
   document.getElementById("ded-cases").innerText = ded;
   document.getElementById("state-name").innerText = st[state];

}

function check(){
    console.log('hi')
}

function hoverKara(s){
   // console.log(document.querySelector(`#${stateIds[1].id}`));
  //  var s = stateIds[eventLis.findIndex()].id.slice(3,5).toLowerCase()
    getData(this.id.slice(3,5).toLowerCase())
 //  console.log(this.id)
}

stateIds = document.getElementsByTagName("path")

let eventLis = []
let s = []
for(var i = 0; i<stateIds.length; i++){
    s[i] = stateIds[i].id.slice(3,5).toLowerCase()
 eventLis[i] = (document.getElementById(stateIds[i].id).addEventListener("mouseover", hoverKara))
}

aak = {
    "as" : 1
}

a = 'as'

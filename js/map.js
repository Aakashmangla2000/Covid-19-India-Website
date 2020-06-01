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
      "tt": "Total",
      "un": "State Unassigned",
      "up": "Uttar Pradesh",
      "ut": "Uttarakhand",
      "wb": "West Bengal"
}
//check length of object
//console.log(Object.keys(st).length)

async function getData(){
    const result = await fetch(`https://api.covid19india.org/states_daily.json`)
    const data = await result.json();
    const data2 = data.states_daily;
    return data2;
}

async function updateData(){
    const dat = await fetch(`https://api.covid19india.org/data.json`)
    const dat2 = await dat.json()
    const dat3 = dat2.cases_time_series;
    let active = (dat3[dat3.length-1].totalconfirmed);
    let recovered = (dat3[dat3.length-1].totalrecovered);
    let ded = (dat3[dat3.length-1].totaldeceased);
    let nactive = (dat3[dat3.length-1].dailyconfirmed);
    let nrecovered = (dat3[dat3.length-1].dailyrecovered);
    let nded = (dat3[dat3.length-1].dailydeceased);
    // for(i = 0; i < dat.length; i++){
    //     if(data2[i].status === 'Confirmed'){
    //         active += parseInt(data2[i][state]);
    //     }
    //     if(data2[i].status === 'Recovered'){
    //         recovered += parseInt(data2[i][state]);
    //     }
    //     if(data2[i].status === 'Deceased'){
    //         ded += parseInt(data2[i][state]);
    //     }
    // }
   document.getElementById("total-a").innerText = (active-recovered-ded);
   document.getElementById("total-c").innerText = active;
   document.getElementById("total-r").innerText = recovered;
   document.getElementById("total-d").innerText = ded;

   document.getElementById("new-val-a").innerText = "+" + (nactive-nrecovered-nded);
   document.getElementById("new-val-c").innerText = "+" + nactive;
   document.getElementById("new-val-r").innerText = "+" + nrecovered;
   document.getElementById("new-val-d").innerText = "+" + nded;
}

updateData()

function changeValues(data2, state){
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


async function hoverKara(s){
   // console.log(document.querySelector(`#${stateIds[1].id}`));
  //  var s = stateIds[eventLis.findIndex()].id.slice(3,5).toLowerCase()
    data = await getData()
    if(this.id.length>2)
    changeValues(data,this.id.slice(3,5).toLowerCase())
    else{    
        changeValues(data,this.id)
        document.getElementById(`IN-${this.id.toUpperCase()}`).style.fill = "red";
       // document.getElementById(`IN-${this.id.toUpperCase()}`).style.fill = "rgb(243, 143, 132)";
    }
   // console.log(document.getElementById(`IN-${this.id.toUpperCase()}`))
}

stateIds = document.getElementsByTagName("path")

let eventLis = []
let s = []
for(var i = 0; i<stateIds.length; i++){
    s[i] = stateIds[i].id.slice(3,5).toLowerCase()
 eventLis[i] = (document.getElementById(stateIds[i].id).addEventListener("mouseover", hoverKara))
}

async function hoverHataya(s){
   
    document.getElementById(`IN-${this.id.toUpperCase()}`).style.fill = "rgb(243, 143, 132)";
}






async function createTable(){

    var data2;
    state = st
    data2 = await getData()
    for (let [state2, value] of Object.entries(state)){
        html = `<tr id="${state2}"><td>%st%</td><td><span class="badge badge-danger" id="">%d-c%</span> %c%</td><td><span class="badge badge-primary" id=""></span> %a%</td><td><span class="badge badge-success" id="">%d-r%</span> %r%</td><td><span class="badge badge-secondary" id="">%d-d%</span> %d%</td></tr>`;
        let active = 0;
        let recovered = 0;
        let ded = 0;
        let d_c = 0;
        let d_a = 0;
        let d_r = 0;
        let d_d = 0;

        if(state2==='tt')
        continue;
        for (j = 0; j < data2.length; j++){
        if(data2[j].status === 'Confirmed'){
            active += parseInt(data2[j][state2]);
        }
        if(data2[j].status === 'Recovered'){
            recovered += parseInt(data2[j][state2]);
        }
        if(data2[j].status === 'Deceased'){
            ded += parseInt(data2[j][state2]);
        }
    }
 
    d_c = data2[data2.length-3][state2];
    d_r = data2[data2.length-2][state2];
    d_d = data2[data2.length-1][state2];


        nhtml = html.replace('%st%', st[state2]);
        nhtml = nhtml.replace('%c%', active);
        nhtml = nhtml.replace('%a%', active-recovered-ded);
        nhtml = nhtml.replace('%r%', recovered);
        nhtml = nhtml.replace('%d%', ded);

        if(d_c!=0)
        nhtml = nhtml.replace('%d-c%', "+" + d_c + "");
        else
        nhtml = nhtml.replace('%d-c%', ""); + ""
        
        if((d_c-d_r-d_d)!=0)
        nhtml = nhtml.replace('%d-a%', "+" + (d_c-d_r-d_d) + "");
        else
        nhtml = nhtml.replace('%d-a%', "");

        if(d_r!=0)
        nhtml = nhtml.replace('%d-r%', "+" + d_r + "");
        else
        nhtml = nhtml.replace('%d-r%', "");

        if(d_d!=0)
        nhtml = nhtml.replace('%d-d%', "+" + d_d + "");
        else
        nhtml = nhtml.replace('%d-d%', "");


        document.querySelector('#table-body').insertAdjacentHTML('beforeend',nhtml);
        document.getElementById(state2).addEventListener("mouseover",hoverKara)
        document.getElementById(state2).addEventListener("mouseleave",hoverHataya)

    }
}

createTable();


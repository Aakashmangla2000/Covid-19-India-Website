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

function addComma(x){
    // var x=12345678;
    x = x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res
}

async function getData(){
    let result = await fetch(`https://api.covid19india.org/states_daily.json`)
    let data = await result.json();
    let data2 = data.states_daily;
    return data2;
}

async function updateData(){
    let dat = await fetch(`https://api.covid19india.org/data.json`)
    let dat2 = await dat.json()
    let dat3 = dat2.cases_time_series;
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
   document.getElementById("total-a").innerText = addComma(active-recovered-ded);
   document.getElementById("total-c").innerText = addComma(active);
   document.getElementById("total-r").innerText = addComma(recovered);
   document.getElementById("total-d").innerText = addComma(ded);

   document.getElementById("new-val-a").innerText = "[↑" + addComma(nactive-nrecovered-nded) +']';
   document.getElementById("new-val-c").innerText = "[↑" + addComma(nactive) + ']';
   document.getElementById("new-val-r").innerText = "[↑" + addComma(nrecovered) + ']';
   document.getElementById("new-val-d").innerText = "[↑" + addComma(nded)  + ']';
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
   document.getElementById("active-cases").innerText = addComma(active-recovered-ded);
   document.getElementById("confirmed-cases").innerText = addComma(active);
   document.getElementById("recovered-cases").innerText = addComma(recovered);
   document.getElementById("ded-cases").innerText = addComma(ded);
   document.getElementById("state-name").innerText = st[state];
   document.getElementById("state-name2").innerText = st[state];

}


async function hoverKara(s,flag){
  

arr = [
    "tt",
    "an",
    "ap",
    "ar",
    "as",
    "br",
    "ch",
    "ct",
    "dd",
    "dl",
    "dn",
    "ga",
    "gj",
    "hp",
    "hr",
    "jh",
    "jk",
    "ka",
    "kl",
    "la",
    "ld",
    "mh",
    "ml",
    "mn",
    "mp",
    "mz",
    "nl",
    "or",
    "pb",
    "py",
    "rj",
    "sk",
    "tg",
    "tn",
    "tr",
    "un",
    "up",
    "ut",
    "wb"
]
 // console.log(this.id)
 if(this.id!=undefined){
    let x = document.querySelectorAll('#scripts')
    let x2 = document.querySelectorAll('#scripts2')
    if(this.id.length<3){
    x[0].selectedIndex = arr.indexOf(this.id)
    x2[0].selectedIndex = arr.indexOf(this.id)}
    else{
        x[0].selectedIndex = arr.indexOf(this.id.slice(3,5).toLowerCase())
    x2[0].selectedIndex = arr.indexOf(this.id.slice(3,5).toLowerCase())
    }
}

   // console.log(this.id,'hi')
    data = await getData()
    if(flag===1){
        changeValues(data,s)
    }
    else if(this.id.length>2)
    changeValues(data,this.id.slice(3,5).toLowerCase())
    else{    
        changeValues(data,this.id)
        document.getElementById(`IN-${this.id.toUpperCase()}`).style.fill = "#ff3333";
       // document.getElementById(`IN-${this.id.toUpperCase()}`).style.fill = "rgb(243, 143, 132)";
    }
   // console.log(document.getElementById(`IN-${this.id.toUpperCase()}`))
  // console.log(document.querySelector(`#${stateIds[1].id}`));
   var s = this.id
  x =  document.getElementById(s)
  console.log(s);
  x.style.backgroundColor = "rgba(255, 255, 255, 0.177)"

}

stateIds = document.getElementsByTagName("path")

let eventLis = []
let s = []
for(var i = 0; i<stateIds.length; i++){
    s[i] = stateIds[i].id.slice(3,5).toLowerCase()
 eventLis[i] = (document.getElementById(stateIds[i].id).addEventListener("mouseover", hoverKara))
 
}

function hoverHataya(s){
    let x = document.querySelectorAll('#scripts')
    let x2 = document.querySelectorAll('#scripts2')

    x[0].selectedIndex = 0
    x2[0].selectedIndex = 0
    document.getElementById(this.id).style.backgroundColor = "rgba(1, 1, 44, 0.589)"
    var s = this.id
  x =  document.getElementById(s)
  console.log(s);
  x.style.backgroundColor = "rgb(0, 0, 31)"

    document.getElementById(`IN-${this.id.toUpperCase()}`).style.fill = "rgb(243, 143, 132)";
    document.getElementById("active-cases").innerText = 0;
   document.getElementById("confirmed-cases").innerText = 0;
   document.getElementById("recovered-cases").innerText = 0;
   document.getElementById("ded-cases").innerText = 0;
   document.getElementById("state-name").innerText = 'State';
  // document.getElementById("state-name2").innerText = 'State';

 // document.getElementById('svg2').style.fill = "rgb(243, 143, 132)";
}






async function createTable(){

    var data2;
    state = st
    data2 = await getData()
    var tthtml;
    for (let [state2, value] of Object.entries(state)){
        html = `<tr id="${state2}" onmouseover="hoverK(${state2})" onmouseout="hoverH(${state2})" class="table-el"><td>%st%</td><td><span class="badge badge-danger" id="">%d-c%</span> %c%</td><td><span class="badge badge-primary" id=""></span> %a%</td><td><span class="badge badge-success" id="">%d-r%</span> %r%</td><td><span class="badge badge-secondary" id="">%d-d%</span> %d%</td></tr>`;
        let active = 0;
        let recovered = 0;
        let ded = 0;
        let d_c = 0;
        let d_a = 0;
        let d_r = 0;
        let d_d = 0;

        // if(state2==='tt')
        // continue;
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
        nhtml = nhtml.replace('%c%', addComma(active));
        nhtml = nhtml.replace('%a%', addComma(active-recovered-ded));
        nhtml = nhtml.replace('%r%', addComma(recovered));
        nhtml = nhtml.replace('%d%', addComma(ded));

        if(d_c!=0)
        nhtml = nhtml.replace('%d-c%', "↑" + d_c + "");
        else
        nhtml = nhtml.replace('%d-c%', ""); + ""
        
        if((d_c-d_r-d_d)!=0)
        nhtml = nhtml.replace('%d-a%', "↑" + (d_c-d_r-d_d) + "");
        else
        nhtml = nhtml.replace('%d-a%', "");

        if(d_r!=0)
        nhtml = nhtml.replace('%d-r%', "↑" + d_r + "");
        else
        nhtml = nhtml.replace('%d-r%', "");

        if(d_d!=0)
        nhtml = nhtml.replace('%d-d%', "↑" + d_d + "");
        else
        nhtml = nhtml.replace('%d-d%', "");

         if(state2==='tt'){
         tthtml = nhtml
         }
        else{
        document.querySelector('#table-body').insertAdjacentHTML('beforeend',nhtml);
     //   document.getElementById(state2).addEventListener("mouseover",hoverKara)
        document.getElementById(state2).addEventListener("mouseout",hoverHataya)
        document.getElementById(state2).addEventListener("mouseover",hoverKara)}

    }
   // document.querySelector('#table-body').insertAdjacentHTML('beforeend',tthtml);
}

createTable();

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
}



function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable2");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
} 

function myFunct() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }


  let deferredPrompt;
const addBtn = document.querySelector('.add-button2');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';
  
    addBtn.addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });
   // console.log('hi')
  });



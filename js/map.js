
//Include external JS files
function include(file) { 

  var script = document.createElement('script'); 
  script.src = file; 
  script.type = 'text/javascript'; 
  script.defer = true; 
  
  document.getElementsByTagName('head').item(0).appendChild(script); 
  
} 
  
  /* Include Many js files */
  include('js/Chart.min.js'); 
 // include('https://media.geeksforgeeks.org/wp-content/uploads/20190704162640/second.js'); 

 
//Create Graph first time
function createLineGraph(dat, date_data, id, colourScheme, type, x=0){
  //console.log(date_data)

  if(x===1){
    return myChart;
  }
  else{
  var ctx = document.getElementById(id).getContext('2d');
  myChart.push(new Chart(ctx, {
    // title:{
    //  text:'Index Labels Customizations'   
    // }, 
  type: 'line',
  data: {
      labels: date_data,
      datasets: [{
          label: `${type} Cases`,
          data: dat[0],
          backgroundColor: 
             // colourScheme
               'rgba(0,0,0,0)',
          borderColor: colourScheme[0],
          borderWidth: 5,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBorderWidth: 2,
          pointHoverBorderWidth: 8

      },
      {
          label: `Active Cases`,
          data: dat[1],
          backgroundColor: 
             // colourScheme
               'rgba(0,0,0,0)',
          borderColor: colourScheme[1],
          borderWidth: 5,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBorderWidth: 2,
          pointHoverBorderWidth: 8

      },
      {
          label: `Recovered Cases`,
          data: dat[2],
          backgroundColor: 
             // colourScheme
               'rgba(0,0,0,0)',
          borderColor: colourScheme[2],
          borderWidth: 5,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBorderWidth: 2,
          pointHoverBorderWidth: 8

      },
      {
          label: `Deceased Cases`,
          data: dat[3],
          backgroundColor: 
             // colourScheme
               'rgba(0,0,0,0)',
          borderColor: colourScheme[3],
          borderWidth: 5,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBorderWidth: 2,
          pointHoverBorderWidth: 8

      }
      
    ]
  },
  options: {
      scales: {
          yAxes: [{
             position: 'right',
              ticks: {
                  beginAtZero: true,
                 //suggestedMax: 300000
              },
              display: true,
              gridLines: {
                  display: true,
                  color: 'rgb(36, 36, 36)'
              },
          }],
          xAxes: [{
              ticks: {
                  beginAtZero: true
              },
              display: true,
              gridLines: {
                  display: true,
                  color: 'rgb(36, 36, 36)'
              },
          }]
      }
  }
}));}

}


function addData(chart,label,data) {
  chart.data.datasets[0].data = data[0];
  chart.data.datasets[1].data = data[1];
  chart.data.datasets[2].data = data[2];
  chart.data.datasets[3].data = data[3];

//  chart.data.labels[0]=label

  chart.update();
}



var flg = 1;

function setFlag(s,d){
 flg = s;
// resetFunc()
 hoverK('d',5)
}

colr = ['rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(136, 154, 173, 0.712)',
  ]

//     async function getD(c){
//     const result = await fetch(c)
//     const data = await result.json();
//    // const data2 = data.cases_time_series;
//     return data;
//     }   



var myChart = [];




 


function createTotalGraph(id,t,cl,tp,y){
      // let dat = await getD('https://api.covid19india.org/data.json');
      let dat3 = cases_time_series;
      let graphData = [];
     // console.log(dat)
      for(let i = 0; i < 30; i++){
          graphData.push(dat3[(dat3.length-30)+i]);
      } 
      //console.log(graphData)
      let dat2 = [];
      let tc=[],ta=[],tr=[],td=[];
      let d2 = [];
      let date_data = [];
      let tag = ''
      if(t==='tc')
      tag = 'totalconfirmed'
      // else if(t==='ta')
      // tag = 'totalactive'
      else if(t==='tr')
      tag = 'totalrecovered'
      else if(t==='td')
      tag = 'totaldeceased'

      for(let i = 0; i < 30; i++){
         // if(t === 'ta')
          ta.push(parseInt(graphData[i]['totalconfirmed'])-parseInt(graphData[i]['totalrecovered'])-parseInt(graphData[i]['totaldeceased']))
        //  else
          tc.push(parseInt(graphData[i]['totalconfirmed']));
          tr.push(parseInt(graphData[i]['totalrecovered']));
          td.push(parseInt(graphData[i]['totaldeceased']));
      }
      for(let i = 0; i < 30; i++){
          date_data.push(graphData[i]['date']);
      }

      d2[0]=tc;
      d2[1]=ta;
      d2[2]=tr;
      d2[3]=td;
     // console.log(dat2)
      if(y===5){
       createLineGraph(d2,date_data,id,cl,tp);
      }
      
      else{
      addData(createLineGraph(dat3,date_data,'myChart2',colr[0],'Confirmed',1)[y],'ok',d2);
    }
  }

  
//     function resetFunc(){
//       hoverH(1)
// }



function hoverH(s){
 //let x = document.querySelectorAll('#scripts')
  let x2 = document.querySelectorAll('#scripts2')

 // x[0].selectedIndex = 0
  x2[0].selectedIndex = 0
  //document.getElementById("state-name2").innerText = 'Total';

  // let dat = await fetch(`https://api.covid19india.org/data.json`)
  // let dat2 = await dat.json()
  let dat3 = cases_time_series;
  let active = (dat3[dat3.length-1].totalconfirmed);
  let recovered = (dat3[dat3.length-1].totalrecovered);
  let ded = (dat3[dat3.length-1].totaldeceased);   

 document.getElementById("active-cases").innerText = addComma(active-recovered-ded);
 document.getElementById("confirmed-cases").innerText = addComma(active);
 document.getElementById("recovered-cases").innerText = addComma(recovered);
 document.getElementById("ded-cases").innerText = addComma(ded);
 document.getElementById("state-name").innerText = 'Total';


//  if(s===1)
 hoverK('tt',1)
 if(document.getElementById(`${s}`)!==null)
 document.getElementById(`${s}`).style.fill = "rgb(243, 143, 132)";

}

var unId = 'tt' ;
function hoverK(s,flag){
 //console.log(s)
// document.getElementById(s.id).style.backgroundColor = "rgba(255, 255, 255, 0.177)"

 // var sel = document.getElementById('scripts');
 //console.log(sel)
//  let a = (sel.options[sel.selectedIndex].value).toLowerCase();

  let idd = 0;
  if(flag===1)
  idd = s;
  else if(flag===5)
  idd = unId;
  else if(s.length>2){
  idd = `${s.slice(3,5).toLowerCase()}`;
  document.getElementById(`${s}`).style.fill = "ff3333";
  //console.log('hi')
  }
  else
  idd = s.id;

  let d = 0;
 // d2 = await getD('https://api.covid19india.org/states_daily.json');
  d = states_daily
  //idd = s.id;
  let dts = []
 // d2 = await d["statewise"];
 let dat = []
 let dat2 = []
 let dat3 = []
 let dat4 = []
 let des = []
 let temp = [0,0,0];
 for(let i = 0; i < d.length-90; i++){
    if(d[i].status=== "Confirmed")
    temp[0] += parseInt(d[i][idd])
    else if(d[i].status=== "Recovered")
    temp[1] += parseInt(d[i][idd])
    else
    temp[2] += parseInt(d[i][idd])
 }
  for(let i = d.length-90; i < d.length; i++){
     if(flg===1){
      if(d[i].status=== "Confirmed"){
      dat.push(parseInt(d[i][idd])+temp[0]);
      temp[0] = parseInt(d[i][idd])+temp[0]
      dts.push(d[i].date);
      }
      else if(d[i].status=== "Recovered"){
      dat2.push(parseInt(d[i][idd])+temp[1]);
      temp[1] = parseInt(d[i][idd])+temp[1]
     }
      else if(d[i].status=== "Deceased"){
      dat3.push(parseInt(d[i][idd])+temp[2]);
      temp[2] = parseInt(d[i][idd])+temp[2]
      }
     }
     else{
       if(d[i].status=== "Confirmed"){
      dat.push(parseInt(d[i][idd]));
      dts.push(d[i].date);
      }
      else if(d[i].status=== "Recovered"){
      dat2.push(parseInt(d[i][idd]));
     }
      else if(d[i].status=== "Deceased"){
      dat3.push(parseInt(d[i][idd]));
      }
     }

  }
  for(let i = 0; i < dat.length;i++){
      dat4.push(dat[i]-dat2[i]-dat3[i])
  }

 des[0] = dat
 des[1] = dat4
 des[2] = dat2
 des[3] = dat3
     addData(createLineGraph(dat,dts,'myChart2',colr[0],'Confirmed',1)[0],'ok',des);

    unId = idd;
    hoverKara(idd,2)

}

// $(document).ready(function () {
// $('#dtBasicExample').DataTable();
// $('.dataTables_length').addClass('bs-select');
// });

function selectBox() {
 let x = document.querySelectorAll('#scripts2')

  var sel = document.getElementById('scripts');
  x[0].selectedIndex = sel.selectedIndex

 // console.log(sel.selectedIndex)
  //sel.selectedIndex = 0;  
  let a = (sel.options[sel.selectedIndex].value).toLowerCase();
      hoverK(a,1)   
      hoverKara(a,1)   
}
function selectBox2() {
// let x = document.querySelectorAll('#scripts')

  var sel = document.getElementById('scripts2');
 // x[0].selectedIndex = sel.selectedIndex
// x[0].selectedIndex = sel.selectedIndex

  let a = (sel.options[sel.selectedIndex].value).toLowerCase();
      hoverK(a,1)   
      hoverKara(a,1)   
}


//Map.js

st2 = {
  "AN": "Andaman and Nicobar Islands",
  "AP": "Andhra Pradesh",
  "AR": "Arunachal Pradesh",
  "AS": "Assam",
  "BR": "Bihar",
  "CH": "Chandigarh",
  "CT": "Chhatisgarh",
  "DD": "Daman and Diu",
  "DL": "Delhi",
  "DN": "Dadar and Nagar Haveli",
  "GA": "Goa",
  "GJ": "Gujurat",
  "HP": "Himachal Pradesh",
  "HR": "Haryana",
  "JH": "Jharkhand",
  "JK": "Jammu and Kashmir",
  "KA": "Karnataka",
  "KL": "Kerela",
  "LA": "Ladakh",
  "LD": "Lakshwadeep",
  "MH": "Maharashtra",
  "ML": "Meghalaya",
  "MN": "Manipur",
  "MP": "Madhya Pradesh",
  "MZ": "Mizoram",
  "NL": "Nagaland",
  "OR": "Odisha",
  "PB": "Punjab",
  "PY": "Puducherry",
  "RJ": "Rajasthan",
  "SK": "Sikkim",
  "TG": "Telangana",
  "TN": "Tamil Nadu",
  "TR": "Tripura",
  "TT": "Total",
  "UN": "State Unassigned",
  "UP": "Uttar Pradesh",
  "UT": "Uttarakhand",
  "WB": "West Bengal"
}

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


// https://api.covid19india.org/v4/min/timeseries.min.json

async function getData(){
let result = await fetch(`https://api.covid19india.org/states_daily.json`)
let data = await result.json();
let data2 = await data.states_daily;
states_daily = await data2;

let result2 = await fetch(`https://api.covid19india.org/data.json`)
  let dat = await result2.json();
  let dat2 = await dat.cases_time_series;
  let dat3 = await dat.statewise;
  statewise = await dat3;
  cases_time_series = await dat2;

let result3 = await fetch(`https://api.covid19india.org/v4/min/timeseries.min.json`)
let newDat = await result3.json();
console.log(newDat)

console.log(statewise)
updateData()

createTable(newDat);
createTotalGraph('myChart','tc',colr,'Confirmed',5);


}



var states_daily,  cases_time_series, statewise;

getData()
function runApp(){
// console.log(states_daily,"test")
}




function updateData(){
  console.log('test')

//   let dat = await fetch(`https://api.covid19india.org/data.json`)
//   let dat2 = await dat.json()
let dat3 = cases_time_series;
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

if(nactive-nrecovered-nded < 0){
  document.getElementById("new-val-a").innerText = "[↓" + addComma(-(nactive-nrecovered-nded)) +']';
}
else
document.getElementById("new-val-a").innerText = "[↑" + addComma(nactive-nrecovered-nded) +']';
document.getElementById("new-val-c").innerText = "[↑" + addComma(nactive) + ']';
document.getElementById("new-val-r").innerText = "[↑" + addComma(nrecovered) + ']';
document.getElementById("new-val-d").innerText = "[↑" + addComma(nded)  + ']';
}




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
// document.getElementById("state-name2").innerText = st[state];

}


function hoverKara(s,flag){
//console.log(s)
let sa = this.id


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
// let x = document.querySelectorAll('#scripts')
let x2 = document.querySelectorAll('#scripts2')
if(this.id.length<3){
// x[0].selectedIndex = arr.indexOf(this.id)
x2[0].selectedIndex = arr.indexOf(this.id)}
else{
    x[0].selectedIndex = arr.indexOf(this.id.slice(3,5).toLowerCase())
x2[0].selectedIndex = arr.indexOf(this.id.slice(3,5).toLowerCase())
}
}
else{
  let x2 = document.querySelectorAll('#scripts2')
 // if(this.id.length<3){
 // x[0].selectedIndex = arr.indexOf(this.id)
  x2[0].selectedIndex = arr.indexOf(s)
  // else{
  //    // x[0].selectedIndex = arr.indexOf(this.id.slice(3,5).toLowerCase())
  // x2[0].selectedIndex = arr.indexOf(this.id.slice(3,5).toLowerCase())
  // } 
}

// console.log(this.id,'hi')
data = states_daily
if(flag===1){
    changeValues(data,s)
}
else if(flag===2){
//console.log(s,'o')
changeValues(data,s)}
else{    
    //console.log('yo')
    changeValues(data,this.id)
    if(document.getElementById(`IN-${this.id.toUpperCase()}`)!=null)
    document.getElementById(`IN-${this.id.toUpperCase()}`).style.fill = "#ff3333";
   // document.getElementById(`IN-${this.id.toUpperCase()}`).style.fill = "rgb(243, 143, 132)";
}
// console.log(document.getElementById(`IN-${this.id.toUpperCase()}`))
// console.log(document.querySelector(`#${stateIds[1].id}`));
if(flag!=2){
x =  document.getElementById(sa)
//console.log(sa,'cool');
x.style.backgroundColor = "rgba(255, 255, 255, 0.177)"}

}

stateIds = document.getElementsByTagName("path")

let eventLis = []
let s = []
// for(var i = 0; i<stateIds.length; i++){
//   s[i] = stateIds[i].id.slice(3,5).toLowerCase()
// eventLis[i] = (document.getElementById(stateIds[i].id).addEventListener("mouseover", hoverKara))

// }

function hoverHataya(s){
// let x = document.querySelectorAll('#scripts')
let x2 = document.querySelectorAll('#scripts2')

// x[0].selectedIndex = 0
x2[0].selectedIndex = 0
document.getElementById(this.id).style.backgroundColor = "rgba(1, 1, 44, 0.589)"
var s = this.id
x =  document.getElementById(s)
//console.log(x);
x.style.backgroundColor = "rgb(0, 0, 31)"


  if(document.getElementById(`IN-${this.id.toUpperCase()}`)!=null)
document.getElementById(`IN-${this.id.toUpperCase()}`).style.fill = "rgb(243, 143, 132)";
//   document.getElementById("active-cases").innerText = addComma(active-recovered-ded);
//   document.getElementById("confirmed-cases").innerText = addComma(active);
//   document.getElementById("recovered-cases").innerText = addComma(recovered);
//   document.getElementById("ded-cases").innerText = addComma(ded);
//   document.getElementById("state-name").innerText = 'Total';
// document.getElementById("state-name2").innerText = 'State';

// document.getElementById('svg2').style.fill = "rgb(243, 143, 132)";
}






// function createTable(){

// let data2;
// state = st
// data2 = statewise
// var tthtml;

// for(let i = 0; i < statewise.length; i++){
//     state2 = (statewise[i].statecode).toLowerCase();
//     html = `<tr id="${state2}" onmouseover="hoverK(${state2})" onmouseout="hoverH(${state2})" class="table-el"><td>%st%</td><td><span class="badge badge-danger" id="">%d-c%</span> %c%</td><td><span class="badge badge-primary" id="">%d-a%</span> %a%</td><td><span class="badge badge-success" id="">%d-r%</span> %r%</td><td><span class="badge badge-secondary" id="">%d-d%</span> %d%</td></tr>`;
//     let active = statewise[i].active;
//     let recovered = statewise[i].recovered;
//     let ded = statewise[i].deaths;
//     let confirmed = statewise[i].confirmed;
//     let d_c = statewise[i].deltaconfirmed;
//     let d_a = statewise[i];
//     let d_r = statewise[i].deltarecovered;
//     let d_d = statewise[i].deltadeaths;

//     nhtml = html.replace('%st%', statewise[i].state);
//     nhtml = nhtml.replace('%c%', addComma(confirmed));
//     nhtml = nhtml.replace('%a%', addComma(active));
//     nhtml = nhtml.replace('%r%', addComma(recovered));
//     nhtml = nhtml.replace('%d%', addComma(ded));

//     if(d_c!=0)
//     nhtml = nhtml.replace('%d-c%', "↑" + d_c + "");
//     else
//     nhtml = nhtml.replace('%d-c%', ""); + ""
    
//     if((d_c-d_r-d_d)!=0&&(d_c-d_r-d_d)>=0)
//     nhtml = nhtml.replace('%d-a%', "↑" + (d_c-d_r-d_d) + "");
//     else if((d_c-d_r-d_d)!=0&&(d_c-d_r-d_d)<=0)
//     nhtml = nhtml.replace('%d-a%', "↓" + -(d_c-d_r-d_d) + "");

//     else
//     nhtml = nhtml.replace('%d-a%', "");

//     if(d_r!=0)
//     nhtml = nhtml.replace('%d-r%', "↑" + d_r + "");
//     else
//     nhtml = nhtml.replace('%d-r%', "");

//     if(d_d!=0)
//     nhtml = nhtml.replace('%d-d%', "↑" + d_d + "");
//     else
//     nhtml = nhtml.replace('%d-d%', "");

//      if(state2==='tt'){
//      tthtml = nhtml
//      }
//     else{
//     document.querySelector('#table-body').insertAdjacentHTML('beforeend',nhtml);
//  //   document.getElementById(state2).addEventListener("mouseover",hoverKara)
//     document.getElementById(state2).addEventListener("mouseout",hoverHataya)
//     document.getElementById(state2).addEventListener("mouseover",hoverKara)}
// }
// }

function createTable(newDat){

  let data2;
  state = st
  data2 = statewise
  var tthtml;

  dateToday = ''
  d = new Date();
  year = d.getFullYear()
  month = d.getMonth()
  today = d.getDate()
  month += 1
  if(month < 10)
    month = `0${month}`
  dateToday = `${year}-${month}-${today}`
  prevDate = `${year}-${month}-${today-1}`
  

  for(const state in newDat){
    let d_c = ''
    let d_r = ''
    let d_d = ''
    let d_t = ''
    let d_a = ''
    let p = 0
    // console.log(newDat[state].dates[dateToday],dateToday)
    dataForToday = newDat[state].dates[dateToday]
    prevData = newDat[state].dates[prevDate]

    if(dataForToday == undefined) 
    continue
    newCases = dataForToday.delta
    totalCases = dataForToday.total
    state2 = state.toLowerCase();
      html = `<tr id="${state2}" onmouseover="hoverK(${state2})" onmouseout="hoverH(${state2})" class="table-el"><td>%st%</td><td><span class="badge badge-danger" id="">%d-c%</span> %c%</td><td><span class="badge badge-primary" id="">%d-a%</span> %a%</td><td><span class="badge badge-success" id="">%d-r%</span> %r%</td><td><span class="badge badge-secondary" id="">%d-d%</span> %d%</td><td> %p%</td><td><span class="badge badge-info" id="">%d-t%</span> %t%</td></tr>`;
      // let active = totalCases.active;
      let recovered = totalCases.recovered;
      let ded = totalCases.deceased;
      let confirmed = totalCases.confirmed;
      let active = confirmed - recovered - ded;
      let tested = totalCases.tested;
      if(newCases != undefined){
       d_c = newCases.confirmed;
       d_r = newCases.recovered;
       d_d = newCases.deceased;
       d_t = newCases.tested;
       d_a = d_c - d_r - d_d;
       p = ((d_c)/d_t)*100
      
      if(p != undefined && p!= NaN)
      p = p.toFixed(2)
      if(p == 'NaN')
      p = 0

      if(p == 0)
      {
        p = (prevData.delta.confirmed/prevData.delta.tested)*100
        p = p.toFixed(2)      
      }
      
      if(p == 'NaN')
        p = 0
        
      if(d_c == undefined)
      d_c = 0
      if(d_a == undefined)
      d_a = 0
      if(d_d == undefined)
      d_d = 0
      if(d_t == undefined)
      d_t = 0
      if(p == undefined)
      p = 0
      }
      
       
      

      
  
      nhtml = html.replace('%st%', st2[state]);
      nhtml = nhtml.replace('%c%', addComma(confirmed));
      nhtml = nhtml.replace('%a%', addComma(active));
      nhtml = nhtml.replace('%r%', addComma(recovered));
      nhtml = nhtml.replace('%d%', addComma(ded));
      nhtml = nhtml.replace('%p%', `${p}%`);
      nhtml = nhtml.replace('%t%', addComma(tested));
  
      if(d_c!=0)
      nhtml = nhtml.replace('%d-c%', "↑" + d_c + "");
      else
      nhtml = nhtml.replace('%d-c%', ""); + ""
      
      if((d_c-d_r-d_d)!=0&&(d_c-d_r-d_d)>=0)
      nhtml = nhtml.replace('%d-a%', "↑" + (d_c-d_r-d_d) + "");
      else if((d_c-d_r-d_d)!=0&&(d_c-d_r-d_d)<=0)
      nhtml = nhtml.replace('%d-a%', "↓" + -(d_c-d_r-d_d) + "");
  
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

      if(d_t!=0)
      nhtml = nhtml.replace('%d-t%', "↑" + d_t + "");
      else
      nhtml = nhtml.replace('%d-t%', "");
  
       if(state2==='tt'){
       tthtml = nhtml
       }
      else{
      document.querySelector('#table-body').insertAdjacentHTML('beforeend',nhtml);
   //   document.getElementById(state2).addEventListener("mouseover",hoverKara)
      document.getElementById(state2).addEventListener("mouseout",hoverHataya)
      document.getElementById(state2).addEventListener("mouseover",hoverKara)}
  }
  
  
  }


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
// let xx,yy;

for (i = 1; i < (rows.length - 1); i++) {
  console.log(rows[i])
  // Start by saying there should be no switching:
  shouldSwitch = false;
  /* Get the two elements you want to compare,
  one from current row and one from the next: */
  x = rows[i].getElementsByTagName("TD")[n];
  //console.log(x.innerHTML[0])
  y = rows[i + 1].getElementsByTagName("TD")[n];
  /* Check if the two rows should switch place,
  based on the direction, asc or desc: */
  //   if(x.innerHTML[0]==='<'){
  //   let ser = x.innerHTML.search('n> ')
  //   xx = x.innerHTML.slice(ser+3,ser.length).replace(",","")
  //  // xx = xx.replace(",","")
  //   let ser2 = y.innerHTML.search('n> ')
  //   yy = y.innerHTML.slice(ser2+3,ser2.length)
  //  // yy = yy.replace(",",'')
  //   //console.log(xx,yy)
  // }
  // else{
  xx = x.innerHTML;
  yy = y.innerHTML;
  
  if (Number(xx) > Number(yy)) {
    shouldSwitch = true;
    break;
  }
  if (dir == "asc") {
    if (xx.toLowerCase() > yy.toLowerCase()) {
      // If so, mark as a switch and break the loop:
      shouldSwitch = true;
      break;
    }
  } else if (dir == "desc") {
    if (xx.toLowerCase() < yy.toLowerCase()) {
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




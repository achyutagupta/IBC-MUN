
var srno =0;
var tabbody = document.getElementById('tabbody');
function additems(name,branch,college,year,cont,email,committee,experience){
    // console.log("hello");
    let trow=document.createElement('tr');
    let td1 =document.createElement('td');
    let td2 =document.createElement('td');
    let td3 =document.createElement('td');
    let td4 =document.createElement('td');
    let td5 =document.createElement('td');
    let td6 =document.createElement('td');
    let td7 =document.createElement('td');
    let td8 =document.createElement('td');
    let td9 =document.createElement('td');


    td1.innerHTML = ++srno;
    td2.innerHTML = name;
    td3.innerHTML = branch;
    td4.innerHTML = college;
    td5.innerHTML = year;
    td6.innerHTML = cont;
    td7.innerHTML = email;
    td8.innerHTML = committee;
    td9.innerHTML = experience;


    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);

    tabbody.appendChild(trow);
  }
  // function print(){
  //   console.log("hello");
  // }
  // print();
//   let a="Hiii"; 
// additems(a,a,a,a,a,a,a,a);
function addallelements(Thestudent){
  srno=0;
  tabbody.innerHTML="";
  Thestudent.forEach(element => {
    additems(element.Full_name , element.Branch , element.College , element.Year , element.Contact_no , element.Email , element.committee , element.experience ) 
  });

}
// Import the functions you need from the SDKs you need
import { getFirestore , collection , query , where , getDocs} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyA8uia2DvT04dUbAhvXEpSGkWav1h08GGo",
authDomain: "mun-database-b0bc3.firebaseapp.com",
databaseURL: "https://mun-database-b0bc3-default-rtdb.firebaseio.com",
projectId: "mun-database-b0bc3",
storageBucket: "mun-database-b0bc3.appspot.com",
messagingSenderId: "690798009433",
appId: "1:690798009433:web:4862ec4a7b36226d676548",
measurementId: "G-LTL4TTP4HN"
};




firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();



const db_manit = firestore.collection("MunForm_manit");

var students = [];


db_manit.get().then(snapshot => {
// console.log("test");
snapshot.forEach((doc)=>{
    students.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
    // console.log(students);
    addallelements(students);
})



});


  
  // get(child(dbRef, "StudentsList"))
  // .then((snapshot)=>{

  //     var students = [];

  //     snapshot.forEach(childSnapshot => { 
  //       students.push(childSnapshot.val());
  //     });
  //     addallelements(students);
  //   });
// }
// window.onload = GetAllDataOnce();
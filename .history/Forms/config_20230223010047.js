
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
const db_other = firestore.collection("MunForm_other");

let clg = document.getElementById('college')
let cname = "MANIT";


clg.addEventListener('change', () => {
    let cnumber = document.getElementById('college').value;

    if (cnumber == '2') {
        cname = "other"
    }

    console.log(cname)

})

var frm = document.getElementById('frm');

let submitButton = document.getElementById('submit');
let File_data_manit = document.getElementById('file_manit');
let File_data_other = document.getElementById('file_other');
let img_btn = document.getElementById('upload_manit_img');
let img_btn_other = document.getElementById('upload_other_img');
var progress_manit = document.getElementById('uploadProgress_manit')
var progress_other = document.getElementById('uploadProgress_other')

let url_data = '';

File_data_manit.addEventListener("change", getFile)
File_data_other.addEventListener("change", getFile)

// frm.addEventListener("submit" , uploadImage)

// img_btn.addEventListener('click' , uploadImage)

var fileName;
var fileItem = '';

function getFile(e) {
    fileItem = e.target.files[0];
    fileName = fileItem.name

    console.log(fileItem);
    console.log(fileName)
}

const uploadImage = (e) => {

    e.preventDefault()

    if (fileItem == '') {
        progress_manit.value = 0
        progress_other.value = 0
        alert("please upload a valid image")
    }

    let storageRef = firebase.storage().ref("images_manit/" + fileName)
    let uploadTask = storageRef.put(fileItem)

    // uploadTask.then(snapshot => snapshot.ref.getDownloadURL())
    //     .then(url => {
    //         console.log(url);
    //         url_data = url;
    //         alert('image uploaded successfully');
    //     }).catch(console.error);



    uploadTask.on("state_changed", (snapshot) => {
        console.log(snapshot)

        const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        console.log(percent)

        if (cname == 'MANIT') {
            progress_manit.value = percent
        }

        if (cname == 'other') {
            progress_other.value = percent
        }


    }, (error) => {
        console.log(error)
    }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            url_data = downloadURL
            alert("image uploaded")
        });
    })

}

img_btn.addEventListener('click', uploadImage)
img_btn_other.addEventListener('click', uploadImage)

submitButton.addEventListener("click", (e) => {



    e.preventDefault()

    let Oth = document.getElementById('other').value;
    let Em = document.getElementById('email').value;
    let Fname = document.getElementById('Full_name').value;
    let Ctn = document.getElementById('contact').value;

    let branch = document.getElementById('branch').value;
    let yr = document.getElementById('year').value;


    let experience_manit = document.getElementById('experience_manit').value
    let referral = document.getElementById('referral').value



    let File_other = document.getElementById('file_other').value;
    let File_manit = document.getElementById('file_manit').value;

    // validation

    /*first name input validation*/
    function FirstName(Fname) {

        var letters = /^[A-Za-z]+$/;
        if (Fname == "" || Fname.match(letters)) {
            text = "";
            return true;
        }

        else {
            // alert("Name should contain only letters")
            return false;
        }
    }


    // E-mail validation
    function Email(Em) {
        // var message = document.getElementsByClassName("error-message");
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var atpos = Em.indexOf("@");
        var dotpos = Em.lastIndexOf(".");

        if (Em == "" || Em.match(mailformat) || atpos > 1 && (dotpos - atpos > 2)) {
            return true;
        }

        else {
            // text = "Wrong email format";
            return false;
        }
    }

    /*phone number validation*/
    function PhoneNumber(Ctn) {

        var numbers = /^[0-9]+$/;
        if (Ctn == "" || Ctn.match(numbers)) {
            return true;
        }

        else {
            // text = "Phone number should contain only numbers";
            return false;
        }
    }

    if (FirstName(Fname) == false) {
        alert("Name should contain only letters")
    }



    if (cname == 'MANIT') {


        if (Em == '' && Fname == '' && Ctn == '' && File_manit == '' && branch == '' && yr == '' && experience_manit == '') {
            alert("please fill all the necessary feilds!")
        }

        else if (Fname == '') {
            alert("please fill your name")
        }

        else if (Em == '') {
            alert("please fill your e-mail")
        }



        else if (Ctn == '') {
            alert("please fill you contact details!")
        }

        else if (yr == '') {
            alert("fill your year")
        }

        else if (branch == '') {
            alert("please select your branch")
        }

        else if (experience_manit == '') {
            alert("please fill the experience column")
        }

        else if (File_manit == '') {
            alert("Please select an image to upload!")
        }


        else if (url_data == '') {
            alert(" click on the upload button and please upload the valid payment Receipt!")
        }

        else if (Em != '' && Fname != '' && Ctn != '' && File_manit != '' && branch != '' && yr != '' && url_data != '' && experience_manit != '') {




            db_manit.doc().set({

                College: cname,
                Email: Em,
                Full_name: Fname,
                Contact_no: Ctn,
                Image: url_data,
                Branch: branch,
                Year: yr,
                experience: experience_manit



            }).then(() => {

                alert("Registration Successful!")
                frm.reset();
                progress_manit.value = 0;
            }).catch((error) => {
                console.log(error);
            })

        }

    }

    else if (cname == 'other') {

        if (Em == '' && Fname == '' && Ctn == '' && File_manit == '' && branch == '' && yr == '' && experience_manit == '' && Oth == '') {
            alert("please fill all the necessary feilds!")
        }

        else if (Fname == '') {
            alert("please fill your name")
        }


        else if (Em == '') {
            alert("please fill your e-mail")
        }


        else if (Ctn == '') {
            alert("please fill you contact details!")
        }

        else if (yr == '') {
            alert("fill your year")
        }

        else if (branch == '') {
            alert("please select your branch")
        }

        else if (experience_manit == '') {
            alert("please fill the experience column")
        }


        else if (referral == '') {
            alert("please fill the referral column!")
        }

        else if (Oth == '') {
            alert("please fill your institute name")
        }

        else if (File_other == '') {
            alert("Please select an image to upload!")
        }


        else if (url_data == '') {
            alert(" click on the upload button and please upload the valid payment Receipt!")
        }



        else if (Em != '' && Fname != '' && Ctn != '' && File_other != '' && branch != '' && yr != '' && url_data != '' && experience_manit != '' && referral != '' && Oth != '') {

            db_other.doc().set({

                Other_college_name: Oth,
                Email: Em,
                Full_name: Fname,
                Contact_no: Ctn,
                Image: url_data,
                Branch: branch,
                Year: yr,
                experience: experience_manit,
                code: referral
            }).then(() => {
                alert("Registration Successful!")
                frm.reset();
                progress_other.value = 0
            }).catch((error) => {
                console.log(error);
            })

        }
    }

})
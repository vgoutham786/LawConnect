let lawyer = 'https://lawlink.onrender.com/lawyer'

// function filterBrands() {
//   // Get all checkboxes
//   const brand_checkboxes = document.querySelectorAll(".brand_filter_option");

//   // Get checked checkboxes
//   const brand_checkedCheckboxes = Array.from(brand_checkboxes).filter(
//     (checkbox) => checkbox.checked
//   );

//   // Get checked checkbox values
//   const brand_checkedValues = brand_checkedCheckboxes.map(
//     (checkbox) => checkbox.value
//   );

//   if (brand_checkedValues.length == 0) return "";
//   return brand_checkedValues.join("-");
// }

// document.querySelectorAll(".brand_filter_option").forEach(ele => {
//   ele.addEventListener("change", () => {
//     let filter_values = filterBrands()
//     FetchData(filter_values)
//     // console.log(filter_values);
//   })
// })






// let loged_in_user_data = JSON.parse(localStorage.getItem('userData')) || false
  
// if(loged_in_user_data){
//   loged_in_user_data = loged_in_user_data.Name
//   logedIn()
// }
// function logedIn(){
//   document.getElementById("loged_in_name").textContent = loged_in_user_data
//   document.getElementById("loged_in_user").style.display = "flex"
//   document.getElementById("login_signup").style.display = "none"
// }

// function logout(){
//   document.getElementById("loged_in_user").style.display = "none"
//   document.getElementById("login_signup").style.display = "flex"
//   localStorage.removeItem("userData");
// }

// function FetchData(filter) {
//  fetch(`${lawyerData}/getLawyer?filters=${filter}`)
//  .then((res) => res.json())
//  .then((data) =>{
//      console.log(data)
//      displayData(data)
//  })
//  .catch(err => console.log(err))
// }

// FetchData("")



// function displayData(data){
//   document.getElementById('main_container').innerHTML = ""
// data.forEach(ele=> {
//  let div = document.createElement('div')
//  div.setAttribute('id',"MainDiv")
//  div.addEventListener("click",() => {
//    localStorage.setItem("Details",JSON.stringify(ele))
//    window.location.href = './LawyerDesc.html'
//  })
//  let div1 = document.createElement('div')
//  div1.setAttribute('id','first_div')
//  let div2 = document.createElement('div')
//  div2.setAttribute('id','second_div')
//  let name = document.createElement('h2')
//  name.innerText = ele.name
//  let rank = document.createElement('p')
//  rank.innerText = `Rank: ${ele.Rank}`
//  let pic = document.createElement('img')
//  pic.setAttribute('src',ele.image)
//  // ele.languages.forEach((el) => {
//  //     var language = document.createElement('p')
//  //     language.innerText = el
//  // })
//  let experience = document.createElement('p')
//  experience.innerText = `Experience: ${ele.experience}`
// //    ele.skills.forEach((el) => {
// //     var skills = document.createElement('p')
// //     skills.innerText = el
// //    })
//  let price = document.createElement('p')
//  price.innerText = `Price: ${ele.price}`
//  let bio = document.createElement('p')
//  bio.innerText = ele.bio
//  div1.append(name,rank,bio,experience,price)
//  div2.append(pic)
//  div.append(div1,div2)

//  document.getElementById('main_container').append(div)
// });  
// }


// let card = document.getElementById('MainDiv')

const lawyerData=document.getElementById("maincontainer");
//const url="localhost:8000/lawyer";

function fetchdata() {
    fetch("http://localhost:8000/lawyer/lawyer")
    .then((res) => {       
        return res.json();
    }).then((data) => {
         console.log(data)
        displayData(data)
    }).catch((err) => {
        console.log(err)
    })
}

fetchdata();

function displayData(data){
lawyerData.innerHTML=null;
console.log(data);
data.forEach((element, index) => {
    let card = document.createElement("div");
   card.classList.add('lawyer-list');

    let imgdiv = document.createElement("div");
    imgdiv.setAttribute("id", "imgdiv");
    imgdiv.classList.add('imgdiv');

    let image=document.createElement("img");
    image.setAttribute("src",element.image);

    let detaildiv=document.createElement("div");
    detaildiv.classList.add('detaildiv');

    let name=document.createElement("h2");
    name.innerText=element.name;
    name.classList.add('name');

    let biodata=document.createElement("h5");
    biodata.innerText=element.bio;
    biodata.classList.add('biodata');

    let experience=document.createElement("h5");
    experience.innerText= "Experience:" + element.experience;
    experience.classList.add('experience');
    
    let languages=document.createElement("h5");
    languages.innerText="Languages:"+element.languages;
    languages.classList.add("languages");

    let rating=document.createElement("h5");
    rating.innerText="Rating:"+element.rating;
    rating.classList.add('rating');

    let price=document.createElement("h5");
    price.innerText="Price:"+element.price;
    price.classList.add('price');

    imgdiv.append(image);
    detaildiv.append(name,biodata,experience,languages,rating,price);
    card.append(imgdiv,detaildiv);
    lawyerData.append(card);

})
}
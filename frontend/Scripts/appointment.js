let lawyerData = 'https://lawlink.onrender.com/lawyer'




function filterBrands() {
}

document.querySelectorAll(".brand_filter_option").forEach(ele => {
  ele.addEventListener("change", () => {
    let filter_values = filterBrands()
    FetchData(filter_values)
    // console.log(filter_values);
  })
})






let loged_in_user_data = JSON.parse(localStorage.getItem('userData')) || false
  
if(loged_in_user_data){
  loged_in_user_data = loged_in_user_data.Name
  logedIn()
}
function logedIn(){
  document.getElementById("loged_in_name").textContent = loged_in_user_data
  document.getElementById("loged_in_user").style.display = "flex"
  document.getElementById("login_signup").style.display = "none"
}

function logout(){
  document.getElementById("loged_in_user").style.display = "none"
  document.getElementById("login_signup").style.display = "flex"
  localStorage.removeItem("userData");
}

function FetchData(filter) {
 fetch(`${lawyerData}/getLawyer?filters=${filter}`)
 .then((res) => res.json())
 .then((data) =>{
     console.log(data)
     displayData(data)
 })
 .catch(err => console.log(err))
}

FetchData("")



function displayData(data){
  document.getElementById('main_container').innerHTML = ""
data.forEach(ele=> {
 let div = document.createElement('div')
 div.setAttribute('id',"MainDiv")
 div.addEventListener("click",() => {
   localStorage.setItem("Details",JSON.stringify(ele))
   window.location.href = './LawyerDesc.html'
 })
 let div1 = document.createElement('div')
 div1.setAttribute('id','first_div')
 let div2 = document.createElement('div')
 div2.setAttribute('id','second_div')
 let name = document.createElement('h2')
 name.innerText = ele.name
 let rank = document.createElement('p')
 rank.innerText = `Rank: ${ele.Rank}`
 let pic = document.createElement('img')
 pic.setAttribute('src',ele.image)
 // ele.languages.forEach((el) => {
 //     var language = document.createElement('p')
 //     language.innerText = el
 // })
 let experience = document.createElement('p')
 experience.innerText = `Experience: ${ele.experience}`
//    ele.skills.forEach((el) => {
//     var skills = document.createElement('p')
//     skills.innerText = el
//    })
 let price = document.createElement('p')
 price.innerText = `Price: ${ele.price}`
 let bio = document.createElement('p')
 bio.innerText = ele.bio
 div1.append(name,rank,bio,experience,price)
 div2.append(pic)
 div.append(div1,div2)

 document.getElementById('main_container').append(div)
});  
}


let card = document.getElementById('MainDiv')
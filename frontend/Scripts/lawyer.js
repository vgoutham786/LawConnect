
const lawyerData=document.getElementById("maincontainer");
//const url="localhost:8000/lawyer";

function fetchdata() {
    fetch("http://localhost:8000/lawyer/getLawyer")
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
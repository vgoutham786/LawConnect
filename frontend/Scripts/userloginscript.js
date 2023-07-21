const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const leftPanel = document.querySelector('.left-panel');
const rightPanel = document.querySelector('.right-panel');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});
/////////////

////////////////
container.style.backgroundImage = "url('https://cdn.wallpapersafari.com/61/98/9YExRm.jpg')";
container.style.backgroundRepeat = "no-repeat";
container.style.backgroundSize = "cover";
container.style.position = "relative";
//////////////////////////////////////////////
let baseurl="backend URL/";
//let signup_btn= document.querySelector("#signup form");

 //signup_btn.addEventListener("submit", signupFun)
async function signup(){
try {
    // event.preventDefault();n
   
    let email=document.getElementById("email").value
      let name=document.getElementById("name").value
      let pass=document.getElementById("password").value;
      let mobileNumber=document.getElementById("phone").value;
      let city=document.getElementById("city").value;
      let age=document.getElementById("age").value;
      let obj={
        name,
        email,
        pass,
        mobileNumber,
        city,
        age
      }
      fetch(`${baseurl}/user/register`,{
          method:"POST",
          headers:{'content-type':'application/json'},
          body:JSON.stringify(obj)
      })
      .then(res=>res.json())
      .then((res)=>{
        localStorage.setItem('verify',res.token); 
          alert(res.msg);
          if(res.msg==="user already exist please Login!"){
           
          }else{
            window.location.href="./verifyOTP.html"
          }
          
      })
    }
 catch (error) {
    console.log(error)
    alert("Something going wrong")
}}
/////////////////

      
///////////////////

async function login(){
    try {
        // event.preventDefault();
        let email=document.getElementById("email-log").value
        let password=document.getElementById("password-log").value;
        let role=document.getElementById("role").value;
        let obj={
            email,
            password
            
        }
        //////////////////////
           let loginUrl;
      if (role === "user") {
  loginUrl = `${baseurl}/user/login`;
} else {
  loginUrl = `${baseurl}/user/lawyer-login`;
}
    
////////////////////////////
        
         await fetch(loginUrl,{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
              'content-type':'application/json'}
        })
        .then(res=>res.json())
        .then((res)=>{
            localStorage.setItem('key',res.token);
            localStorage.setItem('key1',res.Name);
            localStorage.setItem('userData',JSON.stringify(res.userData));
            alert(res.msg);
            if(res.msg==="sucessfully Login!"){
              if(res.role==="user"){
                window.location.href="../index.html"
              }else{
                window.location.href="../AdminPage/admin.html"
              }
              
            }else{
              alert("WRONG INPUT")
            }
        })
    
     }catch (error) {
        alert("Something going wrong")
    }
        
    }
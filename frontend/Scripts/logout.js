function savename() {
  
    window.location="./userlogin.html"
  }
  
  // let logout = document.getElementById("logout");
  let profile = document.getElementById("profile");
  
  
  let fullname = localStorage.getItem("name") || null;
  profile.innerHTML = fullname || "My Profile";
  
  let signupdiv = document.getElementById("signup-logout-btn");
  console.log(fullname)
  !fullname
    ? (signupdiv.innerHTML = `
  <button id="signup" class="signup"  onclick="savename()">Sign up</button>`)
    : (signupdiv.innerHTML = `<button id="logout" onclick="logout()" class="signup" >Log Out</button>`);
  let logoutbtn = document.getElementById("logout");
  
  function logout() {
  
    localStorage.removeItem("userData");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    profile.innerHTML = "My Profile";
    
    window.location.reload();
  }
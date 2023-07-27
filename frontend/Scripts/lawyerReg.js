let baseurl = "https://law-connect.onrender.com";
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    signup()
})


// You can now use the "userDetails" object to do further processing, such as sending the data to a server or performing validation.

// For demonstration purposes, let's display the user details in the console:
//console.log(userDetails);



async function signup() {
    try {
        //console.log(1)
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var bio = document.getElementById("bio").value;
        var gender = document.getElementById("gender").value;
        var experience = document.getElementById("experience").value;
        var languages = document.getElementById("languages").value;
        var address = document.getElementById("address").value;
        var image = document.getElementById("image").value;
        var number = document.getElementById("number").value;
        var price = document.getElementById("price").value;
        // Create an object to store the form details
        var lawyerDetails = {
            name: name,
            email: email,
            password: password,
            bio: bio,
            gender: gender,
            experience: experience,
            languages: languages,
            address: address,
            image: image,
            phone: number,
            price: price
        };
        console.log(lawyerDetails)
        fetch(`${baseurl}/lawyer/addLawyer`, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(lawyerDetails)
        })
            .then(res => res.json())
            .then((res) => {

                alert(res.msg);
                window.location.href = "./userlogin.html"


            })
    }
    catch (error) {
        console.log(error)
        alert("Something going wrong")
    }
}


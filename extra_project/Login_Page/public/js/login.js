//Getting elements of the form
let form = document.getElementById("form");

//A function that will handle submission of form
function handleSubmit() {
    //Get all form elements
    let username = document.getElementById("username").value,
        password = document.getElementById("password").value,
        pwdErr = document.querySelector(".pwdErr");

    //Get user info
    let obj = JSON.parse(localStorage.getItem(username)) || { username: "Not Found" };
    console.log(obj);

    //Check if user info matches the one in storage
    if ((obj.username === username) && obj.password === password) {
        //Login confirmation
        open("confirm_page.html");
        setTimeout(function () {
            location.reload();
        }, 5000);
    }
    else {
        // Tell the user enter login details again because they don't match
        pwdErr.style.color = "red";
        pwdErr.style.height = "1em";
        pwdErr.style.fontSize = "0.9em";
        pwdErr.textContent = "Incorrect password or username. Please try again";
        setTimeout(function () {
            pwdErr.style.color = "";
            pwdErr.style.height = "0px";
            pwdErr.style.fontSize = "0px";
            pwdErr.textContent = "";
        }, 5000);
    }
}

//An event listener to call handlesubmit function
form.addEventListener("submit", (eve) => {
    eve.preventDefault();
    handleSubmit();
});
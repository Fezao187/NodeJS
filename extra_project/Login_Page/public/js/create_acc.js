//Getting the form
let form = document.getElementById("form");

//Create a function that will handle submission of the form
function handleSubmit() {
    //Get all the values of the form
    let nameOfUser = document.getElementById("name").value,
        username = document.getElementById("username").value,
        email = document.getElementById("email").value,
        createPassword = document.getElementById("createPassword").value,
        confirmPassword = document.getElementById("confirmPassword").value,
        usernameErr = document.querySelector(".usernameErr"),
        output = document.querySelector(".output"),
        pwdErr = document.querySelectorAll(".pwdErr"),
        obj = {};

    //Get available user info for this username
    let tempObj = JSON.parse(localStorage.getItem(username)) || null;
    //Check if it exists
    if (tempObj === null) {
        if (createPassword === confirmPassword) {
            /**If our search for user returns nothing and passwords match, set the new
             * user info to object.
             */
            obj = {
                nameOfUser: nameOfUser,
                username: username,
                email: email,
                password: createPassword,
            }
            //Save to local storage
            localStorage.setItem(username, JSON.stringify(obj));
            output.style.color = "Green";
            output.style.height = "1em";
            output.style.fontSize = "0.9em";
            output.textContent = "Account created successfully";
            setTimeout(function () {
                location.reload();
            }, 5000);
        }
        else {
            //Tell the user enter password again because they don't match
            pwdErr.forEach(element => {
                element.style.color = "red";
                element.style.height = "1em";
                element.style.fontSize = "0.9em";
                element.textContent = "Passwords don't match, please try again!!!";
                setTimeout(function () {
                    element.style.color = "white";
                    element.style.height = "0px";
                    element.style.fontSize = "0px";
                    element.textContent = "";
                }, 5000);
            });
        }
    }
    else {
        usernameErr.style.color = "red";
        usernameErr.style.height = "1em";
        usernameErr.style.fontSize = "0.9em";
        usernameErr.textContent = "Username already exists";
        setTimeout(function () {
            usernameErr.style.color = "white";
            usernameErr.style.height = "0px";
            usernameErr.style.fontSize = "0px";
            usernameErr.textContent = "";
        }, 5000);
    }
}

//Add an event listener to the form
form.addEventListener("submit", (eve) => {
    eve.preventDefault();
    handleSubmit();
});
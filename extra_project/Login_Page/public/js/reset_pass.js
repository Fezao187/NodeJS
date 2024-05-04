//get the form element from html
let form = document.getElementById("form");

//A function to handle the submit
function handleSubmit() {
    //Get all form elements
    let email = document.getElementById("email").value,
        username = document.getElementById("username").value,
        newPassword = document.getElementById("newPassword").value,
        confirmPassword = document.getElementById("confirmPassword").value,
        usernameErr = document.querySelector(".usernameErr"),
        pwdErr = document.querySelectorAll(".pwdErr"),
        output = document.querySelector(".output"),
        //Get user info from localstorage
        obj = JSON.parse(localStorage.getItem(username)) || { username: "Not Found" };

    //Check if username exists
    if (obj.username == username) {
        /**If user exists, check if username and email match, then
         * let user change password.
         */
        if (obj.username === username && obj.email === email) {
            /**Then check if passwords match then let user change
             */
            if (newPassword === confirmPassword) {
                //set new password
                obj.password = confirmPassword;
                //Save to localstorage
                localStorage.setItem(username, JSON.stringify(obj));
                //Alert the user
                output.style.color = "Green";
                output.style.height = "1em";
                output.style.fontSize = "0.9em";
                output.textContent = "Password changed successfully";
                setTimeout(function () {
                    location.reload();
                }, 5000);
            }
            else {
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
            output.style.color = "red";
            output.style.height = "1em";
            output.style.fontSize = "0.9em";
            output.textContent = "User name and email don't match";
            setTimeout(function () {
                output.style.color = "white";
                output.style.height = "0px";
                output.style.fontSize = "0px";
                output.textContent = "";
            }, 5000);
        }
    }
    else {
        //If doesnt exist ouput message
        usernameErr.style.color = "Red";
        usernameErr.style.height = "1em";
        usernameErr.style.fontSize = "0.9em";
        usernameErr.textContent = "Username does not exist";
        setTimeout(function () {
            usernameErr.style.color = "white";
            usernameErr.style.height = "0px";
            usernameErr.style.fontSize = "0px";
            usernameErr.textContent = "";
        }, 5000);
    }
}

//An event listser to call the function
form.addEventListener("submit", (eve) => {
    //Prevent form submission
    eve.preventDefault();
    //Call the function
    handleSubmit();
})
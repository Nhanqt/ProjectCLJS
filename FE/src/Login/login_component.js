import { Login } from "../Login/login.js";
const app = document.getElementById("app");

const form = document.createElement("form");
form.classList.add("formInput");

const usernameInput = new Login("Username", "text");
const passwordInput = new Login("Password", "password");
form.appendChild(usernameInput.render());
form.appendChild(passwordInput.render());

const btnSubmit = document.createElement("button");
btnSubmit.classList.add("btnLogin");
btnSubmit.innerHTML = "Login Now";

const btnRegister = document.createElement("button");
btnRegister.classList.add("btnRegis");
btnRegister.innerHTML = "Register A New Account";

const line = document.createElement("p");
line.innerHTML = "__________________or__________________";

const btnGroup = document.createElement("div");
btnGroup.classList.add("btnGroup");
btnGroup.appendChild(btnSubmit);
btnGroup.appendChild(line);
btnGroup.appendChild(btnRegister);
form.appendChild(btnGroup);

btnSubmit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  usernameInput.setSuccessMessage("Look good!");
  passwordInput.setErrorMessage("This field cannot be empty!");
});
app.appendChild(form);

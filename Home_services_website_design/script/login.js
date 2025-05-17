window.addEventListener("load", () => {
  const main = document.querySelector("main");
  main.childNodes.forEach((node) => {
    if (node.id !== "form-container") node.remove();
  });
  
  checkLoginStatus();
});

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const showRegisterLink = document.getElementById("show-register");
const showLoginLink = document.getElementById("show-login");
const loginError = document.getElementById("login-error");
const registerError = document.getElementById("register-error");

showRegisterLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  loginError.style.display = "none";
});

showLoginLink.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  registerError.style.display = "none";
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^\d{10}$/.test(phone);
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registerError.style.display = "none";

  const name = document.getElementById("register-name").value.trim();
  const phone = document.getElementById("register-phone").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  if (!name) {
    registerError.textContent = "Please enter your name.";
    registerError.style.display = "block";
    return;
  }

  if (!isValidPhone(phone)) {
    registerError.textContent = "Phone number must be 10 digits.";
    registerError.style.display = "block";
    return;
  }

  if (!isValidEmail(email)) {
    registerError.textContent = "Enter a valid email address.";
    registerError.style.display = "block";
    return;
  }

  if (password.length < 6) {
    registerError.textContent = "Password must be at least 6 characters.";
    registerError.style.display = "block";
    return;
  }

  if (password !== confirmPassword) {
    registerError.textContent = "Passwords do not match.";
    registerError.style.display = "block";
    return;
  }

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const emailExists = existingUsers.some((user) => user.email === email);
  if (emailExists) {
    registerError.textContent = "Email already registered.";
    registerError.style.display = "block";
    return;
  }

  const newUser = { name, phone, email, password };
  existingUsers.push(newUser);
  localStorage.setItem("users", JSON.stringify(existingUsers));
  localStorage.setItem("currentUser", JSON.stringify({ name, email }));

  registerForm.innerHTML = `
    <h2 class="text-center text-success">Registration Successful!</h2>
    <p class="text-center">Redirecting to login...</p>
  `;
  
  setTimeout(() => {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    registerForm.reset();
  }, 2000);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginError.style.display = "none";

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const matchedUser = users.find((user) => user.email === email && user.password === password);

  if (matchedUser) {
    localStorage.setItem("currentUser", JSON.stringify({ 
      name: matchedUser.name, 
      email: matchedUser.email 
    }));
    
    updateNavbar(matchedUser.name);
    
    loginError.textContent = "Login successful!";
    loginError.style.color = "#28a745";
    loginError.style.display = "block";
    
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1500);
  } else {
    loginError.textContent = "Invalid email or password.";
    loginError.style.display = "block";
  }
});

function updateNavbar(username) {
  const loginNavItem = document.querySelector(".navbar-nav .nav-item:last-child");
  
  if (loginNavItem) {
    loginNavItem.innerHTML = `
      <div class="dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
          Hello, ${username}
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" id="logout-btn">Logout</a></li>
        </ul>
      </div>
    `;
    
    document.getElementById("logout-btn").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.href = "../index.html";
    });
  }
}

function checkLoginStatus() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    updateNavbar(currentUser.name);
    
    if (window.location.pathname.includes("login.html")) {
      window.location.href = "../index.html";
    }
  }
}
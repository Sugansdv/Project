document.addEventListener('DOMContentLoaded', function () {
    const loginToggle = document.getElementById('login-toggle');
    const registerToggle = document.getElementById('register-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginMessage = document.getElementById('login-message');
    const registerMessage = document.getElementById('register-message');

    loginToggle.addEventListener('click', () => {
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
      loginToggle.classList.add('active');
      registerToggle.classList.remove('active');
      clearMessage(loginMessage);
    });

    registerToggle.addEventListener('click', () => {
      registerForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      registerToggle.classList.add('active');
      loginToggle.classList.remove('active');
      clearMessage(registerMessage);
    });

    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('register-name').value.trim();
      const email = document.getElementById('register-email').value.trim();
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      clearMessage(registerMessage);

      if (!name || !email || !password || !confirmPassword) {
        showMessage(registerMessage, 'Please fill in all fields', 'error');
        return;
      }

      if (password !== confirmPassword) {
        showMessage(registerMessage, 'Passwords do not match', 'error');
        return;
      }

      if (password.length < 6) {
        showMessage(registerMessage, 'Password must be at least 6 characters', 'error');
        return;
      }

      if (!validateEmail(email)) {
        showMessage(registerMessage, 'Please enter a valid email address', 'error');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some((user) => user.email === email)) {
        showMessage(registerMessage, 'Email already registered', 'error');
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem('users', JSON.stringify(users));
      registerForm.reset();
      showMessage(registerMessage, 'Registration successful! Please login.', 'success');
      setTimeout(() => loginToggle.click(), 2000);
    });

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      clearMessage(loginMessage);

      if (!email || !password) {
        showMessage(loginMessage, 'Please enter both email and password', 'error');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        showMessage(loginMessage, `Welcome back, ${user.name}!`, 'success');
        sessionStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        showMessage(loginMessage, 'Invalid email or password', 'error');
      }
    });

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showMessage(el, msg, type) {
      el.textContent = msg;
      el.className = 'message ' + type + ' text-center mt-3';
      el.style.display = 'block';
    }

    function clearMessage(el) {
      el.textContent = '';
      el.className = 'message';
      el.style.display = 'none';
    }

    loginToggle.click();
  });
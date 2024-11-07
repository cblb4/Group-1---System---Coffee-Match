const registerButton = document.getElementById("showRegister");
const loginButton = document.getElementById("showLogin");
const container = document.getElementById("container");
const registerForm = document.querySelector(".register-container form");
const loginForm = document.getElementById("loginForm");

registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = registerForm.querySelector('input[type="text"]').value;
  const email = registerForm.querySelector('input[type="email"]').value;
  const password = registerForm.querySelector('input[type="password"]').value;

  const userData = { name, email, password };

  try {
    const response = await fetch('http://127.0.0.1:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.text();

    if (response.ok) {
      alert(result); 
      registerForm.reset();
    } else {
      alert('Error: ' + result); 
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error connecting to server');
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = loginForm.querySelector('input[type="email"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;

  const loginData = { email, password };

  try {
    const response = await fetch('http://127.0.0.1:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const result = await response.text();

    if (response.ok) {
      alert(result);
      window.location.href = "dashboard.html"; // Redirect to dashboard if login is successful
    } else {
      alert('Error: ' + result);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error connecting to server');
  }
});
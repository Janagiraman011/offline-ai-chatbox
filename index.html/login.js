function login(e) {
  e.preventDefault();

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    localStorage.setItem("loggedIn", "true");

    // ✅ Make sure file name is correct
    window.location.href = "Index1.html";
  } else {
    document.getElementById("errorMsg").textContent = "Invalid username or password!";
  }
}

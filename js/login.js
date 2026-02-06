document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if(res.ok){
      // Save user in localStorage (simple way)
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      if(data.user.role === "student"){
        window.location.href = "student-dashboard.html";
      } else if(data.user.role === "admin"){
        window.location.href = "admin-dashboard.html";
      }
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
});

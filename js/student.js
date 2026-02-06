// Get logged-in user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const list = document.getElementById("complaintList");
const msg = document.getElementById("message");

// Do NOT auto load complaints if no user
if (!user) {
  alert("Please login first");
}

// Load ONLY this student's complaints
async function loadComplaints() {
  try {
    const res = await fetch(
      `http://localhost:5000/api/complaints/student/${user._id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      }
    );

    const complaints = await res.json();
    list.innerHTML = "";

    // If no complaints yet
    if (complaints.length === 0) {
      list.innerHTML = "<li>No complaints yet</li>";
      return;
    }

    complaints.forEach(c => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";

      const statusClass =
        c.status === "Pending" ? "status-pending" : "status-resolved";

      li.innerHTML = `
        <div>
          <strong>${c.title}</strong><br>
          <small>${c.description}</small>
        </div>
        <span class="${statusClass}">${c.status}</span>
      `;

      list.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    alert("Error loading complaints");
  }
}

// Handle complaint form submission
document
  .getElementById("complaintForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    try {
      const res = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          studentId: user._id
        })
      });

      if (res.ok) {
        msg.style.color = "green";
        msg.innerText = "Complaint submitted successfully ✅";
        document.getElementById("complaintForm").reset();
        loadComplaints();
      } else {
        throw new Error();
      }
    } catch (err) {
      msg.style.color = "red";
      msg.innerText = "Failed to submit complaint ❌";
    }
  });

// Load complaints AFTER login
window.onload = loadComplaints;

async function loadAllComplaints() {
  try {
    const res = await fetch("http://localhost:5000/api/complaints/admin", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const complaints = await res.json();

    const list = document.getElementById("complaintList");
    list.innerHTML = "";

    complaints.forEach(c => {
      const li = document.createElement("li");
      li.className = "list-group-item";

      // Status badge
      const statusClass = c.status === "Pending" ? "status-pending" : "status-resolved";

      li.innerHTML = `
        <span>StudentID: ${c.studentId} | Title: ${c.title}</span>
        <span class="${statusClass}">${c.status}</span>
        ${c.status === "Pending" ? `<button class="btn btn-sm btn-success float-end">Resolve</button>` : ""}
      `;

      list.appendChild(li);

      // Click event for "Resolve"
      const btn = li.querySelector("button");
      if (btn) {
        btn.addEventListener("click", async () => {
          await fetch(`http://localhost:5000/api/complaints/${c._id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Resolved" })
          });
          loadAllComplaints(); // refresh list
        });
      }
    });
  } catch (err) {
    console.error(err);
    alert("Error loading complaints");
  }
}

window.onload = loadAllComplaints;

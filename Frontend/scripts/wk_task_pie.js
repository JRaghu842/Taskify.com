let Table = document.getElementById("Table");

Table.addEventListener("click", () => {
  window.location.href = "../pages/wk_task_tab.html";
});

let Kanban = document.getElementById("kanban");

Kanban.addEventListener("click", () => {
  window.location.href = "../pages/wk_task.html";
});

let Gantt = document.getElementById("Gantt");

Gantt.addEventListener("click", () => {
  window.location.href = "../pages/wk_task_chart.html";
});

let Pie = document.getElementById("pie");

Pie.addEventListener("click", () => {
  window.location.href = "../pages/wk_task_pie.html";
});

// start---------------------------

function createChart() {
  fetch("https://zany-lime-swordfish-cuff.cyclic.app/tasks", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const labels = ["completed", "in_progress", "stuck"];
      const tasks = data.tasks;
      const counts = [
        tasks.filter((task) => task.status == "completed").length,
        tasks.filter((task) => task.status == "in_progress").length,
        tasks.filter((task) => task.status == "stuck").length,
      ];
      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Tasks based on Status",
              data: counts,
              backgroundColor: [
                "rgba(1, 200, 117, 0.9)",
                "rgba(253, 171, 61, 0.9)",
                "rgba(226, 68, 91, 0.9)",
              ],
              borderColor: [
                "rgba(1, 200, 117, 1)",
                "rgba(253, 171, 61, 1)",
                "rgba(226, 68, 91, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          barThickness: 130,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
createChart();

//  end--------------------------

let hmpgredirect = document.getElementById("hmpgredirect");

hmpgredirect.addEventListener("click", () => {
  window.location.href = "../index.html";
});

let logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  alert("Logout Successful");
  window.location.href = "../index.html";
});

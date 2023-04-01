//  add add add add

let form1 = document.getElementById("add");

form1.addEventListener("submit", (e) => {
  e.preventDefault();
  let payload = {
    board: document.getElementById("board").value,
    task: document.getElementById("task").value,
    person_allocated: document.getElementById("person_allocated").value,
    p_email: document.getElementById("p_email").value,
    status: document.getElementById("status").value,
    start_date: document.getElementById("start_date").value,
    end_date: document.getElementById("end_date").value,
    extra: document.getElementById("extra").value,
  };

  fetch("http://localhost:8420/tasks/add", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      alert("New task is added");
      getData();
    })
    .catch((err) => console.log(err));
});

//  get get get get

let container = document.getElementById("maincontainer");

let getData = () => {
  fetch("http://localhost:8420/tasks", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let arr = res.tasks;
      let disp = displayData(arr);
      container.innerHTML = disp;
      //   updateUser();
      //   deleteUser();
    })
    .catch((err) => console.log(err));
};
getData();

// function displayData(data) {
//   data.sort((a, b) => {
//     const order = ["stuck", "in_progress", "completed"];
//     return order.indexOf(a.status) - order.indexOf(b.status);
//   });

//   let ans = data.map((el, i) => {
//     let startDate = new Date(el.start_date).toLocaleDateString();
//     let endDate = new Date(el.end_date).toLocaleDateString();
//     let cardClass = "";
//     let statusDivClass = "";
//     switch (el.status) {
//       case "completed":
//         cardClass = "green";
//         statusDivClass = "statusdiv-green";
//         break;
//       case "stuck":
//         cardClass = "red";
//         statusDivClass = "statusdiv-red";
//         break;
//       case "in_progress":
//         cardClass = "yellow";
//         statusDivClass = "statusdiv-yellow";
//         break;
//     }
//     return `<div class="card ${cardClass}">
//                     <div id="statusdiv" class="${statusDivClass}">
//                       <p id = "statid">${el.status}</p>
//                     </div>
//                     <h4> Board name: ${el.board}</h4>
//                     <p> Task name: ${el.task}</p>
//                     <p> Person: ${el.person_allocated}</p>
//                     <p> P Email: ${el.p_email}</p>
//                     <p> Start date: ${startDate}</p>
//                     <p> End date: ${endDate}</p>
//                     <p> comments: ${el.extra}</p>
//                     <div class="card-btn">
//                         <button class="updatebtn" data-id=${el._id}> Update</button>
//                         <button class="deletebtn" data-id=${el._id}> Delete</button>
//                     </div>
//                 </div>`;
//   });
//   return ans.join(" ");
// }

function displayData(data) {
  data.sort((a, b) => {
    const order = ["stuck", "in_progress", "completed"];
    return order.indexOf(a.status) - order.indexOf(b.status);
  });

  let tableRows = data.map((el, i) => {
    let startDate = new Date(el.start_date).toLocaleDateString();
    let endDate = new Date(el.end_date).toLocaleDateString();
    let statusClass = "";
    switch (el.status) {
      case "completed":
        statusClass = "green";
        break;
      case "stuck":
        statusClass = "red";
        break;
      case "in_progress":
        statusClass = "yellow";
        break;
    }
    return `<tr>
                <td>${el.board}</td>
                <td>${el.task}</td>
                <td>${el.person_allocated}</td>
                <td>${el.p_email}</td>
                <td>${startDate}</td>
                <td>${endDate}</td>
                <td>${el.extra}</td>
                <td><span class="status ${statusClass}">${el.status}</span></td>
                <td>
                  <button class="updatebtn" data-id=${el._id}>Update</button>
                  <button class="deletebtn" data-id=${el._id}>Delete</button>
                </td>
              </tr>`;
  });

  return `<table>
              <thead>
                <tr>
                  <th>Board</th>
                  <th>Task</th>
                  <th>Person</th>
                  <th>P Email</th>
                  <th>Start date</th>
                  <th>End date</th>
                  <th>Comments</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows.join("")}
              </tbody>
            </table>`;
}

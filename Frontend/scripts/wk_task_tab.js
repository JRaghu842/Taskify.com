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

  fetch("https://zany-lime-swordfish-cuff.cyclic.app/tasks/add", {
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
  fetch("https://zany-lime-swordfish-cuff.cyclic.app/tasks", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let arr = res.tasks;
      let disp = displayDatatab(arr);
      container.innerHTML = disp;
      updateUser();
      deleteUser();
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
//         cardClass = "kgreen";
//         statusDivClass = "statusdiv-green";
//         break;
//       case "stuck":
//         cardClass = "kred";
//         statusDivClass = "statusdiv-red";
//         break;
//       case "in_progress":
//         cardClass = "kyellow";
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

// table format.......................//

function displayDatatab(data) {
  // data.sort((a, b) => {
  //   const order = ["stuck", "in_progress", "completed"];
  //   return order.indexOf(a.status) - order.indexOf(b.status);
  // });

  let tableRows = data.map((el, i) => {
    let startDate = new Date(el.start_date).toLocaleDateString();
    let endDate = new Date(el.end_date).toLocaleDateString();
    let statusClass = "";
    switch (el.status) {
      case "completed":
        statusClass = "tgreen";
        break;
      case "stuck":
        statusClass = "tred";
        break;
      case "in_progress":
        statusClass = "tyellow";
        break;
    }
    return `<tr>
                <td>${el.board}</td>
                <td>${el.task}</td>
                <td>${el.person_allocated}</td>
                <td>${el.p_email}</td>
                <td>${startDate}</td>
                <td>${endDate}</td>
                <td class="${statusClass}">${el.status}</td>
                <td>${el.extra}</td>
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
                  <th>Status</th>
                  <th>Comments</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows.join("")}
              </tbody>
            </table>`;
}

// table format end-------------------//

// get-perticular update - update update

function updateUser() {
  let cardBtn = document.querySelectorAll(".updatebtn");
  for (let btn of cardBtn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      let id = e.target.dataset.id;
      fetch(`https://zany-lime-swordfish-cuff.cyclic.app/tasks/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          document.getElementById("up_board").value = res[0].board;
          document.getElementById("up_task").value = res[0].task;
          document.getElementById("up_person_allocated").value =
            res[0].person_allocated;
          document.getElementById("up_p_email").value = res[0].p_email;
          document.getElementById("up_status").value = res[0].status;
          document.getElementById("up_start_date").value = res[0].start_date;
          document.getElementById("up_end_date").value = res[0].end_date;
          document.getElementById("up_extra").value = res[0].extra;
          idt = document.getElementById("idt");
          idt.textContent = res[0]._id;
        })
        .catch((err) => console.log(err));
    });
  }
}

// Real Update update

let form2 = document.getElementById("update");

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  updatefn();
});
function updatefn() {
  let newPayload = {
    board: document.getElementById("up_board").value,
    task: document.getElementById("up_task").value,
    person_allocated: document.getElementById("up_person_allocated").value,
    p_email: document.getElementById("up_p_email").value,
    status: document.getElementById("up_status").value,
    start_date: document.getElementById("up_start_date").value,
    end_date: document.getElementById("up_end_date").value,
    extra: document.getElementById("up_extra").value,
  };
  let idt = document.getElementById("idt").innerText;
  fetch(`https://zany-lime-swordfish-cuff.cyclic.app/tasks/update/${idt}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(newPayload),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      console.log(idt);
      alert("Task is updated");
      getData();
    })
    .catch((err) => console.log(err));
}
// delete delete delete delete

function deleteUser() {
  let cardBtnn = document.querySelectorAll(".deletebtn");
  for (let btn of cardBtnn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      let id = e.target.dataset.id;
      fetch(`https://zany-lime-swordfish-cuff.cyclic.app/tasks/delete/${id}`, {
        method: "delete",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          alert("Task is deleted");
          getData();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}

let Kanban = document.getElementById("kanban");

Kanban.addEventListener("click", () => {
  window.location.href = "../pages/wk_task.html";
});

// filter by board -------------------//

let formA = document.getElementById("filterByBoard");

formA.addEventListener("submit", (e) => {
  e.preventDefault();

  let fboard = document.getElementById("filterBoard").value;

  fetch(`https://zany-lime-swordfish-cuff.cyclic.app/tasks?board=${fboard}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let arr = res.tasks;
      let disp = displayDatatab(arr);
      container.innerHTML = disp;
    })
    .catch((err) => {
      console.log(err);
    });
});

//filter by person's name----------------------//

let formB = document.getElementById("filterByName");

formB.addEventListener("submit", (e) => {
  e.preventDefault();

  let fname = document.getElementById("filtername").value;

  fetch(
    `https://zany-lime-swordfish-cuff.cyclic.app/tasks?person_allocated=${fname}`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let arr = res.tasks;
      let disp = displayDatatab(arr);
      container.innerHTML = disp;
    })
    .catch((err) => {
      console.log(err);
    });
});

// filter by status--------------//

let filterByStatus = document.getElementById("filterByStatus");

filterByStatus.addEventListener("change", () => {
  let filterByStatusV = filterByStatus.value;
  if (filterByStatusV == "") {
    getData();
  } else {
    fetch(
      `https://zany-lime-swordfish-cuff.cyclic.app/tasks?status=${filterByStatusV}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let arr = res.tasks;
        let disp = displayDatatab(arr);
        container.innerHTML = disp;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// search by any thing ---------------------------//

let formC = document.getElementById("searchany");
formC.addEventListener("submit", (e) => {
  e.preventDefault();
  let fsearch = document.getElementById("search").value;
  fetch(
    `https://zany-lime-swordfish-cuff.cyclic.app/tasks?search=${fsearch}&fields=person_allocated,board,task,p_email`,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      let arr = res.tasks;
      let disp = displayDatatab(arr);
      container.innerHTML = disp;
    })
    .catch((err) => {
      console.log(err);
    });
});

// sort by status----------------------------//

let sortByStatus = document.getElementById("sortBystatus");

sortByStatus.addEventListener("change", () => {
  let sortByStatusValue = sortByStatus.value;
  if (sortByStatusValue == "") {
    getData();
  } else if (sortByStatusValue == "lowToHigh") {
    let containersortSts = document.getElementById("maincontainer");

    fetch("https://zany-lime-swordfish-cuff.cyclic.app/tasks", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let arr = res.tasks;
        arr.sort((a, b) => {
          const order = ["stuck", "in_progress", "completed"];
          return order.indexOf(a.status) - order.indexOf(b.status);
        });
        let disp = displayDatatab(arr);
        containersortSts.innerHTML = disp;
      })
      .catch((err) => console.log(err));
  } else if (sortByStatusValue == "HighToLow") {
    let containersortSts = document.getElementById("maincontainer");

    fetch("https://zany-lime-swordfish-cuff.cyclic.app/tasks", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let arr = res.tasks;
        arr.sort((a, b) => {
          const order = ["completed", "in_progress", "stuck"];
          return order.indexOf(a.status) - order.indexOf(b.status);
        });
        let disp = displayDatatab(arr);
        containersortSts.innerHTML = disp;
      })
      .catch((err) => console.log(err));
  }
});

// sort by start date-------------------------//

let sortByStartdate = document.getElementById("sortByStartdate");

sortByStartdate.addEventListener("change", () => {
  let sortByStartdateV = sortByStartdate.value;

  if (sortByStartdateV == "") {
    getData();
  } else if (sortByStartdateV == "lowToHighSD") {
    fetch(
      `https://zany-lime-swordfish-cuff.cyclic.app/tasks?sortbyasc=start_date`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let arr = res.tasks;
        let disp = displayDatatab(arr);
        container.innerHTML = disp;
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (sortByStartdateV == "HighToLowSD") {
    fetch(
      `https://zany-lime-swordfish-cuff.cyclic.app/tasks?sortbydesc=start_date`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        let arr = res.tasks;
        let disp = displayDatatab(arr);
        container.innerHTML = disp;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// all functionalities done---------------------------------------//

// redirect to chart page-----------//

let Gantt = document.getElementById("Gantt");

Gantt.addEventListener("click", () => {
  window.location.href = "../pages/wk_task_chart.html";
});

// redirect to pie page-----------//

let Pie = document.getElementById("pie");

Pie.addEventListener("click", () => {
  window.location.href = "../pages/wk_task_pie.html";
});

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

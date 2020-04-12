const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
];

(function (arrOfTasks) {
  //* 1. обьект массива
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  const themes = {
    default: {
      "--li-bg-color": "rgba(0, 123, 255, 0.25)",
      "--base-text-color": "#212529",
      "--header-bg": "#007bff",
      "--header-text-color": "#fff",
      "--default-btn-bg": "#007bff",
      "--default-btn-text-color": "#fff",
      "--default-btn-hover-bg": "#0069d9",
      "--default-btn-border-color": "#0069d9",
      "--danger-btn-bg": "#dc3545",
      "--danger-btn-text-color": "#fff",
      "--danger-btn-hover-bg": "#bd2130",
      "--danger-btn-border-color": "#dc3545",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#80bdff",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
    },
    dark: {
      "--li-bg-color": "rgba(88, 97, 107, 1)",
      "--base-text-color": "#212529",
      "--header-bg": "#343a40",
      "--header-text-color": "#fff",
      "--default-btn-bg": "#58616b",
      "--default-btn-text-color": "#fff",
      "--default-btn-hover-bg": "#292d31",
      "--default-btn-border-color": "#343a40",
      "--default-btn-focus-box-shadow":
        "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
      "--danger-btn-bg": "#b52d3a",
      "--danger-btn-text-color": "#fff",
      "--danger-btn-hover-bg": "#88222c",
      "--danger-btn-border-color": "#88222c",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#78818a",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
    },
    light: {
      "--li-bg-color": "rgba(198, 198, 198, .5)",
      "--base-text-color": "#212529",
      "--header-bg": "#fff",
      "--header-text-color": "#212529",
      "--default-btn-bg": "#fff",
      "--default-btn-text-color": "#212529",
      "--default-btn-hover-bg": "#e8e7e7",
      "--default-btn-border-color": "#343a40",
      "--default-btn-focus-box-shadow":
        "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
      "--danger-btn-bg": "#f1b5bb",
      "--danger-btn-text-color": "#212529",
      "--danger-btn-hover-bg": "#ef808a",
      "--danger-btn-border-color": "#e2818a",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#78818a",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
    },
  };
  //* не дает менять в холостую селект при отмене
  let lastSelectedTheme = localStorage.getItem("app_them") || "default";

  //! elements UI
  const listContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];
  const themeSelect = document.querySelector("#themeSelect");
  const btnAllTasks = document.querySelector(".btn-all-tasks");
  const btnCompletedTasks = document.querySelector(".btn-completed-tasks");

  //! events
  setTheme(lastSelectedTheme);
  renderAllTasks(objOfTasks);
  //* 2. Рендер всех задач на страницу. Вызов вверху. Для удобства читения.
  function renderAllTasks(tasksList) {
    if (!tasksList) {
      taskListIsEmpty();
      return;
    }

    let fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.append(li);
    });

    listContainer.append(fragment);
  }

  // * список задач пуст
  function taskListIsEmpty() {
    let div = document.createElement("div");
    if (Object.keys(objOfTasks).length == 0) {
      div.textContent = "No tasks";
      div.style.textAlign = "center";
      div.classList.add("div-del");
      listContainer.append(div);
      return;
    }

    if (!Object.keys(objOfTasks).length == 0) {
      let divRemove = document.querySelector(".div-del");
      if (!divRemove) return;
      divRemove.remove();
    }
  }

  form.addEventListener("submit", onFormSubmitHandler);
  //* событие на удаление таски
  listContainer.addEventListener("click", onListContainerDeleteHandler);
  //* событие на смену темы
  themeSelect.addEventListener("change", onThemeSelectHandler);
  //* событие на checkbox
  listContainer.addEventListener("click", swithsCheckbox);
  //* событие на AllTasks
  btnAllTasks.addEventListener("click", showAllTaks);
  //* событие на ComplatedTasks
  btnCompletedTasks.addEventListener("click", showCompletedTasks);

  //* Создает дом элемент для рендера задач
  function listItemTemplate({ _id, title, body, completed }) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2",
      "li-del"
    );
    li.dataset.taskId = _id;

    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";
    span.classList.add("col-11");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");

    const checkBtn = document.createElement("INPUT");
    checkBtn.setAttribute("type", "checkbox");
    checkBtn.classList.add("ml-auto", "checkBtn");
    checkBtn.checked = completed;
    changeCheckboxClass(completed, li);

    const article = document.createElement("p");
    article.textContent = body;
    article.classList.add("mt-2", "w-100");

    li.append(span);
    li.append(checkBtn);
    li.append(article);
    li.append(deleteBtn);

    return li;
  }

  //* событие формы (добавить)
  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !titleValue) {
      alert("Введите title и body");
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.prepend(listItem);
    form.reset();
    taskListIsEmpty();
  }

  //* функция добавления
  function createNewTask(title, body) {
    const nevTask = {
      _id: `task-${Math.random()}`,
      completed: false,
      title,
      body,
    };

    objOfTasks[nevTask._id] = nevTask;

    return { ...nevTask };
  }

  //* функция удаления
  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Удалить: '${title}'`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  //* удаление таски со страницы
  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  //* событие кноки (удалить)
  function onListContainerDeleteHandler({ target }) {
    if (target.classList.contains("delete-btn")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
      taskListIsEmpty();
    }
  }

  //* событие селекта (смена темы)
  function onThemeSelectHandler(e) {
    const selectedTheme = themeSelect.value;
    const isConfirmend = confirm(
      `Вы желаете сменить текущую тему на ${selectedTheme}?`
    );
    if (!isConfirmend) {
      themeSelect.value = lastSelectedTheme;
      return;
    }
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem("app_them", selectedTheme);
  }

  //* функция смены темы
  function setTheme(name) {
    const selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }

  //* событие checkbox
  function swithsCheckbox({ target }) {
    if (target.classList.contains("checkBtn")) {
      const checkLi = target.closest(".li-del");
      const checkChecked = target.checked;
      changeCheckboxClass(checkChecked, checkLi);

      checkObjCompleted(checkChecked, checkLi);
    }
  }

  //* фуеция меняет Obj.completed
  function checkObjCompleted(checked, target) {
    const getIdLi = target.getAttribute("data-task-id");

    const changeCheckboxInObj = Object.values(objOfTasks).filter((task) => {
      return task._id == getIdLi;
    });
    changeCheckboxInObj.forEach((elem) => {
      elem.completed = checked;
    });
  }

  //* функция смены класса checkbox
  function changeCheckboxClass(checked, li) {
    if (!checked) {
      li.classList.remove("check-li");
      li.classList.add("check-li-no");
      return;
    }
    li.classList.remove("check-li-no");
    li.classList.add("check-li");
  }

  //* функция показывает все задачи showAllTaks
  function showAllTaks(e) {
    const listUl = document.querySelector(".list-group");
    while (listUl.firstChild) {
      listUl.removeChild(listUl.firstChild);
    }
    renderAllTasks(objOfTasks);
  }

  //* функция показывает выполненные задачи showCompletedTasks
  function showCompletedTasks(e) {
    const listUl = document.querySelector(".list-group");
    while (listUl.firstChild) {
      listUl.removeChild(listUl.firstChild);
    }

    let objectComplate = Object.values(objOfTasks).filter((item) => {
      return item.completed == true;
    });

    renderAllTasks(objectComplate);
  }

  //* рендер выполненных tasks
  function renderCompletedTasks(tasksList) {
    const fragmentComplateTasks = document.createDocumentFragment();
  }
})(tasks);

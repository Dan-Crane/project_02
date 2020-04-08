const tasks = [
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body: " non id anim.\r\n",
    title: "Deserunt laborum",
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
  let lastSelectedTheme = "default";

  //! elements UI
  const listContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];
  const themeSelect = document.querySelector("#themeSelect");

  //! events
  renderAllTasks(objOfTasks);
  //* 2. Рендер всех задач на страницу. Вызов вверху. Для удобства читения.
  function renderAllTasks(tasksList) {
    if (!tasksList) {
      taskListIsEmpty();
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.append(li);
    });

    listContainer.append(fragment);
  }

  //! * список задач пуст
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
      let divRemove = document.querySelector(".div-del")
      if (!divRemove) return
      divRemove.remove();
    }
  }

  form.addEventListener("submit", onFormSubmitHandler);
  //* событие на удаление таски
  listContainer.addEventListener("click", onListContainerDeleteHandler);
  //*событие на смену темы
  themeSelect.addEventListener("change", onThemeSelectHandler);

  //* Создает дом элемент для рендера задач
  function listItemTemplate({ _id, title, body }) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
    li.dataset.taskId = _id;

    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");

    const article = document.createElement("p");
    article.textContent = body;
    article.classList.add("mt-2", "w-100");

    li.append(span);
    li.append(deleteBtn);
    li.append(article);

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
  }

  //* функция смены темы
  function setTheme(name) {
    const selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
})(tasks);

export async function getAllBoards() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}boards`);

    if (!res.ok) throw new Error("Failed to fetch the boards");

    const data = await res.json();
    return data.data.boards;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getBoard(id) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}boards/${id}`);

    if (!res.ok) throw new Error("Failed to fetch the board");

    const data = await res.json();

    return data.data.board;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getBoardLinks() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}boards/boardLinks`);

    if (!res.ok) throw new Error("Failed to fetch the boards");

    const data = await res.json();

    return data.data.boards;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getColumnsInfo(id) {
  try {
    if (!id) return null;
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}boards/${id}/columnInfo`
    );

    if (!res.ok) throw new Error("Failed to fetch the boards");

    const data = await res.json();

    return data.data.board;
  } catch (err) {
    console.log(err.message);
  }
}

export async function createNewTask({ columnId, task }) {
  try {
    if (!columnId) return null;
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}tasks/create-task/${columnId}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    if (!res.ok) throw new Error("Failed to post the task");

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function deleteTask(columnId, taskId) {
  try {
    if (!columnId || !taskId) return null;
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}tasks/update-task/${columnId}/${taskId}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Failed to delete the task");

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function createNewBoard(board) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}boards`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(board),
    });

    if (!res.ok) throw new Error("Failed to fetch the boards");

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateBoard(board) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}boards/${board._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(board),
      }
    );

    const data = await res.json();
    console.log(data);
    return data.data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateSubtask(taskId, subtaskId, body) {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }tasks/update-subtask/${taskId}/${subtaskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    return data.data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateTaskColumn({ columnId, taskId, destinationId }) {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }tasks/change-column/${columnId}/${taskId}/${destinationId}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function deleteBoard(id) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}boards/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    if (!response.ok)
      throw new Error("Something went wrong with board deletion");

    console.log(response);
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateTask({ task }) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}tasks/update-task/${task._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err.message);
  }
}

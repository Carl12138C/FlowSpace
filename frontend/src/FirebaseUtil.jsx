export async function RegisterData(uid) {
  setter(uid, "registerdata");
}
export async function getUserData(uid) {
  return await getter(uid, "getuserdata");
}
export async function updateUserTask(uid, tasklist) {
  if (!Array.isArray(tasklist)) {
    console.log("tasklist is not an array!");
    return;
  }
  setter(uid, "updatetask", tasklist, false);
}
export async function getUserTask(uid) {
  return await getter(uid, "getusertask");
}

async function getter(uid, route) {
  try {
    const response = await fetch(
      import.meta.env.VITE_SERVER +
        "/firebase/" +
        route +
        "?" +
        new URLSearchParams({ uid: uid })
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function setter(uid, route, data = "", isPost = true) {
  try {
    var body = { uid: uid };
    if (data != "") {
      body.data = data;
    }
    var method = "POST";
    if (!isPost) {
      method = "PUT";
    }
    const response = await fetch(
      import.meta.env.VITE_SERVER + "/firebase/" + route,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Accept-type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  } catch (error) {
    console.log(error);
  }
}

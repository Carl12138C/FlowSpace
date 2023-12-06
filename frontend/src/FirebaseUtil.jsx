export async function getUserData(uid) {
  return await getter({uid:uid}, "getuserdata");
}
export async function updateUserTask(uid, tasklist) {
  if (!Array.isArray(tasklist)) {
    console.log("tasklist is not an array!");
    return;
  }
  setter({uid:uid}, "updatetask", tasklist, false);
}
export async function getUserTask(uid) {
  return await getter({uid:uid}, "getusertask");
}

async function getter(data, route) {
  try {
    const response = await fetch(
      import.meta.env.VITE_SERVER +
        "/firebase/" +
        route +
        "?" +
        new URLSearchParams(data)
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

async function setter(params, route, data = "", isPost = true) {
  try {
    var body = params;
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

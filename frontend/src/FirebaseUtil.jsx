export async function fbGetFriendRequest(uid) {
    return await getter({ uid: uid }, "friendrequest");
}

export async function fbSendFriendRequest(uid, username, friendName) {
    return setter(uid, "friends/request", {
        username: username,
        uid: uid,
        friendName: friendName,
    });
}

export async function fbAcceptFriendRequest(uid, username, friendUid, friendName) {
    return setter(uid, "friends/accept", {
        uid: uid,
        username: username,
        friendUid: friendUid,
        friendName: friendName,
    });
}

export async function getFriends(uid) {
    return await getter({ uid: uid }, "friends");
}

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

async function getter(data, route) {
    try {
        const response = await fetch(
            import.meta.env.VITE_SERVER +
                "/firebase/" +
                route +
                "?" +
                new URLSearchParams(data)
        );
        if(response.status == 204) {
            return {data: null};
        }
        if (response.ok) {
            return await response.json();
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
        return response;
    } catch (error) {
        console.log(error);
    }
}


export async function RegisterData(uid){
    try{
        const body = {uid : uid}
        const response = await fetch(import.meta.env.VITE_SERVER + "/firebase/registerdata",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept-type": "application/json",
            },
            body: JSON.stringify(body),
        })
    }
    catch(error){
        console.log(error);
    }
}
export async function getData(uid){
    try{
        const response = await fetch(import.meta.env.VITE_SERVER + "/firebase/getdata?" + new URLSearchParams({uid: uid}));
        if(response.ok){
            const data = await response.json();
           return data;
        }
    }
    catch(error){
        console.log(error);
    }
}
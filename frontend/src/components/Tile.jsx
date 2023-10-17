import React from "react";

function Tile({name, tid, size})  {

    return(
        <>
            <p>{name}</p>
            <p>{tid}</p>
            <p>{size}</p>
        </>
    )
}

export default Tile
import React from 'react'

const Test = ()=>{

    const handleChange = (e)=>{

        var [hh,mm] = e.target.value.split(":")

        console.log(parseInt(hh)+parseInt(mm))

        console.log(e.target.value.split(":")[0])
    }

    return(
        <div>
            <input type = "date" onChange={handleChange}/>
            <input type = "time" onChange={handleChange}/>
        </div>
    )
}

export default Test
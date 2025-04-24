import React, { useState, useEffect } from 'react';

function FunctionalComponent() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('Count updated:', count);
    }, [count]);

    return (<div>
        <h2 > Functional Component </h2> 
        <p > Count: {count} </p> 
        <button onClick={()=>{setCount(count+1)}} > Increment 
            </button> 
        </div>);
}

export default FunctionalComponent;
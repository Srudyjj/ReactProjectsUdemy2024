import { memo } from "react";


function Child({ prop }) {


  console.log("Child is re-rendering");
  

  return (
    <div>
      <h1>{prop}</h1>
    </div>
  )
}

export default memo(Child)
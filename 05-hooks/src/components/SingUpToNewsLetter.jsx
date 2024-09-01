import { useEffect, useRef, useState } from "react"


export default function SingUpToNewsLetter() {

  const [email, setEmail] = useState("");
  const inputElement = useRef(null);

  const handleClick = () => {
    if(!email) {
      inputElement.current.style.border = "5px solid red";
      inputElement.current.focus();
    }
  }

  useEffect(() => {
    if(email) {
      inputElement.current.style.border = "none";
    }
  }, [email])

  console.log("The component is rerendering");

  return (
    <div>
      <input
        ref={inputElement}
        type="email"
        placeholder="Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleClick}>Sing up to news letter</button>
    </div>
  )
}

import { useState } from "react";
import { useSearchParams } from 'react-router-dom';

import "../App.css";

function Header({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [_, setSearchParams] = useSearchParams()

  const handleClick = () => {
    handleSearch(searchTerm)
    if (setSearchTerm) {
      setSearchParams({
        search: searchTerm
      })
    }
    setSearchTerm("")
  }


  return (
    <header className="main_header">
      <div className="text-container">
        <h1 className="header-title">
          Look for <span>Banger</span> Food
        </h1>
        <p className="header-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Facere numquam debitis repudiandae illum eum?
          Et nesciunt impedit reiciendis accusantium corrupti.
        </p>
        <div className="header-input-container">
          <input type="text" placeholder='Find a recipe...'
            onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
          <button onClick={handleClick} >Search</button>
        </div>
      </div>
      <img src="https://hips.hearstapps.com/hmg-prod/images/how-to-make-french-toast-1589827448.jpg?crop=0.734xw:0.490xh;0.0897xw,0.323xh&resize=1200:*" alt="" className="main_img" />
    </header>
  )
}

export default Header
import React, { useState } from "react";
import facade from "../apiFacade";
function CreateBoat() {

const [boat, setBoat] = useState(null);

    const onChange = (evt) => {
    setBoat({
      ...boat,
      [evt.target.id]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    facade.createBoat(boat)
    .then((res) => {
       console.log(res)
      })
      .catch((err) => {
        console.log(err);
        if (err.status) {
          err.fullError.then((e) => {
            console.log(e.code + ": " + e.message);
          });
        } else {
          console.log("Network error");
        }
      });

    //redirects user to home page
  };
    return (  <div className="form-container">
<h1 className="text-center mt-3">Register a new boat</h1>
      <form  onChange={onChange} class="register-form">
       
        <label>Brand</label>
        <input
          id="brand"
          className="form-field"
          type="text"
        />
      
        <label>Make</label>
        <input
          id="make"
          className="form-field"
          type="text"
        />
       
        <label>Name</label>
        <input
          id="name"
          className="form-field"
          type="text"
        />
     <label>Image url</label>
        <input
          id="image"
          className="form-field"
          type="text"
        />
        <button onClick={handleSubmit} className="form-field btn-dark" type="submit">
          Add boat
        </button>
      </form>
    </div> );
}

export default CreateBoat;
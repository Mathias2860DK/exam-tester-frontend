import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import BoatTable from "./BoatTable";
import OverviewModal from "./OverviewModal";

function Overview() {
    const defaultBoats = []
    let userList = [1,2,3]
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [allInfo, setAllInfo] = useState(null)
     const [boats, setBoats] = useState(...[defaultBoats]);
     const[boatId, setBoatId] = useState(-1);

     const [show, setShow] = useState(false);
       const [submitModal, setSubmitModal] = useState(false);


    useEffect(() => {
      facade
        .getAllBoats()
        .then((res) => {
setBoats(res)
console.log(res)

        })
        .catch((err) => {
          console.log(err);
          if (err.status) {
            err.fullError.then((e) => {
              console.log(e.code + ": " + e.message);
              setSuccess(false);
              setError(e.message);
            });
          } else {
            console.log("Network error");
          }
        });

        
    }, [])

    

     useEffect(() => {
       facade
         .getAllBoats()
         .then((res) => {
           setBoats(res);
           console.log(res);
         })
         .catch((err) => {
           console.log(err);
           if (err.status) {
             err.fullError.then((e) => {
               console.log(e.code + ": " + e.message);
               setSuccess(false);
               setError(e.message);
             });
           } else {
             console.log("Network error");
           }
         });
     }, [submitModal]);

     const changeSubmit = () => {
         setSubmitModal(!submitModal);
     }

    let allInfoTest = {dummy1 : 1,
    dummy2 : "hej"}
  return (
    <>
        <BoatTable list={boats} setBoatId={setBoatId} setShow={setShow} />
      {show ? (
        <OverviewModal
          item={allInfoTest}
          boatId={boatId}
          setShow={setShow}
          show={show}
          changeSubmit={changeSubmit}
        />
      ) : (
        ""
      )}
    </>
  );

}

export default Overview;

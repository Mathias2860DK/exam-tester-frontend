import React, { useState, useEffect } from "react";
import facade from "../apiFacade";
import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
function OverviewModal({ item, setShow, show, boatId, changeSubmit }) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //const [submitModal, setSubmitModal] = useState(false);

  const [allInfo, setAllInfo] = useState(null);
  const [edit, setEdit] = useState(false);

  const [boat, setBoat] = useState({
    brand: "",
    image: "",
    make: "",
    name: "",
  });

  const [allInfoEdit, setAllInfoEdit] = useState({
    boat: {
      brand: "",
      image: "",
      make: "",
      name: "",
    },
    harbour: {
      address: "",
      capacity: "",
      name: "",
    },
    owners: [],
  });

  useEffect(() => {
    facade
      .getAllInfoByBoatId(boatId)
      .then((res) => {
        console.log(res);
        setAllInfo(res);
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
  }, []);

//   useEffect(() => {
//     facade
//       .getAllInfoByBoatId(boatId)
//       .then((res) => {
//         console.log(res);
//         //setAllInfo(res);
//         // console.log("hej")
//       })
//       .catch((err) => {
//         console.log(err);
//         if (err.status) {
//           err.fullError.then((e) => {
//             console.log(e.code + ": " + e.message);
//           });
//         } else {
//           console.log("Network error");
//         }
//       });
//   }, [submitModal]);

  const handleSubmit = (boat, boatId) => {
    //remove id property:
    const boatNoId = { ...boat };
    delete boatNoId.id;
    console.log(boatNoId);

    facade
      .editBoat(boatNoId, boatId)
      .then((res) => {
        console.log(res);
        const allInfoUpdate = { ...allInfo };
        allInfoUpdate.boat.brand = boat.brand;
        //  setAllInfo(allInfoUpdate);
        changeSubmit();
        setEdit(false);
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
  };
  const onChange = (evt) => {
    //   setAllInfoEdit({
    //     ...allInfoEdit,
    //     [evt.target.id]: evt.target.value,
    //   });
    setBoat({
      ...boat,
      [evt.target.id]: evt.target.value,
    });
    //allInfoEdit.boat.brand = evt.target.value;
    //   console.log(allInfoEdit.boat.brand)
    //       setAllInfoEdit({
    //         ...allInfoEdit,
    //         [allInfoEdit.boat.brand]: evt.target.value,
    //       });

    console.log(boat);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Boat information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Boat Info</h3>
          {allInfo != null ? (
            <>
              <Table striped bordered hover className="table-layout">
                {
                  <>
                    <thead>
                      <tr>
                        <th>Brand</th>
                        <th>Make</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {edit ? (
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="text"
                              required="required"
                              value={boat.brand}
                              onChange={onChange}
                              id="brand"
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              required="required"
                              value={boat.make}
                              onChange={onChange}
                              id="make"
                            ></input>
                          </td>
                          <td>
                            <input
                              type="text"
                              required="required"
                              value={boat.name}
                              onChange={onChange}
                              id="name"
                            ></input>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark"
                              onClick={() => {
                                handleSubmit(boat, boat.id);
                                // setEdit(false);
                                // const allInfoUpdate = {...allInfo};
                                // allInfoUpdate.boat.brand = boat.brand;
                                // setAllInfo(allInfoUpdate)
                                //setBoat(boat)
                                //   setAllInfo({...allInfo},
                                //     allInfo.boat.name = boat.name)
                                //setSubmitModal(!submitModal);
                              }}
                            >
                              Save
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td>{allInfo.boat.brand}</td>
                          <td>{allInfo.boat.make}</td>
                          <td>{allInfo.boat.name}</td>
                          <td>
                            <button
                              className="btn btn-dark"
                              onClick={() => {
                                setAllInfoEdit(allInfo);

                                setBoat({
                                  id: allInfo.boat.id,
                                  brand: allInfo.boat.brand,
                                  image: allInfo.boat.image,
                                  make: allInfo.boat.make,
                                  name: allInfo.boat.name,
                                });
                                setEdit(true);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </>
                }
              </Table>
              <h3>Owners Infos</h3>
              <h3>Harbour Info</h3>
            </>
          ) : (
            //   <div>{allInfo.boat.brand}, {allInfo.owners[0].name} </div>
            ""
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-grey" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default OverviewModal;

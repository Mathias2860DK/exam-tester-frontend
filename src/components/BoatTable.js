import { Table } from "react-bootstrap";
function BoatTable({ list, setBoatId, setShow }) {
  return (
    <Table striped bordered hover>
      {
        <>
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Make</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {list.map((boat, index) => (
              <tr key={index}>
                <td>
                  <button className="btn btn-dark" onClick={() => {
                      setBoatId(boat.id)
                      setShow(true)
                  }}>
                    {boat.id}
                  </button>
                </td>
                <td>{boat.brand}</td>
                <td>{boat.make}</td>
                <td>{boat.name}</td>
              </tr>
            ))}
          </tbody>
        </>
      }
    </Table>
  );
}

export default BoatTable;

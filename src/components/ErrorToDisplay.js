import { Alert } from "react-bootstrap";

function Error({ errorMsg, errorCode }) {
  return (
    <div>
      <Alert className="mt-4" variant={"danger"}>
        {errorMsg}
      </Alert>
    </div>
  );
}

export default Error;

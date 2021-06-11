import { Button } from "react-bootstrap";
import { TrashFill } from "react-bootstrap-icons";

const DeleteButton = (props) => {
  const { deleteFunction } = props;
  return (
    <Button className='ml-2' variant="outline-danger" size="sm" onClick={() => deleteFunction()}>
      <TrashFill size="20px"  />
    </Button>
  );
};
export default DeleteButton;
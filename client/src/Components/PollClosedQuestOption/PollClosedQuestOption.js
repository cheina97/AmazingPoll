import { Form } from "react-bootstrap";
import DeleteButton from "../DeleteButton";

const PollClosedQuestOption = (props) => {
  const {
    id_quest,
    mode,
    indexOption,
    index,
    value,
    checked,
    deleteQuestOption,
    position,
    setQuestOption,
    setAnswer,
  } = props;
  return (
    <Form.Group controlId={`pollOpenQuestOptional ${index}_${indexOption}`}>
      {mode === "create" ? (
        <div
          className={
            indexOption % 3 === 0
              ? "d-flex mr-3"
              : indexOption % 3 === 1
              ? "d-flex ml-3 mr-3"
              : "d-flex ml-3"
          }
        >
          <Form.Control
            type="text"
            required
            placeholder="Insert option text"
            value={value}
            onChange={(event) =>
              setQuestOption(position, indexOption, event.target.value)
            }
          />
          <DeleteButton
            deleteFunction={() => deleteQuestOption(position, indexOption)}
          />
        </div>
      ) : (
        <div>
          <Form.Check
            custom
            disabled={mode !== "vote"}
            checked={checked}
            onChange={() => setAnswer(id_quest, value, true)}
            type="checkbox"
            id={`optional ${index}_${indexOption}`}
            label={value}
          />
        </div>
      )}
    </Form.Group>
  );
};

export default PollClosedQuestOption;

import { Form, Badge } from "react-bootstrap";
import DeleteButton from "../DeleteButton";
import MoveButton from "../MoveButton";

const PollOpenQuest = (props) => {
  const {
    mode,
    title,
    setTitle,
    answer,
    setAnswer,
    optional,
    setMinQuest,
    id_quest,
    position,
    deleteQuest,
    moveQuest,
    index,
  } = props;
  return (
    <div className="mt-5">
      {mode === "create" && (
        <Form.Group controlId={"pollOpenQuestTitle" + position}>
          <Form.Label>Open Question</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              required
              placeholder="Insert question title"
              value={title}
              onChange={(event) => setTitle(position, event.target.value)}
            />
            <MoveButton
              moveFunction={moveQuest}
              position={position}
              index={index}
              direction="down"
            />
            <MoveButton
              moveFunction={moveQuest}
              position={position}
              index={index}
              direction="up"
            />
            <DeleteButton deleteFunction={() => deleteQuest(position)} />
          </div>
        </Form.Group>
      )}
      <Form.Group controlId={"pollOpenQuestAnswer" + position}>
        {mode !== "create" && (
          <Form.Label>
            <h4>
              {title}
              {optional && (
                <Badge className="ml-3" variant="success">
                  Optional
                </Badge>
              )}
            </h4>
          </Form.Label>
        )}
        <Form.Control
          as="textarea"
          rows={2}
          required={!optional && mode === "vote"}
          readOnly={mode !== "vote"}
          maxLength={200}
          placeholder={
            mode === "create"
              ? "Text field preview"
              : "Insert your answer (max 200 chars)"
          }
          value={answer}
          onChange={(event) => setAnswer(id_quest, event.target.value, false)}
        />
      </Form.Group>
      {mode === "create" && (
        <Form.Group controlId={"pollOpenQuestOptional" + position}>
          <Form.Check
            custom
            checked={optional}
            onChange={() => setMinQuest(position, optional ? 1 : 0, false)}
            type="checkbox"
            id={"optional" + position}
            label="Optional"
          />
        </Form.Group>
      )}
    </div>
  );
};

export default PollOpenQuest;

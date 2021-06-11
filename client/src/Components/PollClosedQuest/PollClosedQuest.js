import {
  Form,
  Row,
  Col,
  Container,
  OverlayTrigger,
  Tooltip,
  Badge
} from "react-bootstrap";
import DeleteButton from "../DeleteButton";
import MoveButton from "../MoveButton";
import AddButton from "../AddButton";
import PollClosedQuestOption from "../PollClosedQuestOption";

const PollClosedQuest = (props) => {
  const {
    id_quest,
    mode,
    position,
    title,
    setTitle,
    moveQuest,
    index,
    deleteQuest,
    options,
    addQuestOption,
    deleteQuestOption,
    setQuestOption,
    max,
    min,
    setMaxQuest,
    setMinQuest,
    answers,
    setAnswer,
  } = props;
  return (
    <div className="mt-5">
      {mode === "create" && (
        <Form.Group controlId={"pollOpenQuestTitle" + position}>
          <Form.Label>Closed Question</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              required
              placeholder="Insert question title"
              value={title}
              onChange={(event) => setTitle(position, event.target.value)}
            />
            <AddButton
              disabled={options.length >= 10}
              alternativeMessage={
                options.length >= 10 && "Cannot add more than 10 options"
              }
              addFunction={() => addQuestOption(position)}
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
      {mode !== "create" && (
        <Form.Label>
          {
            <h4 className="p-0">
              {title}
              <Badge className="ml-3" variant="success">{`min: ${min} max: ${max}`}</Badge>
            </h4>
          }
        </Form.Label>
      )}
      <Container fluid>
        <Row sm={3}>
          {options &&
            options.map((value, indexOption) => (
              <Col className="p-0" key={`${index}_${indexOption}_col`}>
                <PollClosedQuestOption
                  id_quest={id_quest}
                  key={`${index}_${indexOption}_opt`}
                  mode={mode}
                  indexOption={indexOption}
                  index={index}
                  value={value}
                  checked={answers.includes(value)}
                  deleteQuestOption={deleteQuestOption}
                  position={position}
                  setQuestOption={setQuestOption}
                  setAnswer={setAnswer}
                />
              </Col>
            ))}
        </Row>
        {mode === "create" && (
          <Row>
            <Col sm={3} className="pl-0">
              <Form.Label>Min. answers required</Form.Label>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id={`tooltip-min-${position}`}>
                    {
                      "min. must be greater/equal than 0, smaller/equal than max. and smaller than options number"
                    }
                  </Tooltip>
                }
              >
                <Form.Control
                  type="number"
                  required
                  value={min}
                  onChange={(event) =>
                    setMinQuest(position, event.target.value, true)
                  }
                />
              </OverlayTrigger>
            </Col>
            <Col sm={3} className="pr-0">
              <Form.Label>Max. answers required</Form.Label>

              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id={`tooltip-max-${position}`}>
                    {
                      "max. must be greater than 0, greater/equal than min. and smaller/equal than options number"
                    }
                  </Tooltip>
                }
              >
                <Form.Control
                  type="number"
                  required
                  value={max}
                  onChange={(event) =>
                    setMaxQuest(position, event.target.value)
                  }
                />
              </OverlayTrigger>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default PollClosedQuest;

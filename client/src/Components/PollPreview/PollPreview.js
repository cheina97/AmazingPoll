import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import PollModal from "../PollModal";
import { getAnswers } from "../../Api/GetApi";
import ErrorAlert from "../ErrorAlert";

const PollPreview = (props) => {
  const { id, mode, title, disabled, setDisabledPollsId } = props;

  const [showModal, setShowModal] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [errorApi, setErrorApi] = useState("");
  const [reloadAnswers, setReloadAnswers] = useState(true);

  useEffect(() => {
    if (mode === "results" && reloadAnswers) {
      getAnswers(id)
        .then((a) => {
          setAnswers(a);
          setErrorApi("");
          setReloadAnswers(false);
        })
        .catch((err) => setErrorApi(err));
    }
  }, [mode, id, reloadAnswers]);

  return (
    <>
      <Card className="text-center m-3 ">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {mode === "results" && (
            <Card.Text className={"mb-2 " + (mode === "results" && "ml-2")}>
              {!errorApi
                ? `Answers: ${answers.length}`
                : errorApi && <ErrorAlert errors={errorApi} />}
            </Card.Text>
          )}
          <Button
            className="mt-2"
            disabled={!answers.length && mode === "results"}
            variant="success"
            onClick={() => {
              setReloadAnswers(true)
              setShowModal(true);
            }}
          >
            {mode === "results" ? "Show results" : "Vote"}
          </Button>
          {mode === "results" && (
            <Button
              onClick={() => setReloadAnswers(true)}
              className="mt-2 ml-2"
              variant="success"
            >
              Reload results
            </Button>
          )}
        </Card.Body>
      </Card>
      <PollModal
        idPoll={id}
        title={title}
        mode={mode}
        showModal={showModal}
        setShowModal={setShowModal}
        answers={answers}
        setAnswers={setAnswers}
        setReloadAnswers={setReloadAnswers}
      />
    </>
  );
};

export default PollPreview;

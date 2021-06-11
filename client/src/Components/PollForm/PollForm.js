import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { createPoll } from "../../Api/PostApi";
import ErrorAlert from "../ErrorAlert";

const PollForm = (props) => {
  const { mode, setPoll, poll, answers, setShowModal, setReload } = props;
  const [validated, setValidated] = useState(false);
  const [errorApi, setErrorApi] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      setErrorApi({
        message: "All fields have to be filled",
        details: "Please fill the fields surrounded by a red border",
        hideReloadMessage: true,
      });
    } else {
      if (mode === "create") {
        if (!poll.questions || !poll.questions.length) {
          setErrorApi({
            message: "Cannot send a poll without questions",
            details: "Please add some questions with the buttons above",
            hideReloadMessage: true,
          });
        } else {
          const wrongQuestions = [];
          for (const q of poll.questions) {
            if (
              q.closed &&
              q.options.length !==
                q.options.filter((v, i) => q.options.indexOf(v) === i).length
            )
              wrongQuestions.push(`${q.name} (position:${q.position}) `);
          }
          if (wrongQuestions.length !== 0) {
            setErrorApi({
              message: `Cannot insert repeated options in closed questions`,
              details: `Errors in questions ${wrongQuestions.toString()}. Please remove duplicated options`,
              hideReloadMessage: true,
            });
          } else {
            createPoll(poll)
              .then(() => {
                setPoll("");
                setReload(true);
                setShowModal(false);
              })
              .catch((err) => setErrorApi(err));
          }
        }
      } else if (mode === "vote") {
        //TODO
      }
    }
  };
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {props.children}

      {!!errorApi && (
        <div className="mt-3">
          <ErrorAlert errors={errorApi} />
        </div>
      )}

      {mode !== "results" && (
        <div className="d-flex justify-content-center">
          <Button className="m-2" variant="success" type="submit">
            {mode === "create" ? "Create Poll" : "Send Answers"}
          </Button>
        </div>
      )}
    </Form>
  );
};

export default PollForm;

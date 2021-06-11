import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ArrowRepeat } from "react-bootstrap-icons";
import { getQuestions } from "../../Api/GetApi";
import PollPagination from "../PollPagination";
import PollHeader from "../PollHeader";
import PollForm from "../PollForm";
import PollOpenQuest from "../PollOpenQuest";
import PollAddQuest from "../PollAddQuest";
import PollClosedQuest from "../PollClosedQuest/PollClosedQuest";

const PollModal = (props) => {
  const {
    idPoll,
    setShowModal,
    showModal,
    mode,
    title,
    setDisabledPollsId,
    setReload,
    setAnswers,
    answers,
    setReloadAnswers
  } = props;

  const [poll, setPoll] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [currentUserNum, setCurrentUserNum] = useState(0);

  /* useEffect(() => {
    if (mode !== "create") {
      getQuestions(idPoll).then((x) =>
        setPoll({ name: title, questions: [...x] })
      );
    }
  }, [idPoll, mode]);

  useEffect(() => {
    if (mode === "results") {
      if (reloadAnswers) {
        getAnswers(idPoll).then((x) => setAnswers(x));
        setReloadAnswers(false);
      }
    }
  }, [mode, idPoll, reloadAnswers]); */

  const loadData = () => {
    if (mode !== "create") {
      getQuestions(idPoll).then((x) =>
        setPoll({ name: title, questions: [...x] })
      );
    }
  };

  const addQuest = (closed) => {
    setPoll((old) => {
      return {
        ...old,
        questions: old.questions
          ? [
              ...old.questions,
              {
                name: "",
                closed: closed,
                min: closed ? 0 : 1,
                max: 1,
                position:
                  old.questions && old.questions.length
                    ? Math.max(...old.questions.map((q) => q.position)) + 1
                    : 0,
                options: closed ? [""] : [],
              },
            ]
          : [
              {
                name: "",
                closed: closed,
                min: closed ? 0 : 1,
                max: 1,
                position:
                  old.questions && old.questions.length
                    ? Math.max(...old.questions.map((q) => q.position)) + 1
                    : 0,
                options: closed ? [""] : [],
              },
            ],
      };
    });
  };

  const addQuestOption = (position) => {
    setPoll((old) => {
      if (old.questions[position].options.length < 10) {
        return {
          ...old,
          questions: old.questions.map((q) => {
            return q.position === position
              ? { ...q, options: [...q.options, ""] }
              : q;
          }),
        };
      } else {
        return old;
      }
    });
  };

  const deleteQuestOption = (position, indexOption) => {
    setPoll((old) => {
      if (old.questions[position].options.length > 1) {
        return {
          ...old,
          questions: old.questions.map((q) => {
            return q.position === position
              ? { ...q, options: q.options.filter((o, i) => i !== indexOption) }
              : q;
          }),
        };
      } else {
        return old;
      }
    });
  };

  const setQuestOption = (position, indexOption, value) => {
    setPoll((old) => {
      return {
        ...old,
        questions: old.questions.map((q) => {
          return q.position === position
            ? {
                ...q,
                options: q.options.map((o, i) =>
                  i === indexOption ? value : o
                ),
              }
            : q;
        }),
      };
    });
  };

  const deleteQuest = (position) => {
    setPoll((old) => {
      return {
        ...old,
        questions: [...old.questions.filter((q) => q.position !== position)],
      };
    });
  };

  const moveQuest = (position, direction, index) => {
    setPoll((old) => {
      if (
        (direction === "up" && index > 0) ||
        (direction === "down" && index < old.questions.length - 1)
      ) {
        return {
          ...old,
          questions: [
            ...old.questions.map((q, i) => {
              if (i === index) {
                return {
                  ...q,
                  position:
                    direction === "up"
                      ? old.questions[index - 1].position
                      : old.questions[index + 1].position,
                };
              } else if (i === index - 1 && direction === "up") {
                return {
                  ...q,
                  position: position,
                };
              } else if (i === index + 1 && direction === "down") {
                return {
                  ...q,
                  position: position,
                };
              } else {
                return q;
              }
            }),
          ].sort((a, b) => a.position - b.position),
        };
      } else {
        return old;
      }
    });
  };

  const setTitle = (title) => {
    setPoll((p) => {
      return { name: title, questions: p.questions };
    });
  };

  const setAnswer = (id, value, closed) => {
    if (answers.map((a) => a.id_quest).includes(id)) {
      setAnswers((old) =>
        old.map((a) =>
          a.id_quest === id
            ? {
                id_quest: id,
                values: closed
                  ? a.values.includes(value)
                    ? a.values.filter((v) => v !== value)
                    : [...a.values, value]
                  : [value],
              }
            : a
        )
      );
    } else {
      setAnswers((old) => [...old, { id_quest: id, values: [value] }]);
    }
  };

  const setTitleQuest = (position, title) => {
    setPoll((old) => {
      return {
        ...old,
        questions: [
          ...old.questions.map((q) =>
            q.position === position ? { ...q, name: title } : q
          ),
        ],
      };
    });
  };

  const setMinQuest = (position, minString, closed) => {
    const min = parseInt(minString);
    setPoll((old) => {
      if (
        (min >= 0 &&
          min < old.questions[position].options.length &&
          min <= old.questions[position].max) ||
        !closed
      ) {
        return {
          ...old,
          questions: [
            ...old.questions.map((q) =>
              q.position === position ? { ...q, min: min } : q
            ),
          ],
        };
      } else {
        return old;
      }
    });
  };

  const setMaxQuest = (position, maxString) => {
    const max = parseInt(maxString);
    setPoll((old) => {
      if (
        max > 0 &&
        max <= old.questions[position].options.length &&
        max >= old.questions[position].min
      ) {
        return {
          ...old,
          questions: [
            ...old.questions.map((q) =>
              q.position === position ? { ...q, max: max } : q
            ),
          ],
        };
      } else {
        return old;
      }
    });
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="xl"
      centered
      onEnter={loadData}
      contentClassName="px-4 py-1"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === "create" ? "Create a new Poll" : title}
          {mode === "results" ? (
            <Button
              onClick={() => setReloadAnswers(true)}
              className="ml-3"
              variant="success"
              size="sm"
            >
              Reload results <ArrowRepeat className="ml-1" size="16px" />
            </Button>
          ) : null}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        {(mode !== "results" || answers.length !== 0) && (
          <PollForm
            setShowModal={setShowModal}
            mode={mode}
            poll={poll}
            setPoll={setPoll}
            setReload={setReload}
          >
            <PollHeader
              mode={mode}
              title={poll.name || ""}
              setTitle={setTitle}
              username={
                (answers &&
                  answers[currentUserNum] &&
                  answers[currentUserNum].id_submission) ||
                newUsername
              }
              setUsername={setNewUsername}
            />
            {poll &&
              poll.questions &&
              poll.questions.map((q, index) =>
                q.closed ? (
                  <PollClosedQuest
                    id_quest={q.id}
                    key={`closed_${index}`}
                    mode={mode}
                    position={q.position}
                    title={q.name}
                    setTitle={setTitleQuest}
                    setAnswer={setAnswer}
                    moveQuest={moveQuest}
                    index={index}
                    deleteQuest={deleteQuest}
                    options={q.options}
                    addQuestOption={addQuestOption}
                    deleteQuestOption={deleteQuestOption}
                    setQuestOption={setQuestOption}
                    max={q.max}
                    min={q.min}
                    setMaxQuest={setMaxQuest}
                    setMinQuest={setMinQuest}
                    answers={
                      mode === "results"
                        ? answers &&
                          answers.length &&
                          answers[currentUserNum] &&
                          answers[currentUserNum].questions &&
                          answers[currentUserNum].questions.find(
                            (a) => a.id_quest === q.id
                          )
                          ? answers[currentUserNum].questions.find(
                              (a) => a.id_quest === q.id
                            ).values
                          : []
                        : answers &&
                          answers.length &&
                          answers.find((a) => a.id_quest === q.id)
                        ? answers.find((a) => a.id_quest === q.id).values
                        : []
                    }
                    setAnswers={setAnswer}
                  />
                ) : (
                  <PollOpenQuest
                    id_quest={q.id}
                    key={`open_${index}`}
                    mode={mode}
                    title={q.name}
                    answer={
                      mode === "results"
                        ? answers &&
                          answers.length &&
                          answers[currentUserNum] &&
                          answers[currentUserNum].questions &&
                          answers[currentUserNum].questions.find(
                            (a) => a.id_quest === q.id
                          )
                          ? answers[currentUserNum].questions.find(
                              (a) => a.id_quest === q.id
                            ).values[0]
                          : ""
                        : answers &&
                          answers.length &&
                          answers.find((a) => a.id_quest === q.id)
                        ? answers.find((a) => a.id_quest === q.id).values[0]
                        : ""
                    }
                    setTitle={setTitleQuest}
                    setAnswer={setAnswer}
                    optional={q.min === 0}
                    setMinQuest={setMinQuest}
                    position={q.position}
                    deleteQuest={deleteQuest}
                    moveQuest={moveQuest}
                    index={index}
                  />
                )
              )}

            {mode === "create" && <PollAddQuest addQuest={addQuest} />}

            {mode === "results" && (
              <PollPagination
                currentUserNum={currentUserNum}
                setCurrentUserNum={setCurrentUserNum}
                maxUserNum={answers.length}
              />
            )}
          </PollForm>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PollModal;

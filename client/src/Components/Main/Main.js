import MyNav from "../MyNav";
import { useState, useEffect } from "react";
import { getPolls } from "../../Api/GetApi";
import PollPreview from "../PollPreview";
import { Col, Row, Container } from "react-bootstrap";
import RefreshButton from "../RefreshButton";
import NewPollButton from "../NewPollButton";
import PollModal from "../PollModal";
import ErrorAlert from "../ErrorAlert";

const Main = (props) => {
  const [reloadPoll, setReloadPoll] = useState(true);
  const [polls, setPolls] = useState("");
  const [disabledPollsId, setDisabledPollsId] = useState([""]);
  const [showModal, setShowModal] = useState(false);
  const [errorApi, setErrorApi] = useState("");

  useEffect(() => {
    if (reloadPoll === true) {
      getPolls()
        .then((x) => {
          setPolls(x);
          setErrorApi("");
        })
        .catch((err) => setErrorApi(err));
      setReloadPoll(false);
    }
  }, [reloadPoll]);

  return (
    <>
      <MyNav userName={props.userName} setUserName={props.setUserName} />
      <div className="mainpage">
        <Container
          fluid
          className="pb-5 "
          style={{ marginTop: "75px", marginLeft: "0px", marginRight: "0px" }}
        >
          <Row sm={3}>
            {polls &&
              polls.map((poll) => (
                <Col key={poll.id}>
                  <PollPreview
                    key={poll.id}
                    title={poll.name}
                    id={poll.id}
                    disabled={disabledPollsId.includes(poll.id)}
                    setDisabledPollsId={setDisabledPollsId}
                    mode={props.userName ? "results" : "vote"}
                  />
                </Col>
              ))}
          </Row>
          {errorApi && <ErrorAlert errors={errorApi} />}
        </Container>
      </div>
      <RefreshButton setReload={setReloadPoll} />
      {props.userName && <NewPollButton setShowModal={setShowModal} />}
      {props.userName && (
        <PollModal
          mode={"create"}
          showModal={showModal}
          setShowModal={setShowModal}
          setReload={setReloadPoll}
        />
      )}
    </>
  );
};

export default Main;

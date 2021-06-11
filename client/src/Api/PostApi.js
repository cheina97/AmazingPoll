const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      fetch("http://192.168.10.104:3000/api/sessions/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            const error = new Error(`${res.status}: ${res.statusText}`);
            error.response = res;
            throw error;
          }
          resolve(res.json());
        })
        .catch((err) => {
          if (err.response && err.response.headers) {
            if (err.response.headers.get("Content-Type") === "application/json") {
              err.response
                .json()
                .then((x) =>
                  reject({ message: err.message, details: JSON.stringify(x) })
                );
            } else {
              err.response
                .text()
                .then((x) => reject({ message: err.message, details: x }));
            }
          } else {
            reject({ message: err.message });
          }
        });
    });
  }

  const createPoll = (poll) => {
    return new Promise((resolve, reject) => {
      fetch("http://192.168.10.104:3000/api/polls/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(poll),
      })
        .then((res) => {
          if (!res.ok) {
            const error = new Error(`${res.status}: ${res.statusText}`);
            error.response = res;
            throw error;
          }
          resolve(res.json());
        })
        .catch((err) => {
          if (err.response && err.response.headers) {
            if (err.response.headers.get("Content-Type") === "application/json") {
              err.response
                .json()
                .then((x) =>
                  reject({ message: err.message, details: JSON.stringify(x) })
                );
            } else {
              err.response
                .text()
                .then((x) => reject({ message: err.message, details: x }));
            }
          } else {
            reject({ message: err.message });
          }
        });
    });
  };

  export {loginUser,createPoll} ;
import React, { useState } from "react";

const MailsContext = React.createContext({
  inboxCounter: "",
  sentCounter: "",
  inboxUpdate: (value) => {},
  sentUpdate: (value) => {},
});

export const MailsContextProvider = (props) => {
  const [inboxCounter, setInboxCounter] = useState(0);
  const [sentCounter, setSentCounter] = useState(0);

  const inboxUpdate = (value) => {
    setInboxCounter(value);
  };

  const sentUpdate = (value) => {
    setSentCounter(value);
  };

  const contextValue = {
    inboxCounter: inboxCounter,
    sentCounter: sentCounter,
    inboxUpdate: inboxUpdate,
    sentUpdate: sentUpdate,
  };

  return (
    <MailsContext.Provider value={contextValue}>
      {props.children}
    </MailsContext.Provider>
  );
};

export default MailsContext;

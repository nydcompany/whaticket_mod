import React, { useState, createContext } from "react";

const AnswersContext = createContext();

const AnswersProvider = ({ children }) => {
  const [loading, answer] = useState(null);

  return (
    <AnswersContext.Provider value={{ loading, answer }}>
      {children}
    </AnswersContext.Provider>
  );
};

export { AnswersContext, AnswersProvider };

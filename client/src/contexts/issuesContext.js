import React, { useState } from 'react';

const IssuesContext = React.createContext();

const IssuesProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);

  return (
    <IssuesContext.Provider value={{ issues, setIssues }}>
      {children}
    </IssuesContext.Provider>
  );
}

export { IssuesContext, IssuesProvider };

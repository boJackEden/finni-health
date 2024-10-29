import React from 'react'
import { useRouteError } from "react-router-dom";

type ErrorProps = {

};

const Error: React.FC<ErrorProps> = ({}) => {
  const error = useRouteError() as Error;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message}</i>
      </p>
    </div>
  );
}

export default Error;
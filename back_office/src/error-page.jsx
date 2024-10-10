import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" style={{textAlign: 'center', position: 'relative'}}>
      <div style={{position: 'relative', top: 230}}>
        <h1 >Oops!</h1>
        <p style={{ marginTop: 30, marginBottom: 30}}>Sorry, an unexpected error has occurred.</p>
        <p>
          <i style={{color: 'grey', fontStyle: 'italic'}}>{error.statusText || error.message}</i>
        </p>
      </div>
      
    </div>
  );
}
import { useLocation } from 'react-router-dom';


function Success() {
  const location = useLocation();
  const { formValues } = location.state;

  return (
    <div className="container">
        <div className="sub"> 
            <h1>Submission Successful!</h1>
        </div>

      <h2>Submitted Details:</h2>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </div>
  );
}

export default Success;

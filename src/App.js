import { useSearchParams } from "react-router-dom";

function App() {

  const onClick = (e) => {
    window.location.href='https://www.strava.com/oauth/authorize?client_id=84396&response_type=code&redirect_uri=http://localhost:3000&approval_prompt=force&scope=activity:read_all,read';
  }
  const [searchParams] = useSearchParams();
  const authorizationCode = searchParams.get('code');
  const scope = searchParams.get('scope');
  if (scope.includes('activity:read_all')) {
    if (authorizationCode) {
      console.log(authorizationCode)
    }
  }
  else {
    console.log('Please "Connect to Strava" again. Make sure to check "View data about your private activities" when prompted.')
  }

  return (
    <div className="App">
      <button onClick={onClick}>Connect to Strava</button>
    </div>
  );
}

export default App;


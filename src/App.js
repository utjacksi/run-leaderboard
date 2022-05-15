import { useSearchParams } from "react-router-dom";


function App() {
  async function fetchTokensJSON() {
    const response = await fetch(`https://www.strava.com/oauth/token?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&code=${authorizationCode}&grant_type=authorization_code`, {
      method: 'POST',
    });
    const tokens = await response.json();
    console.log(tokens);
    return tokens; 
  }
  
  const onClick = (e) => {
    window.location.href=`https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&approval_prompt=force&scope=activity:read_all,read`;
  }

  const [searchParams] = useSearchParams();
  const authorizationCode = searchParams.get('code');
  const scope = searchParams.get('scope');
  const accessDenied = searchParams.get('error');
  if (scope) {
    if (scope.includes('activity:read_all')) {
      if (authorizationCode) {
        console.log(authorizationCode);

        let varibale = fetchTokensJSON();
        console.log(varibale);
      }
    }
    else {
      console.log('Please "Connect to Strava" again. Make sure to check "View data about your private activities" when prompted.')
    }
  }
  else if (accessDenied) {
    console.log('You need to authorize your account with Strava to continue.')
  }

  return (
    <div className="App">
      <button onClick={onClick}>Connect to Strava</button>
    </div>
  );
}

export default App;


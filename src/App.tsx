import { AuthenticatedApp } from 'authenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedApp } from 'unauthenticated-app';
import {FullPageErrorFallback} from 'components/lib'
import './App.css';


function App() {
  const {user} = useAuth()

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user?<AuthenticatedApp/>:<UnauthenticatedApp/>}
        {/* <AuthenticatedApp/> */}
      </ErrorBoundary>
    </div>
  );
}

export default App;

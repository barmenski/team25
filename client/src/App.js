import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from './store';
import { ChakraProvider } from '@chakra-ui/react';
import { MainPage } from './pages/main-page/main-page';
import LobbyMasterPage from './pages/Lobby-master';
import LobbyMembersPage from './pages/Lobby-members';
import { MainProvider } from './contexts/mainContext';
import { UsersProvider } from './contexts/usersContext';
import { SocketProvider } from './contexts/socketContext';
import { IssuesProvider } from './contexts/issuesContext';
import GameMasterPage from './pages/Game-master';
import { ResultPage } from './pages/result-page/result-page';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';

export const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <MainProvider>
          <UsersProvider>
            <IssuesProvider>
              <SocketProvider>
                <Router>
                  <Route
                    render={({ location }) => (
                      <Switch location={location}>
                        <Route exact path="/">
                          <ErrorBoundary>
                            <MainPage />
                          </ErrorBoundary>
                        </Route>
                        <Route path="/game-master">
                          <ErrorBoundary>
                            <GameMasterPage />
                          </ErrorBoundary>
                        </Route>
                        <Route path="/game-result">
                          <ErrorBoundary>
                            <ResultPage />
                          </ErrorBoundary>
                        </Route>
                        <Route path="/lobby-master">
                          <ErrorBoundary>
                            <LobbyMasterPage />
                          </ErrorBoundary>
                        </Route>
                        <Route path="/lobby-members">
                          <ErrorBoundary>
                            <LobbyMembersPage />
                          </ErrorBoundary>
                        </Route>
                        <Route path="/*">
                          <div>Page not found</div>
                        </Route>
                      </Switch>
                    )}
                  />
                </Router>
              </SocketProvider>
            </IssuesProvider>
          </UsersProvider>
        </MainProvider>
      </ChakraProvider>
    </Provider>
  );
};

export default App;

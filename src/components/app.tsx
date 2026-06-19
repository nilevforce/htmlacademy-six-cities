import WelcomeScreen from '../pages/welcome-screen/welcome-screen.tsx';

interface AppProps {
  totalCountPlaces: number;
}

function App({totalCountPlaces}: AppProps): JSX.Element {
  return (
    <WelcomeScreen totalCountPlaces={totalCountPlaces} />
  );
}

export default App;

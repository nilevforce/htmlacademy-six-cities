import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants.ts';

function NotFoundScreen (): ReactElement {
  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Root}>Вернуться на главную</Link>
    </div>
  );
}

export default NotFoundScreen;

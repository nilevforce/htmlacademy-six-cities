import { ReactElement } from 'react';
import { FourSquare } from 'react-loading-indicators';

function Loader (): ReactElement {
  return (
    <div
      className="loader"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <FourSquare color={['#327fcd', '#cd8032']} />
    </div>
  );
}

export default Loader;

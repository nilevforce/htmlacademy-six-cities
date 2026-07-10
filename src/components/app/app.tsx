import { ReactElement, useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import router from '../../router.ts';
import {
  checkUserAuthAction,
  fetchOffersAction
} from '../../store/api-actions.ts';
import Loader from '../loader/loader.tsx';

function App (): ReactElement {
  const dispatch = useAppDispatch();
  const [isAppInitializing, setIsAppInitializing] = useState<boolean>(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await dispatch(checkUserAuthAction());
      } finally {
        await dispatch(fetchOffersAction());
        setIsAppInitializing(false);
      }
    };

    initializeApp();
  }, [dispatch]);

  if (isAppInitializing) {
    return <Loader />;
  }

  return (
    <RouterProvider router={router} />
  );
}

export default App;

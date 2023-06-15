import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Suspense, lazy, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { AppDispatch } from 'redux/store';
import { getDataAction } from 'redux/slices/dataSlice';

import 'react-toastify/dist/ReactToastify.css';

import HomePage from 'pages/HomePage';
import Layout from 'components/layout/Layout';

const UserDataPage = lazy(() => import('pages/UserDataPage'));

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getDataAction());
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Suspense fallback={<div className='text-center'>Loading...</div>}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/custom' element={<UserDataPage />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
          <ToastContainer />
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;

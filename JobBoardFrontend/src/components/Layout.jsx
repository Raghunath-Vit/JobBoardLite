import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh', padding: '2rem' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

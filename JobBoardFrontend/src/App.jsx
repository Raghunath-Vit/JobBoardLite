import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import JobDetails from './components/JobDetails';
import ApplyForm from './components/ApplyForm';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="home" element={<Home />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="apply/:id" element={<ApplyForm />} />
      </Route>
    </Routes>
  );
}

export default App;

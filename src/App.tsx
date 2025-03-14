import './App.css'
import { Route, Routes } from 'react-router';
import AnswerWrapper from './pages/AnswerWrapper';
import { Dashboard } from './pages/Dashboard';
import { Result } from './pages/Result';
import { Results } from './pages/Results';
//import Result from './pages/Result';

function App() {

  return (
    <>
      <Routes>
        <Route index element={<AnswerWrapper/>} />
        <Route path="/result" element={<Result />} />
        <Route path="/results" element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App

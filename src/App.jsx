
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';


import Landing from '@container/Landing';
import Dashboard from '@container/Dashboard';
import Login from '@container/Login';

//Admin screens
import TestList from '@AdminScreen/TestList';
import PaperList from '@AdminScreen/PaperList';
import SectionList from '@AdminScreen/SectionList';
import QuestionList from '@AdminScreen/QuestionList';
import QuestionLibrary from '@AdminScreen/QuestionLibrary';
import CategoryList from '@AdminScreen/CategoryList';
import CreateQuestion from '@AdminScreen/CreateQuestion';

//Candidate screens 
import CandidateTests from '@CandidateScreen/CandidateExams';
import CandidateTestPaper from '@CandidateScreen/CandidateTestPaper';
import CandidateTestStart from '@CandidateScreen/CandidateTestStart';
import CandidateTestInstruction from '@CandidateScreen/CandidateTestInstruction';
import Package from './container/Package';



function App() {

  return (
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}  >
      <Router>
        <Routes>
          <Route path={'/'} element={<Landing />} />
          <Route path={'/login'} element={<Login />} />
          {/* <Route path={'/register'} element={<Register />} /> */}
          {/* <Route path={'/forgot_password'} element={<ForgotPassword />} />  */}
          <Route path={'/dashboard'} element={<Dashboard />} />
          <Route path={'/category-list'} element={<CategoryList />} />
          <Route path={'/category-list/test-list/:categoryId'} element={<TestList />} />
          <Route path={'/category-list/test-list/paper-list/:testId'} element={<PaperList />} />
          <Route path={'/category-list/test-list/paper-list/section-list/:paperId'} element={<SectionList />} />
          <Route path={'/section-list/question-list/:sectionId'} element={<QuestionList />} />
          <Route path={'/question-library'} element={<QuestionLibrary />} />
          <Route path={'/create-question'}  element={<CreateQuestion />} />
          <Route path={'/candidate-test-list'} element={<CandidateTests />} />
          <Route path={'/candidate-test-list/test-paper/:testId'} element={<CandidateTestPaper />} /> 
          <Route path={'/test-instruction/:paperId'}  element={<CandidateTestInstruction />}   />
          <Route path={'/package-details'}  element={<Package />}   />
          <Route path={'/test-instruction/start-test/:paperId/section'}  element={<CandidateTestStart />}   />
        </Routes>
      </Router>
       <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </PersistGate>
       {/* <NotifMessage /> */}
    </Provider>
  )
}

export default App

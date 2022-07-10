import React from 'react';
import {
  RecoilRoot, useRecoilState,
} from 'recoil';

import './App.css';

import Header from './components/Common/Header';
import BoundBall from './components/Common/BoundBall';
import { pageState } from './state/page';

import QuizPage from './pages/QuizPage';
import MistakePage from './pages/MistakePage';
import ResultPage from './pages/ResultPage';

function Current() {
  const [PageState] = useRecoilState(pageState);

  switch (PageState) {
    case 0: return <QuizPage />;
    case 1: return <MistakePage />;
    case 2: return <ResultPage />;
  }
  return <></>
}

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Header />
        <Current />
        <BoundBall />
      </div>
    </RecoilRoot>
  );
}

export default App;

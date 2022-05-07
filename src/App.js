import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Mistake from './components/Mistake';
import logo from './svg/logo.svg';
import './App.css';
// eslint-disable-next-line no-unused-vars
import { element } from 'prop-types';

class App extends Component {
  constructor(props) {
    // renderQuizでもってきたpropsをstateに変換して各メソッドで使えるように初期化している
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: '',
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // inputでonChangeイベントが発火したタイミングで下記ハンドルイベントが発火
  handleAnswerSelected(event) {
    // 下記でクリックイベントでクリックした値を取得
    this.setUserAnswer(event.currentTarget.value);


    console.log(event.currentTarget.value);

    if (event.currentTarget.value === 'Microsoft') {
    setTimeout(() => this.setMistake(this.getMistake()), 300);
    } else if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }


  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }

  getMistake() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  getResults() {
    // 参考になった箇所
    // App.jsで初期化したstateの値を各メソッドの中で再度関数として定義して、jsのメソッドを利用して
    // 欲しい値を取得（配列や文字列）する
    // stateで取得した値を直接は更新できない（更新するにはsetstateを利用する）から再度関数に入れて再度定義している
    const answersCount = this.state.answersCount;

    const answersCountKeys = Object.keys(answersCount);

    // ①どのtypeの回答が何回答えられたかカウントしている
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);

    // ②type別に回答された数が一番多い回数のみをカウント
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    // filterメソッドで実装された条件に合格した「すべての配列」からなる「新しい配列」を生成
    // ①と②で取得した一番多い回数と値を決めて取得
    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setMistake(mistake) {
    if (mistake.length === 1) {
      this.setState({ mistake: mistake[0] });
    } else {
      this.setState({ mistake: 'Mistake' });
    }
  }

  setResults(result) {
    // getResultsで配列の数が2つ以上だとUndeterminedを返す
    // 一番多い数が1つに絞れた配列の場合にresultとして配列の0番目（答え）を返している
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    return (
      // Quizファイルで運んできたpropsをstateにしてApp.jsのconstructorで初期化して各メソッドで利用できるようにしている
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        // inputのonchangeイベントで答えをクリックした時に下記でhandleAnswerSelectedを呼んでいる
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    // setResultsでstateにresultを追加された状態だった場合に、回答を出す
    return <Result quizResult={this.state.result} />;
  }

  renderMistake() {
    return <Mistake quizMistake={this.state.mistake} />;
  }

  judgment() {
    const mistakeCount = this.state.answersCount;
    const mistakeCountKeys = Object.keys(mistakeCount);

    console.log(mistakeCountKeys)
    
    // stateによって条件分岐している
    if (this.state.mistake) {
      return this.renderMistake();
    } else if (this.state.result) {
      return this.renderResult();
    } else {
      return this.renderQuiz();
    }
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div class="bound-container">
            <span class="ball"></span>
            <span class="shadow"></span>
          </div>
          <h2>Lobbing Quiz</h2>
        </div>
        {this.judgment()}
      </div>
    );
  }
}

export default App;

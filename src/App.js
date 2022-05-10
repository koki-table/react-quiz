import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import quizMistake from './api/quizMistake';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Mistake from './components/Mistake';
// import logo from './svg/logo.svg';
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
      answerOptions: shuffledAnswerOptions[0],
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

    // 選択したvalueによって条件分岐
    if (event.currentTarget.value === 'mistake1') {
    setTimeout(() => this.setMistake(), 300);
    } else if (event.currentTarget.value === 'mistake2') {
      setTimeout(() => this.setMistake(), 300);
    } else if (event.currentTarget.value === 'mistake3') {
      setTimeout(() => this.setMistake(), 300);
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

  // getMistake() {
  //   const answersCount = this.state.answersCount;
  //   const answersCountKeys = Object.keys(answersCount);
  //   const answersCountValues = answersCountKeys.map(key => answersCount[key]);
  //   const maxAnswerCount = Math.max.apply(null, answersCountValues);

  //   return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  // }

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
    // quizQuestionsのオブジェクトの要素を取得
    const quizMistakeText = quizMistake.map(mistake =>
      mistake.text
    );
    const quizMistakeCount = quizMistake.map(mistake =>
      mistake.count
    );


    console.log(quizMistakeText[0])

    // 下記の条件分岐でidの数によって、quizMistakeOptionsで渡す値を変更する。
    // 助長感は否めないけど、まずはそれでやってみる
    if (this.state.questionId === 1) {
      this.setState({ 
        result: [],
        // mistake: [],
        // mistakeText: quizMistakeText[1],
        // mistakeCount: quizMistakeCount[1]
      });
    } else if (this.state.questionId === 2) {
      this.setState({ 
        mistake: [],
        mistakeText: quizMistakeText[2],
        mistakeCount: quizMistakeCount[2]
      });
    } else if (this.state.questionId === 3) {
      this.setState({ 
        mistake: [],
        mistakeText: quizMistakeText[3],
        mistakeCount: quizMistakeCount[3]
      });
    } else if (this.state.questionId === 4) {
      this.setState({ 
        mistake: [],
        mistakeText: quizMistakeText[4],
        mistakeCount: quizMistakeCount[4]
      });
    } else if (this.state.questionId === 5) {
      this.setState({ 
        mistake: [],
        mistakeText: quizMistakeText[5],
        mistakeCount: quizMistakeCount[5]
      });
    } else if (this.state.questionId === 6) {
      this.setState({ 
        mistake: [],
        mistakeText: quizMistakeText[6],
        mistakeCount: quizMistakeCount[6]
      });
    } else if (this.state.questionId === 7) {
      this.setState({ 
        mistake: [],
        mistakeText: quizMistakeText[7],
        mistakeCount: quizMistakeCount[7]
      });
    } else if (this.state.questionId === 8) {
      this.setState({ 
        mistake: [],
        mistakeText: quizMistakeText[8],
        mistakeCount: quizMistakeCount[8]
      });
    } else if (this.state.questionId === 9) {
      this.setState({ 
        mistake: [],
        mistakeText: quizMistakeText[9],
        mistakeCount: quizMistakeCount[9]
      });
    } else if (this.state.questionId === 10) {
      this.setState({ 
        mistake: [],
        mistakeText: quizMistakeText[10],
        mistakeCount: quizMistakeCount[10]
      });
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
    return <Mistake quizMistake={this.state.mistake} quizMistakeCount={this.state.mistakeCount} quizMistakeText={this.state.mistakeText}/>;
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

  timer() {
    //DOM取得
    // const text = document.querySelector('.text');
    const text = document.getElementById('root')

    //JSXに埋め込む値
    const h2Text = "羊は何匹？";

    //カウントの初期値
    let counter = 30;

    let hitsuji =	() => {
      
      //カウントアップ
      if(counter>0) counter--;

      //JSXの中身
      const elm = (
      <section className="h2_elem">
        <h2>{ h2Text }</h2>
        <p>「羊が{ counter }匹…」</p>
      </section>
      );

      //レンダリング
      // eslint-disable-next-line no-undef
      ReactDOM.render(elm, text);
      
    };

    //タイマー処理
    setInterval(hitsuji, 1000);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className="bound-container">
            <span className="ball"></span>
            <span className="shadow"></span>
          </div>
          <h2>Lobbing Quiz</h2>
        </div>
        {this.judgment()}
        {this.timer()}
      </div>
    );
  }
}

export default App;

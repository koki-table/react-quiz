import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import quizMistake from './api/quizMistake';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Mistake from './components/Mistake';
import Rolling from './components/Rolling';
// eslint-disable-next-line no-unused-vars
// import logo from './svg/logo.svg';
import './App.css';
// eslint-disable-next-line no-unused-vars
import { element } from 'prop-types';
import ReactDOM from 'react-dom'
import { CSSTransitionGroup } from 'react-transition-group';
import lastImage from "./images/pages/index/last.jpg";
import mvImage from "./images/pages/index/mv_quiz_fix.jpg";
import YouTube from 'react-youtube';


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
      timerCount: 90,
      value: '',
      lastValue: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );

    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
    });

    this.timerCounter();
  }

  componentWillUnmount() {
    clearInterval(this.timerCounter());
  }

  // ラストの問題のみテキスト入力の判別
  handleChange(event) {
    this.setState({lastValue: event.target.value});
  }

  handleSubmit(event) {
    // let counterTimer = this.state.timerCount;
    if (this.state.lastValue === 'いくの') {
      // alert('An essay was submitted: ' + this.state.lastValue);
      // alert('ここまで遊んでくれて、ありがとうございます！！！');
      setTimeout(() => this.setResults(this.getResults()), 300);
      document.getElementsByClassName('last-question')[0].classList.remove('is-active--01') 
      event.preventDefault();
    } else if (this.state.lastValue === 'あきらめる') {
      // alert('ほんとありがとう！！');
      document.getElementsByClassName('last-question__text')[0].classList.remove('is-active') 
      document.getElementsByClassName('last-question__img')[0].classList.add('is-active') 
      event.preventDefault();
      // return false; 
    } else {
      alert('不正解、、カウント０になるまでチャレンジ可能です');
      event.preventDefault();
      // return false; 
    }
  }
  ///////////////////////////////////

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

    this.setState({value: event.target.value});


    console.log(event.currentTarget.value);

    // mapで取得したvulueの値が被った場合に、上手く機能しなかったので、無理矢理別の名前にして取得
    // 選択したvalueによって条件分岐
    if (event.currentTarget.value === 'mistake1') {
    setTimeout(() => this.setMistake(), 300);
    } else if (event.currentTarget.value === 'mistake2') {
      setTimeout(() => this.setMistake(), 300);
    } else if (event.currentTarget.value === 'mistake3') {
      setTimeout(() => this.setMistake(), 300);
    } else if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(this.lastQuestion()), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults(this.lastQuestion)), 300);
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
    clearTimeout(this.timerCounter);

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });

    // タイマー処理のメソッド呼び出し
    // this.timerCount();
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

  setMistake() {
    // quizQuestionsのオブジェクトの要素を取得
    const quizMistakeText = quizMistake.map(mistake =>
      mistake.text
    );
    const quizMistakeCount = quizMistake.map(mistake =>
      mistake.count
    );

    this.setState({timerCount: 0})
    

    console.log(quizMistakeText[0])

    // 下記の条件分岐でidの数によって、quizMistakeOptionsで渡す値を変更する。
    // 助長感は否めないけど、まずはそれでやってみる
    if (this.state.questionId === 1) {
      this.setState({ 
        // result: [],
        mistake: [],
        mistakeText: quizMistakeText[1],
        mistakeCount: quizMistakeCount[1]
      });
    } else if (this.state.questionId === 2) {
      this.setState({ 
        mistake: [],
        mistakeText: quizMistakeText[2],
        mistakeCount: quizMistakeCount[2],
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
    } else if (this.state.questionId === 11) {
      this.setState({ 
        mistake: [],
        mistakeText: quizMistakeText[11],
        mistakeCount: quizMistakeCount[11]
      });
    } else if (this.state.questionId === 12) {
      this.setState({ 
        mistake: [],
        mistakeText: quizMistakeText[12],
        mistakeCount: quizMistakeCount[12]
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
    clearInterval(this.timerCounter.timerCountDown)
    return <Result quizResult={this.state.result}/>;
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

  timerCounter() {
    //DOM取得
    const timerText = document.querySelector('.timer');
    
    //JSXに埋め込む値
    const text = "Time limit";
  
    //カウントの初期値
    // let counterTimer = 10;
    let counterTimer = this.state.timerCount;

    console.log(counterTimer)

    const timerCountDown =	() => {
      // quizQuestionsのオブジェクトの要素を取得
      const quizMistakeText = quizMistake.map(mistake =>
        mistake.text
      );
      const quizMistakeCount = quizMistake.map(mistake =>
        mistake.count
      );
        
      //カウントダウン
      if(counterTimer > 0) { 
        if(!this.state.result || !this.state.mistake) {
          counterTimer--
        }

        if (counterTimer === 65) {
          document.getElementsByClassName('timer-container--sub--01')[0].classList.add('is-active') 
        } else if (counterTimer === 40) {
          document.getElementsByClassName('timer-container--sub--02')[0].classList.add('is-active') 
        } else if (counterTimer === 15) {
          document.getElementsByClassName('timer-container--sub--03')[0].classList.add('is-active') 
        } 

        if(this.state.result) {
          counterTimer++
        }

      } else if (counterTimer === 0) {
        if (this.state.questionId === 1) {
          this.setState({ 
            mistake: [],
            mistakeText: quizMistakeText[1],
            mistakeCount: quizMistakeCount[1]
          });
          return;
        } else if (this.state.questionId === 2) {
          this.setState({ 
            mistake: [],
            mistakeText: quizMistakeText[2],
            mistakeCount: quizMistakeCount[2]
          });
          return;
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
        } else if (this.state.questionId === 11) {
          this.setState({ 
            mistake: [],
            mistakeText: quizMistakeText[11],
            mistakeCount: quizMistakeCount[11]
          });
        } else if (this.state.questionId === 12) {
          document.getElementsByClassName('last-question')[0].classList.remove('is-active--01') 
          this.setState({ 
            mistake: [],
            mistakeText: quizMistakeText[12],
            mistakeCount: quizMistakeCount[12]
          });
        }
      };
  
      //JSXの中身
      const elm = (
      <CSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={800}
      >
      <section className="timer-container">
        <p className='timer-text'>{ text }</p>
        <div className="bound-animation">
            <span className="ball"><span className='timer'>&ensp;{ counterTimer }</span></span>
            <span className="shadow"></span>
          </div>
      </section>
      </CSSTransitionGroup>
      );

      if (!this.state.mistake) {
        ReactDOM.render(elm, timerText);
        console.log("fffff")
      }
    };

    // if (this.state.result) {
    //   clearInterval(timerCountDown);
    // }

    // if (this.state.mistake) {
    //   clearInterval(timerCountDown);
    // }
  
    // return () => clearInterval(timerCountDown)
    //タイマー処理
    // 第一引数に処理、第二引数が時間
    if (!this.state.mistake) {
    setInterval(timerCountDown, 1000);
    }
  }

  lastQuestion() {
    if (this.state.questionId === 11) {
      document.getElementsByClassName('last-question')[0].classList.add('is-active--01') 
    } 
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Rolling/>      
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className='timer'></div>
        </div>
        {this.judgment()}
        {/* <div className='timer'></div> */}
        {/* {this.timerCount()} */}
        <section id='timer-container--sub--01' class="timer-container--sub--01"><div class="bound-animation"><span class="ball">い</span><span class="shadow"></span></div></section>
        <section class="timer-container--sub--02"><div class="bound-animation"><span class="ball">く</span><span class="shadow"></span></div></section>
        <section class="timer-container--sub--03"><div class="bound-animation"><span class="ball">の</span><span class="shadow"></span></div></section>
        {/* last-questionエリア */}
        <form className='last-question' onSubmit={this.handleSubmit}>
          <p className='last-question__sub-text'>※下記の動画は音声のみです
          <br/>※『ひらがな』で苗字を入力して『Final Answer』をクリック</p>
          <div className='video'>
            <YouTube videoId="fNaeF4Y9p7w" />
          </div>
          <label className='last-question__answer'>
            <input type="text" placeholder="こちらに回答入力" value={this.state.lastValue} onChange={this.handleChange}/>
          </label>
            <p className='last-question__text is-active'>もう無理だ、、ギブアップの<br/>そこのあなた『あきらめる』と<br/>入力して『Final Answer』をクリック</p>
            <div className='last-question__img'>
              <img src={lastImage} alt="あきらめるな"></img>
              <img className='none' src={mvImage} alt="mv"></img>
            </div>
          <input className='last-question__link' type="submit" value="Final Answer"/>
        </form>
      </div>
    );
  }
}

export default App;

import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { CSSTransitionGroup } from 'react-transition-group';
import { counterState } from '../../state/counter';

import './timer.css'

export default function Timer() {
  
    const [counter, setCounterState] = useRecoilState(counterState);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounterState(time => time - 1);
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={800}
        >
      <section className="timer-container">
        <p className='timer-text'>Time Linit</p>
        <div className="bound-animation">
            <span className="ball"><span className='timer'>&ensp;{ counter }</span></span>
            <span className="shadow"></span>
          </div>
      </section>
      </CSSTransitionGroup>
    )
}
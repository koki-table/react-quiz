import React from 'react'
import { useRecoilState } from 'recoil';

import { counterState } from '../../state/counter';

export default function BoundBall() {

    const [counter] = useRecoilState(counterState);

    if (counter === 65) {
        return <section id='timer-container--sub--01' class="timer-container--sub--01 is-active"><div class="bound-animation"><span class="ball"></span><span class="shadow"></span></div></section>
    }
    
    if (counter === 40) {
        return <section class="timer-container--sub--02"><div class="bound-animation is-active"><span class="ball"></span><span class="shadow"></span></div></section>
    }
    
    if (counter === 15) {
        return <section class="timer-container--sub--03"><div class="bound-animation is-active"><span class="ball"></span><span class="shadow"></span></div></section>
    } 

    return ( <></>)
}
import {
    atom, selector
} from 'recoil';

export const counterState = atom({
    key: 'counterState',
    default: 80, 
});

const counterActiveState = selector({
    key: 'counterActiveState', 
    get: ({get}) => {
      const counter = get(counterState);
  
      return counter >= 1? true: false;
    },
  });
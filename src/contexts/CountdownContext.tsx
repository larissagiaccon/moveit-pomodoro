import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinish: boolean;

  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChalleng } = useContext(ChallengesContext);

  const timeInitial = 0.05 * 60;
  const [time, setTime] = useState(timeInitial);
  const [isActive, setIsActive] = useState(false);
  const [hasFinish, setHasFinish] = useState(false);
  
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinish(false);
    setTime(timeInitial);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    } else if (isActive && time == 0) {
      setHasFinish(true);
      setIsActive(false);
      startNewChalleng();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinish,        

        startCountdown,
        resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  );

}


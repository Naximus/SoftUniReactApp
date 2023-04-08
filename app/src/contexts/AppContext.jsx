import { createContext } from 'react';


export const AppContext = createContext({
    currentClient: {},
    setCurrentUser: () => {},
    appToken: {},
    setAppToken: () => {},
    appUser: {},
    setAppUser: () => {},
    currentTrainer: {},
    setCurrentTrainer: () => {}
  });
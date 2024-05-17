type IState = {
  anya: string
}

type IReducerAction = {
  type: "ANYA_SAYS" | "ANYA_WAKO"
  payload?: any
}

export const getInitialState = (): IState => {
  return {
    anya: "I am Anya.",
  }
}

export const reducer = (state: IState, action: IReducerAction) => {
  switch (action.type) {
    case "ANYA_SAYS":
      return { ...state, anya: "I am Anya." }
    case "ANYA_WAKO":
      return { ...state, anya: "Wako Wako." }
    default:
      throw new Error("Unknown action type")
  }
}

/*
1. define the state type
2. define the action type
3. define the initial state
4. define the reducer
*/

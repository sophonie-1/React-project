import { fetchAPI } from "../api";
export const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today);
};

export const updateTimes = (state, action) => {
  if (action.type === "updateTimes") {
    return fetchAPI(action.NewDate);
  }
  return state;
};

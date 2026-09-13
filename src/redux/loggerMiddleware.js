export const loggerMiddleware = (store) => (next) => (action) => {
  console.log("до:", store.getState(), action.type);
  const res = next(action);
  console.log("после:", store.getState());
  return res;
};

const saved = localStorage.getItem("tasks");

const initialState = saved
  ? JSON.parse(saved)
  : [
      { id: 1, text: "Покушать", isComplete: true },
      { id: 2, text: "Поесть", isComplete: false },
      { id: 3, text: "Пообедать", isComplete: false },
    ];

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addTask":
      return [
        ...state,
        { id: Date.now(), text: action.payload, isComplete: false },
      ];
    case "toggleTask":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, isComplete: !task.isComplete }
          : task,
      );
    case "deleteTask":
      return state.filter((task) => task.id !== action.payload);
    case "editTask":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.text }
          : task,
      );
    case "clearCompleted":
      return state.filter((item) => item.isComplete === false);
    default:
      return state;
  }
};

export { taskReducer };

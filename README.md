# ToDo List — Redux Toolkit

Простое ToDo-приложение на React. Все данные о задачах хранятся в Redux store и управляются через Redux Toolkit (`createSlice`, `configureStore`).

## Функциональность

- добавление, редактирование, удаление задач;
- отметка задачи выполненной (toggle);
- фильтры: Все / Активные / Завершённые;
- сортировка: сначала новые / сначала старые;
- очистка выполненных задач;
- сохранение данных в `localStorage` — список задач не пропадает при перезагрузке страницы.

## Запуск проекта

```bash
npm install    # установка зависимостей
npm run dev    # запуск дев-сервера с горячей перезагрузкой
npm run build  # сборка production-версии в папку dist
npm run preview # локальный просмотр собранной production-версии
npm run lint   # проверка кода линтером (ESLint)
```

## Store

Store собирается в `src/app/store.js` через `configureStore` и состоит из трёх слайсов:

| Ключ store | Слайс | Что хранит |
|---|---|---|
| `state.tasks` | `todosSlice` | массив задач: `{ id, text, isComplete }` |
| `state.filter` | `filterSlice` | строка текущего фильтра: `"All"` / `"Active"` / `"Completed"` |
| `state.sort` | `sortSlice` | строка текущего порядка сортировки: `"newest"` / `"oldest"` |

## Slices

### `todosSlice` (`src/features/tasks/todosSlice.js`)
- `addTask` — добавляет новую задачу;
- `toggleTask` — переключает `isComplete` у задачи по `id`;
- `deleteTask` — удаляет задачу по `id`;
- `editTask` — меняет текст задачи;
- `clearCompleted` — оставляет в списке только невыполненные задачи.

### `filterSlice` (`src/features/filter/filterSlice.js`)
- `setFilter` — устанавливает активный фильтр (`All` / `Active` / `Completed`).

### `sortSlice` (`src/features/filter/sortSlice.js`)
- `setSortOrder` — устанавливает порядок сортировки (`newest` / `oldest`).

Компоненты читают состояние через `useSelector` и вызывают экшены через `useDispatch` — собственного дублирующего состояния задач в компонентах нет (кроме локального черновика текста при редактировании задачи).

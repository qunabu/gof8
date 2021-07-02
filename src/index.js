var grid = require("pixel-grid");

const toMatrix = (arr, width) =>
  arr.reduce(
    (rows, key, index) =>
      (index % width == 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    []
  );

const randomArray8 = (width, height) =>
  new Int8Array(width * height)
    .fill(0)
    .map((row) => (Math.random() >= 0.7 ? 1 : 0));

const gol8 = (state, COLS) => {
  return state.map((value, i) => {
    const liveNeighbors = [
      i - COLS - 1,
      i - COLS,
      i - COLS + 1,
      i - 1,
      i + 1,
      i + COLS - 1,
      i + COLS,
      i + COLS + 1,
    ].filter((neighbor) =>
      state[neighbor] == undefined ? false : state[neighbor] == 1
    ).length;
    return value == 1
      ? liveNeighbors == 2 || liveNeighbors == 3
        ? 1
        : 0
      : liveNeighbors == 3
      ? 1
      : 0;
  });
};

const init = (COLS, ROWS) => {
  let state = randomArray8(COLS, ROWS);

  const pixels = grid(toMatrix(state, COLS), {
    root: document.body,
    size: 4,
    padding: 1,
  });

  return () => {
    state = gol8(state, COLS);
    pixels.update(toMatrix(state, COLS));
  };
};

const nextState = init(150, 80);

const nextFrame = () => {
  nextState();
  window.requestAnimationFrame(nextFrame);
};

nextFrame();

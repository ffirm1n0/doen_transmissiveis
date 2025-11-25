const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const tileWidth = 16 * 4 * 2;
const tileHeight = 16 * 4;

const nRows = 7;
const nCols = 7;
const map = []; // 0 or 1
const mapTiles = [];

const nPeople = 2;
const people = [];

const locations = [];

let lastFrameTime = performance.now();

function drawLayout() {
  // TEMP ////////////////////////////////////////////
  // desenhar tiles contínuas
  ////////////////////////////////////////////////////
  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      if (map[row][col] == 0) continue;
      const x = tileWidth * (col / 2);
      const y =
        col % 2 == 0 ? tileHeight * row : tileHeight * row + tileHeight / 2;

      ctx.beginPath();

      if (col % 2 == 0) {
        if (map[row - 1]?.[col - 1] != 1) {
          ctx.moveTo(x, y + tileHeight / 2);
          ctx.lineTo(x + tileWidth / 2, y);
        }

        if (map[row - 1]?.[col + 1] != 1) {
          ctx.moveTo(x + tileWidth / 2, y);
          ctx.lineTo(x + tileWidth, y + tileHeight / 2);
        }

        if (map[row][col + 1] != 1) {
          ctx.moveTo(x + tileWidth, y + tileHeight / 2);
          ctx.lineTo(x + tileWidth / 2, y + tileHeight);
        }

        if (map[row][col - 1] != 1) {
          ctx.moveTo(x + tileWidth / 2, y + tileHeight);
          ctx.lineTo(x, y + tileHeight / 2);
        }
      } else {
        if (map[row][col - 1] != 1) {
          ctx.moveTo(x, y + tileHeight / 2);
          ctx.lineTo(x + tileWidth / 2, y);
        }

        if (map[row][col + 1] != 1) {
          ctx.moveTo(x + tileWidth / 2, y);
          ctx.lineTo(x + tileWidth, y + tileHeight / 2);
        }

        if (map[row + 1]?.[col + 1] != 1) {
          ctx.moveTo(x + tileWidth, y + tileHeight / 2);
          ctx.lineTo(x + tileWidth / 2, y + tileHeight);
        }

        if (map[row + 1]?.[col - 1] != 1) {
          ctx.moveTo(x + tileWidth / 2, y + tileHeight);
          ctx.lineTo(x, y + tileHeight / 2);
        }
      }

      ctx.lineWidth = 5;
      ctx.stokeStyle = "#000";
      ctx.stroke();

      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.fillText(`${row}, ${col}`, x + tileWidth / 2, y + tileHeight / 2);
    }
  }
  ////////////////////////////////////////////////////

  ctx.save();

  for (const caseIndex in cases) {
    const { pathHistory, isSelected, color } = cases[caseIndex];
    if (isSelected == false) continue;

    ctx.beginPath();

    for (const tileIndex in pathHistory) {
      const tile = pathHistory[tileIndex];

      const x = (tile.col + 1) * (tileWidth / 2);
      const y =
        tile.col % 2 == 0
          ? tile.row * tileHeight + tileHeight / 2
          : (tile.row + 1) * tileHeight;

      // const x = tileWidth * (tile.col / 2);
      // const y =
      //   tile.col % 2 == 0
      //     ? tileHeight * tile.row
      //     : tileHeight * tile.row + tileHeight / 2;

      if (tileIndex == 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }

    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  ctx.restore();
}

function animate() {
  const nowTime = performance.now();
  const deltaTime = (nowTime - lastFrameTime) / 1000; // converte ms → s
  lastFrameTime = nowTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLayout();

  // person
  for (let i = 0; i < nPeople; i++) {
    const person = people[i];
    person.update(deltaTime);
    person.draw();
  }

  // location
  for (let i = 0; i < locations.length; i++) {
    //
    const location = locations[i];
    location.draw();
  }

  requestAnimationFrame(animate);
}

function init() {
  const walkableTiles = []; // para randomizar posição inicial da pessoa

  //
  const randomDiseaseIndex = Math.floor(
    Math.random() * (DISEASES.length - 0.1) + 0.09
  );
  const selectedDisease = DISEASES[randomDiseaseIndex];
  const randomDiseaseLocationId =
    Math.random() * (selectedDisease.locationsIds.length - 0.1) + 0.09;

  // popular mapTiles array com tiles (base)
  for (let row = 0; row < nRows; row++) {
    mapTiles.push([]);
    for (let col = 0; col < nCols; col++) {
      const isWalkable = map[row][col] == 1; // 0: barrier; 1: path
      const tile = new Tile({ row, col });
      mapTiles[row].push(tile);

      tile.setConnectedTiles(isWalkable); // [] if not walkable
      if (isWalkable == true) walkableTiles.push({ row, col }); // para randomizar posição inicial da pessoa
    }
  }

  for (let i = 0; i < nPeople; i++) {
    const randomIndex = Math.floor(
      Math.random() * (walkableTiles.length - 0.1) + 0.09
    );

    const initialTileRowCol = walkableTiles[randomIndex];
    const person = new Person(initialTileRowCol);

    people.push(person);
  }

  for (let i = 0; i < LOCATIONS.length; i++) {
    const { locationRowCol, eventRowCol } = LOCATIONS[i];

    const location = new LocationTile(locationRowCol);
    location.setConnectedTiles(eventRowCol);
    mapTiles[locationRowCol.row][locationRowCol.col] = location;

    locations.push(location);

    const event = new EventTile(eventRowCol);
    event.setConnectedTiles(
      mapTiles[eventRowCol.row][eventRowCol.col].getPossiblePaths(null),
      locationRowCol
    );
    mapTiles[eventRowCol.row][eventRowCol.col] = event;

    if (randomDiseaseLocationId == i) return;
  }

  animate();
}

document.getElementById("init-btn").addEventListener("click", () => {
  init();
});

// TEMP //////////////////////////////////////////////
// selecionar tiles andáveis
//////////////////////////////////////////////////////
let prepareId;

function prepare() {
  drawTempLayout();

  prepareId = requestAnimationFrame(prepare);
}

function drawTempLayout() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      const x = tileWidth * (col / 2);
      const y =
        col % 2 == 0 ? tileHeight * row : tileHeight * row + tileHeight / 2;

      ctx.beginPath();

      ctx.moveTo(x, y + tileHeight / 2);
      ctx.lineTo(x + tileWidth / 2, y);
      ctx.lineTo(x + tileWidth, y + tileHeight / 2);
      ctx.lineTo(x + tileWidth / 2, y + tileHeight);
      ctx.lineTo(x, y + tileHeight / 2);

      if (map[row][col] == 0) ctx.fillStyle = "#600";
      if (map[row][col] == 1) ctx.fillStyle = "#fff";

      ctx.fill();
      ctx.stroke();
    }
  }
}

window.addEventListener("load", () => {
  canvas.width = Math.ceil(nCols / 2) * tileWidth;
  canvas.height = nRows * tileHeight + tileHeight / 2;

  for (let i = 0; i < nRows; i++) {
    const row = new Array(nCols).fill(0);
    map.push([...row]);
  }

  prepare();
});

canvas.addEventListener("click", (event) => {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  // decide which diagonal / or \
  const tempX = Math.floor(mouseX / (tileWidth / 2));
  const tempY = Math.floor(mouseY / (tileHeight / 2));

  let x1, y1, x2, y2;

  if ((tempX + tempY) % 2 == 0) {
    console.log("/");
    x1 = tempX * (tileWidth / 2);
    y1 = tempY * (tileHeight / 2) + tileHeight / 2;
    x2 = tempX * (tileWidth / 2) + tileWidth / 2;
    y2 = tempY * (tileHeight / 2);
  } else {
    console.log("\\");
    x1 = tempX * (tileWidth / 2);
    y1 = tempY * (tileHeight / 2);
    x2 = tempX * (tileWidth / 2) + tileWidth / 2;
    y2 = tempY * (tileHeight / 2) + tileHeight / 2;
  }

  const distance = (mouseX - x1) * (y2 - y1) - (mouseY - y1) * (x2 - x1);

  let row, col;

  if (tempY % 2 == 0) {
    row = distance > 0 ? Math.floor(tempY / 2) - 1 : Math.floor(tempY / 2);
  } else {
    row = Math.floor(tempY / 2);
  }

  if ((tempX + tempY) % 2 == 0) {
    col = distance > 0 ? tempX - 1 : tempX;
  } else {
    col = distance > 0 ? tempX : tempX - 1;
  }

  map[row][col] = map[row][col] == 0 ? 1 : 0;
});

document.getElementById("test-btn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cancelAnimationFrame(prepareId);
});
///////////////////////////////////////////////////////

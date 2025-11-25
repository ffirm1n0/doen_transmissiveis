class Tile {
  rowcol;
  connectedTiles = [];

  constructor({ row, col }) {
    this.rowcol = { row, col };
  }

  getCenterXY() {
    const { row, col } = this.rowcol;

    const x = (col + 1) * (tileWidth / 2);
    const y =
      col % 2 == 0 ? row * tileHeight + tileHeight / 2 : (row + 1) * tileHeight;

    return { x, y };
  }

  getRowCol() {
    return this.rowcol;
  }

  getPossiblePaths(lastTile) {
    // se rua sem saida, permitir que pessoa volte onde estava
    if (this.connectedTiles.length == 1) return this.connectedTiles;

    // se não, impedir que a pessoa volte para o mesmo caminho
    const lastTileRowCol = lastTile?.getRowCol();
    return this.connectedTiles.filter(
      (tile) =>
        !(tile.row == lastTileRowCol?.row && tile.col == lastTileRowCol?.col)
    );
  }

  setConnectedTiles(isWalkable) {
    if (isWalkable == false) return;

    const { row, col } = this.rowcol;
    const connectedTiles = this.connectedTiles;

    if (col % 2 == 0) {
      if (map[row - 1]?.[col - 1] == 1)
        connectedTiles.push({ row: row - 1, col: col - 1 });
      if (map[row - 1]?.[col + 1] == 1)
        connectedTiles.push({ row: row - 1, col: col + 1 });
      if (map[row]?.[col - 1] == 1) connectedTiles.push({ row, col: col - 1 });
      if (map[row]?.[col + 1] == 1) connectedTiles.push({ row, col: col + 1 });
    } else {
      if (map[row]?.[col - 1] == 1)
        connectedTiles.push({ row: row, col: col - 1 });
      if (map[row]?.[col + 1] == 1)
        connectedTiles.push({ row: row, col: col + 1 });
      if (map[row + 1]?.[col - 1] == 1)
        connectedTiles.push({ row: row + 1, col: col - 1 });
      if (map[row + 1]?.[col + 1] == 1)
        connectedTiles.push({ row: row + 1, col: col + 1 });
    }
  }
}

class EventTile extends Tile {
  constructor({ row, col }) {
    super({ row, col });
  }

  setConnectedTiles(possiblePaths, locationTileRowCol) {
    this.connectedTiles = [...possiblePaths, locationTileRowCol];
  }
}

class LocationTile extends Tile {
  isInfectionFocus = true;

  constructor({ row, col }) {
    super({ row, col });
  }

  draw() {
    const { row, col } = this.rowcol;

    const x = tileWidth * (col / 2);
    const y =
      col % 2 == 0 ? tileHeight * row : tileHeight * row + tileHeight / 2;

    ctx.beginPath();

    ctx.moveTo(x, y + tileHeight / 2);
    ctx.lineTo(x + tileWidth / 2, y);
    ctx.lineTo(x + tileWidth, y + tileHeight / 2);
    ctx.lineTo(x + tileWidth / 2, y + tileHeight);
    ctx.lineTo(x, y + tileHeight / 2);

    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
  }

  setConnectedTiles(eventTilesRowCol) {
    this.connectedTiles.push(eventTilesRowCol); // [{row, col}]
  }
}

class Person {
  currentTileRowCol;
  currentTileXY;
  nextTileRowCol;
  nextTileXY;
  pathHistory = [];

  progress = 1;
  speed = Math.random() * 0.75 + 0.75;

  isInLocation = false;
  inLocationTime = 0;

  isInfected = false;
  infectedTime = 0;

  hadInfection = false;

  constructor(initialTileRowCol) {
    this.currentTileRowCol = initialTileRowCol; // { row, col }
    this.nextTileRowCol = initialTileRowCol; // { row, col }
  }

  draw() {
    const diffX = this.nextTileXY.x - this.currentTileXY.x;
    const diffY = this.nextTileXY.y - this.currentTileXY.y;

    const screenX = this.currentTileXY.x + diffX * this.progress;
    const screenY = this.currentTileXY.y + diffY * this.progress;

    ctx.beginPath();
    ctx.arc(screenX, screenY, 10, 0, 2 * Math.PI);
    ctx.stroke();
  }

  update(deltaTime) {
    if (this.isInLocation && this.inLocationTime < 3) {
      this.inLocationTime += deltaTime;
      return;
    } else {
      this.speed = Math.random() * 0.75 + 0.75;
      this.isInLocation = false;
      this.inLocationTime = 0;
    }

    if (this.progress >= 1) {
      const { row, col } = this.nextTileRowCol;
      const nextTile = mapTiles[row][col];
      if (nextTile instanceof LocationTile) {
        this.isInLocation = true;
      }

      if (nextTile.isInfectionFocus == true && this.pathHistory.length == 10) {
        this.isInfected = true;
        this.infectedTime = 0;
      }

      if (this.isInfected == true && this.infectedTime > 3) {
        this.checkSymptonsStart();
      }

      this.savePathHistory();
      this.findNextTile();
      this.progress = 0;
    } else {
      if (this.isInfected == true) this.infectedTime += deltaTime;
      this.progress += this.speed * deltaTime;
    }
  }

  checkSymptonsStart() {
    const prob = Math.random();
    const threshold = 1 - this.infectedTime / 10;
    if (prob > threshold) {
      this.isInfected = false;
      this.infectedTime = 0;
      this.hadInfection = true;
      this.notifyCase();
    }
  }

  notifyCase() {
    // randomize symptons

    const r = Math.floor(Math.random() * (255 - 1) + 0.5);
    const g = Math.floor(Math.random() * (255 - 1) + 0.5);
    const b = Math.floor(Math.random() * (255 - 1) + 0.5);
    const color = `rgba(${r} ${g} ${b} / 0.5)`;

    const diseaseCase = {
      pathHistory: [...this.pathHistory],
      symptons: [],
      name: "",
      isSelected: true, // mudar dps
      color: color,
    };
    cases.push(diseaseCase);
    renderCases()
  }

  savePathHistory() {
    if (this.pathHistory.length == 10) this.pathHistory.shift();
    this.pathHistory.push(this.nextTileRowCol);
  }

  findNextTile() {
    const lastTile =
      mapTiles[this.currentTileRowCol.row][this.currentTileRowCol.col];
    const newCurrentTile =
      mapTiles[this.nextTileRowCol.row][this.nextTileRowCol.col];

    const possiblePaths = newCurrentTile.getPossiblePaths(lastTile);
    const randomIndex = Math.floor(
      Math.random() * (possiblePaths.length - 0.1) + 0.09
    );
    const nextTileRowCol = possiblePaths[randomIndex];

    const nextTile = mapTiles[nextTileRowCol.row][nextTileRowCol.col];

    this.currentTileRowCol = newCurrentTile.getRowCol();
    this.currentTileXY = newCurrentTile.getCenterXY();
    this.nextTileRowCol = nextTile.getRowCol();
    this.nextTileXY = nextTile.getCenterXY();
  }

  //

  // checkInfection() {

  //   const prob = Math.random();
  //   if (prob > 0) {
  //     //
  //     this.isInfected = true;
  //     this.infectedTime = 0;
  //   }
  // }
}

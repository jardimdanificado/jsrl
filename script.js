const gridSize = 10;
const tileWidth = 20;
const tileHeight = 20;

const tileImages = {
    empty: 'data/img/empty.png',
    wall: 'data/img/wall.png',
    player: 'data/img/player.png'
};

const gameContainer = document.getElementById('game');
const map = generateMap();

function generateMap() {
    const map = new Array(gridSize);

    for (let i = 0; i < gridSize; i++) {
        map[i] = new Array(gridSize).fill('empty');
    }

    // Create walls
    for (let i = 0; i < gridSize; i++) {
        map[0][i] = 'wall';
        map[i][0] = 'wall';
        map[gridSize - 1][i] = 'wall';
        map[i][gridSize - 1] = 'wall';
    }

    // Place player
    map[1][1] = 'player';

    return map;
}

function renderMap() {
    gameContainer.innerHTML = '';

    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const tileElement = document.createElement('div');
            tileElement.className = 'tile';
            tileElement.style.backgroundImage = `url(${tileImages[map[y][x]]})`;
            gameContainer.appendChild(tileElement);
        }
    }
}

renderMap();

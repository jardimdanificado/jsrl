let session = {};
session.tileSize = { x: 20, y: 20 };
session.viewRange = 10;
session.screen = {
  x: (session.viewRange * 2 + 1) * session.tileSize.x,
  y: (session.viewRange * 2 + 1) * session.tileSize.y, // Fixed the typo here
};
session.map = DungeonGenerator.generate({
  maxRoomSize: 7,
  minRoomSize: 7,
  padding: 2,
  rooms: 25,
  rows: 41,
  cols: 61,
});
session.tileset = {};
session.creature = [];
let buttonSize = 50;

function moveUp() {
    session.creature[0].position.y -= 1;
}

function moveLeft() {
    session.creature[0].position.x -= 1;
}

function moveRight() {
    session.creature[0].position.x += 1;
}

function moveDown() {
    session.creature[0].position.y += 1;
}

function setup() {
    session.creature[0] = {
        name: 'player',
        hp: 100,
        mp: 0,
        hunger: 0,
        position: { x: 15, y: 15 },
    };
    
    createCanvas(session.screen.x, session.screen.y); // Fixed using session.screen.y here
    session.tileset['player'] = loadImage('data/img/player.png');
    session.tileset['wall'] = loadImage('data/img/wall.png');
    session.tileset['empty'] = loadImage('data/img/empty.png');
    createButton('↑')
        .position(width / 2 - buttonSize / 2, height - buttonSize * 2)
        .size(buttonSize, buttonSize)
        .mousePressed(moveUp);

    createButton('←')
        .position(width / 2 - buttonSize * 1.5, height - buttonSize)
        .size(buttonSize, buttonSize)
        .mousePressed(moveLeft);

    createButton('→')
        .position(width / 2 + buttonSize / 2, height - buttonSize)
        .size(buttonSize, buttonSize)
        .mousePressed(moveRight);

    createButton('↓')
        .position(width / 2 - buttonSize / 2, height)
        .size(buttonSize, buttonSize)
        .mousePressed(moveDown);
}

function keyDown() 
{
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      moveLeft();
    } else if (keyCode === RIGHT_ARROW) {
      moveRight();
    } else if (keyCode === UP_ARROW) {
      moveUp();
    } else if (keyCode === DOWN_ARROW) {
      moveDown();
    }
}
  

function draw() 
{
  clear();
  keyDown();
  let startX = session.creature[0].position.x - session.viewRange;
  let startY = session.creature[0].position.y - session.viewRange;
  
  for (let x = startX; x <= session.creature[0].position.x + session.viewRange; x++) 
  {
    for (let y = startY; y <= session.creature[0].position.y + session.viewRange; y++) 
    {
      if (x >= 0 && y >= 0 && x < session.map.length && y < session.map[x].length) 
      {
        if (session.map[x][y] === 0)
          image(
            session.tileset['empty'],
            (x - startX) * session.tileSize.x,
            (y - startY) * session.tileSize.y
          );
        else if (session.map[x][y] === 1)
          image(
            session.tileset['wall'],
            (x - startX) * session.tileSize.x,
            (y - startY) * session.tileSize.y
          );
      }
    }
  }
  image(
    session.tileset['player'],
    session.viewRange * session.tileSize.x,
    session.viewRange * session.tileSize.y
  );
}


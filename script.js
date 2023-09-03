//import {matrixReplace}  from "./src/util.js"
let session = {};
session.tileSize = { x: 16, y: 16 };
session.viewRange = 10;
session.tilename = ['floor_r', 'wall_r', 'creature_human','floor_c','wall_c',"door_closed","door_open"];
session.tileset = [];
session.creature = [];
session.map = DungeonGenerator.generate({
    maxRoomSize: 7,
    minRoomSize: 7,
    padding: 2,
    rooms: 25,
    rows: 41,
    cols: 61,
});

function getTile(tilename) 
{
    return session.tileset[session.tilename[tilename]]
}

session.map = matrixReplace(session.map,
    [
        [1,0,1],
        [undefined,0,0],
    ],
    [
        [1,5,1],
        [undefined,0,0],
    ]
)

session.map = matrixReplace(session.map,
    [
        [1,0,1],
        [0,0,undefined],
    ],
    [
        [1,5,1],
        [0,0,undefined],
    ]
)

session.map = matrixReplace(session.map,
    [
        [0,0,undefined],
        [1,0,1],
    ],
    [
        [0,0,undefined],
        [1,5,1],
    ]
)

session.map = matrixReplace(session.map,
    [
        [undefined,0,0],
        [1,0,1],
    ],
    [
        [undefined,0,0],
        [1,5,1],
    ]
)

session.map = matrixReplace(session.map,
    [
        [1,undefined],
        [0,0],
        [1,0],
    ],
    [
        [1,undefined],
        [5,0],
        [1,0]
    ]
)

session.map = matrixReplace(session.map,
    [
        [1,0],
        [0,0],
        [1,undefined],
    ],
    [
        [1,0],
        [5,0],
        [1,undefined]
    ]
)

session.map = matrixReplace(session.map,
    [
        [0,1],
        [0,0],
        [undefined,1],
    ],
    [
        [0,1],
        [0,5],
        [undefined,1]
    ]
)

session.map = matrixReplace(session.map,
    [
        [undefined,1],
        [0,0],
        [0,1],
    ],
    [
        [undefined,1],
        [0,5],
        [0,1]
    ]
)

session.map = matrixReplace(session.map,
    [
        [1],
        [0],
        [1]
    ],
    [
        [4],
        [3],
        [4]
    ]
)

session.map = matrixReplace(session.map,
    [
        [5],
        [0],
        [1]
    ],
    [
        [5],
        [3],
        [4]
    ]
)

session.map = matrixReplace(session.map,
    [
        [1],
        [0],
        [5]
    ],
    [
        [4],
        [3],
        [5]
    ]
)


session.map = matrixReplace(session.map,
    [
        [1,0,1],
        []
    ],
    [
        [4,3,4],
        []
    ]
)

session.map = matrixReplace(session.map,
    [
        [1,0,5],
        []
    ],
    [
        [4,3,5],
        []
    ]
)

session.map = matrixReplace(session.map,
    [
        [5,0,1],
        []
    ],
    [
        [5,3,4],
        []
    ]
)

session.map = matrixReplace(session.map,
    [
        [4],
        [0]
    ],
    [
        [1],
        [0]
    ]
)

session.map = matrixReplace(session.map,
    [
        [0],
        [4]
    ],
    [
        [0],
        [1]
    ]
)

session.map = matrixReplace(session.map,
    [
        [0,4],
        []
    ],
    [
        [0,1],
        []
    ]
)

session.map = matrixReplace(session.map,
    [
        [4,0],
        []
    ],
    [
        [1,0],
        []
    ]
)

// Initialize session.screen
session.screen = 
{
    x: (session.viewRange * 2 + 1) * session.tileSize.x,
    y: (session.viewRange * 2 + 1) * session.tileSize.y,
};


// Function to load an image as a Promise
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

// Load all images and return a Promise that resolves when all images are loaded
function loadImages() {
    const imagePromises = session.tilename.map((imageName,i) => {
        const src = 'data/img/' + imageName + '.png';
        return loadImage(src).then((image) => {
            session.tileset.push(image);
            session.tilename[imageName] = i
        });
    });

    return Promise.all(imagePromises);
}

// Load images and then initialize and render the first frame
loadImages()
    .then(() => {
        initialize(); // Initialize after all images are loaded
        drawFrame(); // Render the first frame immediately
    })
    .catch((error) => {
        console.error('Failed to load images:', error);
    });

function moveUp() {
    session.creature[0].position.y -= 1;
    drawFrame();
}

function moveLeft() {
    session.creature[0].position.x -= 1;
    drawFrame();
}

function moveRight() {
    session.creature[0].position.x += 1;
    drawFrame();
}

function moveDown() {
    session.creature[0].position.y += 1;
    drawFrame();
}

function drawFrame() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const startX = session.creature[0].position.x - session.viewRange;
    const startY = session.creature[0].position.y - session.viewRange;

    for (let x = startX; x <= session.creature[0].position.x + session.viewRange; x++) 
    {
        for (let y = startY; y <= session.creature[0].position.y + session.viewRange; y++) 
        {
            if (x >= 0 && y >= 0 && x < session.map.length && y < session.map[x].length) 
            {
                const tileX = (x - startX) * session.tileSize.x;
                const tileY = (y - startY) * session.tileSize.y;
                ctx.drawImage(session.tileset[session.map[x][y]], tileX, tileY);
            }
        }
    }
    
    // Add the player image
    ctx.drawImage(getTile('creature_human'), session.viewRange * session.tileSize.x, session.viewRange * session.tileSize.y);
}

function initialize() 
{
    const canvas = document.getElementById('canvas');
    canvas.width = session.screen.x;
    canvas.height = session.screen.y;

    session.creature[0] = 
    {
        name: 'player',
        hp: 100,
        mp: 0,
        hunger: 0,
        position: { x: 15, y: 15 },
    };
}

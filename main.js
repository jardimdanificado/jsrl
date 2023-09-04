function getTile(tilename) 
{
    return session.tileset[session.tilename[tilename]]
}

// Function to load an image as a Promise
function loadImage(src) 
{
    return new Promise((resolve, reject) => 
    {
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
            session.tileset[i] = image
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

function checkCollision(x,y) 
{
    return(!(session.tilename[session.map[x][y]].includes("floor_") || session.tilename[session.map[x][y]].includes("door_open"))) 
}

function initialize() 
{
    const canvas = document.getElementById('canvas');
    canvas.width = session.screen.x;
    canvas.height = session.screen.y;
    session.creature[0] = new Creature("player")
    spawndebugbuttons() 
}

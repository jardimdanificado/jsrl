import * as util from "./src/util.js"
import * as session from "./src/session.js"
import * as creature from "./src/creature.js"
import { set_keydown,spawndebugbuttons } from "./src/input.js"
import { drawFrame } from "./src/render.js"
import * as text from "./src/text.js"

if(_session != undefined)
    _session = session

set_keydown(session)
var creatures = creature.creatures


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

    text.loadAlphabet(session,imagePromises,loadImage)

    return Promise.all(imagePromises);
}



function initialize()
{
    const canvas = document.getElementById('canvas');
    canvas.width = session.screen.x;
    canvas.height = session.screen.y;
    session.creature[0] = creatures.human(session,'joaozinho',51)
    spawndebugbuttons(session) 
}

loadImages()
    .then(() => {
        initialize(); // Initialize after all images are loaded
        drawFrame(session); // Render the first frame immediately
    })
    .catch((error) => {
        console.error('Failed to load images:', error);
    });

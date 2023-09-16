import * as util from "./src/util.js"
import * as session from "./src/session.js"
import * as creature from "./src/creature.js"
import { set_keydown,spawndebugbuttons } from "./src/input.js"
import { doFrame } from "./src/frame.js"
import { Window } from "./src/ui.js"
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
    const imagePromises = session.tilesetname.map((src) => {
        return loadImage('./data/img/' + src + '.png').then((image) => {
            session.tileset[src] = util.splitSpriteSheet(image,16,16)
        });
    });
    text.loadAlphabet(session,imagePromises,loadImage)
    return Promise.all(imagePromises);
}

function initialize()
{
    session.tilelink['floor_0'] = session.tileset.floor[11]
    session.tilelink['wall_0'] = session.tileset.wall[1]
    session.tilelink['door_open_0'] = session.tileset.door_open[8]
    session.tilelink['door_closed_0'] = session.tileset.door_closed[8]
    session.tilelink['creature_human_0'] = session.tileset.humanoid[2]
    session.tilelink['button_close_0'] = session.tileset.ui[0]
    const canvas = document.getElementById('canvas');
    canvas.width = session.screen.x;
    canvas.height = session.screen.y;
    session.creature[0] = creatures.human(session,'joaozinho',51)
    session.window[0] = new Window(session,canvas, "test window")
    spawndebugbuttons(session) 
}

loadImages()
    .then(() => {
        initialize();
        doFrame(session);
    })
    .catch((error) => {
        console.error('Failed to load images:', error);
    });

import * as text from "./text.js";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

export function drawFrame(session) 
{
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const startX = session.creature[0].position.x - session.viewRange;
    const startY = session.creature[0].position.y - session.viewRange;

    for (let x = startX; x <= session.creature[0].position.x + session.viewRange; x++) 
    {
        for (let y = startY; y <= session.creature[0].position.y + session.viewRange; y++) 
        {
            if (x >= 0 && y >= 0 && x < session.map.collision.length && y < session.map.collision[x].length) 
            {
                const tileX = (x - startX) * session.tileSize.x;
                const tileY = (y - startY) * session.tileSize.y;
                let sprite
                switch (session.map.collision[x][y]) 
                {
                    case 0:
                        sprite = session.tilelink[session.style.floor]
                        break;
                    case 5:
                        sprite = session.tilelink[session.style.floor]
                        break;
                    case 1:
                        sprite = session.tilelink[session.style.wall]
                        break;
                    default:
                        break;
                }
                ctx.drawImage(sprite, tileX, tileY);
                if (session.map.collision[x][y] == 5) 
                {
                    sprite = session.tilelink[session.style[session.map.door[x][y].open == true?'door_open':'door_closed']]
                    ctx.drawImage(sprite, tileX, tileY);
                }
            }
        }
    }
    text.printText(session,_name + ' v' + _ver,{x:0,y:canvas.height-8})
    // Add the player image
    ctx.drawImage(session.tileset.humanoid[0], session.viewRange * session.tileSize.x, (session.viewRange) * session.tileSize.y);
}
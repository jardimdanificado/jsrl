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
            if (x >= 0 && y >= 0 && x < session.map.tile.length && y < session.map.tile[x].length) 
            {
                const tileX = (x - startX) * session.tileSize.x;
                const tileY = (y - startY) * session.tileSize.y;
                if (session.map.tile[x][y] == 5) 
                {
                    let sprite = session.map.door[x][y].open ? 6 : 5;
                    ctx.drawImage(session.tileset[sprite], tileX, tileY);
                }
                else
                    ctx.drawImage(session.tileset[session.map.tile[x][y]], tileX, tileY);
            }
        }
    }
    text.printText(session,_name + ' v' + _ver,{x:0,y:canvas.height-8})
    // Add the player image
    ctx.drawImage(session.getTile('creature_human'), session.viewRange * session.tileSize.x, (session.viewRange) * session.tileSize.y);
    session.world.time += 1
}
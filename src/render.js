function drawFrame() 
{
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
    ctx.drawImage(getTile('creature_human'), session.viewRange * session.tileSize.x, (session.viewRange) * session.tileSize.y);
}
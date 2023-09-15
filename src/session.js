
export var world = {time:0};
export var tileSize = { x: 16, y: 16 };
export var viewRange = 10;
export var tilesetname = ['humanoid', 'floor', 'wall', 'door_closed', 'door_open'];
export var tileset = {};
export var tilelink = {}
export var style = 
{
    floor:'floor_0',
    wall:'wall_0',
    door_closed:'door_closed_0',
    door_open:'door_open_0',
}
export var creature = [];
export var ui = await import('./ui.js')

export var screen = 
{
    x: (viewRange * 2 + 1) * tileSize.x,
    y: (viewRange * 2 + 1) * tileSize.y,
};
export var map = (await import("./map.js"))._map

export function checkCollision(x,y) 
{
    if (map.door[x][y] === false) 
    {
        return(map.collision[x][y]) 
    }
    else
        return !(map.door[x][y].open)
}

export var alphabet = []

var scrollBox = document.querySelector('.logbox');
scrollBox.style.width = (((viewRange * 2 + 1) * tileSize.x)-2) + 'px';
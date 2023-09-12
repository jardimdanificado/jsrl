
export var time = 0;
export var tileSize = { x: 16, y: 16 };
export var viewRange = 10;
export var tilename = ['floor_r', 'wall_r', 'creature_human','floor_c','wall_c',"door_closed","door_open"];
export var tileset = [];
export var creature = [];
export var screen = 
{
    x: (viewRange * 2 + 1) * tileSize.x,
    y: (viewRange * 2 + 1) * tileSize.y,
};
export var map = (await import("./map.js"))._map

export function getTile(_tilename) 
{
    return tileset[tilename[_tilename]]
}

export function checkCollision(x,y) 
{
    if (map.door[x][y] === false) 
    {
        return(!(tilename[map.tile[x][y]].includes("floor_"))) 
    }
    else
        return !(map.door[x][y].open)
}
var session = {};
session.tileSize = { x: 16, y: 16 };
session.viewRange = 10;
session.tilename = ['floor_r', 'wall_r', 'creature_human','floor_c','wall_c',"door_closed","door_open"];
session.tileset = [];
session.creature = [];
session.screen = 
{
    x: (session.viewRange * 2 + 1) * session.tileSize.x,
    y: (session.viewRange * 2 + 1) * session.tileSize.y,
};
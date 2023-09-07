function move(creature, direction) {
    const x = creature.position.x;
    const y = creature.position.y;

    switch (direction) {
        case 'up':
            if (!checkCollision(x, y - 1)) {
                creature.position.y -= 1;
            } else if (session.map[x][y - 1] == 5 && roleta(2, 1) == 1) {
                session.map[x][y - 1] = roleta(0, 0, 0, 0, 0, 2, 1);
            }
            break;
        case 'down':
            if (!checkCollision(x, y + 1)) {
                creature.position.y += 1;
            } else if (session.map[x][y + 1] == 5 && roleta(2, 1) == 1) {
                session.map[x][y + 1] = 6;
            }
            break;
        case 'left':
            if (!checkCollision(x - 1, y)) {
                creature.position.x -= 1;
            } else if (session.map[x - 1][y] == 5 && roleta(2, 1) == 1) {
                session.map[x - 1][y] = roleta(0, 0, 0, 0, 0, 2, 1);
            }
            break;
        case 'right':
            if (!checkCollision(x + 1, y)) {
                creature.position.x += 1;
            } else if (session.map[x + 1][y] == 5 && roleta(2, 1) == 1) {
                session.map[x + 1][y] = roleta(0, 0, 0, 0, 0, 2, 1);
            }
            break;
        default:
            break;
    }
    drawFrame();
}

class Limb 
{
    condition = 100
    quality = 100
    storage = false
    storageType = false
    sublimb = false
    constructor(condition,quality,storage,sublimb)
    {
        
    }
}

class Body
{
    
}

class Creature 
{
    name = 'player'
    body = {
        food:100,
        water:100,

    }
    position = { x: 15, y: 15 }
    constructor(name, hp, mp, hunger, position) {
        this.name = name || 'player'
        this.hp = hp || 100
        this.mp = mp || 0
        if (!position) 
        {
            while (!session.tilename[session.map[this.position.x][this.position.y]].includes("floor_")) 
            {
                this.position.x = randi(0, session.map.length - 1)
                this.position.y = randi(0, session.map[0].length - 1)
            };
        }
        else
            this.position = position
        this.hunger = hunger
        let creature = this
        this.move =
        {
            up: function () { move(creature, 'up') },
            down: function () { move(creature, 'down') },
            left: function () { move(creature, 'left') },
            right: function () { move(creature, 'right') },
        }
    }
}


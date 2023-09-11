let util = await import("./util.js")
let DungeonGenerator = await import("./dungeon-generator.js")

export var _map = {}
_map.world = DungeonGenerator.generate({
    maxRoomSize: 15,
    minRoomSize: 3,
    padding: 0,
    rooms: 25,
    rows: 41,
    cols: 61,
});

_map.door = util.newMatrix(41,61,false)

_map.world = util.matrixReplace(_map.world,
    [
        [1,0,1],
        [undefined,0,0],
    ],
    [
        [1,5,1],
        [undefined,0,0],
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [1,0,1],
        [0,0,undefined],
    ],
    [
        [1,5,1],
        [0,0,undefined],
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [0,0,undefined],
        [1,0,1],
    ],
    [
        [0,0,undefined],
        [1,5,1],
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [undefined,0,0],
        [1,0,1],
    ],
    [
        [undefined,0,0],
        [1,5,1],
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [1,undefined],
        [0,0],
        [1,0],
    ],
    [
        [1,undefined],
        [5,0],
        [1,0]
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [1,0],
        [0,0],
        [1,undefined],
    ],
    [
        [1,0],
        [5,0],
        [1,undefined]
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [0,1],
        [0,0],
        [undefined,1],
    ],
    [
        [0,1],
        [0,5],
        [undefined,1]
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [undefined,1],
        [0,0],
        [0,1],
    ],
    [
        [undefined,1],
        [0,5],
        [0,1]
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [1],
        [0],
        [1]
    ],
    [
        [4],
        [3],
        [4]
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [5],
        [0],
        [1]
    ],
    [
        [5],
        [3],
        [4]
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [1],
        [0],
        [5]
    ],
    [
        [4],
        [3],
        [5]
    ]
)


_map.world = util.matrixReplace(_map.world,
    [
        [1,0,1],
        []
    ],
    [
        [4,3,4],
        []
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [1,0,5],
        []
    ],
    [
        [4,3,5],
        []
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [5,0,1],
        []
    ],
    [
        [5,3,4],
        []
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [4],
        [0]
    ],
    [
        [1],
        [0]
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [0],
        [4]
    ],
    [
        [0],
        [1]
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [0,4],
        []
    ],
    [
        [0,1],
        []
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [4,0],
        []
    ],
    [
        [1,0],
        []
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [5,1,5],
        []
    ],
    [
        [1,1,5],
        []
    ]
)

_map.world = util.matrixReplace(_map.world,
    [
        [5],
        [1],
        [5]
    ],
    [
        [5],
        [1],
        [1]
    ]
)

export class Door
{
    constructor(position,open = false,difficulty = 1, key = false)
    {
        this.position = position
        this.difficulty = difficulty
        this.open = open
        this.key = key
    }
}

_map.world.forEach((element,x) => 
    {
        element.forEach((element,y) => 
            {
                if (element == 5) 
                {
                    _map.door[x][y] = new Door({x:x,y:y},false)
                }
            }
        );
    }
);
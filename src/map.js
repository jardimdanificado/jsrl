session.map = DungeonGenerator.generate({
    maxRoomSize: 15,
    minRoomSize: 3,
    padding: 0,
    rooms: 25,
    rows: 41,
    cols: 61,
});

session.doormap = newMatrix(41,61,false)

session.map = matrixReplace(session.map,
    [
        [1,0,1],
        [undefined,0,0],
    ],
    [
        [1,5,1],
        [undefined,0,0],
    ]
)

session.map = matrixReplace(session.map,
    [
        [1,0,1],
        [0,0,undefined],
    ],
    [
        [1,5,1],
        [0,0,undefined],
    ]
)

session.map = matrixReplace(session.map,
    [
        [0,0,undefined],
        [1,0,1],
    ],
    [
        [0,0,undefined],
        [1,5,1],
    ]
)

session.map = matrixReplace(session.map,
    [
        [undefined,0,0],
        [1,0,1],
    ],
    [
        [undefined,0,0],
        [1,5,1],
    ]
)

session.map = matrixReplace(session.map,
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

session.map = matrixReplace(session.map,
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

session.map = matrixReplace(session.map,
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

session.map = matrixReplace(session.map,
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

session.map = matrixReplace(session.map,
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

session.map = matrixReplace(session.map,
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

session.map = matrixReplace(session.map,
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


session.map = matrixReplace(session.map,
    [
        [1,0,1],
        []
    ],
    [
        [4,3,4],
        []
    ]
)

session.map = matrixReplace(session.map,
    [
        [1,0,5],
        []
    ],
    [
        [4,3,5],
        []
    ]
)

session.map = matrixReplace(session.map,
    [
        [5,0,1],
        []
    ],
    [
        [5,3,4],
        []
    ]
)

session.map = matrixReplace(session.map,
    [
        [4],
        [0]
    ],
    [
        [1],
        [0]
    ]
)

session.map = matrixReplace(session.map,
    [
        [0],
        [4]
    ],
    [
        [0],
        [1]
    ]
)

session.map = matrixReplace(session.map,
    [
        [0,4],
        []
    ],
    [
        [0,1],
        []
    ]
)

session.map = matrixReplace(session.map,
    [
        [4,0],
        []
    ],
    [
        [1,0],
        []
    ]
)

session.map = matrixReplace(session.map,
    [
        [5,1,5],
        []
    ],
    [
        [1,1,5],
        []
    ]
)

session.map = matrixReplace(session.map,
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

class Door
{
    constructor(position,open = false,difficulty = 1, key = false)
    {
        this.position = position
        this.difficulty = difficulty
        this.open = open
        this.key = key
    }
}

session.map.forEach((element,x) => 
    {
        element.forEach((element,y) => 
            {
                if (element == 5) 
                {
                    session.doormap[x][y] = new Door({x:x,y:y},false)
                }
            }
        );
    }
);
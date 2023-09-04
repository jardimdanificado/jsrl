session.map = DungeonGenerator.generate({
    maxRoomSize: 15,
    minRoomSize: 3,
    padding: 0,
    rooms: 25,
    rows: 41,
    cols: 61,
});

session.map = matrixReplace(session.map,
    [
        [1,0,1],
        [undefined,0,0],
    ],
    [
        [1,roleta(0,0,0,0,0,5,1),1],
        [undefined,0,0],
    ]
)

session.map = matrixReplace(session.map,
    [
        [1,0,1],
        [0,0,undefined],
    ],
    [
        [1,roleta(0,0,0,0,0,5,1),1],
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
        [1,roleta(0,0,0,0,0,5,1),1],
    ]
)

session.map = matrixReplace(session.map,
    [
        [undefined,0,0],
        [1,0,1],
    ],
    [
        [undefined,0,0],
        [1,roleta(0,0,0,0,0,5,1),1],
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
        [roleta(0,0,0,0,0,5,1),0],
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
        [roleta(0,0,0,0,0,5,1),0],
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
        [0,roleta(0,0,0,0,0,5,1)],
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
        [0,roleta(0,0,0,0,0,5,1)],
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
        [roleta(0,0,0,0,0,5,1)],
        [0],
        [1]
    ],
    [
        [roleta(0,0,0,0,0,5,1)],
        [3],
        [4]
    ]
)

session.map = matrixReplace(session.map,
    [
        [1],
        [0],
        [roleta(0,0,0,0,0,5,1)]
    ],
    [
        [4],
        [3],
        [roleta(0,0,0,0,0,5,1)]
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
        [1,0,roleta(0,0,0,0,0,5,1)],
        []
    ],
    [
        [4,3,roleta(0,0,0,0,0,5,1)],
        []
    ]
)

session.map = matrixReplace(session.map,
    [
        [roleta(0,0,0,0,0,5,1),0,1],
        []
    ],
    [
        [roleta(0,0,0,0,0,5,1),3,4],
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
        [1,1,roleta(0,0,0,0,0,5,1)],
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
        [roleta(0,0,0,0,0,5,1)],
        [1],
        [1]
    ]
)

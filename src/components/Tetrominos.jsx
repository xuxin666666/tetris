export const TETROMINOS = {
    0: {
        shape: [[0]],
        color: 'white'
    },
    I: {
        shape: [
            [
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
            ],
            [
                [0, 0, 0, 0],
                ['I', 'I', 'I', 'I'],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
        ],
        color: 'red'
    },
    J: {
        shape: [
            [
                [0, 'J', 0],
                [0, 'J', 0],
                ['J', 'J', 0],
            ],
            [
                ['J', 0, 0],
                ['J', 'J', 'J'],
                [0, 0, 0],
                
            ],
            [
                [0, 'J', 'J'],
                [0, 'J', 0],
                [0, 'J', 0],
            ],
            [
                [0, 0, 0],
                ['J', 'J', 'J'],
                [0, 0, 'J'],
            ],
        ],
        color: 'orange'
    },
    L: {
        shape: [
            [
                [0, 'L', 0],
                [0, 'L', 0],
                [0, 'L', 'L'],
            ],
            [
                [0, 0, 0],
                ['L', 'L', 'L'],
                ['L', 0, 0],
                
            ],
            [
                ['L', 'L', 0],
                [0, 'L', 0],
                [0, 'L', 0],
            ],
            [
                [0, 0, 'L'],
                ['L', 'L', 'L'],
                [0, 0, 0],
            ],
        ],
        color: 'yellow'
    },
    O: {
        shape: [
            [
                ['O', 'O'],
                ['O', 'O'],
            ]
        ],
        color: 'green'
    },
    S: {
        shape: [
            [
                [0, 'S', 'S'],
                ['S', 'S', 0],
                [0, 0, 0],
            ],
            [
                [0, 'S', 0],
                [0, 'S', 'S'],
                [0, 0, 'S'],
            ],
        ],
        color: 'cyan'
    },
    T: {
        shape: [
            [
                [0, 'T', 0],
                ['T', 'T', 'T'],
                [0, 0, 0],
            ],
            [
                [0, 'T', 0],
                [0, 'T', 'T'],
                [0, 'T', 0],
            ],
            [
                [0, 0, 0],
                ['T', 'T', 'T'],
                [0, 'T', 0],
            ],
            [
                [0, 'T', 0],
                ['T', 'T', 0],
                [0, 'T', 0],
            ],
        ],
        color: 'blue'
    },
    Z: {
        shape: [
            [
                ['Z', 'Z', 0],
                [0, 'Z', 'Z'],
                [0, 0, 0],
            ],
            [
                [0, 0, 'Z'],
                [0, 'Z', 'Z'],
                [0, 'Z', 0],
            ],
        ],
        color: 'purple'
    }
}

export const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino =
      tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randTetromino];
  };
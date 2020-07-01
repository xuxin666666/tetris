import React from 'react'
import Display from './Display'
import { StyleMainContent, StyleMenu } from '../styles/StyleMainContent'
import { TETROMINOS, randomTetromino } from './Tetrominos'
import ButteryHatch from './ButteryHatch'
import Pause from './Pause'
import UpComing from './UpComing'
import '../styles/Menu.css'

export default class MainContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // stage: Array.from(Array(20), () => Array(10).fill([0, 'motivate'])),
            // isPause: true,
            // speed: 1000,
            // scores: 0,
            // gameOver: false,
            // tetromino: randomTetromino().shape,
            // prevTetromino: null,
            // player: { pos: { x: 0, y: 0 }, tetromino: null, moveable: true },
            // start: false,
        }
        this.imagesrc = React.createRef()
        this.button = React.createRef()
    }

    componentDidMount() {
        this.image()
        // this.setTetromino()
    }

    componentDidUpdate() {
        this.gameOver(this.state.gameOver)
    }

    prestartGame = () => {
        if (!this.state.started) {
            this.setState({
                stage: Array.from(Array(20), () => Array(10).fill([0, 'motivate'])),
                isPause: false,
                speed: 1000,
                scores: 0,
                gameOver: false,
                tetromino: randomTetromino().shape,
                prevTetromino: null,
                player: { pos: { x: 0, y: 0 }, tetromino: null, moveable: true },
                started: true,
                haveGameOver: false
            }, function () {
                this.button.click()
            })
        }
    }

    startGame = () => {
        this.speed()
        this.setTetromino()
        var thi = this
        var drop = setInterval(dropping, this.state.speed);
        function dropping() {
            thi.drop()
            clearInterval(drop)
            if (!thi.state.haveGameOver)
                drop = setInterval(dropping, thi.state.speed)
        }

    }

    gameOver = (gameOver) => {
        if (gameOver) {
            setTimeout(() => {
                alert('GAME OVER!!!')
                this.setState({
                    isPause: true,
                    started: false,
                    gameOver: false,
                    haveGameOver: true
                })
                var image = this.imagesrc.current
                image.src = 'image/button1.png'
                image.title = '点击开始游戏'
            }, 200)
        }
    }

    setTetromino = () => {
        var block = this.state.tetromino
        if (!this.state.isPause) {
            this.setState({
                player: {
                    pos: { x: 3, y: 0 },
                    tetromino: block[0],
                    moveable: true
                },
                prevTetromino: block,
                tetromino: randomTetromino().shape
            }, function () {
                this.updateStage()
            })
        }
    }

    updateStage = () => {
        var newStage = this.state.stage.map(row =>
            row.map(cell => (cell[1] === 'motivate' ? [0, 'motivate'] : cell))
        );
        var player = this.state.player
        var gameover = this.state.gameOver
        player.tetromino.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    if (newStage[y + player.pos.y][x + player.pos.x][1] === 'static') {
                        gameover = true
                    }
                    newStage[y + player.pos.y][x + player.pos.x] = [
                        value,
                        `${!player.moveable ? 'static' : 'motivate'}`
                    ];
                }
            });
        });
        this.setState({
            stage: newStage,
            gameOver: gameover
        })
        if (!player.moveable) {
            this.sweep(newStage)
        }
    }

    sweep = (newStage) => {
        var score = this.state.scores
        var stage = []
        for (var i = 0; i < 20; i++) {
            var flag = 0
            for (var j = 0; j < 10; j++) {
                if (newStage[i][j][1] === 'static')
                    flag++
            }
            if (flag === 10) {
                score += 10
                stage.unshift(new Array(10).fill([0, 'motivate']))
            } else {
                stage.push(newStage[i])
            }
        }
        this.setState({
            scores: score,
            stage: stage
        })
        this.setTetromino()
    }

    onKeyDown = (e) => {
        if (!this.state.isPause) {
            if (e.keyCode === 87 || e.keyCode === 38)
                this.rotate()
            if (e.keyCode === 65 || e.keyCode === 37) {
                this.moveBlock(-1)
            }
            if (e.keyCode === 68 || e.keyCode === 39) {
                this.moveBlock(1)
            }
            if (e.keyCode === 83 || e.keyCode === 40)
                this.drop()
            if (e.keyCode === 85)
                this.rise()
        }
    }

    rotate = () => {
        var stage = this.state.stage
        var player = this.state.player
        var Tetromino = this.state.prevTetromino
        var j = 0, flag11 = 1, flag12 = 0, flag21 = 1, flag22 = 0, deriction
        for (var i = 0; i < Tetromino.length; i++) {
            if (Tetromino[i] === player.tetromino) {
                if (i === Tetromino.length - 1) j = 0
                else j = i + 1
                for (var m = 0; m < player.tetromino.length; m++) {
                    for (var n = 0; n < player.tetromino[0].length; n++) {
                        if (player.tetromino[m][n] !== 0) {
                            if (n + player.pos.x === 0) {
                                deriction = 'left'
                            } else if (stage[m + player.pos.y][n + player.pos.x - 1][1] !== 'motivate') {
                                deriction = 'left'
                            }
                            if (n + player.pos.x === 9) {
                                deriction = 'right'
                            } else if (stage[m + player.pos.y][n + player.pos.x + 1][1] !== 'motivate') {
                                deriction = 'right'
                            }
                        }
                    }
                    if (player.tetromino[m][0] !== 0) flag11 = 0
                    if (Tetromino[j][m][0] !== 0) flag12 = 1
                    if (player.tetromino[m][player.tetromino.length - 1] !== 0) flag21 = 0
                    if (Tetromino[j][m][player.tetromino.length - 1] !== 0) flag22 = 1
                }
                switch (deriction) {
                    case 'left':
                        if (flag11 && flag12) player.pos.x += 1
                        break
                    case 'right':
                        if (flag21 && flag22) player.pos.x -= 1
                        if (player.tetromino === TETROMINOS['I'].shape[0]) player.pos.x -= 1
                }
                player.tetromino = Tetromino[j]
                if (this.checkTetromino(player, stage, { x: 0, y: 0 })) {
                    this.setState({
                        player: player
                    })
                    this.updateStage()
                    return
                }
            }
        }
    }

    rise = () => {
        var player = this.state.player
        var stage = this.state.stage
        if (this.checkTetromino(player, stage, { x: 0, y: -1 })) {
            player.pos.y -= 1
            this.setState({
                player: player
            })
            this.updateStage()
        }
    }

    moveBlock = e => {
        var player = this.state.player
        var stage = this.state.stage
        if (this.checkTetromino(player, stage, { x: e, y: 0 })) {
            player.pos.x += e
            this.setState({
                player: player
            })
            this.updateStage()
        }
    }

    checkTetromino = (player, stage, { x: X, y: Y }) => {
        for (var i = 0; i < player.tetromino.length; i++) {
            for (var j = 0; j < player.tetromino[i].length; j++) {
                if (player.tetromino[i][j] !== 0) {
                    if (!stage[i + player.pos.y + Y] || !stage[i + player.pos.y + Y][j + player.pos.x + X] || stage[i + player.pos.y + Y][j + player.pos.x + X][1] !== 'motivate')
                        return false
                }
            }
        }
        return true
    }

    drop = () => {
        if (!this.state.isPause) {
            var player = this.state.player
            var stage = this.state.stage
            if (this.checkTetromino(player, stage, { x: 0, y: 1 })) {
                player.pos.y += 1
            } else {
                player.moveable = false
            }
            this.setState({
                player: player
            })
            this.updateStage()
        }
    }

    speed = () => {
        var speed = this.state.speed
        var flag = 0, flag2 = 20
        var checkIsPause = true
        var con1, controlspeed1
        var timeKeeping = setInterval(() => {
            flag += 1
            if (flag > flag2) flag = 1
            if (speed === 400)
                clearInterval(timeKeeping)
        }, 1000)
        var controlspeed = setInterval(() => {
            speed = speed - 100
            this.setState({
                speed: speed
            })
            if (speed === 400)
                clearInterval(controlspeed)
        }, 20000);
        var con = setInterval(() => {
            if (speed <= 400) {
                clearInterval(con)
                clearInterval(timeKeeping)
            }
            if (speed > 400 && !this.state.isPause && !checkIsPause) {
                checkIsPause = true
                con1 = setTimeout(() => {
                    speed -= 100
                    flag2 = 50
                    this.setState({
                        speed: speed
                    })
                    controlspeed1 = setInterval(() => {
                        if (speed === 400)
                            clearInterval(controlspeed)
                        if (speed > 400) {
                            speed = speed - 100
                            this.setState({
                                speed: speed
                            })
                        }
                    }, 20000);
                }, flag2 * 1000)
            }
            if (speed > 400 && this.state.isPause && checkIsPause) {
                clearInterval(controlspeed)
                clearInterval(controlspeed1)
                clearTimeout(con1)
                flag2 -= flag
                flag = 0
                checkIsPause = false
            }
        }, 500)
        var con2 = setInterval(() => {
            if (this.state.scores >= 300) {
                clearInterval(controlspeed)
                if(this.state.scores < 500)
                    this.setState({
                        speed: 70000 / this.state.scores + 120
                    })
                else
                    this.setState({
                        speed: 50000 / this.state.scores + 120
                    })
            }
        }, 1000)
        var test = setInterval(() => {
            if (this.state.haveGameOver) {
                clearInterval(controlspeed)
                clearInterval(controlspeed1)
                clearInterval(con)
                clearInterval(con2)
                clearInterval(timeKeeping)
                clearTimeout(con1)
                clearInterval(test)
            }
        }, 1000)
    }

    image = () => {
        var image = this.imagesrc.current
        var setstate = this
        image.onmousedown = function () {
            image.style.height = 95 + 'px'
            image.style.width = 95 + 'px'
            image.onmouseup = function () {
                image.style.height = 100 + 'px'
                image.style.width = 100 + 'px'
                if (image.src === window.location.href + 'image/button1.png') {
                    image.src = 'image/button2.png'
                    image.title = '点击暂停游戏'
                    setstate.setState({
                        isPause: false
                    })
                }
                else if (image.src === window.location.href + 'image/button2.png') {
                    image.src = 'image/button1.png'
                    image.title = '点击继续游戏'
                    setstate.setState({
                        isPause: true
                    })
                }
            }
        }

    }

    render() {
        return (
            <StyleMainContent onKeyDown={e => this.onKeyDown(e)} tabIndex="0">
                {this.state.started ? this.state.isPause ?
                    (<Pause speed={this.state.speed} />) : (<Display stage={this.state.stage} />) : (<UpComing />)}
                <aside>
                    <StyleMenu>
                        <p id="p1">下一个方块</p>
                        <div id="div21">
                            {this.state.started ? (<ButteryHatch tetromino={this.state.tetromino[0]} />) : (<div></div>)}
                        </div>
                        <p id="p2">目前得分</p>
                        <p id="p3">{this.state.scores}</p>
                        <img src="image/button1.png" alt="" title="点击开始游戏" id="image1" ref={this.imagesrc} onClick={this.prestartGame}></img>
                        <p id="p4">操作说明</p>
                        <table id="table1">
                            <tbody>
                                <tr><td className='t1'>W/&uarr;</td><td className='t2'>改变方向</td></tr>
                                <tr><td className='t1'>S/&darr;</td><td className='t2'>向下加速</td></tr>
                                <tr><td className='t1'>A/&larr;</td><td className='t2'>向左移动</td></tr>
                                <tr><td className='t1'>D/&rarr;</td><td className='t2'>向右移动</td></tr>
                            </tbody>
                        </table>
                        <button ref={e => this.button = e} onClick={this.startGame} style={{ display: 'none' }}></button>
                    </StyleMenu>
                </aside>
            </StyleMainContent>
        )
    }
}

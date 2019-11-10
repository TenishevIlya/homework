/**
 Заносим игроков. Организуем турнирную сетку в два круга между игроками
 Выводим результаты в консоль.
 Запуск через node sample.js
 */

'use strict';

let players = ['Alexey','Artur','Kirill','Vlad'];

class Game {
    constructor({player1, player2}) {
        this.player1 = player1;
        this.player2 = player2;
    }

    playGame() {
        let player1Win = Math.round(Math.random());
        switch (player1Win) {
            case 1:
                this.isPlayer1Win = true;
                console.info(this.player1, '1 - 0', this.player2);
            case 0:
                if (!this.isPlayer1Win) {
                    console.info(this.player1, '0 - 1', this.player2);
                }
        }
    }
}

class Championship {
    constructor(players) {
        this.players = players;
        this.firstRound = [];
        this.secondRound = [];
        this.finalResults = [];
        this.setFirstRound();
        this.setSecondRound();
    }


    setFirstRound() {
        for (let i = 0; i < this.players.length; i++) {
            for (let j = 0; j < this.players.length; j++) {
                if (i < j) {
                    this.firstRound.push(new Game({player1: this.players[i], player2: this.players[j]}));
                }
            }
        }
        this.finalResults.push(...this.firstRound);
    }

    setSecondRound() {
        for (let i = 0; i < this.players.length; i++) {
            for (let j = 0; j < this.players.length; j++) {
                if (i < j) {
                    this.secondRound.push(new Game({player1: this.players[i], player2: this.players[j]}));
                }
            }
        }
        this.finalResults.push(...this.secondRound);
    }


    beginChampionship() {
        let countMatches = 0;
        this.finalResults.map((game) => {
            if (countMatches === 0) {
                console.log('FIRST ROUND');
            }
            game.playGame()
            countMatches++;
            if (countMatches === this.finalResults.length/2) {
                console.log('SECOND ROUND');
            }
        });
    }

    showResults() {
        return this.finalResults.reduce((prev, current) => {
            if (current.isPlayer1Win) {
                return {
                    ...prev,
                    [current.player1]: (prev[current.player1] || 0) + 1,
                    [current.player2]: (prev[current.player2] || 0)
                }
            }

            return {
                ...prev,
                [current.player1]: (prev[current.player1] || 0),
                [current.player2]: (prev[current.player2] || 0) + 1
            }
        }, {})
    }
}


const champinonship = new Championship(players);
champinonship.beginChampionship();
console.info('Results', champinonship.showResults());
/* jshint esversion: 6 */

function init_ship(type, spaces) {
    var full_name;
    switch (type) {
        case "S":
            full_name = "Submarine";
            break;
        case "B":
            full_name = "Battleship";
            break;
        case "A":
            full_name = "Aircraft Carrier";
            break;
        default:
            full_name = "undentified";
    }
    return {
        type: type,
        spaces: spaces || [],
        sunk: false,
        full_name: full_name
    };
}

function init_player(name, ships) {
    return {
        name: name || "",
        ships: ships || [],
        ocean_guesses: [],
    };
}

function init_board(p1_name, p2_name) {
    return {
        p1: init_player(p1_name),
        p2: init_player(p2_name),
        root_elem: document.getElementById("ctr"),
        width: 10,
        height: 10,
    };
}

function init_game(test) {
    test = test || false;

    if (test) {
        var p1_name = prompt("What is your name?"),
            p1_ships = "A(A1-A5); B(B6-E6); S(H3-J3);", // prompt("Where are your ships?"),
            p2_name = prompt("What is your name?"),
            p2_ships = "A(A1-A5); B(B6-E6); S(H3-J3);"; //prompt("Where are your ships?");

        board = init_board(p1_name, p2_name);

        // "A(A1-A5); B(B6-E6); S(H3-J3);"
        Array.prototype.push.apply(board.p1.ships, parse_ships(p1_ships));
        Array.prototype.push.apply(board.p2.ships, parse_ships(p2_ships));

        redraw_table(board, true, false);
    }

}

function redraw_table(board, p1_turn, p2_turn, end) {
    end = end || false;

    // clear out preexisting contents
    board.root_elem.innerHTML = "";

    // add/generate tables for each player
    var player_info = [{
        player: board.p1, 
        visible: p1_turn
    }, {
        player: board.p2, 
        visible: p2_turn
    }];

    if (p1_turn){
        player_info.reverse();
    }

    player_info.forEach(function(obj) {
        // create alert
        if (obj.visible && !end) {
            alert("Press OK to begin " + obj.player.name + "'s turn.");
        }

        // add name to board
        var name_header_elem = document.createElement("h2");
        name_header_elem.innerHTML = obj.player.name;
        name_header_elem.classList.add("text-center");
        board.root_elem.appendChild(name_header_elem);

        // create table
        var table = document.createElement("div");
        table.classList.add("table");

        // create label row TODO

        // iterate over rows
        [...Array(board.height).keys()].forEach(function(row) {
            var row_elem = document.createElement("div");
            row_elem.classList.add("row");
            row_elem.classList.add("justify-content-center");

            // create label column TODO
            
            // populate row with spaces
            [...Array(board.width).keys()].map(val => String.fromCharCode(val + 65))
            .forEach(function(col) {
                var col_elem = document.createElement("div");
                col_elem.classList.add("col-1");
                col_elem.classList.add("text-center");

                if (obj.player.ocean_guesses.includes(col+row)) {
                    // check for guesses
                    col_elem.innerHTML = "X";
                    if ([].concat.apply([], obj.player.ships.map(elem => elem.spaces)).includes(col+row)) {
                        col_elem.classList.add("hit");
                    } else {
                        col_elem.classList.add("miss");
                    }
                } else if (obj.visible) {
                    // check for ships
                    obj.player.ships.forEach(function(ship) {
                        if (ship.spaces.includes(col+row)) {
                            col_elem.innerHTML = ship.type;
                            col_elem.classList.add("ship");
                        }
                    });
                }

                if (obj.visible == false && !obj.player.ocean_guesses.includes(col+row)) {
                    col_elem.addEventListener('click', function(){
                        onclick_handler(board, obj.player, col+row, p1_turn, p2_turn);
                    }, false);
                }

                if (col_elem.innerHTML == "") {
                    // default to ocean
                    col_elem.innerHTML = "O";
                    col_elem.classList.add("ocean");
                }
                
                // add col to row
                row_elem.appendChild(col_elem);
            });

            // add row to table
            table.appendChild(row_elem);
        });

        // add child table
        board.root_elem.appendChild(table);
    });

    // draw leaderboard if there is one
    if (localStorage.leaderboard) {
        var leaderboard_elem = document.createElement("h2");
        leaderboard_elem.innerHTML = "Leaderboard";
        leaderboard_elem.classList.add("text-center");
        board.root_elem.appendChild(leaderboard_elem);

        JSON.parse(localStorage.leaderboard).forEach(function(obj) {
            var highscore_elem = document.createElement("h5");
            highscore_elem.innerHTML = obj.name + " " + obj.points;
            highscore_elem.classList.add("text-center");
            board.root_elem.appendChild(highscore_elem);
        });
    }
}

function onclick_handler(board, player, space, p1_turn, p2_turn) {
    player.ocean_guesses.push(space);
    if ([].concat.apply([], player.ships.map(elem => elem.spaces)).includes(space)) {
        alert("That was a hit! Good job!");
        check_ships(player);
    } else {
        alert("That was a miss! Better luck next time!");
    }
    if (!check_win(board)) {
        redraw_table(board, !p1_turn, !p2_turn);
    } else {
        redraw_table(board, true, true, true);
    }
}

function check_win(board) {
    var player_props = [{player: board.p1, winner: board.p2}, {player: board.p2, winner: board.p1}];
    for (var i = 0; i < player_props.length; i++) {
        if (player_props[i].player.ships.reduce((cnt, ship) => ship.sunk?cnt+1:cnt, 0) == player_props[i].player.ships.length) {
            // all ships sunk, we have a winner
            
            // calculate points/alert
            var points = calc_points(player_props[i].winner);
            alert(player_props[i].winner.name + " wins with " + points + " points!");

            // add to leaderboard
            update_leaderboard(player_props[i].winner.name, points);

            return true;
        }
    }
    return false;
}

function update_leaderboard(name, points) {
    var leaderboard;
    if (!localStorage.leaderboard) {
        leaderboard = [];
    } else {
        leaderboard = JSON.parse(localStorage.leaderboard);
    }

    leaderboard.push({name: name, points: points});

    leaderboard.sort(function(a, b){
        return b.points - a.points;
    });

    localStorage.leaderboard = JSON.stringify(leaderboard.slice(0, 10));
}

function calc_points(player) {
    var score = 24;
    player.ships.forEach(function(ship) {
        score = score - ship.spaces.reduce(function(cnt, space) {
                if (player.ocean_guesses.includes(space)) {
                    return cnt + 1;
                } else {
                    return cnt;
                }
            }, 0) * 2;
    });
    return score;
}

function parse_ships(text) {
    // parses ships from a string, returns an array of ships
    var ships = [];

    text.replace(/ /g,'').replace(/;$/, "").split(";").map(function(ship) {
        var type;
        var range;
        if (ship.includes(":")) {
            // format `A:A1-A5`
            [type, range] = ship.split(":");
        } else {
            // format A(A1-A5)
            [type, range] = ship.slice(0, -1).split("(");
        }

        // generate spaces
        [start, end] = range.split("-");

        // parse rows/cols ranges (diagonals aren't supported)
        var col_range = end.charCodeAt(0) - start.charCodeAt(0) + 1,
            row_range = parseInt(end[1]) - parseInt(start[1]) + 1,
            cols,
            rows;
        if (col_range > 1) {
            cols = [...Array(col_range).keys()].map(code => String.fromCharCode(code + start.charCodeAt(0)));
            rows = Array(col_range).fill(start[1]);
        } else {
            cols = Array(row_range).fill(start[0]);
            rows = [...Array(row_range).keys()].map(i => i + parseInt(start[1]));
        }

        // create the ship, add to the list        
        ships.push(init_ship(type, cols.map((i, idx) => i+rows[idx])));
    });

    return ships;
}

function check_ships(player) {
    player.ships.forEach(function(ship) {
        if (ship.sunk == false && ship.spaces.reduce(function(cnt, space) {
            if (player.ocean_guesses.includes(space)) {
                return cnt + 1;
            } else {
                return cnt;
            }
        }, 0) == ship.spaces.length) {
            alert("You sunk a " + ship.full_name + "!");
            ship.sunk = true;
        }
    });
}

init_game(true);

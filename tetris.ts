            let tiles: HTMLElement[][] = [];
            for (let y=0; y<22; ++y) {
                tiles.push([]);
                let row = document.createElement("div");
                row.style.clear = "both";
                for (let x=0; x<12; ++x) {
                    let div = document.createElement("div");
                    div.style.width = "32px";
                    div.style.height = "32px";
                    div.style.float = "left";
                    div.style.backgroundColor = "#000000";
                    row.appendChild(div);
                    tiles[y].push(div);
                }
                document.body.appendChild(row);
            }
            let t = 0;

            let scoreboard: HTMLElement = document.createElement("div");
            document.body.appendChild(scoreboard);

            let deathMessage: HTMLElement = document.createElement("div");
            document.body.appendChild(deathMessage);

            function clearScreen() {
              for (let y=0; y<10; ++y) {
                  for (let x=0; x<10; x++) {
                    tiles[y][x].style.backgroundColor = "#000000";
                  }
              }
            };

            function drawMapLine(line: string) { console.log(line) };
            let map = ["|----------|",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|          |",
                       "|----------|"];
            function drawMap() {
              // map.forEach(drawMapLine);
              for (let y=0; y<22; ++y) {
                  for (let x=0; x<12; x++) {
                    tiles[y][x].style.backgroundColor = mapColour(x,y);
                  }
              }
            };

            function mapColour(x: number,y: number): string {
              if ((map[y][x] == "|") || (map[y][x] == "-")) {
                return "#fff"
              } else if (map[y][x] == "&") {
                return "#f00"
              } else if (map[y][x] == "$") {
                return "#ff0"
              } else if (map[y][x] == "^") {
                return "#0f0"
              } else if (map[y][x] == "@") {
                return "#00f"
              } else if (map[y][x] == "*") {
                return "#0ff"
              } else if (map[y][x] == "!") {
                return "#f70"
              } else if (map[y][x] == "+") {
                return "#f0f"
              } else {
                return "#000"
              }
            };

            function changeMap(x: number,y: number,symbol: string) {
              map[y]=changeLine(map[y],x,symbol)
            };

            function changeLine(line: string,x: number,symbol: string) {
              return line.slice(0,x) + symbol + line.slice(x+1)
            };

            function isFullLine(line: string) {
              for (let i=0; i < line.length; ++i) {
                if (line[i] == " ") {
                  return false
                }
              }
              return true
            };

            var score = 0;

            function handleCompleteLines() {
              for (let i = 1; i > 0 && i < (map.length - 1); ++i) {
                if (isFullLine(map[i]) == true) {
                  moveLinesDown(i);
                  score = (score + 10)
                }
              }
            };

            function moveLinesDown(i: number) {
              map.splice(i, 1);
              map.splice(1, 0, "|          |");
            };

            function scoreCounter() {
              // levels
              scoreboard.innerText = `Your score is ${score}`;
              //console.log(`Your score is ${score}`);
              //console.log(`You are at level ${level}`);
            };

            function handleKeyUp(event: KeyboardEvent) {
                // console.debug(event);
                return false
            }
            document.addEventListener('keyup', handleKeyUp);

            function goodShapePosition(x: number, y:number, shape: string[], map: string[]) {
              for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                  if (shape[j][i] != " " && map[y+j][x+i] != " ") {
                    return false
                  }
                }
              }
              return true
            };

            function drawTetromino(x: number,y: number,shape: string[]) {
              if (goodShapePosition(x,y, shape, map)) {
                pasteIntoMap(x,y,shape);
              }
            };

            function pasteIntoMap(x: number,y:number,shape: string[]) {
              for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                  if (shape[j][i] != " ") {
                    changeMap(x+i,y+j,shape[j][i]);
                  }
                }
              }
            };

            const theLShape = [[
              " &  ",
              " &  ",
              " && ",
              "    "
            ],[
              "    ",
              "&&& ",
              "&   ",
              "    "
            ],[
              "&&  ",
              " &  ",
              " &  ",
              "    "
            ],[
              "  & ",
              "&&& ",
              "    ",
              "    "
            ]];

            const theNotLShape = [[
              " $  ",
              " $  ",
              "$$  ",
              "    "
            ],[
              "$   ",
              "$$$ ",
              "    ",
              "    "
            ],[
              " $$ ",
              " $  ",
              " $  ",
              "    "
            ],[
              "    ",
              "$$$ ",
              "  $ ",
              "    "
            ]];

            const theBar = [[
              " ^  ",
              " ^  ",
              " ^  ",
              " ^  "
            ], [
              "    ",
              "^^^^",
              "    ",
              "    "
            ], [
              " ^  ",
              " ^  ",
              " ^  ",
              " ^  "
            ], [
              "    ",
              "^^^^",
              "    ",
              "    "
            ]];

            const theSquare = [[
              "    ",
              " @@ ",
              " @@ ",
              "    "
            ], [
              "    ",
              " @@ ",
              " @@ ",
              "    "
            ], [
              "    ",
              " @@ ",
              " @@ ",
              "    "
            ], [
              "    ",
              " @@ ",
              " @@ ",
              "    "
            ]];

            const theZigZag = [[
              " ** ",
              "**  ",
              "    ",
              "    "
            ], [
              "*   ",
              "**  ",
              " *  ",
              "    "
            ], [
              " ** ",
              "**  ",
              "    ",
              "    "
            ], [
              "*   ",
              "**  ",
              " *  ",
              "    "
            ]];

            const theUnZigZag = [[
              "!!  ",
              " !! ",
              "    ",
              "    "
            ], [
              " !  ",
              "!!  ",
              "!   ",
              "    "
            ], [
              "!!  ",
              " !! ",
              "    ",
              "    "
            ], [
              " !  ",
              "!!  ",
              "!   ",
              "    "
            ]];

            const theTShape = [[
              "    ",
              "+++ ",
              " +  ",
              "    ",
            ], [
              " +  ",
              "++  ",
              " +  ",
              "    "
            ], [
              " +  ",
              "+++ ",
              "    ",
              "    "
            ], [
              " +  ",
              " ++ ",
              " +  ",
              "    "
            ]];

            let shapes = [theLShape, theNotLShape, theBar, theSquare, theUnZigZag, theZigZag, theTShape]

            function destroyTetromino(x: number,y:number,shape: string[]) {
              for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                  if (shape[j][i] != " ") {
                    changeMap(x+i,y+j," ");
                  }
                }
              }
            };

            function getRandomInt(max: number) {
              return Math.floor(Math.random() * max);
            };

            document.addEventListener('keyup', handleKeyPress)

            let pressedKey: string = '';

            function handleKeyPress(event: KeyboardEvent) {
              pressedKey = event.key;

              // immediately update the game when a key is pressed
              updateMap();
            };

            function getPressedKey() {
              let currentPressedKey = pressedKey
              pressedKey = ''
              return currentPressedKey

            };

            const mapWidth = 12
            const mapHeight = 22
            const tetrominoStart = [ 5, 1]
            let tetrominoPos = [...tetrominoStart]
            let tetrominoRot = 2
            let tetrominoSelect = getRandomInt(5)
            let dead = false

            let timeoutHandler = setTimeout(updateMap, 500);

            function updateMap() {
              // schedule a new updateMap call in 500ms
              clearTimeout(timeoutHandler);
              timeoutHandler = setTimeout(updateMap, 500);

              if (dead == true) {
                deathMessage.innerText = "Congratulations! You are dead."
              } else {
                t += 0.1;

                clearScreen();
                drawTetromino(tetrominoPos[0], tetrominoPos[1], shapes[tetrominoSelect][tetrominoRot]);
                drawMap();
                scoreCounter();
                let oldPosition = tetrominoPos
                let oldRotation = tetrominoRot
                destroyTetromino(tetrominoPos[0], tetrominoPos[1],shapes[tetrominoSelect][tetrominoRot]);

                let key = getPressedKey();
                console.log(key)

                if (key == 'q') {
                  dead = true;
                }

                //left
                if (key == 'j' || key == 'ArrowLeft') {
                  if (!(tetrominoPos[0] < 1)) {
                    tetrominoPos = [tetrominoPos[0] - 1, tetrominoPos[1]]
                  }
                }

                //right
                if (key == 'l' || key == 'ArrowRight') {
                  if (tetrominoPos[0] < (map[0].length) - 2) {
                    tetrominoPos = [tetrominoPos[0] + 1, tetrominoPos[1]]
                  }
                }

                //down
                if (key == 'k' || key == 'ArrowDown') {
                  // sleep(200);
                } else {
                  // sleep(800);
                };

                // rotate
                if (key == 'd' || key == 'ArrowUp') {
                  if (tetrominoRot < 3) {
                    tetrominoRot++
                  } else {
                    tetrominoRot = 0
                  }
                }

                //

                // Moving sideways
                if (goodShapePosition(tetrominoPos[0], tetrominoPos[1], shapes[tetrominoSelect][tetrominoRot], map) == false) {
                  tetrominoPos = [oldPosition[0], oldPosition[1]]
                  tetrominoRot = oldRotation
                };
                oldPosition = tetrominoPos;
                oldRotation = tetrominoRot;

                // Moving down
                tetrominoPos = [tetrominoPos[0], (tetrominoPos[1] + 1)];

                if (goodShapePosition(tetrominoPos[0], tetrominoPos[1], shapes[tetrominoSelect][tetrominoRot], map) == false) {
                  drawTetromino(oldPosition[0], oldPosition[1], shapes[tetrominoSelect][tetrominoRot])
                  tetrominoPos = [...tetrominoStart]
                  tetrominoSelect = getRandomInt(shapes.length)
                  tetrominoRot = getRandomInt(4)
                  if (goodShapePosition(tetrominoPos[0], tetrominoPos[1], shapes[tetrominoSelect][tetrominoRot], map) == false) {
                  dead = true;
                  }
                };

                handleCompleteLines();
              }
            }

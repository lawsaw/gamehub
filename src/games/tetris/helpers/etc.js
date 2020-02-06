import { cloneDeep } from "lodash";
import { ROTATION_CIRCLE, FIGURES, COLS, ROWS, SPEED_RAISE_FOR_SCORE, SPEED, SPEED_STEP, KEY_MAP } from './constants';

export function generateGrid(hor, ver) {
    return Array.from({length: ver}, () => Array.from({length: hor}, () => 0));
}

export function merge(figure, [rowPosition, colPosition], grid) {
    //console.log({figure, rowPosition, colPosition, grid})
    let table = cloneDeep(grid);
    return table.map((row, rowIndex) => {
        if(rowIndex === rowPosition) {
            figure.forEach((figureRow, figureRowIndex) => {
                let replacement = table[rowIndex + figureRowIndex].splice(colPosition, figureRow.length, ...figureRow);
                replacement.forEach((replacementItem, replacementIndex) => {
                    if(replacementItem !== 0) {
                        let tableRowTarget = rowIndex + figureRowIndex;
                        table[tableRowTarget][colPosition+replacementIndex] = 1;
                    }
                })
            });
        }
        return row.map(col => col);
    });
}

export function renderDemoHouse(table) {
    // let houseHuy = [
    //     [0,0,0,0,1,1,0,0,0,0],
    //     [0,0,0,1,1,1,1,0,0,0],
    //     [0,0,0,1,1,1,1,0,0,0],
    //     [0,0,0,0,1,1,0,0,0,0],
    //     [0,0,0,0,1,1,0,0,0,0],
    //     [0,0,0,0,1,1,0,0,0,0],
    //     [0,0,0,0,1,1,0,0,0,0],
    //     [0,0,0,0,1,1,0,0,0,0],
    //     [0,0,0,0,1,1,0,0,0,0],
    //     [0,0,1,1,1,1,1,1,0,0],
    //     [0,0,1,1,1,1,1,1,0,0],
    //     [0,0,1,1,1,1,1,1,0,0],
    // ];
    let smile = [
        [0,0,1,0,0,0,0,1,0,0],
        [0,1,1,1,0,0,1,1,1,0],
        [0,0,1,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0,1,0,0],
        [0,0,0,1,0,0,1,0,0,0],
        [0,0,0,0,1,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];
    let newGrid = merge(smile, [table.length-smile.length, 0], table);
    return newGrid;
}

export function getRandomRotation() {
    let rotation = Math.ceil(Math.random() * (ROTATION_CIRCLE.length-1));
    return ROTATION_CIRCLE[rotation];
}

export function getRandomFigure() {
    let figures = Object.keys(FIGURES);
    let figure = Math.floor(Math.random() * (figures.length));
    return FIGURES[figures[figure]];
}

export function getPrevRotationPosition(figure) {
    let { length } = ROTATION_CIRCLE;
    let index = ROTATION_CIRCLE.indexOf(figure);
    return index === 0 ? ROTATION_CIRCLE[length-1] : ROTATION_CIRCLE[index-1];
}

export function getNextRotationPosition(figure) {
    let { length } = ROTATION_CIRCLE;
    let index = ROTATION_CIRCLE.indexOf(figure);
    return index === length-1 ? ROTATION_CIRCLE[0] : ROTATION_CIRCLE[index+1];
}

export function hasTablesConflict(table1, table2) {
    return !table1.find((tableRow, tableRowIndex) => tableRow.find((tableCol, tableColIndex) => tableCol === table2[tableRowIndex][tableColIndex] && tableCol === 1));
}

export function getAllFullRowsIndexes(table) {
    return table.reduce(function(a, row, i) {
        let isRowFull = row.reduce((a, col) => a + col) === COLS;
        if(isRowFull) a.push(i);
        return a;
    }, []);
}

export function cleanTableFromFullRows(table, fullRows) {
    let cleanRow = Array.from({ length: COLS }, () => 0);
    let newTable = cloneDeep(table);
    fullRows.forEach((rowToClean, rowToCleanIndex, arr) => {
        let top = newTable.slice(0, rowToClean);
        let bottom = newTable.slice(arr[rowToCleanIndex]+1, newTable.length);
        newTable = [cleanRow, ...top, ...bottom];
    })
    return newTable;
}

export function getFigureMap(figure, position) {
    let cleanGrid = generateGrid(COLS, ROWS);
    return merge(figure, position, cleanGrid);
}

export function getScoreOptimalSpeed(score, speed) {
    for(let i = 1; i < speed; i++) if(score >= SPEED_RAISE_FOR_SCORE*i && score < SPEED_RAISE_FOR_SCORE*i+SPEED_RAISE_FOR_SCORE && speed !== SPEED-i*SPEED_STEP) {
        speed -= SPEED_STEP;
    }
    return speed;
}

export function pressingRule(key_map) {
    let lock = {
        inner: false,
        outer: false,
    };
    let timer = null;
    let interval = null;


    let getPeriod = (code) => {
        return (code === KEY_MAP.UP) || (code === KEY_MAP.DOWN) ? 200 : 75;
    };
    let doPeriodic = (func, code) => {
        if(lock.inner) return false;
        if(!lock.outer) func();
        lock.inner = true;
        let period = getPeriod(code);
        timer = setTimeout(() => {
            func();
            lock.inner = false;
        }, period);
    };
    let onPressDown = (code) => {
        if(code in key_map) {
            doPeriodic(() => {
                // console.log({
                //     key_map,
                //     code,
                // });
                key_map[code]();
            }, code);
        }
        if(!lock.outer) lock.outer = true;
    };
    let onPressUp = (code) => {
        if(code in key_map) {
            clearTimeout(timer);
            lock.inner = false;
            lock.outer = false;
        }
    };


    let startInterval = (code) => {
        key_map[code]();
        // stopInterval();
        // key_map[code]();
        // let period = getPeriod(code);
        // interval = setInterval(() => {
        //     console.log({
        //         key_map,
        //         code,
        //     });
        //     key_map[code]();
        // }, period);
    };
    let stopInterval = () => {
        //clearInterval(interval);
    };

    return {
        onPressDown,
        onPressUp,
        startInterval,
        stopInterval,
    };

}
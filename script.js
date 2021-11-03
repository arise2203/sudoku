var sudokuBoard =[
        /*sudokuBoard[ 0 ] = */[[ 3,0,6,0,7,0,0,5,0 ],[ 0,8,7,0,2,0,9,0,4 ],[ 0,2,0,6,0,8,0,7,0 ],[ 9,6,5,0,3,0,0,1,0 ],[ 0,0,2,0,1,0,8,0,5 ],[ 0,1,0,7,0,4,0,2,0 ],[ 7,0,0,2,0,1,5,0,0 ],[ 6,0,1,0,8,0,0,9,0 ],[ 2,0,0,3,0,0,1,0,6 ]],
        /*sudokuBoard[ 1 ] = */[[ 0,9,0,0,0,7,0,8,4 ],[ 1,0,0,4,0,9,0,7,0 ],[ 7,0,0,0,3,0,9,0,5 ],[ 0,5,0,0,6,0,7,0,9 ],[ 0,0,3,9,0,1,0,4,0 ],[ 9,0,0,5,0,0,8,0,1 ],[ 3,0,7,0,9,0,4,0,0 ],[ 4,0,0,7,0,5,0,6,0 ],[ 5,0,0,3,0,8,0,9,0 ]],
        /*sudokuBoard[ 2 ] = */[[ 4,0,7,0,5,0,3,0,6 ],[ 0,8,0,4,0,9,0,2,0 ],[ 0,5,0,7,1,0,4,0,0 ],[ 0,2,0,3,0,1,0,4,0 ],[ 3,0,5,0,6,0,1,0,2 ],[ 8,0,1,0,7,0,6,0,9 ],[ 9,6,0,0,0,5,8,0,0 ],[ 0,1,0,6,0,3,0,0,4 ],[ 0,3,0,8,0,7,0,6,0 ]],
        /*sudokuBoard[ 3 ] = */[[ 3,0,6,5,0,8,4,0,0],[5,2,0,0,0,0,0,0,0],[0,8,7,0,0,0,0,3,1],[0,0,3,0,1,0,0,8,0],[9,0,0,8,6,3,0,0,5],[0,5,0,0,9,0,6,0,0],[1,3,0,0,0,0,2,5,0],[0,0,0,0,0,0,0,7,4],[0,0,5,2,0,6,3,0,8]]
        ];
        var sudokuCurrent;
        // tao su kien bang jquery                              
        $('document').ready(function(){  
                startGame();
                
        })
        
        // ham khoi tao du liệu
        function renderSudokuBoard(sudoku){
                for(i = 0 ; i < 9; i++){
                        for(j = 0 ; j < 9; j++){
                                id = "cell"+i+j;
                                el = document.getElementById(id);
                                var child;
                                var childClass;
                               if(sudoku[i][j] === 0){
                                        child = document.createElement("input");
                                        childClass = "editValue";
                               }else{
                                       child = document.createElement("span");
                                       child.innerText = sudoku[i][j];
                                       childClass = "staticValue";
                               }
                               el.innerHTML ="";
                               el.setAttribute("class",childClass);
                               el.appendChild(child);
                        }   
                }
        }
        //ham kiem tra dl
        function solveSudoku(sudokuCurrent, row, col) {
                var cell = findUnassignedLocation(sudokuCurrent, row, col);
                row = cell[0];
                col = cell[1];  
                var classerr;
                if (row == -1 && col == -1) {
                    return true;
                }
                for (var num = 1; num <= 9; num++) {
                    if ( checkValueAtCell(sudokuCurrent, row, col, num) ) {   
                        sudokuCurrent[row][col] = num;
                        if (solveSudoku(sudokuCurrent, row, col) ) {                
                            return true;
                        }   
                        sudokuCurrent[row][col] = 0;
                    }
                }
                return false;
                
        }
        
        //khoi tao game
        function startGame(){
                index = Math.floor(Math.random() * 3);
                sudokuCurrent = JSON.parse(JSON.stringify(sudokuBoard[index]));
                renderSudokuBoard(sudokuCurrent);
        }
        //check dl
        function solveGame(){
                solveSudoku(sudokuCurrent,0,0);
                renderSudokuBoard(sudokuCurrent);
        }
        //tim o trong tiep theo
        function findUnassignedLocation(sudokuCurrent, row, col) {
                for (; row < 9 ; col = 0, row++)
                    for (; col < 9 ; col++)
                        if (sudokuCurrent[row][col] == 0)
                            return [row, col];
                return [-1, -1];
            }
        //in du lieu
        function printResult(){
                var res = "";
                for (var i = 0; i < 9; i++) {
                        for (var j = 0; j < 9; j++) {
                                res += sudokuCurrent[i][j];
                        }
                        res += "\n";
                }
                console.log(res);
            }
        // kiem tra du lieu bang
        function checkValueAtCell(sudokuCurrent,row , col , value) {
                return checkRow(sudokuCurrent,row, value) && checkCol(sudokuCurrent,col, value) 
                        && checkZone(sudokuCurrent,row, col, value);
        }
        //kiem tra cot
        function checkRow(sudokuCurrent, row,  val){
                for(var col = 0; col <9; col++){
                        if(sudokuCurrent[row][col] == val)
                                return false;
                }
                return true;
        }
        //kiem tra hang
        function checkCol (sudokuCurrent, col, val){
                for ( var row = 0; row < 9; row ++){
                        if (sudokuCurrent[row][col] == val)
                                return false;
                }
                return true;
        }
        //kiem tra vung vung 0->9 row 
        function checkZone ( sudokuCurrent, row, col, val){
                row = Math.floor(row / 3) * 3;
                col = Math.floor(col / 3) * 3;
                for (var r = 0; r < 3; r++)
                        for (var c = 0; c < 3; c++)
                                if (sudokuCurrent[row + r][col + c] == val)
                                        return false;
        
                return true;
                
        }
        
        
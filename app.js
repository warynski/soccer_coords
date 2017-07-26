var playerPositions = data.player_positions;
var team = new Array;
var timer = false;
var count = 0;
var button = document.getElementById('button');
var pointer = document.getElementById('pointer');
var steps = playerPositions.length;

console.log(steps);

var c = document.getElementById('canvas').getContext('2d');
// c.fillStyle = '#f00';
// c.fillRect(0,0,canvas.width,canvas.height);

init();

// init() initializes program and sets players positions objects array

function init() {   

    var maxCapacity = 0;

    for (var i = 0; i < steps ; i++) {
        for (var j=0 ; j < playerPositions[i].length ; j++) {
            if ( maxCapacity < (playerPositions[i][j][0])) maxCapacity = (playerPositions[i][j][0]);
        }
    }

    for ( var i = 1 ; i <= maxCapacity ; i++) {
        team.push(
            {
                'id' : i,
                'posX' : 0,
                'posY' : 0
            }
        );
    }



}

button.addEventListener('click',function() {
    if ( count == steps ) count = 0;
    dataService();
    console.log(timer);
})

// dataService() updates players positions in 100 ms intervals

function dataService() {

    function getIndexOf(array,id) {
        var length = array.length;
        for ( var k=0 ; k < length ; k++ ) {
            if ( array[k].id == id ) {
                return k;
            }
        }                      
        return false;
    }

    if(timer){
      clearInterval(timer);
      timer = false;
    } else {
        timer = setInterval(function(){
            for (var i = 0; i < playerPositions[count].length; i++) {            
                var id = playerPositions[count][i][0];
                team[getIndexOf(team,id)].posX = playerPositions[count][i][1]; 
                team[getIndexOf(team,id)].posY = playerPositions[count][i][2];
            }
            count += 1;
            if (count == (steps)) {
                clearInterval(timer);
            }
      },100)
    }
}

function drawPlayers(){

    pointer.style.left = (1176/steps)*count+'px';

    c.beginPath();
    c.fillStyle = 'rgba(51,255,119,0.5)';
    c.fillRect(0,0,canvas.width,canvas.height);
    c.closePath();

    c.beginPath();
    c.moveTo(0,100);
    c.lineTo(canvas.width,100);
    c.stroke();
    c.moveTo(0,canvas.height-100);
    c.lineTo(canvas.width,canvas.height-100);
    c.stroke();
    c.closePath();

        for ( i = 0; i < team.length; i++) {
            if ( team[i].posX != 0 || team[i].posY != 0 ) {
                c.beginPath();
                c.fillStyle = "#00a";
                c.arc(team[i].posX*canvas.width, (canvas.height-100)-(team[i].posY*(canvas.height-200)), 15, 0, 2 * Math.PI, true);
                c.stroke();
                c.closePath();

                c.fillStyle = "#00a";
                c.font = "16px Arial";
                c.fillText(team[i].id,(team[i].posX*canvas.width)-7,(canvas.height-100)-(team[i].posY*(canvas.height-200))+5);
            }
        }
    requestAnimationFrame(drawPlayers);
}

requestAnimationFrame(drawPlayers);





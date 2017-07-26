var playerPositions = data.player_positions;
var steps = playerPositions.length;
var team = new Array;
var timer = false;
var count = 0;
var time;
var button = document.getElementById('button');
var panel = document.getElementById('panel');
var pointer = document.getElementById('pointer');
var currentTime = document.getElementById('current-time');
var totalTime = document.getElementById('total-time');
var c = document.getElementById('canvas').getContext('2d');

init();

// init() initializes program, sets players positions objects array and game duration time

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
    totalTime.innerHTML = timeCount(parseInt(steps/10));
}

// this event fires up positions data update

button.addEventListener('click',function() {
    if ( count == steps ) count = 0;
    dataService();
})

// dataService() updates players positions in 100 ms intervals

function dataService() {

    // getIndexOf catches proper object from array

    function getIndexOf(array,id) {
        var length = array.length;
        for ( var k=0 ; k < length ; k++ ) {
            if ( array[k].id == id ) {
                return k;
            }
        }                      
        return false;
    }

    // 'if' statement determines if 100ms update function runs or pauses

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
            time = parseInt(count/10);
            currentTime.innerHTML = timeCount(time);
            if (count == (steps)) {
                clearInterval(timer);
            }
      },100)
    }
}

// this function draws each updated object positions and drives progress bar

function drawPlayers(){

    pointer.style.left = (1176/steps)*count+'px';

    // v-blank

    c.beginPath();
    c.fillStyle = 'rgba(51,255,119,0.25)';
    c.fillRect(0,0,canvas.width,canvas.height);
    c.closePath();

    // field lines

    c.beginPath();
    c.moveTo(0,100);
    c.lineTo(canvas.width,100);
    c.stroke();
    c.moveTo(0,canvas.height-100);
    c.lineTo(canvas.width,canvas.height-100);
    c.stroke();
    c.closePath();

        // players drawing magic here :) 

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

// time flow control

panel.addEventListener("mousedown", function(e){
    panel.onmousemove = function(e) {
        var cursorPosition = 0;
        e.clientX < 1176 ? cursorPosition = e.clientX : cursorPosition = 1175;
        count = parseInt((cursorPosition*steps)/1176);
    }
});
panel.addEventListener("mouseup", function(e){
    panel.onmousemove = null;
    }
);

// time format function for current time counter and total time

function timeCount(time) {   
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
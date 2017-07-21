document.addEventListener('DOMContentLoaded', function(){

  var positions = data.player_positions;
  var team = [];
  var count = 0;
  var countMax = positions.length-1;
  var beginAnim = false;
  var button = document.getElementById('button');
  var timer = false;
  var pointer = document.getElementsByClassName('pointer');

  var canvas =  document.getElementById('canvas');
  var c = canvas.getContext('2d');
  c.fillStyle = '#555';
  c.fillRect(0,0,canvas.width,canvas.height);

  function Player() {
    id = 0;
    posX = 0;
    posY =0;
  }

  Player.prototype.draw = function(){
    c.fillStyle = 'rgba(225,225,225,0.05)';
    c.fillRect(0,0,canvas.width,canvas.height);

    c.beginPath();
    c.moveTo(0,100);
    c.lineTo(canvas.width,100);
    c.stroke();
    c.moveTo(0,canvas.height-100);
    c.lineTo(canvas.width,canvas.height-100);
    c.stroke();
    c.closePath();

    c.beginPath();
    c.fillStyle = "#00a";
    c.arc(this.posX*canvas.width, (canvas.height-100)-(this.posY*(canvas.height-200)), 15, 0, 2 * Math.PI, true);
    c.stroke();
    c.closePath();

    c.fillStyle = "#00a";
    c.font = "16px Arial";
    c.fillText(this.id,(this.posX*canvas.width)-7,(canvas.height-100)-(this.posY*(canvas.height-200))+5);

  }

  player = new Player;

  button.addEventListener('click', function(){
    if(timer){
      clearInterval(timer);
      timer = false;
    } else {
      timer = setInterval(function(){
        for (var i = 0; i < positions[count].length-1; i++) {
          // console.log(count);
          player.id = positions[count][i][0];
          player.posX = positions[count][i][1];
          player.posY = positions[count][i][2];
          player.draw();

          if (count == countMax) {
            clearInterval(timer);
            count = 0;
          }

        }   
        count += 1;
      },100)
    }
  })


})
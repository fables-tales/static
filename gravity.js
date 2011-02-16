var canvas = document.getElementById("draw")
var context = canvas.getContext("2d");
var ko = new Date();
var size = 3
var positions = []
var velocities = []
var mass = 10;
var gravity = -400;

for (var i = 0; i < 30; i++) {
    var randX = Math.random()*800
    var randY = Math.random()*600
    positions.push([randX,randY])
    velocities.push([0,0])
}

function applyGravity(i, j, dt) {
    var gravitytop = gravity*mass
    var dx = positions[i][0] - positions[j][0]
    var dy = positions[i][1] - positions[j][1]
    var rSquared = dx*dx+dy*dy
    var gravityAccel = gravitytop/(rSquared+0.2)
    var gravityXProp = dx/Math.sqrt(dx*dx+dy*dy)
    var gravityYProp = dy/Math.sqrt(dx*dx+dy*dy)
    var gravityX = gravityXProp * gravityAccel
    var gravityY = gravityYProp * gravityAccel
    velocities[i][0] += gravityX * dt
    velocities[i][1] += gravityY * dt
    
    
}

function update(dt) {
    for (var i = 0; i < positions.length; i++) {
        for (var j = 0; j < positions.length; j++) {
            if (i != j) {
                var dx = positions[i][0] - positions[j][0]
                var dy = positions[i][1] - positions[j][1]
                if (size*size >= dx * dx + dy * dy) {
                    var v1 = velocities[i][0]
                    var v2 = velocities[i][1]
                    velocities[i][0] = velocities[j][0] * 0.02
                    velocities[i][1] = velocities[j][1] * 0.02
                    velocities[j][0] = v1 * 0.02
                    velocities[j][1] = v2 * 0.02
                    var positive = velocities[i][0] > 0
                    if (positive) positions[i][0] += size*0.5
                    else positions[i][0] -= size*0.5
                    var positive = velocities[i][1] > 0
                    if (positive) positions[i][1] += size*0.5
                    else positions[i][1] -= size*0.5
                    var positive = velocities[j][0] > 0
                    if (positive) positions[j][0] += size*0.5
                    else positions[j][0] -= size*0.5
                    var positive = velocities[j][1] > 0
                    if (positive) positions[j][1] += size*0.5
                    else positions[j][1] -= size*0.5
                }

                applyGravity(i, j, dt) 

                
            }

        }

    }

    for (var i = 0; i < positions.length; i++) {
        positions[i][0] += velocities[i][0] * dt
        positions[i][1] += velocities[i][1] * dt
        if (positions[i][0] < 0 || positions[i][0] > 800) {
            velocities[i][0] *= -1
        }

        if (positions[i][1] <0 || positions[i][1] > 600) {
            velocities[i][1] *= -1
        }
    }

}

function draw() {
    context.clearRect(0,0,1000,1000)
    for (var i = 0; i < positions.length; i++) {
        context.beginPath();
        context.arc(positions[i][0], positions[i][1], size, 0, Math.PI*2, true); 
        context.closePath();
        context.fill();
    }
}

var now = ko.getTime();

function updateAndDraw() {
    var oldNow = now;
    now = new Date().getTime();
    var dt = (now-oldNow)/1000;
    update(dt)
    draw()
}

draw()

setInterval(updateAndDraw, 16)


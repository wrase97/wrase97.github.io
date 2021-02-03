// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;
    Body = Matter.Body

// create an engine
var engine = Engine.create();

function new_ball(x,y, rank, isStatic, mask) {
    var r =ball_base_size*Math.pow(2, rank/2);
    if (y<0)
    {
        y = ceil - r;
    }
    var res = Bodies.circle(x, y, r, {
        isStatic: isStatic,
        collisionFilter:{mask: mask},
        friction: 0.05,
        frictionAir: 0,
        restitution: 0.2,
        label: {name: "ball", rank: rank},
        render: {sprite: {
            texture: "./img/"+rank+".png",
            xScale: 2*r/500,
            yScale: 2*r/500}}}
        );
    return res;
};

function randomRank() {
    var n = maxRank + 1;
    var sum = n * (n+1) / 2;
    var r = Math.random()*sum;
    for (let i = 0; i < n; i++) {
        if (r<n-i){
            console.log(i);
            return i;
        } else {
            r -= n-i;
        }
    }
    console.log('error');
    return maxRank;
}

var dw = document.body.clientWidth;
var dh = document.body.clientHeight;

var h=Math.min(dh, dw*2);
var w=h/2;
var maxRank = 0;
var ball_base_size=w/30;
var ceil = h*50/600;
// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: w,
        height: h,
        wireframes: false

    }
});
var next = new_ball(w/2, -1, 0, true, 0);    // do not colliside.
var ground = Bodies.rectangle(w/2, h+10, w*1.1, 20, { friction: 0.01, isStatic: true });
var wall_left = Bodies.rectangle(-10, h/2, 20, h*1.1, {friction: 0.01, isStatic: true});
var wall_right = Bodies.rectangle(w+10, h/2, 20, h*1.1, {friction: 0.01, isStatic: true});
// add all of the bodies to the world
World.add(engine.world, [next, wall_left, wall_right, ground]);


var mouse = Matter.Mouse.create(render.canvas),
    mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
Events.on(mouseConstraint, 'mousemove', function(event) {
    var x = event.mouse.position.x;
    if (event.mouse.button>-1)
    {    
        Body.setPosition(next, {x: x, y: next.position.y});
    }   
})
Events.on(mouseConstraint, 'mousedown', function(event) {
    var x = event.mouse.position.x;  
    Body.setPosition(next, {x: x, y: next.position.y});
})
Events.on(mouseConstraint, 'mouseup', function(event) {
        var x = event.mouse.position.x,
            // y = event.mouse.position.y,
            // console.log(next);
            // Body.set(next,{collisionFilter:{catagory:1, mask:0xffffffff, group:0}, isStatic: false});
            ball = new_ball(x, -1, next.label.rank, false, -1);
        console.log(ball);
        // Body.setStatic(next, false);
        World.add(engine.world, ball);

        World.remove(engine.world, next);
        next = new_ball(w/2, -1, randomRank(), true, 0);
        World.add(engine.world, next);


    });

Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;

    // change object colours to show those starting a collision
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        if (pair.bodyA.label.rank==pair.bodyB.label.rank && pair.bodyA.label.rank < 7) {
            var x = (pair.bodyA.position.x + pair.bodyB.position.x)*0.5;
            var y = (pair.bodyA.position.y + pair.bodyB.position.y)*0.5;
            var ball =new_ball(x,y,pair.bodyA.label.rank+1, false, -1);

            World.remove(engine.world, [pair.bodyA, pair.bodyB]);
            World.add(engine.world, ball);
            // console.log(ball);
            console.log(ball.label.rank);

            maxRank = Math.min(4, Math.max(maxRank, ball.label.rank));
        }
    }

});


// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
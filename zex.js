var engine = Matter.Engine.create();
var render = Matter.Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
    background: "final.jpg",
  },
});
var stickman = [
  "costume7.svg",
  "costume8.svg",
  "costume9.svg",
  "costume10.svg",
  "costume11.svg",
];
var stickman2 = [
  "costume7.png",
  "costume8.png",
  "costume9.png",
  "costume10.png",
  "costume11.png",
];
var rec1 = Matter.Bodies.rectangle(400, 0, 800, 50, { isStatic: true });
var rec2 = Matter.Bodies.rectangle(400, 600, 800, 50, { isStatic: true });
var rec3 = Matter.Bodies.rectangle(800, 160, 50, 600, { isStatic: true });
var rec4 = Matter.Bodies.rectangle(0, 300, 50, 600, { isStatic: true });
var bob = Matter.Bodies.rectangle(100, 500, 30, 70, {
  label: "player",
  inertia: Infinity,
});
var i = 0;
bob.render.sprite.texture = stickman2[i];
bob.render.sprite.xScale = 0.3;
bob.render.sprite.yScale = 0.3;

var gold = Matter.Bodies.circle(200, 200, 5, {
  isStatic: true,
  label: "object",
  isSensor: true,
});
var gold2 = Matter.Bodies.circle(200, 400, 5, {
  isStatic: true,
  label: "object2",
  isSensor: true,
});
var gold3 = Matter.Bodies.circle(200, 100, 5, {
  isStatic: true,
  label: "object3",
  isSensor: true,
});
var rec5 = Matter.Bodies.rectangle(20, 450, 1210, 30, { isStatic: true });

var rec6 = Matter.Bodies.rectangle(800, 300, 1210, 30, { isStatic: true });
var rec7 = Matter.Bodies.rectangle(20, 150, 1210, 30, { isStatic: true });
var block = Matter.Composites.stack(780, 475, 1, 2, 0, 0, function (x, y) {
  return Matter.Bodies.rectangle(x, y, 40, 40, { isStatic: true });
});
var enemy = Matter.Bodies.rectangle(50, 100, 40, 40, {
  chamfer: 5,
  label: "object4",
});
Matter.World.add(engine.world, [
  rec1,
  rec2,
  rec3,
  rec4,
  bob,
  gold,
  rec5,
  rec6,
  rec7,
  block,
  gold2,
  gold3,
  enemy,
]);
Matter.Engine.run(engine);
Matter.Render.run(render);
document.addEventListener("keydown", function (bla) {
  if (bla.keyCode == 38) {
    Matter.Body.applyForce(
      bob,
      { x: bob.position.x, y: bob.position.y },
      { x: 0, y: -0.04 }
    );
  }

  if (bla.keyCode == 39) {
    Matter.Body.applyForce(
      bob,
      { x: bob.position.x, y: bob.position.y },
      { x: 0.04, y: 0 }
    );
    if (i > 3) {
      i = 0;
    } else {
      i = i + 1;
    }
    bob.render.sprite.texture = stickman2[i];
    bob.render.sprite.xScale = 0.3;
    bob.render.sprite.yScale = 0.3;
  }
  if (bla.keyCode == 40) {
    Matter.Body.applyForce(
      bob,
      { x: bob.position.x, y: bob.position.y },
      { x: 0, y: 0.04 }
    );
  }
  if (bla.keyCode == 37) {
    Matter.Body.applyForce(
      bob,
      { x: bob.position.x, y: bob.position.y },
      { x: -0.04, y: 0 }
    );
    if (i > 3) {
      i = 0;
    } else {
      i = i + 1;
    }
    bob.render.sprite.texture = stickman[i];
    bob.render.sprite.xScale = 0.3;
    bob.render.sprite.yScale = 0.3;
  }
});

var count = 0;
var health = 100;
function collisiontest(f) {
  f.pairs.forEach((pair) => {
    const { label: labelA } = pair.bodyA;
    const { label: labelB } = pair.bodyB;

    if (labelA == "player" && labelB == "object") {
      Matter.Composite.remove(engine.world, gold);
      count = count + 1;
      console.log(count);
    }
    if (labelA == "player" && labelB == "object2") {
      Matter.Composite.remove(engine.world, gold2);
      count = count + 1;
      console.log(count);
    }
    if (labelA == "player" && labelB == "object3") {
      Matter.Composite.remove(engine.world, gold3);
      count = count + 1;
      console.log(count);
    }
    if (labelA == "player" && labelB == "object4") {
      health = health - 25;
      console.log(health);
    }
    if (labelA == "player" && labelB == "object5") {
      health = health - 30;
      console.log(health);
    }
  });
}

Matter.Events.on(engine, "collisionStart", collisiontest);
var a = 80;
var b = 100;
var c = 1;

Matter.Events.on(engine, "beforeUpdate", function (event) {
  if (count == 3) {
    Matter.Composite.remove(engine.world, block);
  }
  if (health < 1) {
    health = 100;
    location.reload();
  }
  function right() {
    a = a + 1;
    Matter.Body.setPosition(enemy, { x: a, y: b });
  }
  function left() {
    a = a - 1;
    Matter.Body.setPosition(enemy, { x: a, y: b });
  }

  c += 0.014;
  var pan = 320 + 100 * Math.sin(c);
  Matter.Body.setPosition(enemy, { x: pan, y: b });
});

enemy.render.sprite.texture = "download.png";
enemy.render.sprite.xScale = 0.2;
enemy.render.sprite.yScale = 0.2;
var help = Matter.Bodies.rectangle(410, 550, 70, 40, { isStatic: true });
var spike = Matter.Bodies.rectangle(410, 550, 100, 30, {
  isStatic: true,
  label: "object5",
});
var rec8 = Matter.Bodies.rectangle(100, 400, 300, 30, { isStatic: true });
var rec9 = Matter.Bodies.rectangle(395, 350, 200, 30, { isStatic: true });
var rec10 = Matter.Bodies.rectangle(690, 400, 300, 30, { isStatic: true });
var d = 410;
var e = 160;
var f = 1;
Matter.Events.on(engine, "beforeUpdate", function (event) {
  if (bob.position.x > 780) {
    Matter.Composite.remove(engine.world, [rec5, rec6, rec7, enemy]);
    Matter.Body.setPosition(bob, { x: 100, y: 500 });
    Matter.World.add(engine.world, [rec8, rec9, rec10, help, spike]);
  }
  c += 0.014;
  var pan = 570 + 100 * Math.sin(c);
  Matter.Body.setPosition(help, { x: d, y: pan });
});
spike.render.sprite.texture = "spikes.png";
spike.render.sprite.xScale = 0.2;
spike.render.sprite.yScale = 0.1;

function level2() {}

var xpos = 50;
var ypos = 0;
var fillSatI = 255;
var stroSatI = 0;

var xinfo = 0;
var yinfo = 0;
var xinfo2 = 0;
var yinfo2 = 0;
var zomrel = 0.8;



function information() {
  textFont("Helvetica");
  if (stroSatI > 150) {
    stroSatI ++;
  } else {
    stroSatI = 150;
  }

  if (windowHeight > 650) {
    ypos = bottom-550;
  } else {
    ypos = bottom-480;
  }

  if (loadcomp < shapes.length) {
    bossfader = 255;
  } else {
    if (bossfader <= shad) {
      bossfader = shad
    } else {
      bossfader -= 0.1
    }
  }


  // controls
  fill(0);
  rectMode(CENTER);
  stroke(200, 100, 0, stroSatI);

  // mouse

  //spacebar
  if (playing == true) {
    fill(70, 30, 0, 255);
  } else {
    fill (0)
  }
  rect(windowWidth/2-115+xpos, windowHeight/2+100+ypos, 270, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  textSize(10);
  text("spacebar", windowWidth/2-115+xpos, windowHeight/2+115+ypos);
  noFill();
  stroke(200, 100, 0, stroSatI);
  // arrows
  if (keyIsDown(LEFT_ARROW)) {
    fill(70, 30, 0, 255);
  } else {
    fill(0);
  }
  rect(windowWidth/2+200+xpos, windowHeight/2+100+ypos, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  textSize(10);
  text("L", windowWidth/2+188+xpos, windowHeight/2+115+ypos);
  noFill();
  stroke(200, 100, 0, stroSatI);

  if (keyIsDown(DOWN_ARROW)) {
    fill(70, 30, 0, 255);
  } else {
    fill(0);
  }
  rect(windowWidth/2+250+xpos, windowHeight/2+100+ypos, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  textSize(10);
  text("Down", windowWidth/2+250+xpos, windowHeight/2+115+ypos);
  noFill();
  stroke(200, 100, 0, stroSatI);

  if (keyIsDown(RIGHT_ARROW)) {
    fill(70, 30, 0, 255);
  } else {
    fill(0);
  }
  rect(windowWidth/2+300+xpos, windowHeight/2+100+ypos, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  textSize(10);
  text("R", windowWidth/2+288+xpos, windowHeight/2+115+ypos);
  noFill();
  stroke(200, 100, 0, 150);

  if (keyIsDown(UP_ARROW)) {
    fill(70, 30, 0, 255);
  } else {
    fill(0);
  }
  rect(windowWidth/2+250+xpos, windowHeight/2+50+ypos, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  textSize(10);
  text("Up", windowWidth/2+250+xpos, windowHeight/2+65+ypos);
  noFill();
  stroke(200, 100, 0, stroSatI);

  // numbers
  for (var i = 0; i < shapes.length; i++) {
    if (selection-1 == i) {
      fill(70, 30, 0, 255);
    } else {
      fill(0);
    }
    rect(windowWidth/2-350+(i*50)+xpos, windowHeight/2-100+ypos, 40, 40, 5);
    fill(200, 100, 0, 200);
    noStroke();
    textSize(10);
    text((i+1), windowWidth/2-360+(i*50)+xpos, windowHeight/2-85+ypos);
    noFill();
    stroke(200, 100, 0, stroSatI);
  }
  // ctrl and shift (size)
  if (keyIsDown(SHIFT)) {
    fill(70, 30, 0, 255);
  } else {
    fill(0);
  }
  rect(windowWidth/2-330+xpos, windowHeight/2+50+ypos, 80, 40, 5);
  rect(windowWidth/2+100+xpos, windowHeight/2+50+ypos, 80, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  textSize(10);
  text("Shift", windowWidth/2-353+xpos, windowHeight/2+65+ypos);
  text("Shift", windowWidth/2+77+xpos, windowHeight/2+65+ypos);
  noFill();
  stroke(200, 100, 0, stroSatI);

  if (keyIsDown(CONTROL)) {
    fill(70, 30, 0, 255);
  } else {
    fill(0);
  }
  rect(windowWidth/2-350+xpos, windowHeight/2+100+ypos, 40, 40, 5);
  rect(windowWidth/2+120+xpos, windowHeight/2+100+ypos, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  textSize(10);
  text("Ctrl", windowWidth/2-357+xpos, windowHeight/2+115+ypos);
  text("Ctrl", windowWidth/2+113+xpos, windowHeight/2+115+ypos);
  noFill();
  stroke(200, 100, 0, stroSatI);

  // mute & solo
  fill(0);
  if (selection != 0) {
    for (var i = 0; i < shapes.length; i++) {
      if (shapes[selection-1].solo == true) {
        fill(70, 30, 0, 255);
      } else {
        fill(0);
      }
    }
  }
  rect(windowWidth/2-300+xpos, windowHeight/2+ypos, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  textSize(10);
  text("S", windowWidth/2-310+xpos, windowHeight/2+15+ypos);
  fill(0);
  stroke(200, 100, 0, stroSatI);

  if (selection != 0) {
    for (var i = 0; i < shapes.length; i++) {
      if (shapes[selection-1].muted == true) {
        fill(70, 30, 0, 255);
      } else {
        fill(0);
      }
    }
  }
  rect(windowWidth/2+xpos, windowHeight/2+50+ypos, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  textSize(10);
  text("M", windowWidth/2-10+xpos, windowHeight/2+65+ypos);
  noFill();
  stroke(200, 100, 0, stroSatI);

  // mute & solo (letters)
  // noFill();
  // for (var i = 0; i < shapes.length; i++) {
  //   if (shapes[i].solo == false) {
  //     if (shapes[i].muted == true) {
  //       textSize(8);
  //       stroke(100, 50, 0, 255);
  //       textAlign(CENTER);
  //       text('M', windowWidth/2-350+(i*50)+xpos, windowHeight/2-95+ypos)
  //     }
  //   } else {
  //     textSize(10);
  //     textAlign(CENTER);
  //     fill(160, 150, 0);
  //     stroke(160, 150, 0);
  //     text('S', windowWidth/2-350+(i*50)+xpos, windowHeight/2-95+ypos)
  //     fill(70, 30, 0, 255);
  //     stroke(100, 50, 0, 255);
  //   }
  // }

  // selected shape

  if (windowHeight > 650) {
    yinfo = windowHeight-550;
    zomrel = 0.5
  } else {
    yinfo = windowHeight-480;
    zomrel = 0.35
  }
  xinfo = windowWidth/2;

  // box
  fill(0, 200);
  rectMode(CENTER);
  if (windowHeight > 650) {
    rect(xinfo, yinfo, 400, 350, 10, 10, 10, 10)
  } else {
    rect(xinfo, yinfo, 400, 250, 7, 7, 7, 7)
  }


  // visualisation
  if (selection != 0) {
    stroke(shapes[selection-1].redval, shapes[selection-1].grenval, shapes[selection-1].blueval);

    // background
    fill(0);
    beginShape();
    for (var i = 0; i < PI*4; i += PI/(shapes[selection-1].nodes/2)) {
      xinfo2 = xinfo + (shapes[selection-1].amp/5+shapes[selection-1].size*zomrel)*sin(i+shapes[selection-1].rotation)/2;
      yinfo2 = yinfo + (shapes[selection-1].amp/5+shapes[selection-1].size*zomrel)*cos(i+shapes[selection-1].rotation)/2;
      shapes[selection-1].sat = 50+shapes[selection-1].amp/2;
      curveVertex (xinfo2, yinfo2);
    }
    endShape();

    // colour
    fill(shapes[selection-1].redval, shapes[selection-1].grenval, shapes[selection-1].blueval, shapes[selection-1].sat);
    beginShape();
    for (var i = 0; i < PI*4; i += PI/(shapes[selection-1].nodes/2)) {
      xinfo2 = xinfo + (shapes[selection-1].amp/5+shapes[selection-1].size*zomrel)*sin(i+shapes[selection-1].rotation)/2;
      yinfo2 = yinfo + (shapes[selection-1].amp/5+shapes[selection-1].size*zomrel)*cos(i+shapes[selection-1].rotation)/2;
      shapes[selection-1].sat = 50+shapes[selection-1].amp/2;
      curveVertex (xinfo2, yinfo2);
    }
    endShape();

  }

  // left panel information
  noStroke();
  fill(70, 30, 0, 255);
  for (var i = 0; i < track.length; i++) {
    text((track[i].currentTime()).toFixed(4), lside - 100, 100+i*30);
  }


  noFill();
  rectMode(CORNER);
}

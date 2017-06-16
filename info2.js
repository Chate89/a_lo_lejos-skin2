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
  if (bottom > 650) {
    if (ypos < bottom-550) {
      if (ypos > bottom-550) {
        ypos = bottom-550;
      } else {
        ypos += 2;
      }
      stroSatI += 7.5;
    } else {
      ypos = bottom-550;
      stroSatI = 150;
    }
  } else {
    if (ypos < 100) {
      ypos ++;
      stroSatI += 7.5;
    } else {
      ypos = 100;
      stroSatI = 150;
    }
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
  text("spacebar", windowWidth/2-125+xpos, windowHeight/2+115+ypos);
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
  text("L", windowWidth/2+185+xpos, windowHeight/2+115+ypos);
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
  text("Down", windowWidth/2+235+xpos, windowHeight/2+115+ypos);
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
  text("R", windowWidth/2+285+xpos, windowHeight/2+115+ypos);
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
  text("Up", windowWidth/2+235+xpos, windowHeight/2+65+ypos);
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
    text((i+1), windowWidth/2-365+(i*50)+xpos, windowHeight/2-85+ypos);
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
  text("shift", windowWidth/2-365+xpos, windowHeight/2+65+ypos);
  text("shift", windowWidth/2+65+xpos, windowHeight/2+65+ypos);
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
  text("Ctrl", windowWidth/2-365+xpos, windowHeight/2+115+ypos);
  text("Ctrl", windowWidth/2+105+xpos, windowHeight/2+115+ypos);
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
  text("S", windowWidth/2-315+xpos, windowHeight/2+15+ypos);
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
  text("M", windowWidth/2-15+xpos, windowHeight/2+65+ypos);
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
    zomrel = 0.7
  } else {
    yinfo = windowHeight-480;
    zomrel = 0.4
  }
  xinfo = windowWidth/2;

  if (selection != 0) {
    stroke(shapes[selection-1].redval, shapes[selection-1].grenval, shapes[selection-1].blueval);
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

  noFill();
  rectMode(CORNER);
}

// internal canvas
var topy, bottom, lside, rside;
var bossfader = 255;
var shad = 200;
// shapes
var numShapes = 6;
var shapes = [];
var selection = 0;
var anyOver = 0;
// tracks
var track = [];
var loadcomp = 0;
var lateralshad = 255;
var endTime = 164;
var amp = [];
// randomizer
var versions = 5
var raTr = [];
// highlight
var hlc = 0;
var hl;
var playing = false;
var info = false;
var mainCol = 0;
var botlock = false;
var loadshade;

function preload() {
  ampera = loadFont('data/Ampera.ttf');
  juraBook = loadFont('data/Jura-Book.ttf');
  metadata = loadStrings('data/metadata.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // internal canvas
  topy = 10;
  bottom = windowHeight - 10;
  lside = 5;
  rside = windowWidth - 5;

  mouseX = windowWidth/2
  mouseY = windowHeight/2

  // shapes setup
  for (var i = 0; i < numShapes; i++) {
    shapes[i] = new Shape();
  }

  // randomizer & track loading
  for (var i = 0; i < numShapes; i++) {
    raTr[i] = floor(random(0, versions))+1;
    track[i] = loadSound("data/Module0" + (i+1) + "/00_" + raTr[i] + '.mp3', loaded, onended);
  }

  for (var i = 0; i < track.length; i++) {
    amp[i] = new p5.Amplitude()
    amp[i].setInput(track[i])
  }

  // amp1 = new p5.Amplitude();
  // amp1.setInput(track[1]);

  // track selection asign & metadata loading
  for (var i = 0; i < shapes.length; i++) {
    shapes[i].selection = i;
    shapes[i].metadata();
  }
}

function loaded() {
  loadcomp++;
}

function onended() {
    console.log("ends");
}

function windowResized() {
  bottom = windowHeight - 10;
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background (mainCol);
  noStroke();
  console.log(track[0].currentTime());

  // shaping
  for (var i = 0; i < shapes.length; i++) {
    // shapes[i].nodes = raTr[i]+1;
    shapes[i].display();
    shapes[i].overing();
    shapes[i].boost();
    shapes[i].sides();
    shapes[i].sizer();
    shapes[i].sound();
    shapes[i].mouseinteraction();
    amp[i].smoothing = 0.9;
    shapes[i].amp = amp[i].volume*2000;
  }

  // play trigger
  for (var i = 0; i < shapes.length; i++) {
    if (playing == false) {
      shapes[i].redval = 50;
      shapes[i].grenval = 50;
      shapes[i].blueval = 50;
      shapes[i].playing = false;
      divi = 3;
    } else if (playing == true && shapes[i].muted == false) {
      shapes[i].redval = shapes[i].redvalon;
      shapes[i].grenval = shapes[i].grenvalon;
      shapes[i].blueval = shapes[i].bluevalon;
      shapes[i].playing = true;
      divi = 1;
    }
  }


  // highlight
  hlc += 0.04;
  hl = 10+10*cos(PI*hlc);
  for (var i = 0; i < shapes.length; i++) {
    if (shapes[i] == shapes[selection-1]) {
      shapes[i].ss = true;
    } else {
      shapes[i].ss = false;
    }
  }


  //external canvas
  fill(0);
  noStroke();
  // top
  rect(0, 0, windowWidth, topy);
  // bottom
  rect(0, bottom, windowWidth, windowHeight);

  if (lside > 10 || rside < windowWidth - 10) {
    lateralshad = 220;
  } else {
    lateralshad = 255;
  }
  fill(0, lateralshad)
  // left
  rect(0, 0, lside, windowHeight);
  // right
  rect(rside, 0, windowWidth, windowHeight);

  // internal canvas
  noStroke();
  fill(0, bossfader);
  rect(lside, topy, rside-lside, bottom-topy);


  // loader
  if (loadcomp < shapes.length) {
    bossfader = 255;
  } else {
    bossfader -= 0.1;
    if (bossfader <= 0) {
      bossfader = 0;
    } else {
      bossfader -= 0.1;
    }
  }

  if (info == true) {
    information();
  } else if (info == false || playing == true) {
    if (bottom > 650) {
      ypos = 150;
    } else {
      ypos = 80;
    }
    stroSatI = 0;
    if (bossfader > 0) {
      bossfader -= 5;
    } else if ( bossfader <= 0) {
      bossfader = 0;
    }
  }

  // calls all front panels
  panels();
  // calls master control
  master();

  // loading state
  textAlign(CENTER);
  textFont(juraBook);
  if (loadcomp < track.length) {
    loadshade = 255;
  } else {
    if (loadshade <= 0) {
      loadshade = 0;
    } else {
      loadshade -= 3;
    }
  }
  if (playing == false && info  == false) {
    noStroke();
    fill(50, loadshade);
    textSize(50);
    text("Loading Tracks", windowWidth/2, windowHeight/2);
    textSize(30);
    text("(" + loadcomp + " of " + track.length +")",  windowWidth/2, windowHeight/2+50);
    fill(100, 150-loadshade);
    // fill(50, 255-loadshade);
    text("Press the Spacebar", windowWidth/2, 3*windowHeight/4);
  }




  if (mouseIsPressed) {
    // console.log(int(shapes[2].amp.volume*1000));
  }
}

function mousePressed() {
  if (info == false) {
    for (var i = 0; i < shapes.length; i++) {
      if (shapes[i].mouseover == true) {
        selection = i+1;
      } else if (shapes[i].mouseover == false && selection == i+1)
      selection = 0;
    }
  }
}

function keyPressed() {
  // info
  if (key == 'i' || key == 'I' || keyCode == ESCAPE) {
    if (info == false) {
      info = true;
    } else if (info == true) {
      info = false;
    }
  }

  // selection
  for (var i = 0; i < shapes.length+1; i++) {
    if (key == i) {
      if (selection != i) {
        selection = i;
      } else {
        selection = 0;
      }
    }
  }

  // fullscreen
  if (key == 'f' || key == 'F') {
    if (fullscreen(false)) {
      fullscreen(true);
    } else if (fullscreen(true)) {
      fullscreen(false);
    }
  }

  // mute
  if (selection != 0) {
    if (key == 'm' || key == 'M') {
      if (shapes[selection-1].muted == false) {
        shapes[selection-1].muted = true;
        shapes[selection-1].redval = 50;
        shapes[selection-1].grenval = 50;
        shapes[selection-1].blueval = 50;
      } else if (shapes[selection-1].muted == true) {
        shapes[selection-1].muted = false;
        shapes[selection-1].redval = shapes[selection-1].redvalon;
        shapes[selection-1].grenval = shapes[selection-1].grenvalon;
        shapes[selection-1].blueval = shapes[selection-1].bluevalon;
      }
    }
  }

  // solo
  if (selection != 0) {
    if (key == 's' || key == 'S') {
      if (shapes[selection-1].solo == false) {
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].solo = false;
            shapes[i].muted = true;
            shapes[i].redval = 50;
            shapes[i].grenval = 50;
            shapes[i].blueval = 50;
        }
        shapes[selection-1].solo = true;
        shapes[selection-1].muted = false;
        shapes[selection-1].redval = shapes[selection-1].redvalon;
        shapes[selection-1].grenval = shapes[selection-1].grenvalon;
        shapes[selection-1].blueval = shapes[selection-1].bluevalon;
      } else if (shapes[selection-1].solo == true) {
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].muted = false;
            shapes[i].redval = shapes[i].redvalon;
            shapes[i].grenval = shapes[i].grenvalon;
            shapes[i].blueval = shapes[i].bluevalon;
        }
        shapes[selection-1].solo = false;
      }
    }
  }

  // stop
  if (keyCode == ENTER) {
    for (var i = 0; i < track.length; i++) {
      track[i].stop();
      playing = false;
      bossfader = 255;
    }
  }

  // hardReset: metadata
  if (key == 'r' || key == 'R') {
    for (var i = 0; i < track.length; i++) {
      reset();
    }
  }

  // jump to test
  for (var i = 0; i < track.length; i++) {
    if (key == 'u' || key == 'U') {
      track[i].jump(164);
    }
  }

  // play - pause
  if (key == ' ') {


    if (track[0].isPlaying()) {
      for (var i = 0; i < track.length; i++) {
        track[i].pause();
        // track[i].
      }
    } else {
      for (var i = 0; i < track.length; i++) {
        track[i].play();
      }
    }
    if (playing == true) {
      playing = false;
    } else if (playing == false) {
        playing = true;
    }
  }
}

function reset() {
 for (var i = 0; i < shapes.length; i++) {
   shapes[i].metadata();
 }
}

function panels() {

  // panel perimeter
  noFill();
  stroke(200, 100, 0, 150);
  rect(lside, topy, rside-lside, bottom-topy, 5);

  // panel slide: left
  if ((mouseX > rside || info == true) && (mouseIsPressed == false || rside <= windowWidth-200)) {
    if (rside <= windowWidth-200) {
      rside = windowWidth-200
    } else {
      rside -= 10;
    }
  } else {
    if (rside < windowWidth-5) {
      rside += 10;
    } else {
      rside = windowWidth-5;
    }
  }

  // panel slide: left
  if ((mouseX < lside || info == true) && (mouseIsPressed == false || lside >= 200)) {
    if (lside >= 200) {
      lside = 200
    } else {
      lside += 10;
    }
  } else {
    if (lside > 5) {
      lside -= 10;
    } else {
      lside = 5
    }
  }

  // panel slide: bottom
  if (botlock == false) {
    if ((mouseY > bottom || info == true) && (mouseIsPressed == false || bottom <= windowHeight-50)) {
      if (bottom <= windowHeight-50) {
        bottom = windowHeight-50
      } else {
        bottom -= 5;
      }
    } else {
      if (bottom < windowHeight-10) {
        bottom += 5;
      } else {
        bottom = windowHeight-10;
      }
    }
  } else {
    bottom = windowHeight-50;
  }
}

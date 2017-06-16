function master() {
  // when finish
  if (track[0].currentTime() > endTime) {
  for (var i = 0; i < track.length; i++) {
      track[i].stop();
      playing = false;
      bossfader = 255;
    }
  }
  rectMode(CORNERS);
  fill(mainCol, 150);
  ellipse(lside+15, bottom+25, 16)
  fill(70, 30, 0, 255);
  noStroke();
  if (loadcomp == shapes.length) {
    if (track[0]._playing == false) {
      triangle(lside+13, bottom+21, lside+19, bottom+25, lside+13, bottom+29);
    } else {
      rectMode(CORNER);
      rect(lside+12, bottom+21, 2, 7);
      rect(lside+16, bottom+21, 2, 7);
      rectMode(CORNERS);
    }
  }
  fill(mainCol, 150);
  stroke(200, 100, 0, 50);
  rect(lside+30, bottom + 20, lside+38+(rside-48-lside), bottom + 30, 3, 3, 3, 3);
  fill(70, 30, 0, 255);
  rect(lside+30, bottom + 20, lside+38+(rside-48-lside)*(track[0].currentTime()/endTime), bottom + 30, 3, 3, 3, 3);
  // text(int(track[0].currentTime()), lside+11+(rside-10)*(track[0].currentTime()/endTime), windowHeight-20)
  rectMode(CORNER);
}

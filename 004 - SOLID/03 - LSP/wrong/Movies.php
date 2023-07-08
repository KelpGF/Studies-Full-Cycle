<?php

class Movie {
  public function play() {
    // Play the movie
  }

  public function increaseVolume() {
    // Increase the volume
  }
}

class TheLionKing extends Movie {}

class ModernTimes extends Movie {
  public function increaseVolume() {
    // putz
    throw new Exception('This movie is silent');
  }
}

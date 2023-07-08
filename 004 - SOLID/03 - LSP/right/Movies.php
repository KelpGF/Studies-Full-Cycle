<?php

class Movie {
  public function play() {
    // Play the movie
  }
}

class MovieWithAudio extends Movie {
  public function play() {
    // Play the movie
  }

  public function increaseVolume() {
    // Increase the volume
  }
}

class TheLionKing extends MovieWithAudio {}

class ModernTimes extends Movie {}



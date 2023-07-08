<?php

interface Movie
{
  public function play();
  public function increaseVolume();
}

class TheLionKing implements Movie
{
  public function play()
  {
    // ...
  }

  public function increaseVolume()
  {
    // ...
  }
}

class ModernTimes implements Movie
{
  public function play()
  {
    // ...
  }

  public function increaseVolume()
  {
    // esse método será utilizado pois o filme não possui som
  }
}

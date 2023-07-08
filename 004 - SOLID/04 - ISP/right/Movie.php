<?php

interface Movie
{
  public function play();
}

interface AudioControl
{
  public function increaseVolume();
  public function decreaseVolume();
}

class TheLionKing implements Movie, AudioControl
{
  public function play()
  {
    // ...
  }

  public function increaseVolume()
  {
    // ...
  }

  public function decreaseVolume()
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
}

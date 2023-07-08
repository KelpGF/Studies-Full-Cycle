<?php

Class DramaCategory {}

class Movie {
  private $title;
  private $category;

  public function getTitle()
  {
    return $this->title;
  }

  public function getCategory()
  {
    return $this->category;
  }

  public setCategory(DramaCategory $category)
  {
    $this->category = $category;
  }

  public setCategory()
  {
    $this->category = new DramaCategory();
  }
}

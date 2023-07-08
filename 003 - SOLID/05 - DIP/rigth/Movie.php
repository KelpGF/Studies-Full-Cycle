<?php

interface Category {}

class DramaCategory implements Category {}

class Movie {
    private $title;
    private $category;

    public function __construct(Category $category, $title) {
        $this->title = $title;
        $this->category = $category;
    }

    public function getTitle() {
        return $this->title;
    }

    public function setTitle($title) {
        return $this->title = $title;
    }

    public function getCategory() {
        return $this->category;
    }

    public function setCategory(Category $category) {
        $this->category = $category;
    }
}

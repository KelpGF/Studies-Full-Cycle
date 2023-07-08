<?php

class Couse
{
  private $name;
  private $category;
  private $description;

  public function connection () {
    $pdo = new PDO('mysql:host=localhost;dbname=example', 'root', 'root');
    return $pdo;
  }

  public function createCategory () {
    $pdo = $this->connection();
    $sql = "INSERT INTO category (name) VALUES ('{$this->category}')";
    $pdo->exec($sql);
  }

  public function createCourse () {
    $pdo = $this->connection();
    $sql = "INSERT INTO course (name, description) VALUES ('{$this->name}', '{$this->description}')";
    $pdo->exec($sql);
  }

  public function getName () {
    return $this->name;
  }

  public function getCategory () {
    return $this->category;
  }

  public function setName ($name) {
    $this->name = $name;
  }

  public function setCategory ($category) {
    $this->category = $category;
  }
}

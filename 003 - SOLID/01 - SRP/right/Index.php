<?php

class Connection {
  public function connection () {
    $pdo = new PDO('mysql:host=localhost;dbname=example', 'root', 'root');
    return $pdo;
  }
}

class Course {
  private $name;
  private $category;
  private $description;

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

class CourseRepository {
  public function createCourse (Connection $connection, Course $course) {
    $pdo = $connection->connection();
    $sql = "INSERT INTO course (name, description) VALUES ('{$course->getName()}', '{$course->getDescription()}')";
    $pdo->exec($sql);
  }
}

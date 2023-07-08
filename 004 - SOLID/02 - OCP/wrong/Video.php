<?php

  class Video
  {
    private $type;

    public function calcularInteresse() {
      if ($this->type == 'Movie') {
        // Calcula o interesse baseado em filme
      } else if ($this->type == 'TVShow') {
        // Calcula o interesse baseado em série
      }
    }
  }
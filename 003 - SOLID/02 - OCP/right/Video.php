<?php
  interface Video
  {
    public function calcularInteresse();
  }

  class MovieVideo implements Video
  {
    public function calcularInteresse() {
      // Calcula o interesse baseado em filme
    }
  }

  class TVShowVideo implements Video
  {
    public function calcularInteresse() {
      // Calcula o interesse baseado em série
    }
  }

  class CalcInterest {
    public function execute(Video $video) {
      $video->calcularInteresse();
    }
  }

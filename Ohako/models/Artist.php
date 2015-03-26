<?php

use Illuminate\Database\Eloquent\Model;

class Artist extends Model {

  public function songs()
  {
    return $this->hasMany('Song');
  }

  public function jam()
  {
    echo 'jamming';
  }
}
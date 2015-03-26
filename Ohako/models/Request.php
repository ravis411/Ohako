<?php

use Illuminate\Database\Eloquent\Model;

class Request extends Model {

  // public function songs()
  // {
  //   return $this->hasMany('Song');
  // }

  public function jam()
  {
    echo 'jamming';
  }
}
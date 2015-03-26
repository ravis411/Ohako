<?php

use Illuminate\Database\Eloquent\Model;

class Song extends Model {

  public function artist()
  {
    return $this->belongsTo('Artist');
  }

}
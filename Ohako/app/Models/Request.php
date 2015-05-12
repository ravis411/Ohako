<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Request extends Model {

  public function user()
  {
    return $this->hasOne('\App\Models\User');
  }

}
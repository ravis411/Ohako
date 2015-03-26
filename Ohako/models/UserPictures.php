<?php

use Illuminate\Database\Eloquent\Model;

class UserPictures extends Model {
	public $timestamps = false;
	protected $table = 'userPictures';
	protected $fillable = ['location', 'user_id'];
}
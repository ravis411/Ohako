<?php

use Illuminate\Database\Eloquent\Model;

class UserPictures extends Model {

	protected $table = 'userPictures';
	protected $fillable = ['location', 'user_id'];
}
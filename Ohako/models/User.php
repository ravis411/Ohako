<?php

use Illuminate\Database\Eloquent\Model;

class User extends Model {

	protected $fillable = ['firstName', 'lastName', 'userName', 'email', 'password'];
	protected $primaryKey = 'ID';
}
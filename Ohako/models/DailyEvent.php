<?php

use Illuminate\Database\Eloquent\Model;

class DailyEvent extends Model {

	protected $table = 'dailyEvents';

	protected $fillable = ['monday', 
						   'tuesday',
						   'wednesday',
						   'thursday',
						   'friday',
						   'saturday',
						   'sunday'];

	public function venues() {
		// Each Venue Detail has many Venues
		return $this->hasMany('Venue');
	}
}
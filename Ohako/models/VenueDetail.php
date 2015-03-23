<?php

use Illuminate\Database\Eloquent\Model;

class VenueDetail extends Model {

	protected $fillable = ['smoking', 
						   'drinks',
						   'food',
						   'patio'];

	public function venues() {
		// Each Venue Detail has many Venues
		return $this->hasMany('Venue');
	}
}
<?php

use Illuminate\Database\Eloquent\Model;

class Venue extends Model {

	protected $fillable = ['name'];

	public function location() {
		return $this->belongsTo('Location');
	}

	public function dailyEvent() {
		return $this->belongsTo('models\DailyEvent');
	}

	public function venueDetail() {
		return $this->belongsTo('models\VenueDetail');
	}
}
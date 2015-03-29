<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Venue extends Model {

	protected $fillable = ['name'];

	public function location() {
		return $this->belongsTo('Location');
	}

	public function dailyEvent() {
		return $this->belongsTo('DailyEvent', 'dailyEvent_id');
	}

	public function venueDetail() {
		return $this->belongsTo('VenueDetail', 'venueDetail_id');
	}
}
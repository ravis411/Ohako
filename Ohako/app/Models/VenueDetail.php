<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VenueDetail extends Model {

	// Define table name if not by Laravel standards
		// VenueDetail = venue_details
		// User = users
	protected $table = 'venueDetails';

	protected $fillable = ['smoking', 
						   'drinks',
						   'food',
						   'patio'];

	public function venue() {
		// Each Venue Detail has many Venues
		return $this->belongsTo('Venue');
	}
}
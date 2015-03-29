<?php namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model {

	protected $fillable = ['street', 
						   'city',
						   'state',
						   'zip',
						   'number',
						   'website'
						   ];

	public function venue() {
		// Each Venue Detail has many Venues
		return $this->belongsTo('Venue');
	}
}
<?php

	use Illuminate\Database\Capsule\Manager as Capsule;

	$capsule = new Capsule;

	$capsule->addConnection([
		'driver' => 'mysql',
		'host' => 'wrytek.us',
		'database' => 'ohako',
		'username' => 'ohako',
		'password' => 'karaoke',
		'charset' => 'utf8',
		'collation' => 'utf8_unicode_ci',
		'prefix' => '',
	]);

	// Set Cache manager
	// Set even dispatcher

	$capsule->setAsGlobal();

	$capsule->bootEloquent();
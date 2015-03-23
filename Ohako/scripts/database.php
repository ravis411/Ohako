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
	// Set the event dispatcher used by Eloquent models... (optional)
	use Illuminate\Events\Dispatcher;
	use Illuminate\Container\Container;

	//$capsule->setEventDispatcher(new Dispatcher(new Container));

	$capsule->setAsGlobal();

	$capsule->bootEloquent();
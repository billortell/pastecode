<?php

// Bootstrap the framework DO NOT edit this
require_once COREPATH.'bootstrap.php';


Autoloader::add_classes(array(
	// Add classes you want to override here
	// Example: 'View' => APPPATH.'classes/view.php',
	'Base'                 => APPPATH.'classes/base.php',
	'Controller_Template'  => APPPATH.'classes/controller/template.php',
	'Fuel\Core\Num'        => APPPATH.'classes/num.php',
	'Widget'               => APPPATH.'classes/widget.php',
));

// Register the autoloader
Autoloader::register();

// Initialize the framework with the config file.
Fuel::init(include(APPPATH.'config/config.php'));


/* End of file bootstrap.php */
<?php

class Pastecode {

	// Placeholders for configuration variables
	public static $languages = array();
	public static $themes    = array();
	public static $quotes    = array();

	public static function _init()
	{
		$config = \Config::load('pastecode', true);

		foreach($config as $key => $value)
		{
			static::$$key = $value;
		}

		asort(static::$languages);
	}
}

/* End of file pastecode.php */
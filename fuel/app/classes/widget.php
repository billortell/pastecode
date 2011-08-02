<?php

class Widget {

	protected static $widgets = array();

	public static function add($source)
	{
		static::$widgets[] = $source;
	}

	public static function render()
	{
		foreach(static::$widgets as $key => $value)
		{
			echo \View::factory($value);
		}
	}
}

/* End of file widget.php */
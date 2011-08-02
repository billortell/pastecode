<?php

/**
 * Base encrypting class
 * 
 * This object enables a more elaborate base encrypting method than PHP provides by
 * default, allowing you to set the characters you prefer to use, as well as the base
 * level to utilize (defaults to Base62)
 * 
 * @author		Chase Hutchins			<arictos@gmail.com>
 * @author		Kelly Lent				<kelly.lent@gmail.com>
 * @version		1.0
 */
class Base
{
	/**
	 * Character set that the base can utilize.
	 *
	 * @var		string
	 */
	protected static $chars = '';

	/**
	 * Base Value
	 *
	 * @var 	integer
	 */
	protected static $base = 0;

	/**
	 * Constructor method called upon object initialization
	 * 
	 * @return		void					No value is returned 
	 */
	public static function _init()
	{
		$config = \Config::load('base', true);

		static::$chars  = $config['chars'];
		static::$base   = strlen($config['chars']);
	}

	/**
	 * Encode an integer
	 * 
	 * Numbers cannot be larger than 2^31-1 = 2,147,483,647
	 * 
	 * @param		integer				The integer to encode
	 * @return		string				The base62 encoding
	 */
	public static function encode($int)
	{
		$retval	= '';

		while($int >= static::$base)
		{
			$mod = ($int % static::$base);
			$retval = static::$chars[$mod] . $retval;
			$int = ($int / static::$base);
		}

		$retval = static::$chars[$int] . $retval;

		return($retval);
	}

	/**
	 * Decode a base62 string
	 *
	 * @param		string				The base62 string
	 * @return		integer				The represented integer value
	 */
	public static function decode($str)
	{
		$len = strlen($str);
		$val = 0;
		$arr = array_flip(str_split(static::$chars));

		for($i = 0; $i < $len; ++$i)
		{
			$val += ($arr[$str[$i]] * pow(static::$base, ($len - $i - 1)));
		}

		return($val);
	}
}

/* End of file base.php */
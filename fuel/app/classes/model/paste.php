<?php

class Model_Paste extends Orm\Model {

	protected static $_observers = array(
		'Orm\Observer_CreatedAt' => array('before_insert'),
		'Orm\Observer_UpdatedAt' => array('before_save'),
	);

	protected static $_properties = array(
		'id',
		'ip_address',
		'type',
		'contents',
		'private',
		'created_at',
		'updated_at',
	);

	/**
	 * Finds a paste via the short_id
	 *
	 * @param   string
	 * @param   boolean
	 * @return  object
	 */
	public static function find_paste($short_id = false)
	{
		$id = \Base::decode($short_id);

		if(is_numeric($id) and $id > 0)
		{
			$paste = \Model_Paste::find($id);

			if($paste !== null)
			{
				return $paste;
			}
		}

		return false;
	}
}

/* End of file paste.php */
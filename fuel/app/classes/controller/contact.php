<?php

class Controller_Contact extends \Controller_Template {

	public function action_index()
	{
		$this->template->set_global('title', 'Contact');
		$this->template->content = View::factory('pages/contact');
	}
}

/* End of file contact.php */
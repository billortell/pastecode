<?php

class Controller_Help extends \Controller_Template {

	public function action_index()
	{
		$this->template->set_global('title', 'Help');
		$this->template->content = View::factory('pages/help');
	}
}

/* End of file help.php */
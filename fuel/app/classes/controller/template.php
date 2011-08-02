<?php

class Controller_Template extends \Fuel\Core\Controller_Template {

	// Load the template and create the $this->template object
	public function before($data = null)
	{
		parent::before($data);
		$this->template->set_global('quote', \Pastecode::$quotes[array_rand(\Pastecode::$quotes)]);
	}
}

/* End of file template.php */
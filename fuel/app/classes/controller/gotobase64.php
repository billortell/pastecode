<?php

class Controller_Gotobase64 extends \Controller {

	public function action_index()
	{
		if(\Input::post('id'))
		{
			\Response::redirect(\Base::encode(\Input::post('id')));
		}

		$this->response->body = View::factory('pages/gotobase');
	}
}

/* End of file gotobase64.php */
<?php

/**
 * The Welcome Controller.
 *
 * A basic controller example.  Has examples of how to set the
 * response body and status.
 * 
 * @package  app
 * @extends  Controller
 */
class Controller_Pastes extends Controller_Template {

	/**
	 * The new paste action.
	 * 
	 * @access  public
	 * @return  void
	 */
	public function action_new()
	{
		if(\Input::post('paste') !== null)
		{
			$paste = \Input::post('paste');
			$type  = \Input::post('language');

			// Did they leave their paste empty?
			if(empty($paste))
			{
				\Session::set_flash('notice', 'Your paste cannot be empty!');
			}
			// All in good fun..
			elseif(\Input::post('do-not-fill-this-out') != '' and \Input::post('do-not-fill-this-out') != date('Ynj'))
			{
				\Session::set_flash('notice', 'I told you not to fill it out..');
			}
			// Is the type they provided real?
			elseif(!isset(\Pastecode::$languages[$type]))
			{
				\Session::set_flash('notice', 'Please choose a valid language type');
			}
			elseif(mb_strlen($paste, '8bit') > 64000)
			{
				\Session::set_flash('notice', 'Pastes must be less than or equal to 500 KiB');
			}
			// Good to go!
			else
			{
				$properties = array(
					'ip_address'    => \Input::real_ip(),
					'type'          => $type,
					'contents'      => $paste,
					'private'       => (\Input::post('private') ? 1 : 0),
				);

				$paste = \Model_Paste::factory($properties);

				if($paste->save())
				{
					$permalink = \Base::encode($paste->id);
					\Response::redirect($permalink);
				}
				else
				{
					\Session::set_flash('notice', 'There was an issue saving your paste, please try again!');
				}
			}
		}

		$this->template->set_global('title', 'New Paste');
		$this->template->content = View::factory('pastes/form', array('type' => 'php'));
	}

	/**
	 * Reply to Paste
	 *
	 * @param    string
	 * @return   void
	 */
	public function action_reply($short_id = null)
	{
		if(!empty($short_id))
		{
			if(($paste = \Model_Paste::find_paste($short_id)) !== false)
			{
				$_POST['paste'] = $paste->contents;

				$this->template->set_global('title', 'Reply to Paste '.$short_id);
				$this->template->content = View::factory('pastes/form', array('type' => $paste->type));

				return;
			}
		}

		\Response::redirect('/');
	}

	/**
	 * Raw Paste
	 *
	 * @param   string
	 * @return  void
	 */
	public function action_raw($short_id = null)
	{
		if(!empty($short_id))
		{
			if(($paste = \Model_Paste::find_paste($short_id)) !== false)
			{
				$this->auto_render = false;
				$this->response->set_header('Content-Type', 'text/plain');
				$this->response->body = $paste->contents;

				return;
			}
		}

		$this->action_404();
	}

	/**
	 * Download Paste
	 *
	 * @param   string
	 * @return  void
	 */
	public function action_download($short_id = null)
	{
		if(!empty($short_id))
		{
			if(($paste = \Model_Paste::find_paste($short_id)) !== false)
			{
				$this->auto_render = false;
				$this->response->set_header('Content-Type', 'text/plain');
				$this->response->set_header('Content-Disposition', 'attachment; filename="download.'.$paste->type.'"');
				$this->response->body = $paste->contents;

				return;
			}
		}

		$this->action_404();
	}

	/**
	 * The 404 action for the application.
	 * 
	 * @access  public
	 * @return  void
	 */
	public function action_404()
	{
		$uri = \Uri::detect();
		$uri = array_merge(array(), array_filter(explode('/', $uri)));

		if(count($uri) === 1 and ctype_alnum($uri[0]))
		{
			$short_id = $uri[0];

			if(($paste = \Model_Paste::find_paste($short_id)) !== false)
			{
				\Widget::add('widgets/social');

				$this->template->set_global('title', $short_id);
				$this->template->set_global('page_title', '
					Syntax: '.\Pastecode::$languages[$paste->type].' <span>|</span>
					Size: '.Num::format_bytes(mb_strlen($paste->contents, '8bit')).' <span>|</span> 
					'.\Date::factory($paste->created_at)->format('us_named').'
				', false);

				$this->template->content           = View::factory('pastes/view');
				$this->template->content->type     = $paste->type == 'NULL' ? 'php' : $paste->type;
				$this->template->content->code     = $paste->contents;
				$this->template->content->short_id = $short_id;

				return;
			}
		}

		$this->response->status = 404;
		$this->template->set_global('title', '404 Page Not Found');
		$this->template->content = View::factory('pastes/404');
	}
}

/* End of file welcome.php */
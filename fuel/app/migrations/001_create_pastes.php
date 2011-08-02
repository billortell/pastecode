<?php

namespace Fuel\Migrations;

class Create_pastes {

	public function up()
	{
		\DBUtil::create_table('pastes', array(
			'id' => array('constraint' => 11, 'type' => 'int', 'auto_increment' => true),
			'type' => array('constraint' => 255, 'type' => 'varchar'),
			'contents' => array('type' => 'text'),
			'private' => array('constraint' => 1, 'type' => 'tinyint'),
			'created_at' => array('constraint' => 11, 'type' => 'int'),
			'updated_at' => array('constraint' => 11, 'type' => 'int'),
		), array('id'));
	}

	public function down()
	{
		\DBUtil::drop_table('pastes');
	}
}
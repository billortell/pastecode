<?php

namespace Fuel\Migrations;

class Add_ip_address_to_pastes {

	public function up()
	{
		\DB::query('ALTER TABLE `pastes` ADD `ip_address` VARCHAR(255) NULL AFTER id')->execute();
	}

	public function down()
	{
		\DB::query('ALTER TABLE `pastes` DROP COLUMN `ip_address`')->execute();
	}
}
class Add_user_id_to_scraps {

	public function up()
	{
		\DB::query('ALTER TABLE `scraps` ADD `user_id` INT(11) NULL')->execute();
	}

	public function down()
	{
		\DB::query('ALTER TABLE `scraps` DROP COLUMN `user_id`')->execute();
	}
}
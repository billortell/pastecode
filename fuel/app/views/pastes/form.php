<?php echo Form::open('/'); ?>

	<div id="masthead">
		<p class="language">
			<label for="language">Choose your language:</label>
			<?php echo Form::select('language', (isset($type) ? $type : 'php'), Pastecode::$languages, array('id' => 'language')); ?>
		</p>
		<h1><?php echo (isset($title) ? $title : 'New Paste'); ?></h1>
	</div>

	<input type="hidden" id="do-not-fill-this-out" name="do-not-fill-this-out" value="">

	<?php echo \Form::textarea('paste', \Input::post('paste'), array('class' => 'pastebox', 'rows' => 22, 'cols' => 40, 'tabindex' => 1)); ?>

	<div class="actions" >

		<span class="private">
			<input type="checkbox" title="Check this box to make this paste private" name="private" id="private" value="1">
			<label for="private"><?php echo Asset::img('icons/lock.png', array('title' => 'Check this box to make this paste private')); ?></label>
		</span>

		<button type="submit">Paste</button>

	</div>

<?php echo Form::close(); ?>
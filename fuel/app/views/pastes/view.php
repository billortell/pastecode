<div id="masthead">
	<p class="language">
		<label for="language">Theme:</label>
		<?php

		echo Form::select(array(
			'name' => 'style',
			'id'	=> 'style',
			'options'	=> \Pastecode::$themes,
			'selected'	=> 'idea',
		));

		?> <span>|</span>
		<?php echo \Html::anchor('pastes/reply/'.$short_id, 'Reply'); ?> <span>|</span>
		<?php echo \Html::anchor('pastes/download/'.$short_id, 'Download'); ?> <span>|</span>
		<?php echo \Html::anchor('pastes/raw/'.$short_id, 'Raw'); ?>
	</p>
	<h2><?php echo (isset($page_title) ? $page_title : 'Viewing Paste'); ?></h2>
</div>

<div class="code-block">
	<table cellpadding="0" cellspacing="0" border="0">
		<tbody>
			<tr>
				<td class="numbers">
				<?php

					$lines = explode(PHP_EOL, $code);

					for($i = 1; $i <= count($lines); ++$i)
					{
						echo $i.'<br>';
					}

				?>
				</td>
				<td class="source"><pre><code class="<?php echo $type; ?>"><?php echo str_replace(' ', '&nbsp;', $code); ?></code></pre></td>
			</tr>
		</tbody>
	</table>
</div>

<div class="actions" >

	<?php echo Form::open('/'); ?>
		<button type="submit">Start New Paste</button>
	<?php echo Form::close(); ?>

</div>
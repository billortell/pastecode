<h1><?php echo (isset($title) ? $title : '404 Page Not Found'); ?></h1>
<p>
	Sorry, there is no paste that matches your request, or the pastie has been
	flagged as spam. Why not create a <?php echo \Html::anchor('/', 'new paste?'); ?>
</p>
<!doctype html>
<!--[if lt IE 7]><html class="no-js ie ie6 lte9 lte8 lte7 oldie" lang="en"><![endif]-->
<!--[if IE 7]><html class="no-js ie ie7 lte9 lte8 lte7 oldie" lang="en"><![endif]-->
<!--[if IE 8]><html class="no-js ie ie8 lte9 lte8 oldie" lang="en"><![endif]-->
<!--[if IE 9]><html class="no-js ie ie9 lte9" lang="en"><![endif]-->
<!--[if gt IE 9]><html class="no-js ie" lang="en"><![endif]-->
<!--[if !IE]><!--><html class="no-js" lang="en"><!--<![endif]-->
	<head>
		<meta charset="utf-8">

		<!-- DNS Prefetching -->
		<link rel="dns-prefetch" href="//ajax.googleapis.com" />

		<!-- Document -->
		<title><?php echo ((isset($title) and !empty($title)) ? $title.' - ' : ''); ?>Paste Code</title>
		<meta name="description" content="Pastecode is a tool for collaborative debugging or editing, See help for details.">
		<meta name="author" content="/humans.txt">

		<!--
		Yeah bro, viewing source code, like a badass.
		Feel free to dig in.. Everything you'll find here has been left fairly
		readable, and I attempt to keep everything as documented as possible.
		Enjoy your stay, just remember to close the door on your way out.
		-->

		<!-- Mobile viewport optimized -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<!-- CSS: implied media="all" -->
		<?php echo Asset::css('style.css'); ?>
		<?php echo Asset::css('themes/idea.css', array('class' => 'lang-style')); ?>

		<!--
		All JavaScript at the bottom, except for Modernizr and Respond.
		Modernizr enables HTML5 elements & feature detects; Respond is a
		polyfill for min/max-width CSS3 media queries.
		-->
		<?php echo Asset::js('libs/modernizr-2.0.min.js'); ?>
		<?php echo Asset::js('libs/respond.min.js'); ?>
	</head>
	<body>

		<div id="container">

			<header id="banner">
				<h1>
					<?php echo \Html::anchor('/', 'Paste Code'); ?>
				</h1>
				<nav id="menu">
					<ul>
						<li><?php echo \Html::anchor('/', 'New'); ?></li>
						<li><?php echo \Html::anchor('help', 'Help'); ?></li>
						<li><?php echo \Html::anchor('contact', 'Contact'); ?></li>
					</ul>
				</nav>
				<q class="quote"><?php echo isset($quote) ? '"'.$quote.'"' : ''; ?></q>
			</header>

			<aside id="right">

				<?php \Widget::render(); ?>

				<div class="adsense">
					<script type="text/javascript"><!--
					google_ad_client = "ca-pub-1190668456058294";
					/* PasteCode */
					google_ad_slot = "2642275649";
					google_ad_width = 300;
					google_ad_height = 250;
					//-->
					</script>
					<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
				</div>

			</aside>

			<div id="main" role="main">

				<noscript>
					<div class="dialog warning">
						You must have javascript enabled to truly enjoy our site!
					</div>
				</noscript>

<?php if (Session::get_flash('notice')): ?>
	<div class="dialog warning">
		<p><?php echo Session::get_flash('notice'); ?></p>
	</div>
<?php endif; ?>

<?php echo (isset($content) ? $content : ''); ?>

			</div>

			<footer id="footer">
				&copy; <?php echo date('Y'); ?> <?php echo \Html::anchor('http://ninjarite.com/', 'Ninjarite Development Group'); ?> - Page rendered in {exec_time} seconds using {mem_usage} MB of memory
			</footer>

		</div>

		<!-- JavaScript at the bottom for fast page loading -->

		<!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
		<?php echo Asset::js('//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js'); ?>
		<script>window.jQuery || document.write('<?php echo str_replace(array(PHP_EOL, '</script>'), array('', '<\/script>'), Asset::js('libs/jquery-1.6.2.min.js')); ?>')</script>

		<!-- scripts concatenated and minified -->
		<?php echo Asset::js('plugins.js'); ?>
		<?php echo Asset::js('script.min.js'); ?>
		<!-- end scripts-->

		<!-- Google Analytics Tracking Code -->
		<script>
		var _gaq=[['_setAccount','UA-24176682-7'],['_trackPageview'],['_trackPageLoadTime']];
		(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
		g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
		s.parentNode.insertBefore(g,s)}(document,'script'));
		</script>

		<!-- Prompt IE6 users to install Chrome Frame. -->
		<!--[if lt IE 7 ]>
		<?php echo Asset::js('//ajax.googleapis.com/ajax/libs/chrome-frame/1.0.3/CFInstall.min.js'); ?>
		<script>window.attachEvent('onload',function(){CFInstall.check({mode:'overlay'})})</script>
		<![endif]-->

	</body>
</html>
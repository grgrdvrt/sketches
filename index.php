<html>
<head>
	<title>sketches</title>
  <link rel="stylesheet" type="text/css" href="reset.css"/>
  <link rel="stylesheet" type="text/css" href="styles.css"/>
</head>
<body>
  <div class="header">
    <p class="header-home"><a href="/">GrgrDvrt</a></p><!--
    --><ul class="header-menu-list"><!--
      --><li class="header-menu-item"><a href="/works/">Works & experiments</a></li><!--
      --><li class="header-menu-item"><a href="/sketches/">Sketches</a></li><!--
      --><li class="header-menu-item"><a href="/about/">About</a></li>
    </ul>
  </div>

  <h1 class="sketches-title">Sketches</h1>
  <div class="sketches-sketches-list">
	<?php
	$reservedNames = array('index.html', 'libs', 'index.php', 'css', 'reset.css', 'styles.css', '.', '..');
	$myDirectory = opendir(".");
	while($entryName = readdir($myDirectory)) {
		if(!in_array($entryName, $reservedNames)){
			$dirArray[] = $entryName;
        }
	}
	closedir($myDirectory);
	$indexCount	= count($dirArray);
	sort($dirArray);
	$dirArray = array_reverse($dirArray);

	for($i = 0; $i < $indexCount; $i++)
	{
		$exploded = explode('.', $dirArray[$i]);
		$name = $exploded[0];
		echo '<a href="'.$name.'"><img src="'.$name.'/thumb.jpg"/></a>';
	}
	?>
  </div>
</body>
</html>

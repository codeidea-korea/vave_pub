<?php include_once('lib/common.lib.php'); ?>
<!DOCTYPE html>
<html lang="ko">

<head>
	<meta charset="utf-8">
	<title>Vave</title>
	<meta http-equiv="imagetoolbar" content="no">
	<meta http-equiv="X-UA-Compatible" content="IE=10,chrome=1">
	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />
	<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
	<link href="https://design01.codeidea.io/link_style.css" rel="stylesheet">
	<link rel="stylesheet" href="./dist/css/app.css" />
	<link rel="stylesheet" href="./dist/css/swiper-bundle.min.css" />
	<link rel="stylesheet" href="./dist/css/layout.css" />
	<link rel="stylesheet" href="./dist/css/custom.css" />
	<style>
		.ex_table th{
			border-bottom-width:1px;	
			border-right-width:1px;
		}
		.ex_table th:last-child{
			border-right-width:0px;
		}
		header {display:none; }
		.quick_menu {display:none; }
		#wrap .side_menu {display:none; }
	</style>
</head>
</body>

<div class="publishing-help">
	<span class="label not">작업중</span>
	<span class="label popup">팝업</span>
	<span class="label change">수정</span>
	<span class="label add">최근 추가</span>
</div>

<?php
function txtRecord($dir)
{
	if (is_dir($dir)) {
		$handle  = opendir($dir);
		$files = array();
		while (false !== ($filename = readdir($handle))) {
			if ($filename == "." || $filename == "..") continue;
			if (is_file($dir . "/" . $filename)) {
				$files[] = $filename;
			}
		}
		closedir($handle);
		rsort($files);
		if (count($files) > 0) {
			echo '<div class="_record rsort">';
			echo '<ul>';
			foreach ($files as $f) {
				$name = '수정 ' . preg_replace("/[^0-9]*/s", "", $f);
				echo '<li><a href="' . $dir . $f . '" target="_black">' . $name . '</a></li>';
			}
			echo '</ul>';
			echo '</div>';
		}
	}
}
echo txtRecord('./@record/');
?>

<div id="publishingContainer">

	<ul class="page-link">
		<li class="" data-label="메인">
            <ul>
                <li><a href="./index.html" target="_blank" class="">메인 - 로그인 후 (진행중)</a></li>
                <li><a href="./index_logout.html" target="_blank" class="">메인 - 로그인 전</a></li>
            </ul>
        </li>
		<li class="" data-label="공통모달">
			<ul>
				<li>
					<button class="pop-modal" onclick="modalOpen('lang-modal')">언어변경 모달</button>
					<button class="pop-modal" onclick="modalOpen('join-modal'); tabChange('#join-1-tab button');">로그인 모달</button>
					<button class="pop-modal" onclick="modalOpen('join-modal'); tabChange('#join-2-tab button');">가입 모달</button>
					<button class="pop-modal" onclick="modalOpen('password_reset-modal')">비밀번호 재설정 모달</button>
					<button class="pop-modal" onclick="modalOpen('password_reset_complete-modal')">비밀번호 재설정 확인 후 모달</button>
				</li>
			</ul>
		</li>
	</ul>
</div>

<!-- 모달 -->
<div id="wrap"></div>



<script src='https://design01.codeidea.io/link_script.js'></script>
<script src="./dist/js/app.js"></script>
<script src="./dist/js/swiper-bundle.min.js"></script>
<script src="./dist/js/jquery-1.12.4.js"></script>
<script src="./dist/js/custom.js"></script>


</body>

</html>
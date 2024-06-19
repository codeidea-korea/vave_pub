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
	<link rel="stylesheet" href="./dist/css/swiper-bundle.min.css" />
	<link rel="stylesheet" href="./dist/css/app.css" />
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
                <li><a href="./index.html" target="_blank" class="">메인 - 로그인 후</a></li>
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
				<li>
					<button class="pop-modal" onclick="modalOpen('cashier-modal'); tabChange('#cashier-1-tab button');">입금하기 모달</button>
					<button class="pop-modal" onclick="modalOpen('cashier-modal'); tabChange('#cashier-2-tab button');">출금 모달</button>
					<button class="pop-modal" onclick="modalOpen('cashier-modal'); tabChange('#cashier-3-tab button');">암호 화폐 구매 모달</button>

					<button class="pop-modal" onclick="modalOpen('deposit_bitcoin-modal');">입금 - bitcoin 모달</button>
					<button class="pop-modal" onclick="modalOpen('deposit_crypto-modal');">입금 - crypto 모달</button>
					<button class="pop-modal" onclick="modalOpen('deposit_changelly-modal');">입금 - changelly 모달</button>
					<button class="pop-modal" onclick="modalOpen('deposit_kado-modal');">입금 - kado 모달</button>
				</li>
				<li>
					<button class="pop-modal" onclick="modalOpen('wallet_setting-modal');">지갑 설정 모달</button>
					<button class="pop-modal" onclick="modalOpen('statistics-modal');">통계 모달</button>
				</li>
			</ul>
		</li>
		<li class="mt40" data-label="슬롯">
			<ul>
				<li><a href="./slot.html" target="_blank" class="">슬롯</a></li>
			</ul>
		</li>
		<li class="mt40" data-label="도움말">
			<ul>
				<li><a href="./help_faq.html" target="_blank" class="">자주 묻는 질문</a></li>
				<li><a href="./help_sportsbook-rules.html" target="_blank" class="">일반 스포츠북</a></li>
				<li><a href="./help_betting-rules.html" target="_blank" class="">베팅 규칙</a></li>
				<li><a href="./help_contacts.html" target="_blank" class="">문의하기</a></li>
				<li><a href="./help_responsible-gaming.html" target="_blank" class="">책임감 있는 게임</a></li>
				<li><a href="./help_cryptocurrency.html" target="_blank" class="">암호화폐</a></li>
			</ul>
		</li>
	</ul>
</div>

<!-- 모달 -->
<div id="wrap"></div>



<script src='https://design01.codeidea.io/link_script.js'></script>
<script src="./dist/js/app.js"></script>
<script src="./dist/js/jquery-1.12.4.js"></script>
<script src="./dist/js/swiper-bundle.min.js"></script>
<script src="./dist/js/custom.js"></script>


</body>

</html>
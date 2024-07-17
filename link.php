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
				<li>
					<button class="pop-modal" onclick="modalOpen('producer-modal');">공급자 모달</button>
					<button class="pop-modal" onclick="modalOpen('slot_category-modal');">슬롯/라이브카지노 카테고리 모달</button>
					<button class="pop-modal" onclick="modalOpen('affiliate-modal');">Affiliate 모달</button>
				</li>
				<li>
					<button class="pop-modal" onclick="modalOpen('spin-modal');">행운의 휠(SPIN) 모달</button>
				</li>
				<li class="mt20">
					<button class="pop-modal" onclick="chatOpen($('.chat_box > div:not(.hidden)'),'.chat_info')">채팅규칙</button>
					<button class="pop-modal" onclick="chatOpen($('.chat_box > div:not(.hidden)'),'.chat_cont')">채팅</button>
					<button class="pop-modal" onclick="chatOpen($('.chat_box > div:not(.hidden)'),'.user_box')">채팅 참가자</button>
					<button class="pop-modal" onclick="chatOpen($('.chat_box > div:not(.hidden)'),'.chat_setting')">채팅 설정</button>
					<button class="pop-modal" onclick="chatOpen($('.chat_box > div:not(.hidden)'),'.chat_setting_profile')">채팅 설정 > 프로필</button>
					<button class="pop-modal" onclick="chatOpen($('.chat_box > div:not(.hidden)'),'.chat_setting_profile_avatar')">채팅 설정 > 프로필 > 아바타 </button>
					<button class="pop-modal" onclick="chatOpen($('.chat_box > div:not(.hidden)'),'.chat_setting_interface')">채팅 설정 > 언어 및 인터페이스</button>
					<button class="pop-modal" onclick="chatOpen($('.chat_box > div:not(.hidden)'),'.chat_setting_interface_lang')">채팅 설정 > 메시지 번역</button>
					<button class="pop-modal" onclick="chatOpen($('.chat_box > div:not(.hidden)'),'.chat_blocked')">채팅 설정 > 차단됨</button>
				</li>
			</ul>
		</li>
		<li class="mt40" data-label="스포츠">
			<ul>
				<li>
					<a href="./sports.html" target="_blank" class="">스포츠 베팅</a>
					<ul>
						<li><button class="pop-modal" onclick="modalOpen('sports_search-modal')">스포츠 검색 모달</button></li>
					</ul>
				</li>
				<li>
					<a href="./sports_mo.html" target="_blank" class="">스포츠 베팅 - 모바일</a>
					<ul>
						<li><a href="./sports_mo_search.html" target="_blank" class="">스포츠 베팅 - 모바일</a></li>
						<li>
							<button class="pop-modal" onclick="modalOpen('betslip_delete-modal')">betslip 삭제 모달</button>
							<button class="pop-modal" onclick="modalOpen('betslip_betsetting-modal')">betslip 베팅 설정 모달</button>
							<button class="pop-modal" onclick="modalOpen('betslip_setting-modal')">betslip 설정 모달</button>
						</li>
					</ul>
				</li>
			</ul>
		</li>

		<li class="mt40" data-label="네비게이션">
			<ul>
				<li>
					<a href="./promotion.html" target="_blank" class="">프로모션</a>
					<ul>
						<li><a href="./promotion_detail.html" target="_blank" class="">프로모션 상세</a></li>
						<li><button class="pop-modal" onclick="modalOpen('promotion_terms-modal');">프로모션 이용약관 모달</button></li>
					</ul>
				</li>
				<li>
					<a href="./bettors_tournament.html" target="_blank" class="">리더보드</a>
					<ul>
						<li><button class="pop-modal" onclick="modalOpen('bettor_terms-modal');">베터 이용약관 모달</button></li>
					</ul>
				</li>
				<li>
					<a href="./hall_of_fame.html" target="_blank" class="">명에의전당</a>
					<ul>
						<li><a href="./hall_of_fame_sports.html" target="_blank" class="">명예의전당 스포츠</a></li>
					</ul>
				</li>
				<li><a href="./referrals.html" target="_blank" class="">추천</a></li>
			</ul>
		</li>
		<li class="mt40" data-label="슬롯">
			<ul>
				<li>
					<a href="./slot.html" target="_blank" class="">슬롯</a>
					<ul>
						<li><a href="./game_detail.html" target="_blank" class="">게임 상세</a></li>
					</ul>
				</li>
				<li><a href="./slot_my_favorites.html" target="_blank" class="">나의 즐겨찾기</a></li>
				<li><a href="./slot_popular.html" target="_blank" class="">인기 게임</a></li>
				<li><a href="./slot_new.html" target="_blank" class="">신규</a></li>
				<li><a href="./slot_slots.html" target="_blank" class="">슬롯</a></li>
				<li><a href="./slot_hits.html" target="_blank" class="">히트</a></li>
				<li><a href="./slot_bonus_buy.html" target="_blank" class="">보너스 구매</a></li>
				<li><a href="./slot_dropandwins.html" target="_blank" class="">일일 Drops & Wins</a></li>
				<li><a href="./slot_other.html" target="_blank" class="">기타</a></li>
				<li><a href="./slot_vave.html" target="_blank" class="">Vave 게임</a></li>
			</ul>
		</li>
		<li class="mt20" data-label="라이브 카지노">
			<ul>
				<li>
					<a href="./casino.html" target="_blank" class="">라이브 카지노</a>
					<ul>
						<li><a href="./game_detail.html" target="_blank" class="">게임 상세</a></li>
					</ul>
				</li>
				<li><a href="./casino_my_favorites.html" target="_blank" class="">나의 즐겨찾기</a></li>
				<li><a href="./casino_popular.html" target="_blank" class="">인기 게임</a></li>
				<li><a href="./casino_new.html" target="_blank" class="">신규</a></li>
				<li><a href="./casino_roulette.html" target="_blank" class="">룰렛</a></li>
				<li><a href="./casino_blackjack.html" target="_blank" class="">블랙잭</a></li>
				<li><a href="./casino_blackjack_league.html" target="_blank" class="">블랙잭 리그</a></li>
				<li><a href="./casino_game_shows.html" target="_blank" class="">게임 쇼</a></li>
				<li><a href="./casino_baccarat.html" target="_blank" class="">바카라</a></li>
				<li><a href="./casino_poker.html" target="_blank" class="">포커</a></li>
			</ul>
		</li>
		<li class="mt20" data-label="기타">
			<ul>
				<li><a href="./vip_program.html" target="_blank" class="">VIP 카지노</a></li>
				<li><a href="./vip_program_sport.html" target="_blank" class="">VIP 스포츠</a></li>
			</ul>
		</li>
		<li class="mt40" data-label="회사 소개">
			<ul>
				<li><a href="./info_terms.html" target="_blank" class="">이용약관</a></li>
				<li><a href="./info_bonus_term.html" target="_blank" class="">일반 보너스 조건</a></li>
				<li><a href="./info_privacy.html" target="_blank" class="">개인 정보 보호 정책</a></li>
				<li><a href="./info_about.html" target="_blank" class="">부가 정보</a></li>
				<li><a href="./info_source.html" target="_blank" class="">주요 정보 출처</a></li>
			</ul>
		</li>
		<li class="mt20" data-label="도움말">
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
        <script src="./dist/js/jquery-ui.js"></script>
<script src="./dist/js/swiper-bundle.min.js"></script>
<script src="./dist/js/custom.js"></script>


</body>

</html>
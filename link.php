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
					<button class="pop-modal" onclick="modalOpen('join-modal')">로그인 모달</button>
				</li>
			</ul>
		</li>
	</ul>
</div>

<!-- 모달 -->

<!-- 언어선택 모달 -->
<div id="lang-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body p-10">
                <button class="close_btn" onclick="closeModal('lang-modal')"><svg viewBox="0 0 24 24" class="svg-icon w-6 h-6"><use href="./dist/images/icon-defs.svg#close"></use></svg></button>
                <div class="grid grid-cols-2 xl:grid-cols-3 gap-y-4 mont">
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">English</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Deutsch</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Русский</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Español</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Français</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Português</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Italiano</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">ελληνικά</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Bahasa Indonesia</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">日本語</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">한국인</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">हिन्दी</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">汉语</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Tiếng Việt</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Polski</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Suomi</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Tagalog</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Turkish</button>
                    <button class="flex items-center gap-3 hover:text-primary"><img class="w-7" src="./dist/images/icon/global.webp" alt="">Українська</button>
                </div>
            </div>
        </div>
    </div>
</div> 


<!-- 가입 / 등록 모달 -->
<div id="join-modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body p-0">
                <button class="close_btn" onclick="closeModal('join-modal')"><svg viewBox="0 0 24 24" class="svg-icon w-6 h-6"><use href="./dist/images/icon-defs.svg#close"></use></svg></button>
                <div class="join_wrap">
                    <div class="left_box flex flex-col justify-between">
                        <h2 class="p-6 pt-8 text-4xl font-extrabold">Vave 카지노 입장</h2>
                        <div>
                            <img src="./dist/images/icon/join_img.webp" alt="">
                            <div class="flex items-center gap-2 h-14 px-6 bg-gray-900 bg-opacity-50">
                                <svg viewBox="0 0 24 24" class="svg-icon w-5 h-5 flex-shrink-0"><use href="./dist/images/icon-defs.svg#partnership"></use></svg>
                                <p class="text-xs">앰버서더 Judd Trump World champion 2019</p>
                            </div>
                        </div>
                    </div>
                    <div class="right_box py-7 px-4">
                        <ul class="nav nav-boxed-tabs gap-1 bg-gray-900 bg-opacity-50 !p-1 rounded-lg " role="tablist">
                            <li id="join-1-tab" class="nav-item flex-1" role="presentation"> 
                                <button class="nav-link w-full py-1 hover:bg-primary hover:bg-opacity-50 active" data-tw-toggle="pill" data-tw-target="#join-tab-1" type="button" role="tab" aria-controls="join-tab-1" aria-selected="true"> 가입 </button> 
                            </li>
                            <li id="join-2-tab" class="nav-item flex-1" role="presentation">
                                <button class="nav-link w-full py-1 hover:bg-primary hover:bg-opacity-50" data-tw-toggle="pill" data-tw-target="#join-tab-2" type="button" role="tab" aria-controls="join-tab-2" aria-selected="false"> 등록 </button> 
                            </li>
                        </ul>
                        <div class="my-4 border-t border-white border-opacity-10"></div>
                        <div class="tab-content mt-5">
                            <div id="join-tab-1" class="tab-pane leading-relaxed active" role="tabpanel" aria-labelledby="join-1-tab">
                                <div class="input_wrap mb-3"> 
                                    <input id="join-email" type="text" class="form-control w-full" onchange="inputChange(this)" oninput="inputChange(this)"> 
                                    <label for="join-email" class="form-label">이메일</label> 
                                </div>
                                <div class="input_wrap error mb-3"> 
                                    <input id="join-email2" type="text" class="form-control w-full" onchange="inputChange(this)" oninput="inputChange(this)"> 
                                    <label for="join-email2" class="form-label">이메일</label> 
                                </div>
                                <div class="input_wrap mb-3"> 
                                    <input id="join-password" type="password" class="form-control w-full" onchange="inputChange(this)" oninput="inputChange(this)"> 
                                    <label for="join-password" class="form-label">비밀번호</label> 
                                    <button class="password_btn text-light" onclick="passwordChange(this)"><svg viewBox="0 0 24 24" class="svg-icon w-5 h-5 mx-auto"><use href="./dist/images/icon-defs.svg?#eye-active"></use></svg></button>
                                </div>
                                <a href="javascript:;" class="text-xs text-primary">비밀번호를 잊어버렸습니다.</a>
                                <div class="my-3">
                                    <button class="btn btn-primary-soft w-full" disabled>가입</button>
                                    <button class="btn btn-primary w-full">가입</button>
                                </div>
                                <div class="text-xs text-light">
                                    아직 계정이 없으신가요? <button class="text-xs text-primary hover:text-white">등록</button>
                                </div>
                            </div>
                            <div id="join-tab-2" class="tab-pane leading-relaxed" role="tabpanel" aria-labelledby="join-2-tab">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 


<script src='https://design01.codeidea.io/link_script.js'></script>
<script src="./dist/js/app.js"></script>
<script src="./dist/js/swiper-bundle.min.js"></script>
<script src="./dist/js/custom.js"></script>


</body>

</html>
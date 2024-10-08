//=======================================================
//   html load
//=======================================================

window.addEventListener("load", ()=>{
    // 로딩이미지 가리기
    const loader = document.querySelector('.main-loader')
    if(loader){
        setTimeout(function(){
            loader.classList.add('hide')
        },1000)
    }
    
    // 헤더 - 로그인 후
    fetch("./_header.html")
        .then((response) => response.text())
        .then((htmlData) => {
            if(!$('body').hasClass('logout')){
                $('body').prepend(htmlData)
                headerScript();
            }
        })
        .catch((error) => {
            console.log(error);
        });

    // 헤더 - 로그인 전
    fetch("./_header_logout.html")
        .then((response) => response.text())
        .then((htmlData) => {
            if($('body').hasClass('logout')){
                $('body').prepend(htmlData)
                headerScript();
            }
        })
        .catch((error) => {
            console.log(error);
        });
    
    // 사이드메뉴
    fetch("./_side_menu.html")
        .then((response) => response.text())
        .then((htmlData) => {
            $('#wrap').prepend(htmlData)
            sideMenu();
        })
        .catch((error) => {
            console.log(error);
        });
    
    // 푸터 
    fetch("./_footer.html")
        .then((response) => response.text())
        .then((htmlData) => {
            $('#wrap .content').append(htmlData);
            footerScript()
        })
        .catch((error) => {
            console.log(error);
        });

    // 모달 
    fetch("./_modal.html")
    .then((response) => response.text())
    .then((htmlData) => {
        $('#wrap').append(htmlData);
        setTimeout(()=>{
            loadJquery();
        },1000)
    })
    .catch((error) => {
        console.log(error);
    });

    // 스포츠영역 
    fetch("./_right_bet.html")
    .then((response) => response.text())
    .then((htmlData) => {
        if($('body').hasClass('sports')){
            $('#wrap').append(htmlData);
        }
    })
    .catch((error) => {
        console.log(error);
    });

    // 마이페이지 
    fetch("./_mypage_side.html")
    .then((response) => response.text())
    .then((htmlData) => {
        if($('body').hasClass('mypage')){
            $('#wrap .content .box').prepend(htmlData);
            setTimeout(()=>{Mypage()},1000)
        }
    })
    .catch((error) => {
        console.log(error);
    });

});

// 마이페이지 스크립트
const Mypage = ()=>{
    let pathname = window.location.pathname.split('/')[2]

    $('.mypage_menu a').each(function(){
        if(pathname == $(this).attr('href').split('/')[1]){
            $(this).addClass('active')
        }
    })
}

// 사이드메뉴 스크립트
const sideMenu = ()=>{
    // Side Menu
    $(".side-menu").on("click", function () {
        if ($(this).parent().find("ul").length) {
            if ($(this).parent().find("ul").first()[0].offsetParent !== null) {
                $(this)
                    .find(".side-menu__sub-icon")
                    .removeClass("transform rotate-180");
                $(this).removeClass("side-menu--open");
                $(this)
                    .parent()
                    .find("ul")
                    .first()
                    .slideUp(300, function () {
                        $(this).removeClass("side-menu__sub-open");
                    });
            } else {
                $(this)
                    .find(".side-menu__sub-icon")
                    .addClass("transform rotate-180");
                $(this).addClass("side-menu--open");
                $(this)
                    .parent()
                    .find("ul")
                    .first()
                    .slideDown(300, function () {
                        $(this).addClass("side-menu__sub-open");
                    });
            }
        }
    });

    // 스포츠 좌측메뉴 클릭시 active
    $('.side_menu .sports_nav .category a').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active')
    })
}

// 헤더 스크립트
const headerScript = ()=>{

    // 헤더 ...
    $('header .gnb .gnb_dot').on('click',function(){
        $(this).next('.gnb_list').toggleClass('open')
    })
    document.addEventListener('click',(e)=>{
        const select = document.querySelector('.more_gnb')

        if(select && !select.contains(e.target)){
            select.querySelector('.gnb_list').classList.remove('open')
        }
    })

    // 모바일 하단 - 퀵메뉴
    $(".quick_menu ul li.type02 > div > a").on('click',function(){
        const parent = $(this).parents('li')
        parent.toggleClass('active_open').siblings().removeClass('active_open');
        if(parent.hasClass('active_open')){
            $('.quick_menu').addClass('active')
            $('body').addClass('overflow-hidden')
        }else{
            $('.quick_menu').removeClass('active')
            $('body').removeClass('overflow-hidden')
        }
    });

    $(".quick_menu ul li:not(.type02) > a, .quick_menu .quick_bg").on('click',function(){
        $('.quick_menu li.type02').removeClass('active_open')
        $('.quick_menu').removeClass('active')
        $('body').removeClass('overflow-hidden')
    });

    $('.chat_box').draggable();

     // 채팅
     $('.chat_cont .sticker_btn').each(function(){
        $(this).on('click',function(){
            let href = $('.chat_cont .sticker_btn.type02').find('use').attr('href').split('#')
            if($('.chat_cont .sticker_box').hasClass('open')){
                $('.chat_cont .sticker_box').removeClass('open')
                $('.chat_cont .sticker_btn.type02').find('use').attr('href',`${href[0]}#sticker`)
            }else{
                $('.chat_cont .sticker_box').addClass('open')
                $('.chat_cont .sticker_btn.type02').find('use').attr('href',`${href[0]}#keyboard`)
            }
        })
    })
    $('.emoji_nav button').on('click',function(){
        let target = $(this).data('target');
        let emoji_top = $(`.emoji_wrap #${target}`).offset().top - $('.emoji_wrap').offset().top + $('.emoji_wrap').scrollTop();
        
        $('.emoji_wrap').scrollTop(emoji_top + 1)
    });
    $('.emoji_wrap').on('scroll',function(e){
        console.log(e.target.scrollTop)
        let scT = e.target.scrollTop 
        $('.emoji_wrap > div').each(function(){
            let emoji_top = $(this).offset().top - $('.emoji_wrap').offset().top + $('.emoji_wrap').scrollTop();
            if(scT > emoji_top){
                $(`.emoji_nav button[data-target=${$(this).attr("id")}]`).addClass('active').siblings().removeClass('active')
            }
            console.log(scT , emoji_top, $(this).attr("id"))
        })
    });
    $('.chat_cont .emotion_btn').on('click',function(){
        $('.chat_cont .emotions_anim').addClass('open',function(){
            setTimeout(function(){
                $('.chat_cont .emotions_anim').removeClass('open')
            },5000)
        })
    })
    
}
    
// 푸터 스크립트
const footerScript = ()=>{

    $(window).on('scroll',function(){
        // 스크롤시 회원가입캐시백 팝업 닫기
        let footT = $("footer").offset().top - $(window).height();
        let scrollTop = $(window).scrollTop()
        if(footT < scrollTop){
            $('.cashback_popup').removeClass('open')
        }else{
            $('.cashback_popup').addClass('open')
        }
    });

    $(window).on('scroll',function(){
        let scT = $(window).scrollTop()
        if(scT > 100){
            $('.totop_btn').addClass('on')
        }else{
            $('.totop_btn').removeClass('on')
        }
    })

}


// 햄버거메뉴
const hamToggle = ()=>{
    $('.side_menu').toggleClass('open');
    $('.mo_menu_bg').toggleClass('open');
    if($('.mo_menu_bg').hasClass('open')){
        $('body').addClass('overflow-hidden');
    }else{
        $('body').removeClass('overflow-hidden');
    }
}

// 닫기 - 공통
const parentClose = (item)=>{
    $(item).addClass('!hidden')
}

// 상세 높이 toggle
const contentHeight = (item)=>{
    $(item).parents('.height_fixed').toggleClass('open')
    if($(item).text() == "더 읽기"){
        $(item).text('적게 읽기')
    }else if($(item).text() == "적게 읽기"){
        $(item).text('더 읽기')
    }else if($(item).text() == "더 많은 정보"){
        $(item).text('정보 간략히')
    }else{
        $(item).text('더 많은 정보')
    }
}


// 모달 오픈
const modalOpen = (item)=>{
    const modal = document.querySelector(`#${item}`);
    modal.classList.add('show','overflow-y-auto');
    modal.style.marginTop = "0";
    modal.style.marginLeft = "0";
    modal.style.paddingLeft = "0";
    modal.style.zIndex = "10000";
    document.querySelector('body').classList.add('overflow-hidden');
}

// 모달 닫기
const closeModal = (item)=>{
    const modal = document.querySelector(`#${item}`);
    modal.classList.remove('show','overflow-y-auto');
    modal.style.marginTop = "-10000px";
    modal.style.marginLeft = "-10000px";
    modal.style.paddingLeft = "0";
    modal.style.zIndex = "0";
    document.querySelector('body').classList.remove('overflow-hidden');
}

// 코인 선택시 변경
const coinChange = (item)=>{
    let cash = $(item).find('b').text()
    let coin = $(item).find('p').text();
    let imgSrc = $(item).find('img').attr('src')

    $('.currentCash').each(function(){
        $(this).text(cash)
    });

    $('.currentCoinImg').each(function(){
        $(this).attr('src',imgSrc)
    });

    $('.currentCoin').each(function(){
        $(this).text(coin)
    });
}

// 드롭다운 닫기버튼
const dropdownClose = (item)=>{
    const id = $(item).parents('.dropdown-menu').attr('id')
    const btn = $(`div[data-dropdown-replacer=${id}]`).prev('.dropdown-toggle');

    btn.click()
}

// 커스텀 토글
const customToggle = (item)=>{
    $(item).parents('.custom_toggle').toggleClass('open')
}

// input_wrap 에서 input에 내용 입력했을때 클래스 추가
const inputChange = (item)=>{
    if($(item).val().length > 0){
        $(item).parent('.input_wrap').addClass('on')
    }else{
        $(item).parent('.input_wrap').removeClass('on')
    }
}

// password <---> text
const passwordChange = (item)=>{
    let type = $(item).siblings('input').attr('type')
    let icon = $(item).find('use').attr('href').split('#')

    if(type == 'text'){
        $(item).siblings('input').attr('type','password')
        $(item).find('use').attr('href',`${icon[0]}#eye`)
    }else{
        $(item).siblings('input').attr('type','text')
        $(item).find('use').attr('href',`${icon[0]}#eye-active`)
    }
}

// tw tab 클릭
const tabChange = (item)=>{
    $(item).click();
}

// passwordFocus 시 툴팁 보이게
const passwordFocus = (item,state)=>{
    
    if(state=="in"){
        $(item).siblings('.password_tooltip').addClass('show')
    }else{
        $(item).siblings('.password_tooltip').removeClass('show')
    }
} 

// 버튼 클릭시 active 
const btnActive = (item)=>{
    $(item).addClass('active').siblings().removeClass('active');
}

//  페이지 넘김
const showhideBox = (showItem, hideItem)=>{
    $(showItem).each(function(){
        $(this).removeClass('hidden')
    })
    $(hideItem).each(function(){
        $(this).addClass('hidden')
    })
}

// 캐셔 - 입금하기 모달
const cashierChange = (item)=>{
    if($(item).prop('checked')){
        $('.bonus_list').each(function(){
            $(this).removeClass('hidden')
        })
    }else{
        $('.bonus_list, .bonus_detail').each(function(){
            $(this).addClass('hidden')
        })
        
    }
}

// 지갑설정 - 법정화폐
const walletChange = (item)=>{
    if($(item).prop('checked')){
        $('#wallet_currency_list input').each(function(){
            $(this).prop('disabled',false)
        })
    }else{
        $('#wallet_currency_list input').each(function(){
            $(this).prop('disabled',true)
        })
    }
}

// 클릭시 다른 div open 
const chatOpen = (e,item)=>{
    $(e).addClass('hidden').siblings(item).removeClass('hidden')
    if(item == ".chat_btn"){
        $(e).parents('.chat_box').removeClass('size_lg')
    }
}

// 채팅 사이즈 변경
const chatSize = (item)=>{
    $(item).parents('.chat_box').toggleClass('size_lg')
}

// 채팅 참가자 open 
const chatUser = (item)=>{
    $(item).next().toggleClass('hidden')
    $(item).toggleClass('open')
}

const moChatOpen = ()=>{
    $('.chat_box').toggleClass('open')
    $('.chat_box > div').each(function(){
        $(this).addClass('hidden')
    });
    $('.chat_box .chat_info').removeClass('hidden')
}

// 스포츠 메뉴 - 상위리그 클릭시
const sportInputClick = (item)=>{
    let target = $(item).find('a span').html()

    if($(item).find('input').prop('checked')){
        $(item).find('input').prop('checked',false)
        // 카테고리 삭제
        $('.sports_category_box > div').each(function(){
            if(target == $(this).find('span').html()){
                $(this).remove();
            }
        })
    }else{
        $(item).find('input').prop('checked',true)
        // 카테고리 추가
        $('.sports_category_box').prepend(`
            <div class="flex items-center justify-center gap-1 h-10 px-3 bg-box rounded">
                <span class="flex items-center gap-1">${target}</span>
                <button class="w-4 h-4 bg-light rounded-full" onclick="sportCateDelete(this)"><svg viewBox="0 0 24 24" class="svg-icon w-2 h-2 mx-auto"><use href="./dist/images/icon-defs.svg#svg-close"></use></svg></button>
            </div>`)
    }
}

const sportCateDelete = (item)=>{
    let target = $(item).siblings('span').html();

    $('.sports_nav .sports_filter_top').each(function(){
        if(target == $(this).find('a span').html()){
            $(this).find('input').prop('checked',false)
        }
    })
    $(item).parent().remove();
}
const sportCateAllDelete = (item)=>{
    $(item).siblings().find('button').click();
}

const sportFilterOpen = (item)=>{
    $(item).parent().toggleClass('open')
}

// 스포츠 > 상위이벤트 베팅버튼 클릭
const sportsBetClick = (item)=>{
    $(item).addClass('active').parent().siblings().find('button').removeClass('active')
}

const sportsBetCheck = (item)=>{
    $(item).parents('.sports_bet_wrap').find('.bet_btn').each(function(){
        if($(this).text() != $(item).text()){
            $(this).removeClass('active')
        }
    })
    $(item).toggleClass('active')
}

const sportsBetAllbtn = (item)=>{
    $(item).find('svg').toggleClass('rotate-180')
    $(item).parents('.sports_bet_wrap').find('dl').each(function(){
        if($(item).find('svg').hasClass('rotate-180')){
            $(this).removeClass('open')
        }else{
            $(this).addClass('open')
        }
    })
}
// 스포츠 > 디테일 베팅 닫기
const sportsDetailBetAllbtn = (item)=>{
    $(item).find('svg').toggleClass('rotate-180')
    $('.sports_bet_wrap').find('dl').each(function(){
        if($(item).find('svg').hasClass('rotate-180')){
            $(this).removeClass('open')
        }else{
            $(this).addClass('open')
        }
    })
}

const sportsBetbtn = (item)=>{
    $(item).parents('dl').toggleClass('open')
}
const sportsConOpen = (item,target)=>{
    $(item).find('svg').toggleClass('rotate-180')
    $(item).parents('.sports_body').find(`.${target}`).toggleClass('open')
}

// 모바일 bet_btn 클릭시
const moSportsBetClick = (item)=>{
    $(item).addClass('active').siblings().removeClass('active');
    $(item).parents('.swiper-slide').siblings().find('.bet_btn').removeClass('active');
}

// 모바일 스포츠 탭
const moSportsTab = (item)=>{
    $(item).parents('.mo_sports_tab').find('a').each(function(){
        $(this).removeClass('active')
    })
    $(item).addClass('active')
}

// sports > betslip
const betslipOpen = (item)=>{
    $(item).parent('.right_bet').toggleClass('open')
}
const moBetslipOpen = (target)=>{
    $('.right_bet').addClass('open')
    $(`.right_bet ${target} button`).click();
}
const moBetslipClose = ()=>{
    $('.right_bet').removeClass('open')
}

// 스포츠 detail > breadcrumbs ... 클릭시 상세 보여주기
const breadcrumbsHandle = (item)=>{
    $(item).addClass('hidden')
    $(item).next().removeClass('hidden')
}

// 상단으로
const scTHandle = ()=>{
    $('body,html').animate({scrollTop:0},300)
}


// 마이페이지 
const mypageTableHandle = (item)=>{
    $(item).toggleClass('active')
    $(item).next('.detail').toggleClass('active')
}


// jquery 모음
const loadJquery = ()=>{

    // 스와이퍼 공통
    $('.mySwiper').each(function(index) {
        var mySwiper = $(this),
            swiperContainer = $(this).find('.swiper-container'),
            itemPer = $(this).attr('data-per') ? $(this).attr('data-per') : 1,
            itemGap = $(this).attr('data-gap') ? $(this).attr('data-gap') : 0,
            slideLoop = $(this).attr('data-loop') == 'false' ? false : true,
            slideCenter = $(this).attr('data-center') == 'true' ? true : false,
            slidePlayTime = $(this).attr('data-timer') ? $(this).attr('data-timer') * 1000 : 0;
            effect = $(this).attr('data-effect') ? $(this).attr('data-effect') : 'slide';
            initial = $(this).attr('data-initial') ? $(this).attr('data-initial') : 0;
        $(this).addClass('num'+index);		
        var swiper =  new Swiper( '.mySwiper.num' + index + ' .swiper-container', {
            spaceBetween: parseInt(itemGap),
            slidesPerView: itemPer == 'auto' ? "auto" : itemPer,
            effect: effect,
            pagination: {
                el: '.mySwiper.num' + index + ' .pagination',
                clickable: true,
                type:  $('.mySwiper.num' + index + ' .pagination').hasClass('fraction') ? "fraction" : "bullets",
            },
            navigation: {
                nextEl: '.mySwiper.num' + index + ' .next',
                prevEl: '.mySwiper.num' + index + ' .prev'
            },
            speed : 1000,
            centeredSlides: slideCenter,
            autoplay: slidePlayTime ? {delay: parseInt(slidePlayTime),disableOnInteraction:true} : false,
            loop: slideLoop,
            initialSlide: initial,
            scrollbar: {
                el: '.mySwiper.num' + index + ' .swiper-scrollbar',
                hide: true,
            }
        });		
        if($(this).attr('data-slideto') == '1') {
            $(slideWrapper.find('.swiper-slide')).click(function() {
                var i = $(this).index();
                swiper.slideTo(i,700,false);
            });
        }
        if($(this).attr('data-click')){
            $('.mySwiper li').on('click',function(){
                swiper.slideTo($(this).index())
            })
        }
        if($(this).attr('data-group')){
            swiper.on('slideChangeTransitionEnd',function(swiper){
                let data = $('.mySwiper.num'+index).find('.swiper-slide-active').data('group')
                $('.mySwiper.num'+index).find('.group').text(data)
            })
        }
    });

    // custom_select 버튼 클릭
    $('.custom_select > button').on('click',function(){
        let Parents = $(this).parents('.custom_select');
        if(Parents.hasClass('open')){
            Parents.removeClass('open')
        }else{
            Parents.addClass('open')
        }
    });

    // custom_select option 클릭
    $('.custom_select > div li').on('click',function(){
        let Parents = $(this).parents('.custom_select');
        let text = $(this).find('p').html();

        // option 닫기
        Parents.removeClass('open')
        Parents.find('> button p').html(text);
    })
    // custom_select 외의 영역 선택했을 시 닫기 
    document.addEventListener('click',(e)=>{
        const select = document.querySelectorAll('.custom_select.open')

        select.forEach((item)=>{
            if(item && !item.contains(e.target)){
                item.classList.remove('open')
            }
        })
    })

    // 모달 배경 클릭시 body overflow-hidden 클래스 빼기
    $('body').on('click',function(e){
        if($(e.target).hasClass('modal') && $(e.target).hasClass('show')){
            closeModal(e.target.id)
        }
    })

    // 공급자 모달 > 공급자 리스트 클릭
    $('.producer_list button').on('click',function(){
        let img = $(this).find('i img').attr('src');
        let text = $(this).find('span').text();

        $('.producer_btn').find('img').attr('src',img)
        $('.producer_btn').find('span').text(text)

        closeModal('producer-modal');
    })

    // 북마크 클릭시 toggle
    $('.bookmark').on('click',function(){
        const href_origin = $(this).find('use').attr('href').split('#')[0]
        const href = $(this).find('use').attr('href').split('#')[1]
        
        if(href == "category-my-favorites-inactive"){
            $(this).find('use').attr('href',`${href_origin}#category-my-favorites`)
        }else{
            $(this).find('use').attr('href',`${href_origin}#category-my-favorites-inactive`)
        }
    })



};
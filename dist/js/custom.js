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
        loadJquery();
    })
    .catch((error) => {
        console.log(error);
    });

});

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
}

// 헤더 스크립트
const headerScript = ()=>{

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

}


// 햄버거메뉴
const hamToggle = ()=>{
    $('.side_menu').toggleClass('open');
    $('.mo_menu_bg').toggleClass('open');
    $('body').toggleClass('overflow-hidden');
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
    }else{
        $(item).text('더 읽기')
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
            initialSlide: initial
        });		
        if($(this).attr('data-slideto') == '1') {
            $(slideWrapper.find('.swiper-slide')).click(function() {
                var i = $(this).index();
                swiper.slideTo(i,700,false);
            });
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
        const select = document.querySelector('.custom_select')

        if(select && !select.contains(e.target)){
            select.classList.remove('open')
        }
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
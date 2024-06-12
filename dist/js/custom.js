//=======================================================
//   html load
//=======================================================

window.addEventListener("load", ()=>{
    // 로딩이미지 가리기
    const loader = document.querySelector('.main-loader')
    setTimeout(function(){
        loader.classList.add('hide')
    },1000)
    
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

    // 헤더 gnb
    // let headerGNB = 8; 
    // $(window).on('resize',function(){
    //     let headerW = $('header').width();
    //     let logoW = $('header .logo').innerWidth();
    //     let gnbW = $('header .gnb').width();
    //     let rightW = $('header .right_box').width();

    //     let space = 98 - (((logoW+rightW) / headerW )*100);
    //     let gnbSpace = (gnbW / headerW)*100;
        
    //     if(gnbSpace > space){
    //         let html = $('.gnb > li').eq(headerGNB-1).html();
    //         $('.gnb > li').eq(headerGNB-1).addClass('hidden')

    //         $('.gnb li .gnb_dot').removeClass('hidden')
    //         $('.gnb li .gnb_list').prepend(`<li>${html}</li>`)
    //         headerGNB-=1;
    //     }
    // })

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
        loop: slideLoop			
    });		
    if($(this).attr('data-slideto') == '1') {
        $(slideWrapper.find('.swiper-slide')).click(function() {
            var i = $(this).index();
            swiper.slideTo(i,700,false);
        });
    }
});


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
//=======================================================
//   html load
//=======================================================

window.addEventListener("load", ()=>{
    // 로딩이미지 가리기
    const loader = document.querySelector('.main-loader')
    setTimeout(function(){
        loader.classList.add('hide')
    },1000)
    
    // 헤더 
    fetch("./_header.html")
        .then((response) => response.text())
        .then((htmlData) => {
            $('body').prepend(htmlData)
            headerScript();
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
            $('#wrap .content').append(htmlData)
            
           
        })
        .catch((error) => {
            console.log(error);
        });

});


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

const headerScript = ()=>{

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
//=======================================================
//   html load
//=======================================================

// 왼쪽메뉴 
fetch("./_footer.html")
    .then((response) => response.text())
    .then((htmlData) => {
        if($('.footer')){
            $('.footer').prepend(htmlData)
        }
       
    })
    .catch((error) => {
        console.log(error);
    });

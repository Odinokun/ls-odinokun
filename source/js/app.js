$(function() {
  //welcome-active
  require('./modules/welcome-active')();
});

//loader
// var test = "odinokun";
$(function() {
  var imgs = [];

  $.each($('*'), function() { //перебираем все селекторы
    var
      $this = $(this),
      background = $this.css('background-image'),
      img = $this.is('img'); //проверяем картинка ли это

    if (background != 'none') {
      var path = background.replace('url("', '').replace('")', '');
      imgs.push(path); //добавляем пути к фонам в массив
    }

    if (img) {
      var path = $this.attr('src'); //берем путь к картинке img

      if (path) { //если путь не пустой
        imgs.push(path); //добавляем его в массив
      }
    }
  });

  var percentsTotal = 1;

  //проходим по массиву и проверяем загрузились ли картинки
  for (var i=0; i < imgs.length; i++) {
    var image = $('<img>', { //создаем элемент
      attr: { //задаем ему переметры (в данном случе атрибут)
        src: imgs[i]
      }
    });

    image.on({
      //проверяем загрузилось ли изображение
      load : function() {
        //вызываем фун-ю вывода процентов
        setPercents(imgs.length, percentsTotal);
        //увеличиваем счетчик загруженный картинок на 1
        percentsTotal++;
      },

      error : function() {
        //при ошибке загрузки +1 и идем дальше
        percentsTotal++;
      }
    });
  }

  //передаем проценты в прелоадер
  function setPercents(total, current) {
    var percent = Math.ceil(current / total * 100);

    if (percent >= 100) {
      $('.preloader').fadeOut();
    }

    $('.preloader__percents').text(percent + '%');
  }
});


//------ slider ------//
$(function() {

  var counter = 1;
  var flag = true; //для блокировки кнопки next

  $('.slider__controls-top').on('click', function(e) {
    e.preventDefault();
    console.log("click");

    var
        $this = $(this),
        //через метод closest ограничиваемся блоком .slider
        container = $this.closest('.slider'),
        //находим все наши item
        items = container.find('.slider__item'),
        // с помощью метода filter выберем item.active
        activeItem = items.filter('.active'),
        // продолжительность нашей аннимации
        duration = 1000;

    var
      oppositeItems = $('.slider__opposite .slider__item'),
      oppositeActive = oppositeItems.filter('.active');


    if (flag) {
      //после клика - блокируем кнопку
      flag = false;

      //перебираем счетчиком слайды для закольцовки
      if (counter >= items.length) {
        counter = 0;
      }

      //метод eq возвращает элемент из набора
      var reqItem = items.eq(counter);
      var oppositeReqItem = oppositeItems.eq(counter);

      activeItem.animate({
        'top' : '100%'
      }, duration);

      //анимация второго слайдера
      oppositeActive.animate({
        'top' : '-100%'
      }, duration, function() {

      });


      reqItem.animate({
        'top' : '0%'
      }, duration, function() {
        //удаляем у активного объескта active и возвращаем его на исходное место
        activeItem.removeClass('active').css('top', '-100%');
        //добавляем active для текущего слайда
        $(this).addClass('active');
        //включаем кнопку
        flag = true;
      });


      oppositeReqItem.animate({
        'top' : '0%'
      }, duration, function() {
        oppositeActive.removeClass('active').css('top', '100%');
        $(this).addClass('active');
        flag = true;
      });

      counter++;
    }



  });
});


// toggle class active in welcome-banner
// $('.welcome-btn').on('click', function() {
//     $('.welcome-banner__wrap').toggleClass('active');
// });

//top-menu__icon
$('.menu-icon').on('click', function() {
  $(this).toggleClass('on');
  $(".main-menu").slideToggle();
  $('body').toggleClass("fix");
  return false;
});

//slowscroll
$(function() {
  $('.arr-down__link[href*=\\#]').on("click", function(e){
     e.preventDefault();
     var anchor = $(this);
     $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top - 0 + 'px'
     }, 1000);
  });
  return false;
});

//blog-menu-scroll
$(function() {
  $('.blog-aside__link[href*=\\#]').on("click", function(e){
     e.preventDefault();
     var anchor = $(this);
     $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top - 30 + 'px'
     }, 1000);
  });
  return false;
});

//top-menu__icon
$('.blog-aside__button').on('click', function() {
  $('.blog-aside').toggleClass("active");
  return false;
});

// nav-menu fixed
// $(function() {
//   var offset = $('.blog-aside__nav').offset();
//   var topPadding = 30;

//   $(window).on('scroll', function() {
//     if ($(window).scrollTop() > offset.top) {
//         $('#blog-nav').addClass('active');
//         $('#article-wrap').addClass('active');
//     }
//     else {
//         $('#blog-nav').removeClass('active');
//         $('#article-wrap').removeClass('active');
//     }
//   });
// });



$(function() {
  $(".front").knob({
    "min":0,
    "max":100,
    "fgColor":"#1056d1",
    "skin":"tron",
    "cursor":false,
    "width":120,
    "height":120
  });
});

$(function() {
  $(".back").knob({
    "min":0,
    "max":100,
    "fgColor":"#86a2d3",
    "skin":"tron",
    "cursor":false,
    "width":120,
    "height":120
  });
});

$(function() {
  $(".workflow").knob({
    "min":0,
    "max":100,
    "fgColor":"#1056d1",
    "skin":"tron",
    "cursor":false,
    "width":120,
    "height":120
  });
});


google.maps.event.addDomListener(window, 'load', init);
var map;
function init() {
    var mapOptions = {
        center: new google.maps.LatLng(50.436817, 30.491573),
        zoom: 14,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT,
        },
        disableDoubleClickZoom: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        },
        scaleControl: true,
        scrollwheel: false,
        panControl: true,
        streetViewControl: true,
        draggable: true,
        overviewMapControl: true,
        overviewMapControlOptions: {
            opened: false,
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{"stylers":[{"hue":"#007fff"},{"saturation":89}]},{"featureType":"water","stylers":[{"color":"#ffffff"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]}],
    }
    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    var marker = new google.maps.Marker({
        // Определяем позицию маркера
        position: {
            lat: 50.449817,
            lng: 30.522973
        },
        map: map,
        icon: 'assets/img/marker.png'
    });
    var locations = [

    ];
    for (i = 0; i < locations.length; i++) {
        if (locations[i][1] == 'undefined') { description = ''; } else { description = locations[i][1]; }
        if (locations[i][2] == 'undefined') { telephone = ''; } else { telephone = locations[i][2]; }
        if (locations[i][3] == 'undefined') { email = ''; } else { email = locations[i][3]; }
        if (locations[i][4] == 'undefined') { web = ''; } else { web = locations[i][4]; }
        if (locations[i][7] == 'undefined') { markericon = ''; } else { markericon = locations[i][7]; }
        marker = new google.maps.Marker({
            icon: markericon,
            position: new google.maps.LatLng(locations[i][5], locations[i][6]),
            map: map,
            title: locations[i][0],
            desc: description,
            tel: telephone,
            email: email,
            web: web
        });
        link = '';
    }

}

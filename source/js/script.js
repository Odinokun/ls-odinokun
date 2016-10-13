(function($, w) {
  // наши публичные методы (тот-же return)
  var my = {};

  publicInterface();
  init();
  addListener();

  //прослушка событий
  function addListener() {
    //submitForm - фун-я которая отправляет, делает AJAX-запрос и т.п.
    $('#contact-form').on('submit', submitForm);
  }

  //(е) - в фун-ю передается событие
  function submitForm(e) {
    e.preventDefault();
        //наша форма
    var $form = $(this),
        //URL того, куда надо отправлять AJAX запрос
        url = '',
        //отложенный запрос (выполняем ajax запрос)
        defObject = ajaxForm($form, url);
  }

  function ajaxForm(form, url) {
    //проверяем валидацию
    if(!validation.validateForm(form)) {
      //если не пройдена валидация то false
      return false;
    }
    console.log('отправка AJAX');
    //тут будет ajax запрос
  }

  //инициализируем публичные методы
  function init() {
    console.log('init');
    my.publicMethod();
  }

  function publicInterface() {
    //сюда набиваем публичные методы
    my = {
      publicMethod: function() {
        console.log('Public');
      }
    }
  }

  //(это как validation.init() в файле validation.js. Используется для отдачи Return)
  // window.formQtp = my;
  w.formQtp = my;
})(jQuery, window);
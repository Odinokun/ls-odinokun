var validation = (function() {
  //инициализируем наш модуль
  var init = function() {
    //вызываем обработчик событий
    _setUpListeners();
  },
  //выполняем валидацию формы
  validateForm = function(form) {
    //находим все нескрытые инпуты
    var elements = form.find('input, textarea').not('input[type="hidden"]'),
      //флаг true
      valid = true;

    //перебираем инпуты
    $.each(elements, function(index, element) {
      var $element = $(element),
      //узнаем значение элемента
      value = $element.val();

      //если значения нет
      if (!value.length) {
        //вызываем ошибку
        _addError($element);
        //флаг false
        valid = false;
      }
    });

    //возвращаем значение флага
    return valid;

  },
  //вешаем обработчики событий (слушаем события)
  _setUpListeners = function() {
    //если форма ОДНА !!!!!!

    // удаляем красную обводку у элементов форм по нажатию клавиши
    $('form').on('keydown', '.has-error', _removeError);
    // удаляем красную обводку у элементов форм по клику мышки
    $('form').on('click', '.has-error', _removeError);
    // удаляем красную обводку у элементов форм по табу
    $('form').on('focus', '.has-error', _removeError);
    // при сбросе формы удаляем также: тултипы и обводку
    $('form').on('reset', _clearForm);
  },

  //удаляем ошибки
  _removeError = function() {
    //удаляем класс ошибки у текущего элемента
    $(this).removeClass('has-error');
  },

  //добавление ошибок, если валидация не прошла
  _addError = function(element) {
    //добавляем класс ошибки у элемента
    element.addClass('has-error');
    //создаем для него туллтип и определяем его позицию
    _createQtip(element, element.data('position'));
  },
  //очистка формы
  _clearForm = function(e) {
    var $form = $(this);

    //находим все инпуты и создаем событие (прячем тултипы)
    $form.find('input').trigger('hideTooltip');
    //находим все объекты с ошибкой и удаляем класс-ошибку
    $form.find('.has-error').removeClass('has-error');
  },
  //создание тултипа
  _createQtip = function(element, position) {
    //выбираем позицию тултипа в конструкторе на сайте http://qtip2.com/
    if (position === 'right') {
      //заданныя позиция
      position = {
        my: 'left center',
        at: 'right center'
      }
    } else {
      //позиция поумолчанию
      position = {
        my: 'right center',
        at: 'left center',
        adjust: {
          method: 'shift none'
        }
      }
    }

    //инициализируем тултип
    element.qtip({
      //наполняем тултип
      content : {
        //текст берем из data-content
        text: function() {
          return $(this).data('content');
        }
      },
      show: {
        event: 'show'
      },
      hide: {
        event: 'keydown click hideTooltip'
      },
      //указываем ранее сформированный position
      position: position,
      //задаем кастомные стили
      style: {
        classes: 'qtip-mystyle qtip-rounded',
        //размер треугольничка
        tip: {
          height: 10,
          width: 10
        }
      }
      //вызываем событие show
    }).trigger('show');
  };

  //возвращаем публичные методы (они сейчас в начале модуля)
  return {
    init: init,
    validateForm: validateForm
  };

})();

validation.init();
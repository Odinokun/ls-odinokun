<?php

  // создали массив
  $data = array();

  // создали сообщение ОК
  $data['mes'] = 'AJAX запрос успешно отправлен на сервер';


  // создали заголовок который говорит, что тип передаваемых данных будет json
  header('Content-Type: application/json');
  //передаем эти данные
  echo json_encode($data);
  //выходим из php
  exit;

?>
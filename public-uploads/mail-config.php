<?php
/**
 * @descr Mail configuration
 * @changed 2024.10.21, 12:43
 */

/** Google captch secret key */
$gcaptchaServerKey = '6LdmGmMqAAAAAII1IhWwOlPfFnTNtXPgNBORvpEN'; // DEBUG: By Igor, from wordwizzz, 2024.10.16 (ok works)

/** Return error if sent from another address */
$checkPageUrl = 'https://fsproperty.ru/';

/** From email name and address */
$fromName = 'FS-Property';
$fromEmail = 'fsp@fsproperty.ru';

/** Target address(es) */
$toEmailDebug = 'dmia@yandex.ru';
$toEmailProduction = [
  'fsp@fsproperty.ru',
  'master@masterstar.ru',
  $toEmailDebug,
];

/** Message title */
$mailSubject = 'Заявка с сайта';

/** Variable names for the representation in a message */
$formFields = array(
  // Core variables...
  'name' => 'Имя',
  'email' => 'E-mail',
  'phone' => 'Телефон',
  'comment' => 'Комментарий',
  'text' => 'Текст',
  // Service (technical) variables (see `$specialFields` in the main module)...
  '_pageId' => 'Страница',
  '_pageUrl' => 'Адрес страницы на сайте',
  '_ip' => 'IP адрес',
  '_date' => 'Дата',
);

/** These fields will be checked and script won't process in case of their absence */
$requiredFields = array(
  'name',
  'email',
  'phone',
);

/** Fields that require a special processing as multiline */
$multilineFields = ['comment'];

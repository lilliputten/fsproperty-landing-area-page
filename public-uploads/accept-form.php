<?php
/**
 * @descr Mail sending script
 * @changed 2024.10.21, 11:23
 */

// Write logs to a local file
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');

// Display errors (with different options):
// ini_set('display_errors', 'On');
// error_reporting(E_ALL);
// error_reporting(-1);
// set_error_handler('var_dump'); // Dump variables into output

// Import required modules...
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

// Import config...
include('mail-config.php');
// Import optional custom config...
if (file_exists('mail-config-override.php')) {
  include('mail-config-override.php');
}

$clientIp = getClientIpAddress();

$pageUrl = !empty(@$_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
$pageId = getPageIdFromUrl($pageUrl);

$specialFields = array(
  '_ip' => $clientIp,
  '_date' => date('Y.m.d G:i'),
  '_pageUrl' => $pageUrl,
  '_pageId' => $pageId,
);

$rawInput = file_get_contents('php://input');
$isJson = substr(@$rawInput, 0, 1) === '{'; // Does it start with json's '{' (php-5 way)?
$postData = $isJson ? objectToArray(json_decode($rawInput)) : $_POST;

$isDebug = !empty(@$postData['debug']);

// Fetch variables...
$toEmail = $isDebug ? $toEmailDebug : $toEmailProduction;

/* // DEBUG (ATTENTION: It can break json)
 * if ($isDebug && !empty($postData)) {
 *   print('Debug: ' . $isDebug . "\n");
 *   print('clientIp: ' . $clientIp . "\n");
 *   print('toEmail: ' . print_r($toEmail, true) . "\n");
 *   print('pageUrl: ' . $pageUrl . "\n");
 * }
 */

function checkEnvironment() {
  global $clientIp, $pageUrl, $checkPageUrl;
  if (empty($clientIp)) {
    sendError('Invalid environment (1)');
    die;
  }
  if (empty($pageUrl)) {
    sendError('Invalid environment (2)');
    die;
  }
  if (substr($pageUrl, 0, strlen($checkPageUrl)) !== $checkPageUrl) {
    sendError('Invalid environment (3)');
    die;
  }
}

function checkFormData() {
  global $postData, $requiredFields;
  if (empty($postData)) {
    sendError('No client data');
    die;
  }
  foreach ($requiredFields as $id) {
    if (empty(@$postData[$id])) {
      sendError('No cient data field: ' . $id);
      die;
    }
  }
}

function checkCaptcha() {
  global $gcaptchaServerKey, $postData, $clientIp;
  try {
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $gcaptchaResponse = @$postData['gcaptcha'];
    if (empty($gcaptchaResponse)) {
      sendError('No captcha provided');
      die;
    }
    $data = [
      'secret'   => $gcaptchaServerKey,
      'response' => $gcaptchaResponse,
      'remoteip' => $clientIp,
    ];
    $options = [
      'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
      ]
    ];
    $context = stream_context_create($options);
    $resultJson = file_get_contents($url, false, $context);
    $result = json_decode($resultJson);
    $success = $result->success;
    /* DEBUG: Write captcha debug info...
     * error_log('checkCaptcha: data: ' . print_r($data, true));
     * error_log('checkCaptcha: options: ' . print_r($options, true));
     * error_log('checkCaptcha: result: ' . print_r($result, true));
     */
    if (empty($success)) {
      sendError('Captcha verification error ', $result);
      die;
    }
    return $success;
  }
  catch (Exception $e) {
    return null;
  }
}

function getPageIdFromUrl($pageUrl) {
  $id = $pageUrl;
  $id = preg_replace('/\.html$/', '', $id);
  $id = preg_replace('/^http.*:\/\/[^\/]*\//', '', $id);
  $id = preg_replace('/\/$/', '', $id);
  return $id;
}

function objectToArray($d)
{
  if (is_object($d)) {
    // Gets the properties of the given object
    // with get_object_vars function
    $d = get_object_vars($d);
  }
  if (is_array($d)) {
    /*
    * Return array converted to object
    * Using __FUNCTION__ (Magic constant)
    * for recursive call
    */
    return array_map(__FUNCTION__, $d);
  } else {
    // Return array
    return $d;
  }
}

function getClientIpAddress() {
  global $_SERVER;
  if (!empty(@$_SERVER['HTTP_CLIENT_IP'])) {
    return $_SERVER['HTTP_CLIENT_IP'];
  } elseif (!empty(@$_SERVER['HTTP_X_FORWARDED_FOR'])) {
    return $_SERVER['HTTP_X_FORWARDED_FOR'];
  } elseif (!empty(@$_SERVER['REMOTE_ADDR'])) {
    return $_SERVER['REMOTE_ADDR'];
  }
  return '';
}

function getStyles() {
  return "<style>
  .label { opacity: 0.3; display: inline-block; margin-right: .2em; font-weight: bold; }
  .item { margin: 1em 0; }
  .multiline .value { margin-top: 0.5em; }
  .special { opacity: 0.4; }
</style>";
}

function getFieldsListHtml() {
  global $formFields, $specialFields, $multilineFields, $postData;

  $fields = "";

  // Put all the required fileds into the message text...
  foreach ($formFields as $id => $name) {
    $isSpecial = !empty($specialFields[$id]);
    $value = $isSpecial ? $specialFields[$id] : @$postData[$id];
    if (!empty($value)) {
      $quotedValue = htmlspecialchars(trim($value));
      // Remove 'dos' newslines, remove extra new lines...
      $quotedValue = preg_replace("/\x0d/s", "", $quotedValue);
      $quotedValue = preg_replace("/\n\n\n+/s", "\n\n", $quotedValue);
      $isMultiline = in_array($id, $multilineFields, true) && strpos($quotedValue, "\n") !== false;
      $className = 'item';
      if ($isSpecial) {
        $className .= ' special';
      }
      if ($isMultiline) {
        // Remove ods newslines, remove extra new lines, double newlines with '<br>' tags...
        $quotedValue = preg_replace("/\n/s", "<br/>\n", $quotedValue);
        $fields .= "<div class='$className multiline'>"
          . "<div class='label'>$name:</div>\n\n"
          . "<div class='value'>$quotedValue</div>"
          . "</div>\n\n";
      } else {
        $fields .= "<div class='$className'>"
          . "<span class='label'>$name:</span> "
          . "<span class='value'>$quotedValue</span>"
          . "</div>\n\n";
      }
    }
  }

  return $fields;
}

function getMailHtmlBody() {
  $html = "<html><head>" . getStyles() . "</head><body>\n\n";

  $fields = getFieldsListHtml();

  if (!empty($fields)) {
    $html .= "<h2>Данные заявки:</h2>\n\n";
    $html .= $fields . "\n";
  } else {
    $html .= "<h3>Данные отсутствуют!</h3>\n";
  }

  $html .= "</html></body>\n";

  return $html;
}

function getPlainTextFromHtml($html) {
  $text = $html;
  $text = preg_replace("/<style>.*<\/style>\s*/s", '', $text);
  $text = preg_replace('/<[^<>]*>/', '', $text);
  $text = htmlspecialchars_decode($text); // Isn't it dangerous?
  return trim($text);
}

function sendMail() {
  global $isDebug, $postData, $toEmail, $fromEmail, $fromName, $mailSubject;

  // Create mail sender...
  $mail = new PHPMailer();

  // Configure mail sender...

  // DEBUG: Use debug output
  // $mail->SMTPDebug = 3;

  // Setup smtp...
  $mail->isSMTP(); // Set mailer to use SMTP
  $mail->IsHTML(true);
  $mail->CharSet = 'UTF-8';
  $mail->Encoding = 'base64';

  // Mail from...
  $mail->setFrom($fromEmail, $fromName);

  // Mail to...
  if (is_array($toEmail)) {
    foreach ($toEmail as &$addr) {
      $mail->addAddress($addr);
    }
  } else {
    $mail->addAddress($toEmail);
  }

  // Set subject...
  $mail->Subject = $mailSubject;

  // Set mail html message...
  $htmlBody = getMailHtmlBody();
  $mail->msgHTML($htmlBody);
  /* // DEBUG
   * print("HTML:\n" . $htmlBody . "\n");
   */

  // Set plain text message...
  $textBody = getPlainTextFromHtml($htmlBody);
  $mail->AltBody = $textBody;
  /* // DEBUG
   * print("PLAIN TEXT:\n" . $textBody . "\n");
   */

  $responseData = array(
    // 'ok' => true, // True -- if the operation was successful
    // 'error' => NULL, // A brief text explaining the error (if any; it will be shown to the user). If successful, do not send anything (either NULL or an empty string).
    // 'errorInfo' => $postData, // DEBUG: Only for debug purposes
  );

  if ($isDebug && !empty($postData)) {
    $responseData['_data_debug'] = $postData;
  }

  // Send message...
  if ($mail->send()) {
    $responseData['ok'] = true;
    http_response_code(200);
  } else {
    sendError($mail->ErrorInfo);
    die;
  }

  // Return json response...
  header('Content-Type: application/json; charset=utf-8');
  print(json_encode($responseData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n");
}

function sendError($errText, $debugData = NULL) {
  $responseData = array();
  $responseData['error'] = $errText;
  if (!empty($debugData)) {
    $responseData['errorInfo'] = $debugData;
  }
  error_log('Error: ' . $errText);
  // http_response_code(500);
  header('Content-Type: application/json; charset=utf-8');
  print(json_encode($responseData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n");
}

// DEBUG: Sample error...
if (@$postData['name'] == 'test') {
  sendError('Эмуляция ошибки (test)');
  die;
}

try {
  checkEnvironment();
  checkFormData();
  checkCaptcha();
  sendMail();
} catch (Exception $e) {
  $errText = "Caught: " . $e->getMessage() . "\n";
  sendError($errText);
  die;
}

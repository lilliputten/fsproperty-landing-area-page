<?php
  // @changed 2024.10.14, 19:35
  $this->beginContent('//layouts/main');
  Yii::app()->getClientScript()->registerCssFile($this->mainAssets . '/css/about.css');
?>

<?= $content; ?>

<?php $this->endContent(); ?>

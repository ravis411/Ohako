<?php

require_once __DIR__ . '/loginFunctions.php';
log_out();
redirect_to($login_url);
?>
<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'kijkinjewijk');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'x$+DnY/b<~iG$YTdR-Nb.nhPQJA:j8/N&`+XLW/FtWg6gMs+S)}ZS7U@|,n(>,X6');
define('SECURE_AUTH_KEY',  '*qO~mSg ;5y&/BTE;*-4Pz?>~S#tvK7]tTX#Hdv|}cw+b0-:My;01lDH9IBjmh/@');
define('LOGGED_IN_KEY',    '*TFja05|8;,buR~JohGG2.# @Xi3$M,W%(!rYkRnk/v!QslG=*e2:=z{big.YwjC');
define('NONCE_KEY',        '|6^4xe.;lSLWIo9z5)]Vh&,r)rk{tv7lQKfC^p<FY.DoKj$Y9Rhr:ia+t`lEs@j;');
define('AUTH_SALT',        ':91/&m;I1,,@-$D]zn|B}EsRfQ-O)%}WQ?XD_ih_*8<Z= bI7aOno(@QF+aK|_ 9');
define('SECURE_AUTH_SALT', '|0O.t|oFPEFQGjm8S+OhB>naYGrt>4|^$-Z4-T&tV2xHu-B,e||W5.?]T0|#*];>');
define('LOGGED_IN_SALT',   'V)qLwuYB142MJdA}=Y-&MFL7+9zjm,%0>NeqQ}n2XYMlDOkOEW?>bun%PT*8[2-G');
define('NONCE_SALT',       'w%[J$uGR|n+7y)n@no%0ujvo^*|V%)X!92Cm4.B2h#u;aJCp71c*V3qKvK#&M[ m');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

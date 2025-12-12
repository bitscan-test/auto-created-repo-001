<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'LAA1474661-vhnowy' );

/** Database username */
define( 'DB_USER', 'LAA1474661' );

/** Database password */
define( 'DB_PASSWORD', '0YK48ga3W9gBAxNq' );

/** Database hostname */
define( 'DB_HOST', 'mysql212.phy.lolipop.lan' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '`2FO&l_Z:]l#vt.[Qrg6O`_JZF#tKdHw^f{%O$o;nLa!t*_X;aP*<Wv.j1j&SJk3' );
define( 'SECURE_AUTH_KEY',   'N|;$DD=zjVXvJ)[0qz19l{u({i]uoW8,MuE#$j6c{OHNyq1G(G~cfqeQ&dyZviv&' );
define( 'LOGGED_IN_KEY',     '-|Y{BQ#)bQ@$O|}xaZn~wiKPcH7cp=Z&Q3j#rQS^LjL|,cBC!+tyS;J~Snz`{?U$' );
define( 'NONCE_KEY',         'r=pvNdu,gq*~)OJWEJBN?-Wpz2=Gmy%n!iBbLQ~((z_jV;-(r.WeB:hu+Pa(YEay' );
define( 'AUTH_SALT',         'rUDlp3D/ d,N C(<:PobA*@a|C(,Zb[8RdvRS:{78/q1IX6,.^j,$5KTw]6@R0->' );
define( 'SECURE_AUTH_SALT',  '(&H8|ST5y+70#0H3r-8*7EFc:]W^iX!%zI~9>qYO0@>:[f~=X-;yeWehog`Cu]9C' );
define( 'LOGGED_IN_SALT',    'KAnHe9AP3Y_3$m5 Ov!zpK-&KW5.K=8|0o!5jvb^BDKI.hL{)M5wZnEA;94`ph*B' );
define( 'NONCE_SALT',        '~2kD*n]:K)R.dMwh[aVz^:3.S6f*b6uIWH*wB>zEHJQ]ZP?rXs+Rzkjk3YuLtp$2' );
define( 'WP_CACHE_KEY_SALT', 'I(0mK0qcdWX+YW{vl]6&qfCy1EUg1eVEg6[3lSy:Rs%AFP18Okc5W4Dhza;WWjT-' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp20230515120014_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );


/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

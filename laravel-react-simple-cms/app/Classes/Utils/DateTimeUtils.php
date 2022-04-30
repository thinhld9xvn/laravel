<?php 
    namespace App\Classes\Utils;
    use DateTime;
    class DateTimeUtils {
        public static function create_timespan($str) {
            $d = DateTime::createFromFormat('Y-m-d H:i:s', $str);
            if ( $d === false ) return false;
            return $d->getTimestamp();
        }
        public static function get_format($timespan) {
            return [
                'date' => date('w', $timespan),
                'day' => date('d', $timespan),
                'month' => date('m', $timespan),
                'year' => date('Y', $timespan),
                'time' => date('H:i:s', $timespan),
                'dateTimeLocale' => date('Y-m-d H:i:s', $timespan)
            ];
        }
        public static function convert_str($str) {
            return self::get_format(self::create_timespan($str));
        }
    }
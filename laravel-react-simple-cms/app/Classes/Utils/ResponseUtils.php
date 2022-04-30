<?php 
    namespace App\Classes\Utils;
    use Symfony\Component\HttpFoundation\Response;
    class ResponseUtils {
        public static function success($data, $val = true) {
            return response([
                'success' => $val,
                'data' => $data
            ], Response::HTTP_OK);
        }
        public static function info($messages) {
            return response([
                'success' => false,
                'messages' => $messages
            ], Response::HTTP_OK);
        }
        public static function error($msg) {
            return response(['errors'=> $msg],
                                Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
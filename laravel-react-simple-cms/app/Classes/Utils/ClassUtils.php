<?php 
    namespace App\Classes\Utils;
    use ReflectionClass;
    class ClassUtils {
        public static function getConstants($inst) {
            $reflectionClass = new ReflectionClass($inst);
            return $reflectionClass->getConstants();
        }
    }
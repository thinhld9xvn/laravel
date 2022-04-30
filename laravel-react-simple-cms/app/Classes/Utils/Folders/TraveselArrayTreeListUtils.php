<?php 
    namespace App\Classes\Utils\Folders;
    class TraveselArrayTreeListUtils {
        public static function perform(&$array, $needed, $isChildElem = false) {
            $keys = array_keys( $array );
            $length = count( $keys );    
            if ( $length === 0 && !$isChildElem ) :
                array_push($array, $needed);
            endif;
            for ( $i = 0; $i < $length; $i++ ) :
                $elem =& $array[$i];
                $parent = $elem['path'];
                $myParent = GetParentFromPathUtils::perform($needed['path']);
                if ( $myParent === $parent ) :               
                    if ( empty($elem['children']) ) :
                        $elem['children'] = [];
                    endif;
                    array_push($elem['children'], $needed);
                else :
                    if ( !empty($elem['children']) ) :
                        TraveselArrayTreeListUtils::perform($elem['children'], $needed, true);
                    endif;
                endif;
            endfor;
        }
    }
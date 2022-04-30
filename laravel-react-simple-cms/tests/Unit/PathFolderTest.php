<?php

namespace Tests\Unit;
use Tests\TestCase;

class PathFolderTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public static function concatDFPath($pieces) {
        $path = '';
        foreach($pieces as $key => $piece) :
            $spath = substr( $path, strlen( $path ) - 1 );
            $spiece = substr( $piece, 0, 1 );
            if ( empty($path) || 
                    $spath === '/' || 
                        $spiece === '/' ) :
                if ( $spath === '/' && $spiece === '/' ) :
                    $path .= substr($piece, 1);
                else :
                    $path .= $piece;
                endif;
            else :
                $path .= '/' . $piece;
            endif;
        endforeach;
        return $path;
    }
    public function test_example()
    {
        $uploads_dir = 'uploads';
        $dir = '/';
        $file = '/banner1-150x150.jpg';
        echo asset(self::concatDFPath(['/storage/', $uploads_dir, $dir, $file]));
        $this->assertTrue(true);
    }
}

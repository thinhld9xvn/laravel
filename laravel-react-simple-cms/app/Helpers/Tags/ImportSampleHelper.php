<?php
    namespace App\Helpers\Tags;
    use App\Classes\Categories\a\CategoryDBFields as CATEGORY_DB_FIELDS;
    use App\Classes\Utils\FolderUtils;
    use App\Classes\Utils\ResponseUtils;
    use App\Models\Tags;
    use Illuminate\Support\Str;
    use PhpOffice\PhpSpreadsheet\IOFactory;
    class ImportSampleHelper {
        public static function perform() {
            $data = [];
            //
            $path = FolderUtils::concatDFPath([public_path('samples'), 'tags.xlsx']);
            $spreadsheet = IOFactory::load($path);
            $sheet        = $spreadsheet->getActiveSheet();
            $row_limit    = $sheet->getHighestDataRow();
            $column_limit = $sheet->getHighestDataColumn();
            $row_range    = range( 2, $row_limit );
            $column_range = range( 'F', $column_limit );
            $startcount = 2;
            foreach ( $row_range as $key => $row ) :
                $name = $sheet->getCell( 'B' . $row )->getValue();
                $name = stripslashes(ucfirst(trim($name)));
                //
                $data[] = [
                    CATEGORY_DB_FIELDS::GUID => $key,
                    CATEGORY_DB_FIELDS::NAME => $name,
                    CATEGORY_DB_FIELDS::DESCRIPTION => '',
                    CATEGORY_DB_FIELDS::URL => Str::slug($name)
                ];
                $startcount++;
            endforeach;
            Tags::insert($data);
            return ResponseUtils::success(true);
        }
    }
<?php
    namespace App\Helpers\Categories;
    use App\Classes\Categories\a\CategoryDataFields as CATEGORY_DATA_FIELDS;
    use App\Classes\Categories\a\CategoryDBFields as CATEGORY_DB_FIELDS;
    use App\Classes\Models\GetTaxTablePrefix;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Classes\Utils\FolderUtils;
    use App\Classes\Utils\ResponseUtils;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Str;
    use PhpOffice\PhpSpreadsheet\IOFactory;
    class ImportSampleHelper {
        public static function perform($request) {
            $data = [];
            //
            $post_type = $request->input(POST_DATA::POST_TYPE);
            $post_type = !empty($post_type) ? $post_type : POST_DATA::DEFAULT_POST_TYPE;
            $tax = $request->input(CATEGORY_DATA_FIELDS::TAX);
            $tax = !empty($tax) ? $tax : CATEGORY_DATA_FIELDS::CATEGORY_PREFIX;
            //
            $path = FolderUtils::concatDFPath([public_path('samples'), 'categories.xlsx']);
            $spreadsheet = IOFactory::load($path);
            $sheet        = $spreadsheet->getActiveSheet();
            $row_limit    = $sheet->getHighestDataRow();
            $column_limit = $sheet->getHighestDataColumn();
            $row_range    = range( 2, $row_limit );
            $column_range = range( 'F', $column_limit );
            $startcount = 2;
            foreach ( $row_range as $key => $row ) :
                $name = $sheet->getCell( 'B' . $row )->getValue();
                $parent = $sheet->getCell( 'C' . $row )->getValue();
                //
                $name = stripslashes(ucfirst(trim($name)));
                $parent = intval(trim($parent));
                //
                $fields = [
                    CATEGORY_DB_FIELDS::GUID => $key,
                    CATEGORY_DB_FIELDS::NAME => $name,
                    CATEGORY_DB_FIELDS::DESCRIPTION => '',
                    CATEGORY_DB_FIELDS::URL => Str::slug($name),
                    CATEGORY_DB_FIELDS::PARENT => $parent
                ];
                if ( $post_type !== POST_DATA::DEFAULT_POST_TYPE ) :
                    $fields[CATEGORY_DB_FIELDS::TAX_SLUG] = $tax;
                endif;
                $data[] = $fields;
                $startcount++;
            endforeach;
            $model = GetTaxTablePrefix::perform($post_type);
            DB::table($model)->insert($data);
            return ResponseUtils::success(true);
        }
    }
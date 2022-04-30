<?php 
    namespace App\Helpers\Posts;
    use Illuminate\Http\Request;
    use App\Classes\Posts\a\PostData as POST_DATA;
    use App\Classes\Posts\a\PostDataFields as POST_DATA_FIELD;
    use App\Classes\Utils\ResponseUtils;
    use App\Helpers\Posts\Api\ApiUpdateHelpPost;
    use Illuminate\Support\Facades\Validator;
    class PublishPostHelper {
        public static function perform(Request $request) {
            $validator = Validator::make($request->all(), [
                POST_DATA::POST_TYPE => 'required',
                POST_DATA::POST_TITLE => 'required',
                POST_DATA::POST_URL => 'required',
                POST_DATA::POST_AUTHOR => 'required'
            ]);
            if ( $validator->fails() ) :
                return ResponseUtils::error($validator->errors()->all());
            endif;            
            $post_type = $request->input(POST_DATA::POST_TYPE);
            //
            $guid = $request->input(POST_DATA::POST_GUID);
            //
            $post_title = $request->input(POST_DATA::POST_TITLE);
            //
            $post_content = $request->input(POST_DATA::POST_CONTENT);
            $post_content = !empty($post_content) ? $post_content : '';
            //
            $post_url = $request->input(POST_DATA::POST_URL);
            //
            $post_excerpt = $request->input(POST_DATA::POST_EXCERPT);
            $post_excerpt = !empty($post_excerpt) ? $post_excerpt : '';
            //
            $post_categories = $request->input(POST_DATA::POST_CATEGORIES);
            $post_tags = $request->input(POST_DATA::POST_TAGS);
            $post_date = $request->input(POST_DATA::POST_DATE);
            $post_author = $request->input(POST_DATA::POST_AUTHOR);
            //
            $post_thumbnail = $request->input(POST_DATA::POST_THUMBNAIL);
            //
            $post_action = $request->input(POST_DATA::POST_ACTION);
            $post_action = !empty($post_action) ? $post_action : POST_DATA_FIELD::POST_NEW_ACTION;
            /* */       
            if ( $post_action === POST_DATA_FIELD::POST_NEW_ACTION ) :
                if ( empty($post_date) ) :
                    return ResponseUtils::error('post_date field is missing');
                endif;
            endif; 
            if ( $post_action === POST_DATA_FIELD::POST_UPDATE_ACTION ) :
                if ( empty($guid) ) :
                    return ResponseUtils::error('guid field is missing');
                endif;
            endif; 
            $results = ApiUpdateHelpPost::perform([POST_DATA::POST_TYPE => $post_type,
                                                    POST_DATA::POST_GUID => $guid,
                                                    POST_DATA::POST_TITLE => $post_title,
                                                    POST_DATA::POST_URL => $post_url,
                                                    POST_DATA::POST_CONTENT => $post_content,
                                                    POST_DATA::POST_EXCERPT => $post_excerpt,
                                                    POST_DATA::POST_TAGS => $post_tags,
                                                    POST_DATA::POST_CATEGORIES => $post_categories,
                                                    POST_DATA::POST_DATE => $post_date,
                                                    POST_DATA::POST_AUTHOR => $post_author,
                                                    POST_DATA::POST_THUMBNAIL => $post_thumbnail], $post_type, $post_action);
                            
            return ResponseUtils::success($results);
        }
    }
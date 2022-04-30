<?php

namespace Database\Seeders;

use App\Helpers\Posts\Api\ApiUpdateHelpPost;
use Illuminate\Database\Seeder;
use App\Classes\Posts\a\PostData as POST_DATA;
use Illuminate\Support\Facades\Http;
class PostsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $post_type = 'post';
        $categories = [1,2,3,4,5];
        $url = 'http://127.0.0.1:8000/samples/sample-posts.json';
        $response = Http::accept('application/json')->get($url);
        $data = $response->json();        
        for($i = 0; $i < count($data); $i++) :
            $index = $i % 2 === 0 ? 1 : ($i % 3 === 0 ? 2 : ($i % 4 === 0 ? 3 : 4));
            $post = $data[$i];
            //
            $post_title = $post['title'];
            //
            $post_content = $post['content'];
            //
            $post_url = $post['slug'] . '-' . $post['code'];
            //
            $post_excerpt = '';
            //
            $post_categories = [$categories[$index]];
            $post_tags = null;
            $post_date = date('Y-m-d H:i:s', strtotime($post['published_time']));
            $post_author = 12;
            //
            $post_thumbnail = null;
            //
            $post_action = 'new';
            $results = ApiUpdateHelpPost::perform([POST_DATA::POST_TYPE => $post_type,
                                                    POST_DATA::POST_GUID => null,
                                                    POST_DATA::POST_TITLE => $post_title,
                                                    POST_DATA::POST_URL => $post_url,
                                                    POST_DATA::POST_CONTENT => $post_content,
                                                    POST_DATA::POST_EXCERPT => $post_excerpt,
                                                    POST_DATA::POST_TAGS => $post_tags,
                                                    POST_DATA::POST_CATEGORIES => $post_categories,
                                                    POST_DATA::POST_DATE => $post_date,
                                                    POST_DATA::POST_AUTHOR => $post_author,
                                                    POST_DATA::POST_THUMBNAIL => $post_thumbnail], $post_type, $post_action);
        endfor;
    }
}

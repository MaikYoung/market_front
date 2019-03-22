import { API_URL } from "./constants";

export const URLS = {
    //users
    login:                          API_URL + '/user_auth/login/',
    logout:                         API_URL + '/user_auth/logout',
    users_list:                     API_URL + '/users',
    user_detail:                    API_URL + '/user',
    register:                       API_URL + '/usercreate',
    current_user:                   API_URL + '/user_auth/user',
    
    //trips
    trips_list:                     API_URL + '/trips',
    trip_create:                    API_URL + '/trip_create',
    trip_detail:                    API_URL + '/trip',
    trips_by_following:             API_URL + '/trips_following',
    trips_im_mate:                  API_URL + '/trips_user_is_mate',

    //trip comment
    comments_list:                  API_URL + '/comments',
    comment_detail:                 API_URL + '/comment',

    //user points
    user_points:                    API_URL + '/points',

    //user notifications
    user_notifications:             API_URL + '/notifications',
    
    //user medals
    user_medals:                    API_URL + '/medals',

    //upload media
    upload_meda:                    API_URL + '/uploadmedia'
}

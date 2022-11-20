/**
 * @Description : Parse data from DouYin
 * @Author      : manho <manho30@outlook.my>
 * @Date        : 19/11/2022 23:29
 * @File        : parse.js
 * @IDE         : WebStorm
 */

const https = require('https');

const parseImageResponse = (result, id) => {
    let images = []
    for (let i = 0; i < result.item_list[0].images.length; i++) {
        images.push(result.item_list[0].images[i].url_list[1])
    }

    let hashtags = []
    for (let i = 0; i < result.item_list[0].text_extra.length; i++) {
        hashtags.push(result.item_list[0].text_extra[i].hashtag_name)
    }

    let music = {}
    if (result.item_list[0].music.title) {
        music = {
            'tile': result.item_list[0].music.title,
            'url': result.item_list[0].music.play_url.url_list[0],
            'author': result.item_list[0].music.author,
            'duration': result.item_list[0].music.duration
        }
    }

    return {
        'ok': true,
        'status': '200',
        'type': 'image',
        'result': {
            'author': {
                'name': result.item_list[0].author.nickname,
                'singnature': result.item_list[0].author.signature,
                'avatar': result.item_list[0].author.avatar_larger.url_list[0],
                'douyin_id': result.item_list[0].author.unique_id
            },
            'album': {
                'image_url': images,
                'heigth': result.item_list[0].video.height,
                'width': result.item_list[0].video.width,
                'descriptions': result.item_list[0].desc,
            },
            'statistics': {
                'comment_count': result.item_list[0].statistics.comment_count,
                'likes_count': result.item_list[0].statistics.digg_count,
                'share_count': result.item_list[0].statistics.share_count,
                'play_count': result.item_list[0].statistics.play_count,
                'create_time': result.item_list[0].create_time,
                'hashtag': hashtags
            },
            'music': music,
            'details': `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${id}`
        }
    }
}

const parseVideoResponse = (result, id) => {
    let hashtags = []
    for (let i = 0; i < result.item_list[0].text_extra.length; i++) {
        hashtags.push(result.item_list[0].text_extra[i].hashtag_name)
    }

    const vid_id = result.item_list[0].video.vid
    const watermark = result.item_list[0].video.play_addr.url_list[0]
    const no_watermark = watermark.replace('playwm', 'play')

    let music = {}
    if (result.item_list[0].music.title) {
        music = {
            'title': result.item_list[0].music.title,
            'url': result.item_list[0].music.play_url.url_list[0],
            'author': result.item_list[0].music.author,
            'duration': result.item_list[0].music.duration
        }
    }

    return {
        'ok': true,
        'status': '200',
        'type': 'video',
        'result': {
            'author': {
                'name': result.item_list[0].author.nickname,
                'singnature': result.item_list[0].author.signature,
                'avatar': result.item_list[0].author.avatar_larger.url_list[0],
                'douyin_id': result.item_list[0].author.unique_id
            },
            'video': {
                'thumbnail_url': {
                    'url_list': result.item_list[0].video.cover.url_list[0],
                },
                'video_url': {
                    'watermark_url': watermark,
                    'free_watermark_1080p': no_watermark
                },
                'statistics': {
                    'comment_count': result.item_list[0].statistics.comment_count,
                    'likes_count': result.item_list[0].statistics.digg_count,
                    'share_count': result.item_list[0].statistics.share_count,
                    'play_count': result.item_list[0].statistics.play_count,
                    'create_time': result.item_list[0].create_time,
                    'hashtag': hashtags
                },
                'descriptions': result.item_list[0].desc,
            },
            'music': music,
            'details': `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${id}`
        }
    }
}


exports.parseImageResponse = parseImageResponse
exports.parseVideoResponse = parseVideoResponse
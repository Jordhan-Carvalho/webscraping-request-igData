const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {
    const USERNAME = 'skipnhotv';
    const BASE_URL = `https://www.instagram.com/${USERNAME}`;

    const response = await request(BASE_URL);

    const $ = cheerio.load(response);

    const script = $('script[type="text/javascript"]').eq(3).html();

    const script_regex = /window._sharedData = (.+);/g.exec(script);

    // console.log(instagramData.entry_data.ProfilePage[0].graphql.user.biography);
    const {entry_data: {ProfilePage: { [0] : {graphql: {user} }}}} = JSON.parse(script_regex[1]);

    const instagramData = {
        followers: user.edge_followed_by.count,
        following: user.edge_follow.count,
        name: user.full_name,
        pictureUrl: user.profile_pic_url_hd,
        posts_number: user.edge_owner_to_timeline_media.count,
        posts_imgs: user.edge_owner_to_timeline_media.edges.map(post => post.node.display_url)
    }
    console.log(instagramData);
})();
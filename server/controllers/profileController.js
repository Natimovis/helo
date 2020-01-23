module.exports = {
    update: async (req, res) => {
        const { imgurl } = req.body;
        const user_id = +req.params.user_id;
        const db = req.app.get('db');
        const user = await db.change_profile_pic(user_id, imgurl);
        req.session.user = {
            id: user[0].user_id,
            username: user[0].username,
            password: user[0].user_password,
            profilePic: user[0].profilepic,
            requests: user[0].requests,
            friends: user[0].friends
        };
        res.status(202).json(req.session.user)
    },
    updateRequests: async (req, res) => {
        const {requests} = req.body;
        console.log('prfctrl17 requests req.body', req.body)
        const user_id = +req.params.user_id;
        const db = req.app.get('db');
        const info = await db.update_requests(requests, user_id);
        res.status(202).json(info)
        console.log('refctrl17 info', info)
    },
    getUsers: async (req, res) => {
        const posts = await req.app.get('db').get_all_posts([req.session.user.id]);
        const userImg = await req.app.get('db').get_users()
        console.log('prfctrljs30 res', res)
        return res.status(200).send({userImg, posts});
    }
}
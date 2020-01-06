module.exports = {
  addUserImg: async (req, res) => {
    console.log('imgControllerjs7-req.body', req.body)
    const { title, imgUrl, content } = req.body;
    const { id } = req.session.user;
    const userImg = await req.app.get('db').add_user_img([title, imgUrl, content, id]);
    return res.status(202).send(userImg);
  },
  edit: async (req, res) => {
    console.log('img controller32 req.body', req.body, 'req.session.user:', req.session.user)
    const { title, imgurl, content } = req.body;
    const post_id = +req.params.post_id;
    const user_id = +req.params.user_id;
    const db = req.app.get('db');
    
    const contacts = await db.edit(post_id, user_id, title, imgurl, content);
    res.status(202).json(contacts)
  },
  delete: async (req, res) => {
    console.log('imgctrljs27 req.params', +req.params.post_id)
    const post_id = +req.params.post_id;
    const { id } = req.session.user;
    const userImg = await req.app.get('db').delete([post_id, id]);
    return res.status(202).json(userImg)
  }
};
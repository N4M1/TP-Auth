const Post = require('../../models/post');

/* Toutes les réponses sont renvoyées en JSON */

// renvoie un Post en JSON en fonction de son ID
exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        let post = await Post.findById(id);

        // TODO: restreindre l'accès au post en fonction de l'user

        if (post) {
            return res.status(200).json(post);
        }

        return res.status(404).json('post_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

// ajoute un Post et le renvoie en JSON
exports.add = async (req, res, next) => {
    const temp = {};

    ({ 
        user_id  : temp.user_id,
        text     : temp.text
    } = req.body);

    Object.keys(temp).forEach((key) => (temp[key] == null) && delete temp[key]);

    try {
        let post = await Post.create(temp);

        return res.status(201).json(post);
    } catch (error) {
        return res.status(501).json(error);
    }
}

// met à jour un Post en fonction de son ID et le renvoie en JSON
exports.update = async (req, res, next) => {
    const temp   = {};

    ({ 
        user_id  : temp.user_id,
        text     : temp.text
    } = req.body);

    try {
        let post = await Post.findById(id);

        // TODO: restreindre l'accès au post en fonction de l'user

        if (post) {       
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    post[key] = temp[key];
                }
            });
            
            await post.save();
            return res.status(201).json(post);
        }

        return res.status(404).json('post_not_found');
    } catch (error) {console.log(error)
        return res.status(501).json(error);
    }
}

// supprime un Post en fonction de son ID et renvoie 'delete_ok' en JSON
exports.delete = async (req, res, next) => {
    const { id } = req.body;

    try {
        await Post.deleteOne({ _id: id });

        return res.status(201).json('delete_ok');
    } catch (error) {
        return res.status(501).json(error);
    }
}
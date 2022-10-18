const Post       = require('../../models/post');
const jwt        = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

/* Toutes les réponses sont renvoyées en JSON */

// renvoie un Post en JSON en fonction de son ID
exports.getById = async (req, res, next) => {
    const { id } = req.params;

    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (!!token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        
        let post = await Post.findById(id);
        let user = null
        
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return
            } else {
                user = decoded.user;
            }
        });

        if (!user) {
            return res.status(401).json('unauthorized');
        }

        if (user.role !== 'admin' && user._id !== post.user_id) {
            return res.status(401).json('unauthorized');
        }

        if (post) {
            return res.status(200).json(post);
        }

        return res.status(404).json('post_not_found');
    } catch (error) {
        return res.status(501).json(error);
    }
}

// ajoute un Post et le renvoie en JSON
// si l'utilisateur n'est pas celui qui a créé le post ou s'il n'est pas admin, on lui renvoie une erreur 401 unauthorized
// si l'utilisateur est admin ou s'il a créé le post, on lui renvoie le post en JSON
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
// si l'utilisateur n'est pas celui qui a créé le post ou s'il n'est pas admin, on lui renvoie une erreur 401 unauthorized
// si l'utilisateur est admin ou s'il a créé le post, on lui renvoie le post en JSON
exports.update = async (req, res, next) => {
    const temp   = {};

    ({ 
        user_id  : temp.user_id,
        text     : temp.text
    } = req.body);

    try {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (!!token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        
        let post = await Post.findById(id);
        let user = null
        
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return
            } else {
                user = decoded.user;
            }
        });

        if (!user) {
            return res.status(401).json('unauthorized');
        }

        if (user.role !== 'admin' && user._id !== post.user_id) {
            return res.status(401).json('unauthorized');
        }

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
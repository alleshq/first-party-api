module.exports = async (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        name: req.user.name,
        nickname: req.user.nickname,
        reputation: req.user.reputation,
        rubies: req.user.rubies,
        private: req.user.private,
        about: req.user.about,
        plus: req.user.plus,
        createdAt: req.user.createdAt,
        primaryId: req.user.primaryId
    });
};
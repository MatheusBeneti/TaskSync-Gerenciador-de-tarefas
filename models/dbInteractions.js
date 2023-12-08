const { db } = require("./db.js");

module.exports = class dbInteractions {
    async getUserData(userId) {
        const userRef = db.collection('users').doc(userId);
        const doc = await userRef.get();
        if (!doc.exists) {
            return null;
        }
        return doc.data();
    }

    async addNewUser(userData) {
        const userRef = db.collection('users').doc();
        await userRef.set(userData);
        return userRef.id;
    }
}

// user-dao.js
class UserDao {
    constructor(connection) {
        this._connection = connection;
    }
    list() {
        return new Promise(( resolve, reject ) => {
           this._connection.query( 'SELECT * FROM wk_users', ( err, products ) => {
                if ( err )
                    return reject( err );
                resolve( products );
            });
        } );
    }
}
module.exports = UserDao;
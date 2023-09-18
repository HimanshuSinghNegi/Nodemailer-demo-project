
class CustomeError extends Error {
    constructor(status, msg) {
        super(msg);
        this.msg = msg;
        this.status = status;
    }
}
module.exports = CustomeError;


























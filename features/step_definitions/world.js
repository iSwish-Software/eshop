class World {
    constructor({parameters}) {
        this.context = {};
    }
}

// set this environment variable to bypass DEPTH_ZERO_SELF_SIGNED_CERT error when using self-signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports = { World }

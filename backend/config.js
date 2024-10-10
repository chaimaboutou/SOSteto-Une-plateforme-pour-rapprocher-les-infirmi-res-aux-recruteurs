const facebook = {
    clientID: 'INSERT-CLIENT-ID-HERE',
    clientSecret: 'INSERT-CLIENT-SECRET-HERE',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
};
const google = {
    clientID: '1094627412794-kke894bm9r2ocv4q25qmhgh01rdhjno7.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',

};


module.exports = { facebook, google };

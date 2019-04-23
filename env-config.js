const prod = process.env.NODE_ENV === 'production';

module.exports = {
    'process.env.BASE_URL': prod ? 'https://asam-burgos.herokuapp.com' : 'http://localhost:3000',
    'process.env.NAMESPACE': 'https://asam-burgos.herokuapp.com',
    'process.env.AUTH0_CLIENT_ID': 'OFxgapEy25OMEt44SbhFvW46HlneTsaL'
}
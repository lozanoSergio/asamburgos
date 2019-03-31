const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');

dotenvLoad();

const withNextEnv = nextEnv();

module.exports = withNextEnv(withCSS(withSass(withImages((phase, {defaultConfig}) => {
    if(phase === PHASE_DEVELOPMENT_SERVER) {
        return { /* development only config options here */ }
      }
    
      return { /* config options for all phases except development here */ }
}))));

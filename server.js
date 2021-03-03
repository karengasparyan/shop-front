import path from 'path';
import fs from 'fs';
import axios from 'axios';
import striptags from 'striptags';
import express from 'express';
import config from './src/Api';
const { REACT_APP_API_URL } = config;
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '../build'), {
  index: false,
}));
app.get('/*', async (req, res, next) => {
  try {
    const { originalUrl } = req;
    let html = fs.readFileSync(path.join(__dirname, '../build/index.html'), 'utf8');
    const header = await getHeaders(originalUrl);
    html = html.replace('<head>', `<head>${header}`);
    res.send(html);
  } catch (e) {
    next(e);
  }
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
async function getHeaders(originalUrl) {
  let title = 'BioNeex - Biopharma R&D Exchange Platform for Drug Candidates Licensing';
  let description = 'Biopharma R&D Exchange Platform for Licensing and Co-Development Partnerships of Drug Candidates';
  const image = 'https://frontend-dev.bioneex.com/img/banner.jpg';
  try {
    if (originalUrl.startsWith('/drug-candidate/preview/single/')) {
      const [, id] = originalUrl.match(/\/(\d+)\/?$/) || [0, 0];
      // https://frontend-dev.bioneex.com/drug-candidate/preview/logged-in/single/1063?authorId=334
      const { data: { compound } } = await axios.get(`${REACT_APP_API_URL}/compounds/single/guest/${id}`);
      // eslint-disable-next-line max-len
      title = `BioNeex - ${compound.metaName ? compound.metaName : 'Biopharma R&D Exchange Platform for Drug Candidates Licensing'}`;
      // eslint-disable-next-line max-len
      description = striptags(compound.metaDescription ? compound.metaDescription : 'Biopharma R&D Exchange Platform for Licensing and Co-Development Partnerships of Drug Candidates');
    }
    if (originalUrl.startsWith('/sign-up/plans') && originalUrl.includes('sign_up')) {
      title = 'Sign Up - Biopharma R&D Exchange Platform for Drug Candidates Licensing';
    } else if (originalUrl.startsWith('/sign-up/plans')) {
      title = 'Plans & Pricing - Biopharma R&D Exchange Platform for Drug Candidates Licensing';
    } else if (originalUrl.startsWith('/sign-up')) {
      title = 'Sign Up - Biopharma R&D Exchange Platform for Drug Candidates Licensing';
    } else if (originalUrl === '/' || originalUrl.startsWith('/login')) {
      title = 'Log In - Biopharma R&D Exchange Platform for Drug Candidates Licensing';
    } else if (originalUrl.startsWith('/sign-up')) {
    }
  } catch (e) {
    console.error(e);
  }
  return (`
    <title>${title}</title>
    <meta name="description" content="${description}" data-react-helmet="true" />
    <meta name="og:type" content="website" data-react-helmet="true" />
    <meta name="og:title" content="${title}" data-react-helmet="true" />
    <meta property="og:title" content="${title}" data-react-helmet="true" />
    <meta name="og:description" content="${description}" data-react-helmet="true" />
    <meta property="og:description" content="${description}" data-react-helmet="true" />
    <meta name="og:image" content="${image}" data-react-helmet="true" />
    <meta property="og:image" content="${image}" data-react-helmet="true" />
    <meta name="twitter:card" content="summary_large_image" data-react-helmet="true" /> 
    <meta name="twitter:image" content="${image}" data-react-helmet="true" >
`);
}
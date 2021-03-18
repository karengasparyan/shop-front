import path from 'path';
import fs from 'fs';
import axios from 'axios';
import striptags from 'striptags';
import express from 'express';
import _ from 'lodash';
import Api from "./src/Api";
const { REACT_APP_API_URL } =  process.env;
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, './build'), {
  index: false,
}));

app.get('/*', async (req, res, next) => {
  try {
    const { originalUrl } = req;
    let html = fs.readFileSync(path.join(__dirname, './build/index.html'), 'utf8');

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
  let title = 'Магазин';
  let description = 'Магазин тест';
  let image = '';
  let sliderData = [];
  await axios.get(`http://localhost:4000/products/slider-images-list`).then(res => {
    image = `http://localhost:4000/sliderImages/${res.data[0].path}` || 'chka';
    sliderData = res.data[0]
  })
  let singleProduct = [];
  let images = [];
  try {
    if (originalUrl.startsWith('/product/')) {
      const [, productId] = originalUrl.match(/\/(\d+)\/?$/) || [0, 0];
     await axios.post(`http://localhost:4000/products/single-product`,{productId}).then(res => {
         singleProduct = _.get(res.data, ['singleProduct'], 'chka');
         title = singleProduct.metaName ? singleProduct.metaName : 'chkaTitle';
         description = singleProduct.metaDescription ? singleProduct.metaName : 'chkaDescription'
     })
      images = _.get(singleProduct,['images']).map(i => i.path)
    } else if (originalUrl.startsWith('/')) {
      image = sliderData.description;
    }
  } catch (e) {
    console.error(e);
  }
  return (`
    <title>${title}</title>
    <script type="application/ld+json">
    {
      "@context": "http://schema.org/",
      "@type": "Product",
      "sku": ${JSON.stringify(singleProduct.sku)},
      "image": ${JSON.stringify(images)},
      "name": ${JSON.stringify(singleProduct.name)},
      "description": ${JSON.stringify(singleProduct.shortDescription)}
      "brand": {
        "@type": "Brand",
        "name": ${JSON.stringify(singleProduct.name)}
      },
      "offers": {
        "@type": "Offer",
        "url": "http://www.example.com/trinket_offer",
        "itemCondition": "http://schema.org/NewCondition",
        "availability": "http://schema.org/InStock",
        "price": ${JSON.stringify(singleProduct.price)},
        "priceCurrency": "RUB",
        "priceValidUntil": "2020-11-20",
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "3.49",
            "currency": "USD"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "US",
            "postalCodeRange": {
              "postalCodeBegin": "98100",
              "postalCodeEnd": "98199"
            }
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": "0",
              "maxValue": "1"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": "1",
              "maxValue": "5"
            },
            "cutOffTime": "19:30-08:00",
            "businessDays": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [ "https://schema.org/Monday", "https://schema.org/Tuesday", "https://schema.org/Wednesday", "https://schema.org/Thursday" ]
            }
          }
        }
      },
      "review": {
        "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Fred Benson"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.4",
          "reviewCount": "89"
        }
      }
    </script>
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
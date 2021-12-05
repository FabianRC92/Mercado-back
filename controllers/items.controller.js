const axios = require("axios");

const deleteObjLista = (lista) => {
  const newObj = {
    ...lista,
  };

  delete newObj.amount;
  delete newObj.id;
  delete newObj.type;
  delete newObj.last_updated;
  delete newObj.regular_amount;
  delete newObj.conditions;
  delete newObj.exchange_rate_context;
  delete newObj.metadata;
  delete newObj.currency_id;

  return newObj;
};

const newObj = (d) => {
  const array = d.prices.prices.map((lista) => {
    const newObj = {
      currency: lista.currency_id,
      amount: lista.amount,
      decimals: 0,
    };

    const cleanObj = deleteObjLista(lista);

    const newPrice = {
      ...cleanObj,
      price: newObj,
    };

    return newPrice;
  });

  const newPrice = array.map((e) => e.price)[0];

  const newData = {
    ...d,
    price: newPrice,
    picture: d.thumbnail,
    free_shipping: d.shipping.free_shipping,
    categories: d.category_id,
    state: d.address.state_name,
  };

  delete newData.prices;
  delete newData.site_id;
  delete newData.shipping;
  delete newData.seller;
  delete newData.sale_price;
  delete newData.currency_id;
  delete newData.available_quantity;
  delete newData.sold_quantity;
  delete newData.buying_mode;
  delete newData.listing_type_id;
  delete newData.stop_time;
  delete newData.permalink;
  delete newData.thumbnail_id;
  delete newData.installments;
  delete newData.address;
  delete newData.seller_address;
  delete newData.attributes;
  delete newData.original_price;
  delete newData.category_id;
  delete newData.official_store_id;
  delete newData.domain_id;
  delete newData.catalog_product_id;
  delete newData.tags;
  delete newData.catalog_listing;
  delete newData.use_thumbnail_id;
  delete newData.offer_score;
  delete newData.offer_share;
  delete newData.match_score;
  delete newData.winner_item_id;
  delete newData.order_backend;
  delete newData.accepts_mercadopago;
  delete newData.thumbnail;

  return newData;
};

const deleteObj = (obj) => {
  const newObj = {
    ...obj,
  };

  delete newObj.site_id;
  delete newObj.paging;
  delete newObj.country_default_time_zone;
  delete newObj.query;
  delete newObj.sort;
  delete newObj.available_sorts;
  // delete newObj.filters;
  // delete newObj.available_filters;
  delete newObj.results;
  delete newObj.site_id;

  return newObj;
};

const request = async (q) => {
  const resp = await axios.get(
    "https://api.mercadolibre.com/sites/MLA/search?",
    { params: { q } }
  );

  const data = resp.data;
  const resultados = data.results.map((d) => newObj(d));
  const cleanObj = deleteObj(data);

  let categories;

  if (
    cleanObj.available_filters.filter((f) => f.id === "category").length > 0
  ) {
    categories = cleanObj.available_filters.filter((f) => f.id === "category");
  } else {
    categories = cleanObj.filters.filter((f) => f.id === "category");
  }

  delete cleanObj.available_filters;
  delete cleanObj.filters;

  const transformData = {
    ...cleanObj,
    autor: {
      nombre: "Fabian",
      lastname: "Reyes",
    },
    items: resultados,
    categories,
  };

  return transformData;
};

const consultaItems = async (req, res = response) => {
  try {
    res.send(await request(req.query.q));
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      error,
    });
  }
};

module.exports = { consultaItems };

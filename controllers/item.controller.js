const axios = require("axios");

const newObject = (obj) => {
  const newObj = {
    currency: obj.currency_id,
    amount: obj.price,
    decimals: 0,
  };

  return newObj;
};

const requestAPI = async (id) => {
  const res = await axios.get(`https://api.mercadolibre.com/items/${id}`);
  const resD = await axios.get(
    `https://api.mercadolibre.com/items/${id}/description`
  );

  const data = res.data;
  const dataD = resD.data;
  const newObj = newObject(data);
  const cleanObj = deleteObj(data);

  const newJSON = {
    ...cleanObj,
    autor: {
      nombre: "Fabian",
      lastname: "Reyes",
    },
    price: newObj,
    description: dataD.plain_text,
  };

  return newJSON;
};

const deleteObj = (obj) => {
  const newJSON = {
    ...obj,
    picture: obj.thumbnail,
    free_shipping: obj.shipping.free_shipping,
  };

  delete newJSON.site_id;
  delete newJSON.price;
  delete newJSON.thumbnail;
  delete newJSON.channels;
  delete newJSON.catalog_listing;
  delete newJSON.health;
  delete newJSON.last_updated;
  delete newJSON.date_created;
  delete newJSON.automatic_relist;
  delete newJSON.deal_ids;
  delete newJSON.differential_pricing;
  delete newJSON.parent_item_id;
  delete newJSON.domain_id;
  delete newJSON.catalog_product_id;
  delete newJSON.warranty;
  delete newJSON.tags;
  delete newJSON.sub_status;
  delete newJSON.status;
  delete newJSON.variations;
  delete newJSON.listing_source;
  delete newJSON.warnings;
  delete newJSON.attributes;
  delete newJSON.coverage_areas;
  delete newJSON.location;
  delete newJSON.seller_contact;
  delete newJSON.seller_address;
  delete newJSON.international_delivery_mode;
  delete newJSON.shipping;
  delete newJSON.non_mercado_pago_payment_methods;
  delete newJSON.descriptions;
  delete newJSON.video_id;
  delete newJSON.pictures;
  delete newJSON.secure_thumbnail;
  delete newJSON.thumbnail_id;
  delete newJSON.permalink;
  delete newJSON.stop_time;
  delete newJSON.start_time;
  delete newJSON.listing_type_id;
  delete newJSON.buying_mode;
  delete newJSON.sale_terms;
  delete newJSON.subtitle;
  delete newJSON.seller_id;
  delete newJSON.category_id;
  delete newJSON.official_store_id;
  delete newJSON.base_price;
  delete newJSON.original_price;
  delete newJSON.currency_id;
  delete newJSON.initial_quantity;
  delete newJSON.available_quantity;
  delete newJSON.accepts_mercadopago;

  return newJSON;
};

const consultaDetalleItem = async (req, res = response) => {
  try {
    res.send(await requestAPI(req.params.id));
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      error,
    });
  }
};

module.exports = { consultaDetalleItem };

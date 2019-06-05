export default class TestApiService {
  products = [
    {
      id: 1,
      name: 'Vitafusion Vitamin D3',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/813toY5xcsL._SL1500_.jpg',
      type: 'vitamin',
      description:
        'A vitamin important for the normal formation of red blood cells and the health of the nerve tissues. Undetected and untreated vitamin B12 deficiency can lead to anemia and permanent nerve and brain damage.',
      price: 45,
      data: {
        indications: 'indications ...',
        composition: 'composition ...',
      },
    },

    {
      id: 2,
      name: 'OLLY Sunny Vitamin D',
      img:
        'https://cdn.shopify.com/s/files/1/0108/2900/4864/products/vitamin_d_white_2f8d0943-d33c-41db-87df-8b31d299d161_1700x.jpg?v=1552081075',
      type: 'vitamin',
      description:
        'A vitamin important for the normal formation of red blood cells and the health of the nerve tissues. Undetected and untreated vitamin B12 deficiency can lead to anemia and permanent nerve and brain damage.',
      price: 25,
      data: {
        indications: 'indications ...',
        composition: 'composition ...',
      },
    },
    {
      id: 3,
      name: 'Vitamin B12',
      img:
        'https://target.scene7.com/is/image/Target/GUEST_a1415b15-c04b-4740-919b-6189af5b95c8?wid=488&hei=488&fmt=pjpeg',
      type: 'vitamin',
      description:
        'A vitamin important for the normal formation of red blood cells and the health of the nerve tissues. Undetected and untreated vitamin B12 deficiency can lead to anemia and permanent nerve and brain damage.',
      price: 35,
      data: {
        indications: 'indications ...',
        composition: 'composition ...',
      },
    },
    {
      id: 4,
      name: 'Vitamin C',
      img:
        'https://images-na.ssl-images-amazon.com/images/I/41olaYvOhUL._SY450_.jpg',
      type: 'vitamin',
      description:
        'A vitamin important for the normal formation of red blood cells and the health of the nerve tissues. Undetected and untreated vitamin B12 deficiency can lead to anemia and permanent nerve and brain damage.',
      price: 12,
      data: {
        indications: 'indications ...',
        composition: 'composition ...',
      },
    },
    {
      id: 5,
      name: 'OstroVit Vitamin D3+K2',
      img: 'https://hotline.ua/img/tx/144/144620810_s265.jpg',
      type: 'vitamin',
      description:
        'A vitamin important for the normal formation of red blood cells and the health of the nerve tissues. Undetected and untreated vitamin B12 deficiency can lead to anemia and permanent nerve and brain damage.',
      price: 5,
      data: {
        indications: 'indications ...',
        composition: 'composition ...',
      },
    },
    {
      id: 6,
      name: 'Vitamin C Formula 500mg',
      img:
        'https://bbr.in.ua/image/cache/catalog/product/vitaminumineralu/Vitamin%20C%20Formula%20500mg%20100%20tabs,%20Universal%20Nutrition-1000x1000.jpg',
      type: 'vitamin',
      description:
        'A vitamin important for the normal formation of red blood cells and the health of the nerve tissues. Undetected and untreated vitamin B12 deficiency can lead to anemia and permanent nerve and brain damage.',
      price: 17,
      data: {
        indications: 'indications ...',
        composition: 'composition ...',
      },
    },
  ];

  getRandomProducts = async cnt => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.95) {
          reject(new Error());
        } else {
          const shuffled = this.products.sort(() => 0.5 - Math.random());
          let randomItems = shuffled.slice(0, cnt);
          resolve(randomItems);
        }
      }, 500);
    });
  };

  getAllProducts = async () => {
    return this.products;
  };

  getProduct = async id => {
    return this.products[id];
  };
}

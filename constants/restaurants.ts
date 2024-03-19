import { meat, salads, seaFood } from "./menu";

export const restaurants = [
  {
    name: "Darko's Grill",
    description: "",
    addresss: "",
    menu: meat,
    rating: "",
    logo: "",
    main_image: "",
    _id: "",
  },
  {
    name: "Simaian Salad Store",
    description: "",
    addresss: "",
    menu: salads,
    rating: "",
    logo: "",
    main_image: "",
    _id: "",
  },
  {
    name: "Sandy Pirates Seafood Store",
    description: "",
    addresss: "",
    menu: seaFood,
    rating: "",
    logo: "",
    main_image: "",
    _id: "",
  },
];

export const mockRestaurantData = [
  {
    _createdAt: "2024-03-09T14:17:59Z",
    store_approval: { approved: true },
    store_rating: 4.7,
    store_address: {
      latitude: "44.6650386",
      postal_code: "H2K 4K4,",
      longitude: "-97.776115",
      province: "Quebec",
      city: "bikini bottom",
      street: "10 Squidward Avenue",
    },
    menu_categories: [
      {
        _type: "category",
        _key: "f19f724561cf",
        title: "Cake",
        products: [
          {
            _ref: "c138d1e8-e1f8-47ce-b76c-f980696db475",
            _type: "product",
            _key: "f74c7d99da4e",
          },
          {
            _ref: "8613ee74-ae4f-4955-8e14-e04d7395d99d",
            _type: "product",
            _key: "ab23e2800f10",
          },
          {
            _ref: "6c33cecd-54ad-48fa-92e9-2b4dc22aeff3",
            _type: "product",
            _key: "6a6436e9d64d",
          },
        ],
      },
      {
        _type: "category",
        _key: "781dd9f48451",
        title: "Fruits & Veggies",
        products: [
          {
            _ref: "0c08b2f6-9cec-4c6e-950a-57ae7bb4c293",
            _type: "product",
            _key: "f639a25938bd",
          },
          {
            _ref: "18ab1a6f-c975-4593-ac3f-132390b6f6f0",
            _type: "product",
            _key: "8a23e47fd6dd",
          },
          {
            _key: "12bdc8b003ab",
            _ref: "aaac6e10-2d81-4276-ba3e-2c8fa96e8e89",
            _type: "product",
          },
          {
            _ref: "379e2d63-97c2-4753-b6bc-4a937e6df8a9",
            _type: "product",
            _key: "8d8ed5222c5d",
          },
          {
            _ref: "f312cf38-e2d9-402a-b828-5c908fced1c3",
            _type: "product",
            _key: "9f5a0ea8dc34",
          },
        ],
      },
    ],
    _updatedAt: "2024-03-13T18:34:50Z",
    store_image:
      "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
    store_tags: ["Fruits", "Cakes", "Dessert", "Exotic"],
    _rev: "JXfdWXYmmPCwwbFFTWfpPZ",
    _type: "stores",
    store_ratings_count: 500,
    store_products: [
      {
        _ref: "0c08b2f6-9cec-4c6e-950a-57ae7bb4c293",
        _type: "product",
        _key: "6f4a47390514",
      },
      {
        _ref: "18ab1a6f-c975-4593-ac3f-132390b6f6f0",
        _type: "product",
        _key: "e92567b095e6",
      },
      {
        _ref: "379e2d63-97c2-4753-b6bc-4a937e6df8a9",
        _type: "product",
        _key: "adbab79c527f",
      },
      {
        _ref: "8613ee74-ae4f-4955-8e14-e04d7395d99d",
        _type: "product",
        _key: "c1eb3c2a4ced",
      },
      {
        _ref: "c138d1e8-e1f8-47ce-b76c-f980696db475",
        _type: "product",
        _key: "390a491b2db8",
      },
      {
        _key: "0c358bf806aa",
        _ref: "aaac6e10-2d81-4276-ba3e-2c8fa96e8e89",
        _type: "product",
      },
      {
        _ref: "6c33cecd-54ad-48fa-92e9-2b4dc22aeff3",
        _type: "product",
        _key: "49183b5d887f",
      },
      {
        _ref: "f312cf38-e2d9-402a-b828-5c908fced1c3",
        _type: "product",
        _key: "6d41b64008df",
      },
    ],
    store_name: "Lean Baker",
    _id: "5e210e6e-89c0-49f6-b544-bf4b8f427a54",
    store_location: { lat: 7.4399511, lng: 3.9547541, _type: "geopoint" },
    store_status: { open: true },
    store_logo:
      "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
    store_orders: [
      {
        _type: "order",
        order_price: "c",
        _key: "cdf52d879d40",
        order_name: "c",
      },
    ],
    store_description:
      "We are the lean mean baking machines for your healthy pastries and meals",
    distance: "1.9 km",
  },
  {
    menu_categories: [
      {
        _type: "category",
        _key: "2916d6bb374c",
        title: "Salads",
        products: [
          {
            _ref: "3ee9f488-a516-47c5-b9a1-d2624c7ab2de",
            _type: "product",
            _key: "18d1d703b347",
          },
          {
            _ref: "nGswGFPSxqaahmG5UxW6AS",
            _type: "product",
            _key: "a4959e5d644a",
          },
          {
            _ref: "cb491002-10ef-4854-a7cd-7c8513843d01",
            _type: "product",
            _key: "0af1fd295d1c",
          },
        ],
      },
      {
        _key: "9c0b9498b57d",
        title: "Chinese",
        products: [
          {
            _ref: "9819b0d3-96bb-478d-a7b7-6c0794f2cdab",
            _type: "product",
            _key: "d12a0564daf9",
          },
          {
            _type: "product",
            _key: "e681c02179e2",
            _ref: "uQS42QKkcwrImRlS7dGxlS",
          },
          {
            _type: "product",
            _key: "03421b94084a",
            _ref: "e1ed74cd-1320-46a0-a201-4063caff5d88",
          },
          {
            _key: "78693c9ad25d",
            _ref: "bf3d4ac6-f030-42ba-bc26-f68f843e988a",
            _type: "product",
          },
        ],
        _type: "category",
      },
    ],
    _updatedAt: "2024-03-10T18:10:57Z",
    store_location: { lng: 3.931177, _type: "geopoint", lat: 7.4130204 },
    store_approval: { approved: true },
    store_address: {
      postal_code: "H2K 4K4,",
      longitude: "-97.776115",
      province: "Quebec",
      street: "2600 Ontario St E",
      latitude: "41.6650386",
    },
    _id: "bda93bf7-3060-46fd-bee4-692cabba7299",
    owner: { _ref: "1656f76d-42cb-4881-9fde-9dd293d1543a", _type: "reference" },
    _createdAt: "2024-02-16T08:34:56Z",
    _type: "stores",
    store_products: [
      {
        _ref: "3ee9f488-a516-47c5-b9a1-d2624c7ab2de",
        _type: "product",
        _key: "815d9a08b80d",
      },
      {
        _ref: "bf3d4ac6-f030-42ba-bc26-f68f843e988a",
        _type: "product",
        _key: "ff0c4f798f24",
      },
      {
        _ref: "9819b0d3-96bb-478d-a7b7-6c0794f2cdab",
        _type: "product",
        _key: "2593f67b35df",
      },
      {
        _key: "52bc89208af7",
        _ref: "e1ed74cd-1320-46a0-a201-4063caff5d88",
        _type: "product",
      },
      {
        _ref: "nGswGFPSxqaahmG5UxW6AS",
        _type: "product",
        _key: "a21df50f0826",
      },
      {
        _ref: "cb491002-10ef-4854-a7cd-7c8513843d01",
        _type: "product",
        _key: "20b5bd25ad1d",
      },
      {
        _ref: "uQS42QKkcwrImRlS7dGxlS",
        _type: "product",
        _key: "22273c685413",
      },
      {
        _key: "1bd9388669d5",
        _ref: "eab9b250-b262-4aeb-a5ff-5e10829b3b89",
        _type: "product",
      },
    ],
    store_description: "amazing steaks ooo bdbdbd hwhwh",
    store_tags: ["Chinese", "Keto", "Salads", "Beverages"],
    _rev: "bwjmyF8qb3kmUEGeGHGKKz",
    store_rating: 4.1,
    store_ratings_count: 100,
    store_name: "Papa Johns",
    store_image:
      "https://cdn.sanity.io/images/xnrrhmkl/production/459ac7a87699f30703e6eac35127d4d601d91500-2887x2887.jpg",
    store_status: { open: true },
    store_logo:
      "https://cdn.sanity.io/images/xnrrhmkl/production/459ac7a87699f30703e6eac35127d4d601d91500-2887x2887.jpg",
    distance: "6.7 km",
  },
];

export const mockMealData = {
  description:
    "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
  _rev: "bwjmyF8qb3kmUEGeGH26WR",
  name: "Farm cherry cake",
  _updatedAt: "2024-03-09T14:26:13Z",
  image:
    "https://cdn.sanity.io/images/xnrrhmkl/production/1690887a5672fa326f1ae5c07f9118b1f4751e20-1380x920.jpg",
  vendor: {
    store_name: "Lean Baker",
    _id: "5e210e6e-89c0-49f6-b544-bf4b8f427a54",
    store_logo:
      "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
  },
  _type: "products",
  category: "Desserts",
  price: 10,
  _createdAt: "2024-03-09T14:24:02Z",
  _id: "c138d1e8-e1f8-47ce-b76c-f980696db475",
};

const mockStoreData = {
  store_rating: 4.7,
  store_orders: [
    { _type: "order", order_price: "c", _key: "cdf52d879d40", order_name: "c" },
  ],
  store_ratings_count: 500,
  store_name: "Lean Baker",
  store_address: {
    city: "bikini bottom",
    street: "10 Squidward Avenue",
    latitude: "44.6650386",
    postal_code: "H2K 4K4,",
    longitude: "-97.776115",
    province: "Quebec",
  },
  store_description:
    "We are the lean mean baking machines for your healthy pastries and meals",
  store_logo:
    "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
  _type: "stores",
  _updatedAt: "2024-03-13T18:34:50Z",
  _id: "5e210e6e-89c0-49f6-b544-bf4b8f427a54",
  store_tags: ["Fruits", "Cakes", "Dessert", "Exotic"],
  menu_categories: [
    {
      products: [
        {
          _rev: "bwjmyF8qb3kmUEGeGH26WR",
          name: "Farm cherry cake",
          category: "Desserts",
          image: {
            _type: "image",
            asset: {
              _ref: "image-1690887a5672fa326f1ae5c07f9118b1f4751e20-1380x920-jpg",
              _type: "reference",
            },
          },
          vendor: {
            _ref: "5e210e6e-89c0-49f6-b544-bf4b8f427a54",
            _type: "reference",
          },
          _type: "products",
          price: 10,
          _createdAt: "2024-03-09T14:24:02Z",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          _id: "c138d1e8-e1f8-47ce-b76c-f980696db475",
          _updatedAt: "2024-03-09T14:26:13Z",
        },
        {
          _rev: "bwjmyF8qb3kmUEGeGH27gH",
          _type: "products",
          category: "Desserts",
          _updatedAt: "2024-03-09T14:27:56Z",
          vendor: {
            _ref: "5e210e6e-89c0-49f6-b544-bf4b8f427a54",
            _type: "reference",
          },
          _createdAt: "2024-03-09T14:24:26Z",
          price: 25,
          image: {
            _type: "image",
            asset: {
              _ref: "image-56a77bd89bbcda5a5e17912959937ecb82363320-900x860-jpg",
              _type: "reference",
            },
          },
          name: "Caramel cherry and pickle cake",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          _id: "8613ee74-ae4f-4955-8e14-e04d7395d99d",
        },
        {
          name: "Strawberry and cherry Cake",
          description:
            "delicious parfait for your delight from papa johns cafe",
          category: "Parfaits",
          _updatedAt: "2024-03-09T14:34:40Z",
          _createdAt: "2024-02-18T11:36:30Z",
          _id: "6c33cecd-54ad-48fa-92e9-2b4dc22aeff3",
          _rev: "dMhzVqlsMid7syUdLgmg7t",
          image: {
            _type: "image",
            asset: {
              _ref: "image-c424759dcf483245925cd3fc5f363c1c8be9109c-400x267-png",
              _type: "reference",
            },
          },
          vendor: {
            _ref: "5e210e6e-89c0-49f6-b544-bf4b8f427a54",
            _type: "reference",
          },
          _type: "products",
          price: 198,
        },
      ],
      _type: "category",
      _key: "f19f724561cf",
      title: "Cake",
    },
    {
      title: "Fruits & Veggies",
      products: [
        {
          vendor: {
            _ref: "5e210e6e-89c0-49f6-b544-bf4b8f427a54",
            _type: "reference",
          },
          name: "Strawberry and cinnamon sticks",
          _rev: "bwjmyF8qb3kmUEGeGH26Fz",
          _id: "0c08b2f6-9cec-4c6e-950a-57ae7bb4c293",
          _createdAt: "2024-03-09T14:25:11Z",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          category: "Desserts",
          image: {
            _type: "image",
            asset: {
              _ref: "image-3ba39854118e240bc0bc278582cec6a938953e54-1060x773-jpg",
              _type: "reference",
            },
          },
          price: 45,
          _updatedAt: "2024-03-09T14:25:59Z",
          _type: "products",
        },
        {
          _updatedAt: "2024-03-09T14:26:34Z",
          _createdAt: "2024-03-09T14:22:20Z",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          name: "Mixed Fruits delight",
          category: "Desserts",
          _type: "products",
          vendor: {
            _ref: "5e210e6e-89c0-49f6-b544-bf4b8f427a54",
            _type: "reference",
          },
          _id: "18ab1a6f-c975-4593-ac3f-132390b6f6f0",
          image: {
            _type: "image",
            asset: {
              _ref: "image-1afdd7454251eadbb81570eff85d0522d21ab2a7-740x1109-jpg",
              _type: "reference",
            },
          },
          price: 27,
          _rev: "bwjmyF8qb3kmUEGeGH26mt",
        },
        {
          price: 14,
          vendor: {
            _type: "reference",
            _ref: "5e210e6e-89c0-49f6-b544-bf4b8f427a54",
          },
          _createdAt: "2024-03-09T14:22:59Z",
          category: "Desserts",
          name: "Persian cheese and tofu",
          _rev: "bwjmyF8qb3kmUEGeGH26gr",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          _updatedAt: "2024-03-09T14:26:25Z",
          _type: "products",
          _id: "aaac6e10-2d81-4276-ba3e-2c8fa96e8e89",
          image: {
            _type: "image",
            asset: {
              _ref: "image-0b30befff3552b102c41a9e5795004af9f81008c-1060x827-jpg",
              _type: "reference",
            },
          },
        },
        {
          name: "Cream and veggies",
          category: "Desserts",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          _type: "products",
          _id: "379e2d63-97c2-4753-b6bc-4a937e6df8a9",
          _updatedAt: "2024-03-09T14:22:16Z",
          image: {
            _type: "image",
            asset: {
              _ref: "image-74ee7bec310873e5ca522c9c2dbba66929bbb3ea-826x826-jpg",
              _type: "reference",
            },
          },
          vendor: {
            _ref: "5e210e6e-89c0-49f6-b544-bf4b8f427a54",
            _type: "reference",
          },
          _rev: "bwjmyF8qb3kmUEGeGH23IH",
          price: 35,
          _createdAt: "2024-03-09T14:21:04Z",
        },
        {
          _createdAt: "2024-03-09T14:23:30Z",
          _rev: "bwjmyF8qb3kmUEGeGH26bv",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          category: "Desserts",
          _updatedAt: "2024-03-09T14:26:19Z",
          price: 12,
          _type: "products",
          name: "Pickles and toast",
          image: {
            _type: "image",
            asset: {
              _ref: "image-3f0c3f7b0cae0b2b438c64311ea8cae44e4ac401-1380x920-jpg",
              _type: "reference",
            },
          },
          vendor: {
            _ref: "5e210e6e-89c0-49f6-b544-bf4b8f427a54",
            _type: "reference",
          },
          _id: "f312cf38-e2d9-402a-b828-5c908fced1c3",
        },
      ],
      _type: "category",
      _key: "781dd9f48451",
    },
  ],
  store_status: { open: true },
  store_approval: { approved: true },
  _createdAt: "2024-03-09T14:17:59Z",
  _rev: "JXfdWXYmmPCwwbFFTWfpPZ",
  store_products: [
    {
      _ref: "0c08b2f6-9cec-4c6e-950a-57ae7bb4c293",
      _type: "product",
      _key: "6f4a47390514",
    },
    {
      _key: "e92567b095e6",
      _ref: "18ab1a6f-c975-4593-ac3f-132390b6f6f0",
      _type: "product",
    },
    {
      _ref: "379e2d63-97c2-4753-b6bc-4a937e6df8a9",
      _type: "product",
      _key: "adbab79c527f",
    },
    {
      _ref: "8613ee74-ae4f-4955-8e14-e04d7395d99d",
      _type: "product",
      _key: "c1eb3c2a4ced",
    },
    {
      _key: "390a491b2db8",
      _ref: "c138d1e8-e1f8-47ce-b76c-f980696db475",
      _type: "product",
    },
    {
      _ref: "aaac6e10-2d81-4276-ba3e-2c8fa96e8e89",
      _type: "product",
      _key: "0c358bf806aa",
    },
    {
      _ref: "6c33cecd-54ad-48fa-92e9-2b4dc22aeff3",
      _type: "product",
      _key: "49183b5d887f",
    },
    {
      _ref: "f312cf38-e2d9-402a-b828-5c908fced1c3",
      _type: "product",
      _key: "6d41b64008df",
    },
  ],
  store_location: { lng: 3.9547541, _type: "geopoint", lat: 7.4399511 },
  store_image:
    "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
  menu: [
    {
      products: [
        {
          _rev: "bwjmyF8qb3kmUEGeGH26WR",
          name: "Farm cherry cake",
          category: "Desserts",
          image:
            "https://cdn.sanity.io/images/xnrrhmkl/production/1690887a5672fa326f1ae5c07f9118b1f4751e20-1380x920.jpg",
          vendor: "Lean Baker",
          _type: "products",
          price: 10,
          _createdAt: "2024-03-09T14:24:02Z",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          _id: "c138d1e8-e1f8-47ce-b76c-f980696db475",
          _updatedAt: "2024-03-09T14:26:13Z",
          store_logo:
            "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
        },
        {
          _rev: "bwjmyF8qb3kmUEGeGH27gH",
          _type: "products",
          category: "Desserts",
          _updatedAt: "2024-03-09T14:27:56Z",
          vendor: "Lean Baker",
          _createdAt: "2024-03-09T14:24:26Z",
          price: 25,
          image:
            "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
          name: "Caramel cherry and pickle cake",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          _id: "8613ee74-ae4f-4955-8e14-e04d7395d99d",
          store_logo:
            "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
        },
        {
          name: "Strawberry and cherry Cake",
          description:
            "delicious parfait for your delight from papa johns cafe",
          category: "Parfaits",
          _updatedAt: "2024-03-09T14:34:40Z",
          _createdAt: "2024-02-18T11:36:30Z",
          _id: "6c33cecd-54ad-48fa-92e9-2b4dc22aeff3",
          _rev: "dMhzVqlsMid7syUdLgmg7t",
          image:
            "https://cdn.sanity.io/images/xnrrhmkl/production/c424759dcf483245925cd3fc5f363c1c8be9109c-400x267.png",
          vendor: "Lean Baker",
          _type: "products",
          price: 198,
          store_logo:
            "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
        },
      ],
      _type: "category",
      _key: "f19f724561cf",
      title: "Cake",
    },
    {
      title: "Fruits & Veggies",
      products: [
        {
          vendor: "Lean Baker",
          name: "Strawberry and cinnamon sticks",
          _rev: "bwjmyF8qb3kmUEGeGH26Fz",
          _id: "0c08b2f6-9cec-4c6e-950a-57ae7bb4c293",
          _createdAt: "2024-03-09T14:25:11Z",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          category: "Desserts",
          image:
            "https://cdn.sanity.io/images/xnrrhmkl/production/3ba39854118e240bc0bc278582cec6a938953e54-1060x773.jpg",
          price: 45,
          _updatedAt: "2024-03-09T14:25:59Z",
          _type: "products",
          store_logo:
            "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
        },
        {
          _updatedAt: "2024-03-09T14:26:34Z",
          _createdAt: "2024-03-09T14:22:20Z",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          name: "Mixed Fruits delight",
          category: "Desserts",
          _type: "products",
          vendor: "Lean Baker",
          _id: "18ab1a6f-c975-4593-ac3f-132390b6f6f0",
          image:
            "https://cdn.sanity.io/images/xnrrhmkl/production/1afdd7454251eadbb81570eff85d0522d21ab2a7-740x1109.jpg",
          price: 27,
          _rev: "bwjmyF8qb3kmUEGeGH26mt",
          store_logo:
            "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
        },
        {
          price: 14,
          vendor: "Lean Baker",
          _createdAt: "2024-03-09T14:22:59Z",
          category: "Desserts",
          name: "Persian cheese and tofu",
          _rev: "bwjmyF8qb3kmUEGeGH26gr",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          _updatedAt: "2024-03-09T14:26:25Z",
          _type: "products",
          _id: "aaac6e10-2d81-4276-ba3e-2c8fa96e8e89",
          image:
            "https://cdn.sanity.io/images/xnrrhmkl/production/0b30befff3552b102c41a9e5795004af9f81008c-1060x827.jpg",
          store_logo:
            "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
        },
        {
          name: "Cream and veggies",
          category: "Desserts",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          _type: "products",
          _id: "379e2d63-97c2-4753-b6bc-4a937e6df8a9",
          _updatedAt: "2024-03-09T14:22:16Z",
          image:
            "https://cdn.sanity.io/images/xnrrhmkl/production/74ee7bec310873e5ca522c9c2dbba66929bbb3ea-826x826.jpg",
          vendor: "Lean Baker",
          _rev: "bwjmyF8qb3kmUEGeGH23IH",
          price: 35,
          _createdAt: "2024-03-09T14:21:04Z",
          store_logo:
            "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
        },
        {
          _createdAt: "2024-03-09T14:23:30Z",
          _rev: "bwjmyF8qb3kmUEGeGH26bv",
          description:
            "Delicious Salad for your delight made with white meat, lettuce, tomatoes and onion rings dressing .",
          category: "Desserts",
          _updatedAt: "2024-03-09T14:26:19Z",
          price: 12,
          _type: "products",
          name: "Pickles and toast",
          image:
            "https://cdn.sanity.io/images/xnrrhmkl/production/3f0c3f7b0cae0b2b438c64311ea8cae44e4ac401-1380x920.jpg",
          vendor: "Lean Baker",
          _id: "f312cf38-e2d9-402a-b828-5c908fced1c3",
          store_logo:
            "https://cdn.sanity.io/images/xnrrhmkl/production/56a77bd89bbcda5a5e17912959937ecb82363320-900x860.jpg",
        },
      ],
      _type: "category",
      _key: "781dd9f48451",
    },
  ],
  categories: [{ title: "Cake" }, { title: "Fruits & Veggies" }],
};

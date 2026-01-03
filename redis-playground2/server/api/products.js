export const getProducts = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        products: [
          {
            id: 1,
            name: "Product1",
            price: 100,
          },
        ],
      });
    }, 2000);
  });

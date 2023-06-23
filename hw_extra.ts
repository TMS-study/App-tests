// Coздать приложение, которое получает данные о продуктах из https://fakestoreapi.com/products/ и обрабатывает их следующим образом:
// 1.находит все товары в ценовом диапазоне от до
// 2.находит товар по заданному title
// 3.находит все товары, которые содержат заданную подстроку в description
// 4.сортирует все товары по убыванию rate
// 5.находит все товары с rate выше либо равным заданному, сортирует результаты по возрастанию количества оценок
// 6.группирует все товары по категории, сортирует товары внутри групп по цене
// 7.находит все товары, с расширением image НЕ являющимся одним из списка: jpg, png, jpeg
// 8.для всех товаров с description длиннее 30 символов - преобразует description в следующий вид "{первые 27 символов description}...", возвращает все товары включая обновленные
// 9.применяет заданное значение скидки на все товары заданной категории, возвращает все товары включая обновленные
// 10.преобразует цены всех товаров округляя их до ближайшего целого, возвращает все товары включая обновленные
// 11.подсчитывает общее количество оценок по всем товарам

// Результаты всех обработок записать в соответствующий json файл: result_1.json, result_2.json ... result_10.json.

// Все необходимые параметры для обработок (минимальное/максимальное значение цены в диапазоне, искомый title и т.д.) допустимо обьявлять как константы. 
// Для более усовершенствованного варианта можно использовать пакет dotenv (https://www.npmjs.com/package/dotenv)



import { error } from 'console';
import fs from 'fs';

const app = 'https://fakestoreapi.com/products';

async function showProduct() {
  const response = await fetch(app);
  return await response.json();
}
async function displayProduct() {
  const products0 = await showProduct();
  console.log(products0);
}

displayProduct();

// 1.находит все товары в ценовом диапазоне от до
  async function getProductPrice() {
  const minPrice = 10;
  const maxPrice = 20;

  const products1: any = await showProduct();

  const filteredProducts = products1.filter((product: any) => {return product.price >= minPrice && product.price <= maxPrice;});

  console.log(filteredProducts);

  // Запись JSON в файл
  fs.writeFile('result_1.json', JSON.stringify(filteredProducts), (error) => { // название куда будет записан файл, перевод в формат, ошибка
    if (error) throw error;
    console.log('Результат записан в файл "result_1.json"');
  });
}

getProductPrice();

// 2.находит товар по заданному title-

async function findTitle() {

const products2: any = await showProduct();

const findTitleProducts = products2.find((product: any) => {return product.title === 'Mens Casual Slim Fit'})

console.log(findTitleProducts);

// Запись JSON в файл
fs.writeFile('result_2.json', JSON.stringify(findTitleProducts), (error) => {
  if (error) throw error;
  console.log('Результат записан в файл "result_2.json"');
});
}

findTitle();
 
// 3.находит все товары, которые содержат заданную подстроку в description

async function findStringInDescription() {

  const products3: any = await showProduct();

  const findString = products3.filter((product: any) => {return product.description.includes('Cotton')});

  console.log(findString);
  
  fs.writeFile('result_3.json', JSON.stringify(findString), (error) => {
    if(error) throw error;
    console.log('Результат записан в файл "result_3.json"')
  });
}

findStringInDescription();


// 4.сортирует все товары по убыванию rate

 async function sortProduct() {
   const product4 = await showProduct();

   const sort1 = product4.map((product: any) => {return product.rating.rate});

   const sort2 = sort1.sort((a: number, b: number) => b - a);

   console.log(sort2);

fs.writeFile('result_4.json', JSON.stringify(sort2), (error) => {
  if(error) throw error;
  console.log('Результат записан в файл "result_4.json"')
});
 }
 sortProduct();


// 5.находит все товары с rate выше либо равным заданному, сортирует результаты по возрастанию количества оценок
async function sortProductRate() {

    const product5 = await showProduct();

    const sort3 = product5
      .map((product: any) => product.rating.rate)
      .filter((value: number) => value >= 3);

      const sort4 = sort3.sort((a: number, b:number) => a - b);

    console.log(sort4);

fs.writeFile('result_5.json', JSON.stringify(sort4), (error) => {
  if(error) throw error;
  console.log('Результат записан в файл "result_5.json"')
})
}
sortProductRate();


// 6.группирует все товары по категории, сортирует товары внутри групп по цене

async function groupProducts() {

  const product6 = await showProduct();



  let electronics: any = [];
  let womensClothing: any = [];
  let jewelery: any = [];
  let mensClothing: any = [];

  // если категория  = такая то, то пушим в нее и тд
  for (let product of product6) {
    switch (product.description) {
      case "electronics":
        electronics.push(product);
        break;
      case "women's clothing":
        womensClothing.push(product);
        break;
      case "jewelery":
        jewelery.push(product);
        break;
      case "men's clothing":
        mensClothing.push(product);
        break;
    }
  }

  //чтобы не выводить пустые массивы
  if (electronics.length > 0) {
    console.log(electronics);
  }

  if (womensClothing.length > 0) {
    console.log(womensClothing);
  }

  if (jewelery.length > 0) {
    console.log(jewelery);
  }

  if (mensClothing.length > 0) {
    console.log(mensClothing);
  }

  // отсортировать
  electronics.sort((a: any, b: any) => a.price - b.price);
  womensClothing.sort((a: any, b: any) => a.price - b.price);
  jewelery.sort((a: any, b: any) => a.price - b.price);
  mensClothing.sort((a: any, b: any) => a.price - b.price);

  fs.writeFile('result_6.json', JSON.stringify(product6), (error) => {
    if (error) throw error;
    console.log('Результат записан в файл "result_6.json"')
  });
}

groupProducts();

// 7.находит все товары, с расширением image НЕ являющимся одним из списка: jpg, png, jpeg

async function findImage() {
  const product7 = await showProduct();

  const image1 = product7.filter((product: any) => {
    return (
      !product.image.includes('.jpg') &&
      !product.image.includes('.png') &&
      !product.image.includes('.jpeg')
    );
  });

  console.log(image1);

  fs.writeFile('result_7.json', JSON.stringify(image1), (error) => {
    if(error) throw error;
    console.log('Результат записан в файл "result_7.json"')
  })
}

findImage();


// 8.для всех товаров с description длиннее 30 символов - преобразует description в следующий вид "{первые 27 символов description}...", возвращает все товары включая обновленные

async function cuteDescription() {
  const product8 = await showProduct();
  
  for (let product of product8) {
    
    if (product.description.length <= 30) {
      product.description = product.description;
    } else {
      product.description = product.description.slice(0, 28) + '...';
    }
    
  }
  console.log(product8);

  fs.writeFile('result_8.json', JSON.stringify(product8), (error) => {
    if(error) throw error;
    console.log('Результат записан в файл "result_8.json"')
  })

}

cuteDescription();
// 9.применяет заданное значение скидки на все товары заданной категории, возвращает все товары включая обновленные

async function showDiscount() {

  const product9 = await showProduct();
  const discount = 50;

  for (let product of product9){
    if(product.price){
      product.price = product.price - (product.price * (discount / 100));
    } 
  }

  console.log(product9);

  fs.writeFile('result_9.json', JSON.stringify(product9), (error) => {
    if(error) throw error;
    console.log('Результат записан в файл "result_9.json"')
  })
  
}

showDiscount(); 

// 10.преобразует цены всех товаров округляя их до ближайшего целого, возвращает все товары включая обновленные

async function convertPriceProduct() {
  
  const product9 = await showProduct();

  for (let product of product9) {
    if (!Number.isInteger(product.price)) {
      product.price = Math.round(product.price);
    }
  }

  console.log(product9);

  fs.writeFile('result_10.json', JSON.stringify(product9), (error) => {
    if(error) throw error;
    console.log('Результат записан в файл "result_10.json"')
  })
}

convertPriceProduct();

// 11.подсчитывает общее количество оценок по всем товарам

async function showTotalCount() {

  const product10 = await showProduct();

  const totalCount = product10
  .map((product: any) => product.rating.count)
  .reduce((accumulator: number, currentValue: number) => {return accumulator + currentValue})

  console.log(totalCount);

  fs.writeFile('result_11.json', JSON.stringify(totalCount), (error) => {
    if(error) throw error;
    console.log('Результат записан в файл "result_11.json"');
  })
  
  
}
showTotalCount();



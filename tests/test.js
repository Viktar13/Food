const mapMe = [1000, 800, 2400, 500];

const map =  (arr, fn) => {
    const mapArr = [];
    for (element of arr) {
        mapArr.push(fn(element));
        
    }
    return mapArr;
};

console.log(map(mapMe, (elem) => elem * 2));


5489df4hgd98fhg4nfxd9b1x98bx4nh9fxt8jn4fg9n4
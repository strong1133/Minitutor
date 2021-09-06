$(document).ready(function () {
    let type = getType()
    let ansType = manyKeyword(type);
    getAns(ansType);
})

function getType() {
    let type = location.search.split('=')[1]
    return type;
}


function manyKeyword(type) {
    const input = type;

    const charMap = {};

    for (let char of input.toLowerCase()) {
        charMap[char] = charMap[char] ? charMap[char] + 1 : 1;
    }

    let max = Math.max.apply(null, Object.values(charMap));
    let maxChar = '';
    let counter = 0;
    for (let char in charMap) {
        if (charMap[char] === max) {
            maxChar = char;
            counter++;
        }
        if (counter > 1) {
            console.log('?');
            return;
        }
    }
    return maxChar.toUpperCase();
}

function getAns(type) {
    $.ajax({
        url: `/ans?type=${type}`,
        method: 'GET',
        success: function (response) {
            let data = response["ans"][0];

            addHtml(data['brand'], data['desc'], data['eng'], data['kor'])

            let imgHtml = `<img class="result_img" src="../static/img/${data['eng']}.png" alt="">`
            $('.result_img').append(imgHtml)

            keyWord(data['keyword'])

        }
    })
}

function addHtml (brand, desc, eng, kor){
    let tempHtml = `
            <p class="brand">${brand}</p>
              <h2 class="eng_name">${eng}</h2>
              <h4 class="kor_name">${kor}</h4>
 
              <div class="desc">
                  ${desc}
            </div>`
    $('.info_container').append(tempHtml)
}

function keyWord (keyword){
    for (k of keyword) {
        console.log(k)
        let tempHtml = `<span>${k}</span>`
        $('.keyword').append(tempHtml)
    }
}
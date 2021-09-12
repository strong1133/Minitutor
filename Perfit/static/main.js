$(document).ready(function () {
    getQuiz(1);
})

let idx = 1
let ans = '';

function getQuiz(idx) {
    console.log("%d 문제입니다.", idx)
    $.ajax({
        url: `/quiz?idx=${idx}`,
        method: 'GET',

        success: function (response) {
            $('.quiz-content').empty();
            let data = response["quiz"][0];

            console.log(data);

            $('.quiz-content').append(`<h2>${data["quiz"]}</h2>`)

            $('#btn_type_A').text(`A. ${data["ans_01"]}`)
            $('#btn_type_B').text(`B. ${data["ans_02"]}`)
            $('#btn_type_C').text(`C. ${data["ans_03"]}`)
            $('#btn_type_D').text(`D. ${data["ans_04"]}`)

        }
    })
}

function btn_click(x) {
    console.log("%s 선택.", x) //A, B, C, D

    ans += x;

    idx += 1;

    if (idx > 4) {
        alert("최종 응답 유형은 " + ans)
        location.href=`/result?type=${ans}`;
        return;
    }

    getQuiz(idx, x)
}
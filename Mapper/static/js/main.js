// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
let infowindow;
let mapContainer, mapOption
let map, ps

$(document).ready(function () {

    infowindow = new kakao.maps.InfoWindow({zIndex: 1});

    mapContainer = document.getElementById('map') // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 2 // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    map = new kakao.maps.Map(mapContainer, mapOption);

    // 장소 검색 객체를 생성합니다
    ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch('경기 맛집', placesSearchCB);

})

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        $(".contents-body").empty();

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
            makeCard(data[i])
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
    console.log(place)
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}

function search(){
    let sch = $('#search').val();
    if (!sch){
        alert("검색 내용을 입력하세요!")
        return
    }
    console.log(sch)
    ps.keywordSearch(sch, placesSearchCB);
}

function makeCard(data){

    let tempHtml = `
        <div class="card" onclick="location.href='${data.place_url}'">
          <div class="card_header">

          </div>
          <div class="card_body">
            <div class="tilte">
              <h2>${data["place_name"]}</h2>
            </div>
            <div class="desc">
              <p>
                전화번호 : ${data["phone"]}
                주소 : ${data["road_address_name"]}
              </p>
            </div>
          </div>
        </div>
    `
    $(".contents-body").append(tempHtml)
}

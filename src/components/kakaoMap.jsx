import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const NearbyStoreMap = ({ searchKeyword }) => {
	useEffect(() => {
		// 사용자 좌표 얻어오기 & Map생성
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const lat = position.coords.latitude;
					const lng = position.coords.longitude;

					const container = document.getElementById('map');
					const userLocation = new kakao.maps.LatLng(lat, lng);
					const options = {
						center: userLocation,
						level: 3, // 확대수준
					};
					const map = new kakao.maps.Map(container, options);
					// 내 위치 원으로 표시
					const circle = new kakao.maps.Circle({
						center: userLocation,
						radius: 20, //미터 단위의 원의 반지름
						strokeWeight: 4, //선의 두께
						strokeColor: '#75b8fa',
						strokeOpacity: 0.8, //선의 불투명도 1에서 0사이, 0에 가까울수록 투명
						fillColor: '#CFE7FF', //채우기 색
						fillOpacity: 0.6,
					});
					circle.setMap(map);

					// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
					var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
					// 장소 검색 객체 생성
					const ps = new kakao.maps.services.Places();
					// 키워드로 장소 검색
					const searchOptions = {
						location: userLocation, //중심좌표. 특정 지역을 기준으로 검색
						radius: 1000, //중심좌표로부터의 거리반경 필터링값
					};
					ps.keywordSearch(searchKeyword, placesSearchDB, searchOptions);
					// 키워드 검색 완료 시 호출되는 콜백함수
					function placesSearchDB(data, status) {
						if (status === kakao.maps.services.Status.OK) {
							// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
							// LatLngBounds 객체에 좌표를 추가합니다
							var bounds = new kakao.maps.LatLngBounds();

							for (var i = 0; i < data.length; i++) {
								displayMarker(data[i]);
								bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
							}

							// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
							map.setBounds(bounds);
						}
					}
					// 지도에 마커를 표시하는 함수입니다
					function displayMarker(place) {
						// 마커를 생성하고 지도에 표시합니다
						var marker = new kakao.maps.Marker({
							map: map,
							position: new kakao.maps.LatLng(place.y, place.x),
						});

						// 마커에 클릭이벤트를 등록합니다
						kakao.maps.event.addListener(marker, 'click', function () {
							// 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
							infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
							infowindow.open(map, marker);
						});
					}
				},

				(error) => {
					console.error('사용자 위치정보 가져오는데 실패했습니다', error);
				},
			);
		} else {
			console.error('브라우저에서 geolocation 지원하지 않습니다.');
		}
	}, []);

	return (
		<div
			id='map'
			style={{
				width: '100%',
				height: '400px',
			}}
		></div>
	);
};

export default NearbyStoreMap;

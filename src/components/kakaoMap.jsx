import { useState, useEffect } from 'react';
// import Jeju_Oreum from '../test/Jeju_Oreum.json';
import Jeju_Oreum_Desc from '../test/Juju_Oreum_Desc.json';

// eslint-disable-next-line react/prop-types
// const NearbyStoreMap = ({ searchKeyword }) => {
// 	useEffect(() => {
// 		// 사용자 좌표 얻어오기 & Map생성
// 		if (navigator.geolocation) {
// 			navigator.geolocation.getCurrentPosition(
// 				(position) => {
// 					const lat = position.coords.latitude;
// 					const lng = position.coords.longitude;

// 					const container = document.getElementById('map');
// 					const userLocation = new kakao.maps.LatLng(lat, lng);
// 					const options = {
// 						center: userLocation,
// 						level: 3, // 확대수준
// 					};
// 					const map = new kakao.maps.Map(container, options);
// 					// 내 위치 원으로 표시
// 					const circle = new kakao.maps.Circle({
// 						center: userLocation,
// 						radius: 80, //미터 단위의 원의 반지름
// 						strokeWeight: 4, //선의 두께
// 						strokeColor: '#75b8fa',
// 						strokeOpacity: 0.8, //선의 불투명도 1에서 0사이, 0에 가까울수록 투명
// 						fillColor: '#CFE7FF', //채우기 색
// 						fillOpacity: 0.6,
// 					});
// 					circle.setMap(map);

// 					// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
// 					var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
// 					// 장소 검색 객체 생성
// 					const ps = new kakao.maps.services.Places();
// 					// 키워드로 장소 검색
// 					const searchOptions = {
// 						location: userLocation, //중심좌표. 특정 지역을 기준으로 검색
// 						// radius: 1000, //중심좌표로부터의 거리반경 필터링값
// 					};
// 					ps.keywordSearch(searchKeyword, placesSearchDB, searchOptions);
// 					// 키워드 검색 완료 시 호출되는 콜백함수
// 					function placesSearchDB(data, status) {
// 						if (status === kakao.maps.services.Status.OK) {
// 							// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
// 							// LatLngBounds 객체에 좌표를 추가합니다
// 							var bounds = new kakao.maps.LatLngBounds();

// 							for (var i = 0; i < data.length; i++) {
// 								displayMarker(data[i]);
// 								bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
// 							}

// 							// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
// 							map.setBounds(bounds);
// 						}
// 					}
// 					// 지도에 마커를 표시하는 함수입니다
// 					function displayMarker(place) {
// 						// 마커를 생성하고 지도에 표시합니다
// 						var marker = new kakao.maps.Marker({
// 							map: map,
// 							position: new kakao.maps.LatLng(place.y, place.x),
// 						});

// 						// 마커에 클릭이벤트를 등록합니다
// 						kakao.maps.event.addListener(marker, 'click', function () {
// 							// 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
// 							infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
// 							infowindow.open(map, marker);
// 						});
// 					}
// 				},

// 				(error) => {
// 					console.error('사용자 위치정보 가져오는데 실패했습니다', error);
// 				},
// 			);
// 		} else {
// 			console.error('브라우저에서 geolocation 지원하지 않습니다.');
// 		}
// 	}, []);

// 	return (
// 		<div
// 			id='map'
// 			style={{
// 				width: '100%',
// 				height: '400px',
// 			}}
// 		></div>
// 	);
// };

// const oruem_data = Jeju_Oreum.data;
const oruem_data = Jeju_Oreum_Desc.data;
// console.log(oruem_data);

// console.log(oruem_data);
const NearbyStoreMap = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [oruemData, setOreumData] = useState({});
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
						level: 10, // 확대수준
					};
					const map = new kakao.maps.Map(container, options);
					// 내 위치 원으로 표시
					const circle = new kakao.maps.Circle({
						center: userLocation,
						radius: 80, //미터 단위의 원의 반지름
						strokeWeight: 4, //선의 두께
						strokeColor: '#75b8fa',
						strokeOpacity: 0.8, //선의 불투명도 1에서 0사이, 0에 가까울수록 투명
						fillColor: '#CFE7FF', //채우기 색
						fillOpacity: 0.6,
					});
					circle.setMap(map);

					oruem_data.forEach((oruem) => {
						console.log(oruem);
						console.log('oruem', oruem.위도);

						// 결과값으로 받은 위치를 마커로 표시합니다
						displayMarker(oruem);
					});

					// 지도에 마커를 표시하고 클릭시 infowindow를 표시하는 함수입니다
					function displayMarker(place) {
						console.log('place', place);
						// 마커를 생성하고 지도에 표시합니다
						const marker = new kakao.maps.Marker({
							map: map,
							position: new kakao.maps.LatLng(place.위도, place.경도),
						});

						const infowindow = new kakao.maps.InfoWindow({
							content: `<div style="padding:5px;font-size:12px;">${place.오름명}</div>`,
						});

						// 마커에 클릭이벤트를 등록합니다
						kakao.maps.event.addListener(marker, 'click', function () {
							// 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
							infowindow.open(map, marker);
							// modalOpen();
							setIsOpen(true);

							setOreumData(place);
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
		<>
			<div
				id='map'
				style={{
					width: '100%',
					height: '100vw',
					zIndex: 0,
				}}
			></div>
			{isOpen && oruemData && (
				<div
					style={{
						width: '100%',
						height: '331px',
						zIndex: '100',
						backgroundColor: 'pink',
						position: 'absolute',
						bottom: '0%',
						left: '50%',
						transform: 'translate(-50%, 0)',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<div>---</div>
					<div>적합한 장소를 찾았어요!</div>
					<div>{oruemData.오름명}</div>
					<div>날씨정보...</div>
					<img
						style={{ width: '100%', height: '136px' }}
						src='https://cdn.san.chosun.com/news/photo/202205/15785_66304_337.jpg'
					></img>
					<button>메인으로</button>
					<button>상세정보보기</button>
				</div>
			)}
		</>
	);
};

export default NearbyStoreMap;

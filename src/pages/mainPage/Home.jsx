import { useState, useEffect } from 'react';
import Selector from '@components/TimeDropdown';
import MainModal from '@components/MainModal';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Jeju_Oreum_Desc from '../../test/Juju_Oreum_Desc.json';
// import SunnyImg from '../../assets/icon_sunny.png';
import CloudImg from '../../assets/cloud.png';

const oruem_data = Jeju_Oreum_Desc.data;

const Home = () => {
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const [oruemData, setOreumData] = useState({});
	const [currentLatLng, setCurrentLatLng] = useState({ lat: '', lng: '' });
	const [currentLocation, setCurrentLocation] = useState({});

	const [isSelectMountain, setIsSelectMountain] = useState(true);
	const [isSelectSea, setIsSelectSea] = useState(false);

	useEffect(() => {
		// 사용자 좌표 얻어오기 & Map생성
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log('position', position);
					const lat = position.coords.latitude;
					const lng = position.coords.longitude;

					setCurrentLatLng({ lat, lng });
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

					// 주소-좌표 변환 객체를 생성합니다
					var geocoder = new kakao.maps.services.Geocoder();

					searchAddrFromCoords(map.getCenter(), displayCenterInfo);

					function searchAddrFromCoords(coords, callback) {
						// 좌표로 행정동 주소 정보를 요청합니다
						geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
					}

					// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
					function displayCenterInfo(result, status) {
						if (status === kakao.maps.services.Status.OK) {
							// var infoDiv = document.getElementById('centerAddr');

							console.log('result', result);
							setCurrentLocation(result[0]);

							// for (var i = 0; i < result.length; i++) {
							// 	// 행정동의 region_type 값은 'H' 이므로
							// 	if (result[i].region_type === 'H') {
							// 		infoDiv.innerHTML = result[i].address_name;
							// 		break;
							// 	}
							// }
						}
						// console.log(infoDiv.innerHTML);
						// let location = infoDiv.innerHTML;
					}

					oruem_data.forEach((oruem) => {
						console.log(oruem);
						console.log('oruem', oruem.위도);

						// 결과값으로 받은 위치를 마커로 표시합니다
						displayMarker(oruem);
					});

					// 지도에 마커를 표시하고 클릭시 infowindow를 표시하는 함수입니다
					function displayMarker(place) {
						console.log('place', place);

						var imageSrc = CloudImg, // 마커이미지의 주소입니다
							imageSize = new kakao.maps.Size(40, 56), // 마커이미지의 크기입니다
							imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

						// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
						var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
						const marker = new kakao.maps.Marker({
							map: map,
							position: new kakao.maps.LatLng(place.위도, place.경도),
							image: markerImage, // 마커이미지 설정
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
		<div
			style={{
				position: 'relative',
			}}
		>
			<div
				id='map'
				style={{
					width: '100%',
					height: '100vh',
					zIndex: 0,
				}}
			></div>
			<Toggle>
				<Btn
					className={isSelectMountain ? 'mountain' : ''}
					onClick={() => {
						setIsSelectMountain(true);
						setIsSelectSea(false);
					}}
				>
					산 지역 ⛰️
				</Btn>
				<SeaBtn
					className={isSelectSea ? 'sea' : ''}
					onClick={() => {
						setIsSelectMountain(false);
						setIsSelectSea(true);
					}}
				>
					바다 지역 🌊
				</SeaBtn>
			</Toggle>
			{/* 핀에 대한 오름상세 모달 */}
			{isOpen && oruemData ? (
				<Modal>
					<SlideDown
						onClick={() => {
							setIsOpen(false);
						}}
					></SlideDown>
					<BlueDiv>적합한 장소를 찾았어요!</BlueDiv>
					<img
						style={{ width: '100%', height: '136px', borderRadius: '8px' }}
						src='https://cdn.san.chosun.com/news/photo/202205/15785_66304_337.jpg'
					></img>
					<Title>{oruemData.오름명}</Title>
					<WeatherDiv>날씨정보...</WeatherDiv>
					<div>테스트에서 작성해주신 이러이러한 부분을 반영하여, 저러저러한 이유로 이곳을 추천드려요.</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<MainButton
							onClick={() => {
								setIsOpen(false);
							}}
						>
							메인으로
						</MainButton>
						<DetailButton
							onClick={() => {
								navigate('/detail');
							}}
						>
							상세정보보기
						</DetailButton>
					</div>
				</Modal>
			) : null}
			<MainModal currentLocation={currentLocation} />
			<Selector />
		</div>
	);
};

const Toggle = styled.div`
	z-index: 100;
	position: absolute;

	top: 65px;
	left: 50%;
	transform: translate(-50%, 0);
	display: flex;
	border-radius: 8px 0px 0px 8px;
	overflow: hidden;
`;

const Btn = styled.button`
	display: flex;
	width: 120px;
	padding: 9px 16px;
	justify-content: center;
	align-items: center;
	line-height: 1;
	gap: 10px;

	font-weight: bold;

	border-radius: 8px 0px 0px 8px;
	border: none;

	cursor: pointer;

	color: ${(props) => (props.className == 'mountain' ? `white` : '#525463')};
	background-color: ${(props) => (props.className == 'mountain' ? `#3dcb98` : 'white')};
`;

const SeaBtn = styled.button`
	display: flex;
	width: 120px;
	padding: 9px 16px;
	justify-content: center;
	align-items: center;
	line-height: 1;
	gap: 10px;

	font-weight: bold;

	border-radius: 0px 8px 8px 0px;
	border: none;

	cursor: pointer;

	color: ${(props) => (props.className == 'sea' ? `white` : '#525463')};
	background-color: ${(props) => (props.className == 'sea' ? `#3dcb98` : 'white')};
`;

const Modal = styled.div`
	text-align: left;
	box-sizing: border-box;

	width: 100%;
	zindex: 100;
	border-radius: 20px 20px 0px 0px;
	background: #fff;
	box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.2);

	position: absolute;
	bottom: 0%;
	left: 50%;
	transform: translate(-50%, 0);
	display: flex;
	flex-direction: column;
	gap: 9px;

	padding: 20px 32px 40px 32px;

	animation: slideUp 0.5s ease-out forwards; /* 애니메이션 적용 */

	@keyframes slideUp {
		from {
			bottom: -100%; /* 슬라이더의 초기 위치를 화면 밖으로 설정 */
		}
		to {
			bottom: 0; /* 최종 위치를 화면 하단으로 설정 */
		}
	}
`;

const SlideDown = styled.div`
	width: 103px;
	height: 4px;

	border-radius: 100px;
	background: #d9d9d9;

	margin: 0 auto;

	margin-bottom: 25px;
`;

const BlueDiv = styled.div`
	color: #1d6ce0;
	font-feature-settings:
		'clig' off,
		'liga' off;

	/* KOR/H5ㅣ1.125rem */
	font-family: Pretendard;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: 27px; /* 150% */
	letter-spacing: -0.1px;
`;

const Title = styled.div`
	color: #181818;
	font-feature-settings:
		'clig' off,
		'liga' off;

	/* KOR/H3ㅣ1.5rem */
	font-family: Pretendard;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: 36px; /* 150% */
	letter-spacing: -0.3px;
`;

const WeatherDiv = styled.div`
	color: #1959b8;
	font-feature-settings:
		'clig' off,
		'liga' off;
	font-family: Pretendard;
	font-size: 12px;
	font-style: normal;
	font-weight: 700;
	line-height: 18px; /* 150% */
	letter-spacing: -0.1px;
`;

const MainButton = styled.button`
	box-sizing: border-box;
	display: flex;
	height: 52px;
	padding: 14px 24px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;

	border-radius: 8px;
	border: 1px solid var(--light-gray-gray-300, #e1e1e8);
	background: rgba(205, 206, 214, 0.08);

	cursor: pointer;
`;

const DetailButton = styled.button`
	box-sizing: border-box;
	display: flex;
	height: 52px;
	padding: 14px 24px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;

	border-radius: 8px;
	border: 1px solid #e1e1e8;
	background: #5094fa;

	color: white;
	cursor: pointer;
`;

export default Home;

/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import Selector from '@components/TimeDropdown';
import MainModal from '@components/MainModal';
import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
import Jeju_Oreum_Desc from '../../test/Juju_Oreum_Desc.json';
import weather from '../../test/weather.json';
import SunnyImg from '../../assets/sunny.png';
import RainImg from '../../assets/rain.png';
import CloudImg from '../../assets/cloud.png';

import { Link } from 'react-router-dom';
import Landing from '@pages/Landing';

function objectToQueryString(obj) {
	const queryString = Object.entries(obj)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');
	return queryString;
}

const { resultSummary } = Jeju_Oreum_Desc;

const nowHour = new Date().getHours().toString().padStart(2, '0');
console.log('nowHour', nowHour); //04

console.log('weather', weather);

const Home = () => {
	// const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const [oruemData, setOreumData] = useState({});
	const [currentLatLng, setCurrentLatLng] = useState({ lat: '', lng: '' });
	const [currentLocation, setCurrentLocation] = useState({});

	const [isSelectMountain, setIsSelectMountain] = useState(true);
	const [isSelectSea, setIsSelectSea] = useState(false);

	const [currentWeather, setCurrentWeather] = useState('');
	const [imgSrc, setImgSrc] = useState();

	const [showLanding, setShowLanding] = useState(true);

	useEffect(() => {
		// 사용자 좌표 얻어오기 & Map생성

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					// console.log('position', position);
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

					var clusterer = new kakao.maps.MarkerClusterer({
						map: map,
						averageCenter: true,
						minLevel: 3,
						calculator: [3, 30, 50], // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
						styles: [
							{
								// calculator 각 사이 값 마다 적용될 스타일을 지정한다
								// width: '30px',
								// height: '30px',
								// background: '#FF7C43',
								// borderRadius: '15px',
								// color: '#000',
								// textAlign: 'center',
								// fontWeight: 'bold',
								// lineHeight: '31px',

								width: '0',
								height: '0',
								borderBottom: '10px solid #FF7C43',
								borderTop: '10px solid transparent',
								borderLeft: '10px solid transparent',
								borderRight: '10px solid transparent',
							},
							{
								width: '0',
								height: '0',
								borderBottom: '10px solid #FF7C43',
								borderTop: '10px solid transparent',
								borderLeft: '10px solid transparent',
								borderRight: '10px solid transparent',
							},
							{
								width: '0',
								height: '0',
								borderBottom: '10px solid #FF7C43',
								borderTop: '10px solid transparent',
								borderLeft: '10px solid transparent',
								borderRight: '10px solid transparent',
							},
							{
								width: '0',
								height: '0',
								borderBottom: '10px solid #FF7C43',
								borderTop: '10px solid transparent',
								borderLeft: '10px solid transparent',
								borderRight: '10px solid transparent',
							},
						],
					});

					resultSummary.forEach((oruem) => {
						// console.log(oruem);
						// console.log('oruem', oruem.x);

						// oruem.y, oruem.x 위도, 경도 params로 보내 날씨 api 요청

						// 응답으로 시간별 날씨 정보를 받음 --> 일단 목데이터 weather.json
						// "dt_txt": "2024-02-28 18:00:00" <-- UTC
						// weather를 돌면서 내 현재 시간과 UTC같은 객체 정보만 불러온다.

						// UTC 시간 문자열
						// const utcTime = '2024-02-28 18:00:00';

						// Date 객체 생성
						// const utcDate = new Date(utcTime + 'Z'); // 'Z'를 추가하여 UTC로 파싱하도록 함

						// 한국 시간으로 변환 (UTC+9)
						// utcDate.setHours(utcDate.getHours() + 9);

						// 결과 출력
						// const kstTime = utcDate.toISOString().replace('T', ' ').substring(0, 19);
						// console.log(kstTime); //2024-02-29 03:00:00
						weather.forEach((el) => {
							console.log('el', el);
							// UTC 시간 문자열
							const utcTime = el.dt_txt;

							// Date 객체 생성
							const utcDate = new Date(utcTime + 'Z'); // 'Z'를 추가하여 UTC로 파싱하도록 함

							// 한국 시간으로 변환 (UTC+9)
							utcDate.setHours(utcDate.getHours() + 9);

							// 결과 출력
							const kstTime = utcDate.toISOString().replace('T', ' ').substring(0, 19);
							// console.log(kstTime); //2024-02-29 03:00:00

							// weather의 시간
							const hour = kstTime.substring(11, 13);
							console.log('hour', hour);

							if (nowHour == hour) {
								let weatherStatus = el.weather[0].main; // Rain, Cloouds , ..
								console.log('weatherStatus', weatherStatus);

								let markerImgSrc;

								// Set the image source based on the weather status
								if (weatherStatus === 'Rain') {
									markerImgSrc = RainImg;
								} else if (weatherStatus === 'Clouds') {
									markerImgSrc = CloudImg;
								} else {
									markerImgSrc = SunnyImg;
								}

								var marker = new kakao.maps.Marker({
									position: new kakao.maps.LatLng(oruem.y, oruem.x),
									image: new kakao.maps.MarkerImage(markerImgSrc, new kakao.maps.Size(40, 56), {
										offset: new kakao.maps.Point(27, 69),
									}),
								});

								// 마커에 클릭이벤트를 등록합니다
								kakao.maps.event.addListener(marker, 'click', function () {
									// 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
									// infowindow.open(map, marker);
									// modalOpen();
									setIsOpen(true);
									setOreumData(oruem);
								});

								clusterer.addMarker(marker);
							}
						});

						// 결과값으로 받은 위치를 마커로 표시합니다
						// displayMarker(oruem);
					});

					setTimeout(function () {
						console.log('Hello, World!');
						setShowLanding(false);
					}, 1200);
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
			{showLanding ? <Landing /> : <></>}
			<div
				style={{
					position: 'relative',
					height: '100vh',
					overflow: 'hidden',
					minHeight: '100%',
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
						<BlueDiv>🤩 꿀꿀, 적합한 장소를 찾았어요!</BlueDiv>
						<img style={{ width: '100%', height: '136px', borderRadius: '8px' }} src={oruemData.imgPath}></img>
						<Title>{oruemData.oleumKname}</Title>
						<WeatherDiv>기온 7'C 습도 10</WeatherDiv>
						<Desc>{oruemData.explan}</Desc>
						<div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
							<DetailButton to={`/detail/:${oruemData.oleumEname}?${objectToQueryString(oruemData)}`}>
								상세정보보기
							</DetailButton>
							<MainButton
								onClick={() => {
									setIsOpen(false);
								}}
							>
								메인으로
							</MainButton>
						</div>
					</Modal>
				) : null}
				<MainModal currentLocation={currentLocation} />
				<Selector />
			</div>
		</>
	);
};

export default Home;

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
	z-index: 100;
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

	padding: 20px 32px 70px 32px;

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
	color: #ff7c43;
	font-feature-settings:
		'clig' off,
		'liga' off;
	/* KOR/H6ㅣ1rem */
	font-family: Pretendard;
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: 24px; /* 150% */
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
	align-self: start;
	color: #ff7c43;
	text-align: center;
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

const Desc = styled.div`
	color: #2b2d36;
	font-feature-settings:
		'clig' off,
		'liga' off;

	/* KOR/subtitle-1ㅣ0.875rem */
	font-family: Pretendard;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 22px; /* 157.143% */
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

const DetailButton = styled(Link)`
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
	background: #3dcb98;

	color: white;
	cursor: pointer;
`;

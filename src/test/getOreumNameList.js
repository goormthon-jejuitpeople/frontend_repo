// import Jeju_Oreum_Desc from '../../test/Juju_Oreum_Desc.json';
import Jeju_Oreum_Desc from './Juju_Oreum_Desc.json';

function getOreumNameList() {
	const oreum_datas = Jeju_Oreum_Desc.resultSummary;
	// Array.prototype.map을 사용하여 오름의 이름만 추출한 후, .join 메소드로 문자열로 결합
	const oreum_names = oreum_datas.map((value) => value.oleumKname).join(', ');

	return oreum_names;
}

export default getOreumNameList;

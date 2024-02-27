module.exports = {
  types: [
    { value: "✨ Feat", name: "✨ Feat:\t새로운 기능 추가" },
    { value: "🐛 Fix", name: "🐛 Fix:\t버그 수정" },
    { value: "🔧 Modify", name: "🔧 Modify:\t파일/폴더 수정/삭제/위치변경" },
		{
      value: "🎨 Style",
      name: "🎨 Style:\t코드 포맷 변경, 세미 콜론 누락, 의미 없는 코드 수정",
    },
    {
      value: "💄 Design",
      name: "💄 Design:\tCSS등 사용자 UI/UX 디자인 변경",
    },
    {
      value: "🤖 Refactor",
      name: "🤖 Refactor:\t코드 리팩토링",
    },
    { value: "📝 Docs", name: "📝 Docs:\t문서 수정" },
		{ value: "💡 Comment", name: "💡 Commnet:\t필요한 주석 추가 및 변경" },
    {
      value: "✅ Test",
      name: "✅ Test:\t테스트 코드 추가",
    },
    {
      value: "🚚 Chore",
      name: "🚚 Chore:\t빌드 업무 수정, 패키지 관리자 구성 업데이트 등 환경설정 관련사항",
    },
  ],
	// 메시지 내용 오버라이드
  messages: {
    type: "커밋 변경유형을 선택해주세요.\n",
    scope: "\nDenote the SCOPE of this change (optional):",
    // used if allowCustomScopes is true
    customScope: "Denote the SCOPE of this change:\n", // 스킵
    subject: "커밋제목을 50자이내로 명확하게 작성해주세요.\n",
    body: '본문을 작성 해주세요. 여러줄 작성시 "|" 를 사용하여 줄바꿈하세요. (첫줄|둘째줄):\n',
    breaking:
      "코드에 매우 큰 변화나 핫 픽스가 있는 경우 자세히 입력해주세요 (optional):\n",
    footer:
      "List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n", // 스킵
    confirmCommit: "모든 커밋메시지를 제대로 입력하셨나요? (y | n)",
  },
  allowCustomScopes: false,
  allowBreakingChanges: ["Feat", "Fix", "Modify"],
  skipQuestions: ["scope", "customScope", "footer"],
  subjectLimit: 60,
};
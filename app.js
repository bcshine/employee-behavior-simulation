// 직원 유형 정의
const employeeTypes = {
    type1: {
        title: "1. 피해자 코스프레형",
        description: "실수나 문제가 생겨도 늘 남 탓을 하며, 사장에게 감정적으로 의존하거나 방어적 태도를 보임",
        initialMessage: "사장님, 또 팀원들이 저를 무시해요. 제가 제안한 아이디어를 듣지도 않고 무시했어요. 항상 제 의견은 묵살당하는 것 같아요. 정말 너무 억울해요."
    },
    type3: {
        title: "2. 지시불복종형",
        description: "사장의 말에 표면적으로는 따르지만 실제로는 무시하거나 회피함",
        initialMessage: "보고서 마감이 오늘까지라고요? 아, 네 알겠습니다. 당연히 마감일은 지켜야죠. (하지만 다른 일이 먼저라 내일까지 미루고 싶어요)"
    },
    type2: {
        title: "3. 뒷담화 유포형",
        description: "동료나 사장의 말과 행동을 왜곡해 퍼뜨리며 내부 갈등을 조장함",
        initialMessage: "사장님이 부르셨나요? 아, 그런데 말씀드릴게 있어요. 김 대리가 사장님이 새 프로젝트 담당자로 자기를 고르지 않은 건 편애 때문이라고 다른 사람들한테 이야기하고 다니더라고요. 제가 이런 말 하기 좀 그렇지만 알려야 할 것 같아서요."
    }
};

// 직원 응답 패턴
const employeeResponses = {
    type1: [
        "그렇게 말씀하시니 더 속상해요. 제가 노력해도 인정받지 못한다고 느껴요.",
        "사장님만이라도 제 편이 되어주실 줄 알았는데, 실망이에요.",
        "항상 제가 잘못한 것처럼 얘기하시는데, 전 정말 최선을 다했어요.",
        "다른 직원들도 실수하는데 왜 저만 지적받는지 모르겠어요.",
        "저는 항상 피해자인 것 같아요. 주변 사람들이 저를 이해해주지 않아요."
    ],
    type2: [
        "사실 이건 비밀인데, 이 팀 분위기가 좋지 않다고 다들 얘기해요.",
        "박 과장님도 사장님의 결정에 동의하지 않는다고 하더라고요.",
        "팀원들이 사장님 뒤에서 리더십이 부족하다고 수군거려요.",
        "신입사원이 사장님 눈치를 너무 본다고 다들 말하더라고요.",
        "저는 그냥 전달만 하는 거예요. 다른 사람들이 하는 말이에요."
    ],
    type3: [
        "네, 알겠습니다. 곧 처리하겠습니다. (하지만 실제로는 할 생각이 없어요)",
        "이해했습니다. 바로 시작하겠습니다. (다른 일이 더 중요하다고 생각해요)",
        "네, 말씀하신대로 하겠습니다. (그러나 제 방식이 더 좋다고 생각해요)",
        "걱정마세요. 제가 챙기겠습니다. (까먹을 가능성이 높아요)",
        "문제없습니다. 지시대로 진행하겠습니다. (실제로는 최소한만 할 계획이에요)"
    ]
};

// 직원 개선된 응답 패턴 (사장님의 긍정적 대응에 따라 점점 개선되는 응답)
const improvedEmployeeResponses = {
    type1: [
        "아... 그렇게 말씀해주시니 조금 마음이 풀리네요. 사실 정말 속상했거든요.",
        "네, 그렇게 생각해주시니 감사해요. 앞으로는 제 의견도 더 자신 있게 말해볼게요.",
        "맞아요, 제가 너무 감정적으로 반응했나 봐요. 다른 팀원들 입장도 있었겠네요.",
        "사장님 말씀을 들으니 저도 다른 관점에서 생각해볼 수 있을 것 같아요.",
        "정말 이해해주셔서 감사합니다. 앞으로는 더 긍정적으로 소통해볼게요."
    ],
    type2: [
        "네, 말씀드려서 다행이에요. 사실 이런 얘기하기가 조금 부담스러웠거든요.",
        "그렇죠, 아무래도 오해가 있었던 것 같아요. 직접 대화하는 게 중요한 것 같아요.",
        "맞아요. 소문보다는 직접 대화로 해결하는 게 좋겠네요. 제가 성급했던 것 같아요.",
        "사장님 말씀처럼 기준을 명확히 하면 이런 오해가 줄어들 것 같아요.",
        "네, 앞으로는 이런 이야기가 들리면 더 신중하게 확인해보겠습니다."
    ],
    type3: [
        "네, 이해해주셔서 감사합니다. 사실 요즘 업무량이 좀 많아서 걱정이었어요.",
        "말씀해주신 대로 오늘 마감일을 지키도록 최선을 다해볼게요.",
        "도와주신다니 정말 감사합니다. 함께 하면 더 효율적으로 일할 수 있을 것 같아요.",
        "네, 마감일의 중요성 잘 알겠습니다. 제가 우선순위를 잘못 설정했네요.",
        "앞으로는 일정 관리에 더 신경 쓰고, 어려움이 있으면 미리 말씀드리겠습니다."
    ]
};

// 직원 유형별 대응 가이드
const responseGuides = {
    type1: [
        "그럴 수 있겠다. 나라도 그럴 수 있을 것 같아.",
        "지금은 좀 답답하거나 억울한 마음이 크겠네요.",
        "혹시 내가 도울 수 있는 부분이 있을까요?",
        "당신의 입장도 충분히 이해되지만, 다른 사람 입장도 한번 같이 생각해보자.",
        "이번 일 잘 얘기해줘서 앞으로 더 좋은 방향으로 갈 수 있을 것 같아."
    ],
    type2: [
        "말해줘서 고마워요. 이런 이야기 하기 쉽지 않았을 텐데.",
        "이야기를 들으니 어떤 점이 제일 힘들었는지 알 것 같아요.",
        "이 문제는 그냥 넘기지 않을게요. 같이 방법을 찾아보자.",
        "이 일이 반복되지 않게, 우리 같이 기준을 한번 만들어볼까?",
        "언제든 얘기해도 괜찮다는 거, 잊지 말아요."
    ],
    type3: [
        "그럴 수 있겠다. 나라도 그럴 수 있을 것 같아.",
        "지금은 좀 부담스럽거나 어려운 마음이 있겠네요.",
        "혹시 내가 도울 수 있는 부분이 있을까요?",
        "당신의 입장도 충분히 이해되지만, 마감일이 중요한 이유도 같이 생각해보자.",
        "이번 일 솔직하게 얘기해줘서 앞으로 더 좋은 방향으로 갈 수 있을 것 같아."
    ]
};

// 키워드 패턴 (대화 팁에 맞는 답변인지 검사하기 위한 데이터)
const keywordPatterns = {
    type1: [
        ["그럴", "이해", "공감", "아프", "힘들", "너라도", "마음이"],  // 공감 표현 키워드 (매우 정확한 키워드)
        ["답답", "억울", "마음", "감정", "느낌"],  // 감정 정리 키워드 (매우 정확한 키워드)
        ["도울", "도와", "해결", "방법", "이유", "알아보", "얘기", "차근차근"],  // 해결 의지 키워드 (매우 정확한 키워드)
        ["균형", "다른", "입장", "이해", "생각"],  // 균형과 기준 키워드 (매우 정확한 키워드)
        ["고마", "좋은", "방향", "앞으로", "더"]   // 마무리 격려 키워드 (매우 정확한 키워드)
    ],
    type2: [
        ["말해줘", "고마", "이야기", "쉽지", "아프", "힘들", "너라도", "마음이"],  // 공감 표현 키워드 (매우 정확한 키워드)
        ["어떤", "힘들", "이야기", "들으니"],  // 감정 정리 키워드 (매우 정확한 키워드)
        ["해결", "넘기", "방법", "같이", "이유", "알아보", "얘기", "차근차근"],  // 해결 의지 키워드 (매우 정확한 키워드)
        ["기준", "반복", "만들", "같이"],  // 균형과 기준 키워드 (매우 정확한 키워드)
        ["언제든", "얘기", "괜찮"]   // 마무리 격려 키워드 (매우 정확한 키워드)
    ],
    type3: [
        ["그럴", "이해", "공감", "아프", "힘들", "너라도", "마음이"],  // 공감 표현 키워드 (매우 정확한 키워드)
        ["부담", "어려운", "마음"],  // 감정 정리 키워드 (매우 정확한 키워드)
        ["도울", "도와", "해결", "방법", "이유", "알아보", "얘기", "차근차근"],  // 해결 의지 키워드 (매우 정확한 키워드)
        ["마감일", "입장", "이해", "생각"],  // 균형과 기준 키워드 (매우 정확한 키워드)
        ["솔직", "좋은", "방향", "앞으로"]   // 마무리 격려 키워드 (매우 정확한 키워드)
    ]
};

// 중간 정도의 연관성 키워드 (Normal 평가 결과를 위한 키워드)
const normalKeywordPatterns = {
    type1: [
        ["이야기", "말", "듣다", "경험"],  // 공감 표현 중간 키워드
        ["힘들", "어렵", "상황", "기분"],  // 감정 정리 중간 키워드
        ["같이", "함께", "제안", "지원"],  // 해결 의지 중간 키워드
        ["모두", "서로", "관점", "이견"],  // 균형과 기준 중간 키워드
        ["노력", "발전", "감사", "다음"]   // 마무리 격려 중간 키워드
    ],
    type2: [
        ["용기", "공유", "솔직", "의견"],  // 공감 표현 중간 키워드
        ["상황", "경우", "이해", "설명"],  // 감정 정리 중간 키워드
        ["개선", "처리", "대화", "조치"],  // 해결 의지 중간 키워드
        ["규칙", "원칙", "정책", "방향"],  // 균형과 기준 중간 키워드
        ["소통", "대화", "열린", "의견"]   // 마무리 격려 중간 키워드
    ],
    type3: [
        ["상황", "생각", "의견", "확인"],  // 공감 표현 중간 키워드
        ["상황", "이유", "고민", "어려움"],  // 감정 정리 중간 키워드
        ["확인", "도움", "제안", "지원"],  // 해결 의지 중간 키워드
        ["중요", "필요", "이유", "기한"],  // 균형과 기준 중간 키워드
        ["노력", "의견", "말씀", "생각"]   // 마무리 격려 중간 키워드
    ]
};

// 상황별 긍정/부정 멘트 리스트
const situationalResponses = {
    // 직원 유형별, 단계별 긍정 멘트 (항상 Good 평가)
    positive: {
        type1: { // 피해자 코스프레형
            0: [ // 공감 단계
                "그 상황에서 그런 느낌이 들었다면 당연히 속상했겠네요",
                "내가 너라도 그런 상황에서 속상했을 거야",
                "그런 일이 있었구나, 많이 힘들었겠다",
                "네 마음이 충분히 이해가 돼"
            ],
            1: [ // 감정 정리 단계
                "지금 많이 답답하고 억울한 마음이 크겠어요",
                "그런 상황에서 느꼈던 감정이 어땠는지 더 말해줄래?",
                "지금 기분이 많이 상한 것 같아 보여",
                "그런 감정이 드는 게 당연해"
            ],
            2: [ // 해결 의지 단계
                "내가 어떻게 도와주면 좋을까?",
                "함께 해결 방법을 찾아보자",
                "이 문제를 해결하기 위해 무엇이 필요할까?",
                "우리가 같이 이 상황을 개선해보자"
            ],
            3: [ // 균형과 기준 단계
                "너의 입장도 이해하지만, 다른 사람의 관점도 한번 생각해볼까?",
                "모두의 입장을 고려해서 균형 있게 생각해보자",
                "서로 다른 시각이 있을 수 있어, 모두의 의견을 들어보는 게 어떨까?",
                "너의 감정도 중요하지만, 팀 전체를 위한 방향도 생각해보자"
            ],
            4: [ // 마무리 격려 단계
                "이렇게 솔직하게 얘기해줘서 고마워",
                "앞으로 더 좋은 방향으로 나아갈 수 있을 거야",
                "너의 의견은 항상 중요해, 언제든 이야기해",
                "오늘 대화가 정말 의미 있었어, 함께 발전해가자"
            ]
        },
        type2: { // 뒷담화 유포형
            0: [ // 공감 단계
                "이런 이야기를 하기 쉽지 않았을 텐데 말해줘서 고마워",
                "중요한 정보를 공유해줘서 감사해",
                "이런 상황이 있었구나, 알려줘서 고마워",
                "네가 이런 걱정을 하고 있었구나"
            ],
            1: [ // 감정 정리 단계
                "이런 이야기를 들었을 때 어떤 점이 가장 힘들었어?",
                "이 상황에서 네가 느낀 감정이 어땠는지 더 말해줄래?",
                "다른 사람들의 이야기를 전달하는 과정이 부담스러웠겠네",
                "이런 정보를 어떻게 처리해야 할지 고민이 됐겠어"
            ],
            2: [ // 해결 의지 단계
                "이 문제는 그냥 넘기지 않고 함께 해결해보자",
                "오해가 있다면 바로잡을 방법을 같이 찾아보자",
                "이런 상황이 개선될 수 있도록 방법을 생각해보자",
                "우리 팀의 소통 방식을 어떻게 개선할 수 있을까?"
            ],
            3: [ // 균형과 기준 단계
                "이런 일이 반복되지 않도록 팀 내 소통 기준을 만들어볼까?",
                "모두가 존중받는 환경을 만들기 위한 규칙을 함께 정해보자",
                "직접 대화하는 문화를 만들려면 어떻게 해야 할까?",
                "서로에 대한 존중과 신뢰를 높이는 방법을 생각해보자"
            ],
            4: [ // 마무리 격려 단계
                "언제든 얘기해도 괜찮다는 거, 잊지 말아요",
                "이렇게 솔직하게 대화할 수 있어서 다행이야",
                "앞으로도 열린 마음으로 소통했으면 좋겠어",
                "네 의견은 항상 소중해, 직접 나에게 이야기해줘"
            ]
        },
        type3: { // 지시불복종형
            0: [ // 공감 단계
                "이런 상황이 부담스러웠을 수 있겠다",
                "업무량이 많아 힘들었겠네요",
                "마감 일정에 대한 부담감이 있었군요",
                "그런 상황에서 그렇게 느꼈다면 이해가 돼요"
            ],
            1: [ // 감정 정리 단계
                "지금 마음이 어떤지 더 이야기해 줄래요?",
                "이 업무가 부담스러운 이유가 있나요?",
                "다른 어려움이 있는 건 아닌지 걱정되네요",
                "업무 부담감에 대해 더 자세히 말해줄래요?"
            ],
            2: [ // 해결 의지 단계
                "어떻게 하면 내가 도울 수 있을까요?",
                "우선순위를 함께 정리해볼까요?",
                "업무 분담을 다시 해보는 건 어떨까요?",
                "함께 이 문제를 해결해보자"
            ],
            3: [ // 균형과 기준 단계
                "마감일이 중요한 이유와 당신의 상황 모두 이해해요",
                "회사의 일정과 개인의 상황 사이에서 균형을 찾아보자",
                "서로의 입장을 고려하면서 최선의 방법을 찾아보자",
                "함께 현실적인 계획을 세워보는 건 어떨까요?"
            ],
            4: [ // 마무리 격려 단계
                "솔직하게 이야기해줘서 고마워요",
                "앞으로 더 원활하게 소통했으면 좋겠어요",
                "어려움이 있을 때 언제든 말해주세요",
                "당신의 의견은 항상 소중합니다"
            ]
        }
    },
    // 직원 유형별, 단계별 부정 멘트 (항상 Again 평가)
    negative: {
        type1: { // 피해자 코스프레형
            0: [ // 공감 단계
                "그냥 네가 예민한 거 아니야?",
                "항상 그런 식으로 반응하네",
                "너무 과장하는 것 같은데",
                "별 것도 아닌 일에 그렇게 반응해?"
            ],
            1: [ // 감정 정리 단계
                "그런 감정 가질 필요 없어",
                "기분 상하게 뭐 있다고 그래",
                "너무 감정적으로 반응하지 마",
                "그냥 참으면 될 일이잖아"
            ],
            2: [ // 해결 의지 단계
                "알아서 해결해",
                "그건 네 문제지, 내 문제가 아니야",
                "내가 왜 그걸 해결해줘야 해?",
                "스스로 해결책을 찾아봐"
            ],
            3: [ // 균형과 기준 단계
                "너만 힘든 게 아니야, 다들 힘들어",
                "네 잘못이 크지",
                "그냥 규칙대로 하면 돼",
                "다른 사람은 다 잘 지내는데 너만 문제야"
            ],
            4: [ // 마무리 격려 단계
                "이제 그만 불평해",
                "다음부턴 이런 사소한 일로 찾아오지 마",
                "네가 좀 더 성숙해질 필요가 있어",
                "이런 대화는 시간 낭비야"
            ]
        },
        type2: { // 뒷담화 유포형
            0: [ // 공감 단계
                "그런 말 함부로 전하지 마",
                "왜 그런 소문을 퍼뜨리는 거야?",
                "넌 항상 문제를 만드는구나",
                "그런 이야기는 듣고 싶지 않아"
            ],
            1: [ // 감정 정리 단계
                "그런 감정은 불필요해",
                "너무 오버하는 거 아니야?",
                "그냥 신경 끄면 될 일이잖아",
                "그런 것까지 신경 쓰지 마"
            ],
            2: [ // 해결 의지 단계
                "그냥 무시하면 돼",
                "내가 왜 그걸 해결해야 해?",
                "네가 만든 문제니 네가 해결해",
                "그건 네 책임이야"
            ],
            3: [ // 균형과 기준 단계
                "그냥 규칙대로 하면 돼",
                "문제를 일으키지 않으면 되잖아",
                "다른 사람은 다 잘 지내는데 너만 문제야",
                "내 방식대로 하면 문제없어"
            ],
            4: [ // 마무리 격려 단계
                "다음부턴 이런 얘기 하지 마",
                "이런 소문 퍼뜨리는 건 도움이 안 돼",
                "더 이상의 뒷담화는 용납하지 않을 거야",
                "이런 대화는 시간 낭비야"
            ]
        },
        type3: { // 지시불복종형
            0: [ // 공감 단계
                "핑계대지 마",
                "항상 변명만 하네",
                "그냥 시키는 대로 하면 되잖아",
                "너만 바쁜 거 아니야"
            ],
            1: [ // 감정 정리 단계
                "그런 감정은 불필요해",
                "개인 감정 때문에 일을 못하면 안 되지",
                "일에 감정을 섞지 마",
                "그냥 참고 해야지"
            ],
            2: [ // 해결 의지 단계
                "그냥 시간 맞춰서 끝내",
                "네가 알아서 해결해",
                "더 이상 도와줄 수 없어",
                "그건 네 문제야"
            ],
            3: [ // 균형과 기준 단계
                "회사 규칙은 지켜야 해",
                "다른 사람도 다 지키는데 너만 못 지켜?",
                "예외는 없어",
                "규칙은 모두에게 똑같이 적용돼"
            ],
            4: [ // 마무리 격려 단계
                "다음부턴 이런 실수 없도록 해",
                "이런 대화 다시는 하고 싶지 않아",
                "업무 태도를 개선하지 않으면 안 돼",
                "이런 식으로 계속 가면 문제가 될 거야"
            ]
        }
    }
};

// DOM 요소
const selectionScreen = document.getElementById('selection-screen');
const conversationScreen = document.getElementById('conversation-screen');
const victimGuideScreen = document.getElementById('victim-guide-screen');
const gossipGuideScreen = document.getElementById('gossip-guide-screen');
const disobedienceGuideScreen = document.getElementById('disobedience-guide-screen');
const employeeTypeTitle = document.getElementById('employee-type-title');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const backButton = document.getElementById('back-button');
const employeeTypeButtons = document.querySelectorAll('.employee-type');
const guideCloseButtons = document.querySelectorAll('.guide-close-button');

// 직원 유형별 안내 페이지와 시작 버튼 매핑
const guideScreens = {
    type1: {
        screen: victimGuideScreen,
        startButton: document.getElementById('start-victim-conversation')
    },
    type2: {
        screen: gossipGuideScreen,
        startButton: document.getElementById('start-gossip-conversation')
    },
    type3: {
        screen: disobedienceGuideScreen,
        startButton: document.getElementById('start-disobedience-conversation')
    }
};

// 현재 선택된 직원 유형
let currentEmployeeType = null;
let conversationStage = 0;
let positiveResponseCount = 0; // 사장님의 긍정적 대답 횟수를 추적

// 교육적 메시지 표시 여부 플래그
let educationalMessageShown = {
    type1: false,
    type2: false,
    type3: false
};

// 직원 유형 버튼 이벤트 리스너
employeeTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentEmployeeType = button.id;
        
        // 가이드 화면 표시
        selectionScreen.classList.remove('active');
        
        // 해당 유형의 가이드 스크린을 활성화
        if (guideScreens[currentEmployeeType] && guideScreens[currentEmployeeType].screen) {
            guideScreens[currentEmployeeType].screen.classList.add('active');
        } else {
            // 만약 가이드 스크린이 없으면 바로 대화 시작
            startConversation(currentEmployeeType);
        }
    });
});

// 가이드 화면의 닫기 버튼 이벤트 리스너
guideCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 모든 가이드 화면 숨기기
        victimGuideScreen.classList.remove('active');
        gossipGuideScreen.classList.remove('active');
        disobedienceGuideScreen.classList.remove('active');
        
        // 선택 화면으로 돌아가기
        selectionScreen.classList.add('active');
    });
});

// 각 가이드 화면의 대화 시작 버튼 이벤트 리스너 설정
Object.keys(guideScreens).forEach(type => {
    const guideScreen = guideScreens[type];
    if (guideScreen && guideScreen.startButton) {
        guideScreen.startButton.addEventListener('click', () => {
            // 해당 가이드 화면 숨기기
            if (guideScreen.screen) {
                guideScreen.screen.classList.remove('active');
            }
            // 대화 시작
            startConversation(type);
        });
    }
});

// 뒤로가기 버튼 이벤트 리스너
backButton.addEventListener('click', () => {
    selectionScreen.classList.add('active');
    conversationScreen.classList.remove('active');
    victimGuideScreen.classList.remove('active');
    gossipGuideScreen.classList.remove('active');
    disobedienceGuideScreen.classList.remove('active');
    messagesContainer.innerHTML = '';
    currentEmployeeType = null;
    conversationStage = 0;
    positiveResponseCount = 0; // 긍정적 응답 카운트 초기화
});

// 메시지 전송 버튼 이벤트 리스너
sendButton.addEventListener('click', sendMessage);

// 엔터 키로 메시지 전송
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 대화 시작 함수
function startConversation(type) {
    selectionScreen.classList.remove('active');
    victimGuideScreen.classList.remove('active');
    gossipGuideScreen.classList.remove('active');
    disobedienceGuideScreen.classList.remove('active');
    conversationScreen.classList.add('active');
    
    employeeTypeTitle.textContent = employeeTypes[type].title;
    
    // 직원의 초기 메시지 표시
    addMessage(employeeTypes[type].initialMessage, 'employee');
    
    // 대화 단계 초기화
    conversationStage = 0;
    positiveResponseCount = 0; // 긍정적 응답 카운트 초기화
    
    // 교육적 메시지 플래그 초기화
    educationalMessageShown = {
        type1: false,
        type2: false,
        type3: false
    };
}

// 메시지 추가 함수
function addMessage(text, sender, evaluation) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    
    // 메시지 텍스트 추가
    messageElement.textContent = text;
    
    // 평가 결과 추가 (사용자 메시지에만 적용)
    if (sender === 'user' && evaluation) {
        const evaluationElement = document.createElement('span');
        evaluationElement.classList.add('evaluation', 
            evaluation === 'Good' ? 'good' : 
            evaluation === 'Normal' ? 'normal' : 'again');
        evaluationElement.textContent = evaluation;
        messageElement.appendChild(document.createElement('br'));
        messageElement.appendChild(evaluationElement);
    }
    
    messagesContainer.appendChild(messageElement);
    
    // 스크롤을 최신 메시지로 이동
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 메시지 전송 함수
function sendMessage() {
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    // 사용자의 답변 평가
    const currentStage = conversationStage % 5;
    const evaluation = evaluateUserResponse(message, currentStage);
    
    // 긍정적 응답 카운트 증가 (Good 평가인 경우)
    if (evaluation === 'Good') {
        positiveResponseCount++;
    }
    
    // 사용자 메시지 추가 (평가 결과 포함)
    addMessage(message, 'user', evaluation);
    
    // 입력창 초기화
    messageInput.value = '';
    
    // 직원 응답
    setTimeout(() => {
        respondToMessage(message, evaluation);
    }, 1000);
}

// 사용자 응답 평가 함수
function evaluateUserResponse(message, stage) {
    if (!currentEmployeeType) return null;
    
    // 상황별 긍정/부정 멘트 리스트와 비교
    // 현재 단계와 직원 유형에 맞는 긍정 멘트 목록 가져오기
    const positiveResponses = situationalResponses.positive[currentEmployeeType][stage % 5] || [];
    
    // 현재 단계와 직원 유형에 맞는 부정 멘트 목록 가져오기
    const negativeResponses = situationalResponses.negative[currentEmployeeType][stage % 5] || [];
    
    // 긍정 멘트와 유사한지 확인
    for (const phrase of positiveResponses) {
        if (isSimilarText(message, phrase)) {
            return 'Good';
        }
    }
    
    // 부정 멘트와 유사한지 확인
    for (const phrase of negativeResponses) {
        if (isSimilarText(message, phrase)) {
            return 'Again';
        }
    }
    
    // 대화 중단 표현 확인 (항상 Again 평가)
    const stopPhrases = [
        "그만해", 
        "그만하자", 
        "시끄럽", 
        "닥쳐", 
        "조용히 해", 
        "듣기 싫어", 
        "귀찮", 
        "짜증", 
        "화나", 
        "안 해"
    ];
    
    // 대화 중단 표현이 포함되어 있으면 항상 Again 평가
    if (stopPhrases.some(phrase => message.includes(phrase))) {
        return 'Again';
    }
    
    // 특정 문구 확인 (항상 Good 평가)
    const goodPhrases = [
        "이유라도 알아보자", 
        "무슨 내용인지 얘기", 
        "차근 차근 해결책", 
        "차근차근 해결책",
        "해결책을 찾아보자",
        "그렇구나, 마음이 아프겠다",
        "내가 너라도 힘들것 같구나",
        "마음이 아프겠",
        "힘들 것 같",
        "힘들겠",
        "이해가 돼",
        "내가 무심했다",
        "차근 차근 이야기",
        "차근차근 이야기"
    ];
    
    // 특정 문구가 포함되어 있으면 항상 Good 평가
    if (goodPhrases.some(phrase => message.includes(phrase))) {
        return 'Good';
    }
    
    // 공감 표현 문장 패턴 확인 (항상 Good 평가)
    if (/당신|네|너|그대/.test(message) && /마음|기분|감정|상황|입장/.test(message) && /이해|공감|알|느낌/.test(message)) {
        return 'Good';
    }
    
    // 자기 성찰 패턴 확인 (항상 Good 평가)
    if (/내가|제가|나도/.test(message) && /무심|미안|잘못|실수|생각|이해/.test(message)) {
        return 'Good';
    }
    
    // 부정적인 대화 패턴 확인 (항상 Again 평가)
    if (/그만|안|못|싫|짜증|화|포기|관심없/.test(message)) {
        return 'Again';
    }
    
    // 랜덤 요소 추가 (무작위 확률로 평가 결과 결정)
    const randomValue = Math.random();
    
    // 정확한 키워드 패턴 확인 (Good)
    const exactKeywords = keywordPatterns[currentEmployeeType][stage % 5];
    const isExactMatch = exactKeywords.some(keyword => message.includes(keyword));
    
    // 중간 정도의 키워드 패턴 확인 (Normal)
    const normalKeywords = normalKeywordPatterns[currentEmployeeType][stage % 5];
    const isNormalMatch = normalKeywords.some(keyword => message.includes(keyword));
    
    // 키워드 매칭과 랜덤 확률을 결합한 평가 로직
    if (isExactMatch || randomValue < 0.33) {
        return 'Good';
    } else if (isNormalMatch || randomValue < 0.66) {
        return 'Normal';
    } else {
        return 'Again';
    }
}

// 텍스트 유사도 확인 함수 (간단한 구현)
function isSimilarText(userText, referenceText) {
    // 텍스트 정규화 (소문자 변환, 공백 제거)
    const normalizeText = text => text.toLowerCase().replace(/\s+/g, ' ').trim();
    
    const normalizedUserText = normalizeText(userText);
    const normalizedReferenceText = normalizeText(referenceText);
    
    // 핵심 키워드 추출 (2글자 이상 단어만)
    const extractKeywords = text => {
        const words = text.split(/[\s,.!?;:]/);
        return words.filter(word => word.length >= 2);
    };
    
    const userKeywords = extractKeywords(normalizedUserText);
    const referenceKeywords = extractKeywords(normalizedReferenceText);
    
    // 키워드 매칭 수 계산
    let matchCount = 0;
    for (const userWord of userKeywords) {
        if (referenceKeywords.some(refWord => refWord.includes(userWord) || userWord.includes(refWord))) {
            matchCount++;
        }
    }
    
    // 유사도 계산 (매칭된 키워드 비율)
    const similarityThreshold = 0.3; // 30% 이상의 키워드가 매칭되면 유사하다고 판단
    const similarity = matchCount / Math.max(userKeywords.length, 1);
    
    return similarity >= similarityThreshold;
}

// 직원 응답 함수
function respondToMessage(userMessage, evaluation) {
    if (!currentEmployeeType) return;
    
    // 현재 대화 단계에 따른 직원 응답 가져오기
    let response;
    
    // 사장님의 긍정적 대답 비율에 따라 응답 패턴 선택
    const positiveRatio = positiveResponseCount / (conversationStage + 1);
    
    if (evaluation === 'Good' && (positiveRatio > 0.5 || positiveResponseCount >= 2)) {
        // 긍정적인 응답이 많거나, 최소 2회 이상 긍정적 응답이 있었을 경우 개선된 응답 사용
        response = improvedEmployeeResponses[currentEmployeeType][conversationStage % improvedEmployeeResponses[currentEmployeeType].length];
    } else {
        // 그렇지 않으면 기본 응답 사용
        response = employeeResponses[currentEmployeeType][conversationStage % employeeResponses[currentEmployeeType].length];
    }
    
    // 응답 추가
    addMessage(response, 'employee');
    
    // 대화 단계 증가
    conversationStage++;
    
    // 팁으로 대화 가이드 표시
    const currentStage = (conversationStage) % 5;
    const tipElement = document.querySelector(`#conversation-tips ol li:nth-child(${currentStage + 1})`);
    
    // 이전 하이라이트 제거
    document.querySelectorAll('#conversation-tips ol li').forEach(li => {
        li.style.fontWeight = 'normal';
        li.style.color = '';
    });
    
    // 현재 단계 하이라이트
    if (tipElement) {
        tipElement.style.fontWeight = 'bold';
        tipElement.style.color = '#e74c3c';
        
        // 팁 내용 업데이트
        tipElement.textContent = responseGuides[currentEmployeeType][currentStage];
    }

    // 대화가 일정 단계 이상 진행됐을 때 교육적 메시지 표시
    if (conversationStage >= 5 && !educationalMessageShown[currentEmployeeType]) {
        // 교육적 메시지 표시 플래그 설정
        educationalMessageShown[currentEmployeeType] = true;
        
        // 3초 후에 각 유형에 맞는 교육적 메시지 표시
        setTimeout(() => {
            switch(currentEmployeeType) {
                case 'type1':
                    showVictimEducationalMessage();
                    break;
                case 'type2':
                    showGossipEducationalMessage();
                    break;
                case 'type3':
                    showDisobedienceEducationalMessage();
                    break;
            }
        }, 3000);
    }
}

// 뒷담화 관련 교육적 메시지 표시 함수
function showGossipEducationalMessage() {
    // 교육적 메시지를 한 번만 표시하기 위한 플래그 확인
    if (document.querySelector('.educational-message')) {
        return; // 이미 메시지가 있으면 추가하지 않음
    }
    
    const educationalMessageElement = document.createElement('div');
    educationalMessageElement.classList.add('educational-message');
    
    const messageContent = `
        <h3>뒷담화와 소문 유포의 부정적 영향</h3>
        <p>뒷담화와 소문 유포는 다음과 같은 부정적 영향을 미칠 수 있습니다:</p>
        <ul>
            <li>팀 내 신뢰 관계 파괴</li>
            <li>조직 문화 악화</li>
            <li>업무 생산성 저하</li>
            <li>직장 내 갈등 심화</li>
            <li>개인의 평판과 심리적 안정감 손상</li>
        </ul>
        <p>건강한 조직 문화를 위해서는 직접적이고 투명한 소통이 중요합니다. 문제가 있다면 당사자와 직접 대화하거나, 적절한 채널을 통해 해결하는 것이 바람직합니다.</p>
        <button id="close-educational-message">확인</button>
    `;
    
    educationalMessageElement.innerHTML = messageContent;
    document.querySelector('.container').appendChild(educationalMessageElement);
    
    // 확인 버튼 이벤트 리스너 추가
    document.getElementById('close-educational-message').addEventListener('click', () => {
        educationalMessageElement.classList.add('fade-out');
        setTimeout(() => {
            educationalMessageElement.remove();
        }, 500);
    });
}

// 피해자 코스프레형 관련 교육적 메시지 표시 함수
function showVictimEducationalMessage() {
    if (document.querySelector('.educational-message')) {
        return;
    }
    
    const educationalMessageElement = document.createElement('div');
    educationalMessageElement.classList.add('educational-message');
    
    const messageContent = `
        <h3>피해자 의식과 관련된 커뮤니케이션 조언</h3>
        <p>피해자 의식이 강한 직원과 대화할 때 다음 사항을 기억하세요:</p>
        <ul>
            <li>감정을 먼저 인정하고 공감하기</li>
            <li>객관적 관점에서 상황을 함께 검토하기</li>
            <li>해결 책임을 공유하도록 유도하기</li>
            <li>건설적인 피드백 제공하기</li>
            <li>자기 성찰과 성장을 장려하기</li>
        </ul>
        <p>지속적인 피해자 의식은 개인의 성장과 팀 협력을 방해할 수 있습니다. 상대방의 감정을 존중하면서도 균형 잡힌 관점을 유지하는 것이 중요합니다.</p>
        <button id="close-educational-message">확인</button>
    `;
    
    educationalMessageElement.innerHTML = messageContent;
    document.querySelector('.container').appendChild(educationalMessageElement);
    
    document.getElementById('close-educational-message').addEventListener('click', () => {
        educationalMessageElement.classList.add('fade-out');
        setTimeout(() => {
            educationalMessageElement.remove();
        }, 500);
    });
}

// 지시불복종형 관련 교육적 메시지 표시 함수
function showDisobedienceEducationalMessage() {
    if (document.querySelector('.educational-message')) {
        return;
    }
    
    const educationalMessageElement = document.createElement('div');
    educationalMessageElement.classList.add('educational-message');
    
    const messageContent = `
        <h3>지시 불이행과 관련된 커뮤니케이션 조언</h3>
        <p>지시를 불이행하는 직원과 효과적으로 소통하기 위한 방법:</p>
        <ul>
            <li>업무 지연/회피의 근본 원인 파악하기</li>
            <li>명확한 기대치와 마감일 설정하기</li>
            <li>업무 우선순위와 중요성 설명하기</li>
            <li>필요한 지원과 자원 제공하기</li>
            <li>성공적인 업무 완수에 대한 인정과 보상 제공하기</li>
        </ul>
        <p>효과적인 업무 수행을 위해서는 일방적인 지시보다 상호 이해와 협력이 중요합니다. 직원의 역량과 상황을 고려한 합리적인 기대치를 설정하고, 필요한 지원을 제공하세요.</p>
        <button id="close-educational-message">확인</button>
    `;
    
    educationalMessageElement.innerHTML = messageContent;
    document.querySelector('.container').appendChild(educationalMessageElement);
    
    document.getElementById('close-educational-message').addEventListener('click', () => {
        educationalMessageElement.classList.add('fade-out');
        setTimeout(() => {
            educationalMessageElement.remove();
        }, 500);
    });
} 
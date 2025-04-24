// 직원 유형 정의
const employeeTypes = {
    type1: {
        title: "1. 피해자 코스프레형",
        description: "실수나 문제가 생겨도 늘 남 탓을 하며, 사장에게 감정적으로 의존하거나 방어적 태도를 보임",
        initialMessage: "사장님, 또 팀원들이 저를 무시해요. 제가 제안한 아이디어를 듣지도 않고 무시했어요. 항상 제 의견은 묵살당하는 것 같아요. 정말 너무 억울해요."
    },
    type2: {
        title: "2. 뒷담화 유포형",
        description: "동료나 사장의 말과 행동을 왜곡해 퍼뜨리며 내부 갈등을 조장함",
        initialMessage: "사장님이 부르셨나요? 아, 그런데 말씀드릴게 있어요. 김 대리가 사장님이 새 프로젝트 담당자로 자기를 고르지 않은 건 편애 때문이라고 다른 사람들한테 이야기하고 다니더라고요. 제가 이런 말 하기 좀 그렇지만 알려야 할 것 같아서요."
    },
    type3: {
        title: "3. 지시불복종형",
        description: "사장의 말에 표면적으로는 따르지만 실제로는 무시하거나 회피함",
        initialMessage: "보고서 마감이 오늘까지라고요? 아, 네 알겠습니다. 당연히 마감일은 지켜야죠. (하지만 다른 일이 먼저라 내일까지 미루고 싶어요)"
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

// DOM 요소
const selectionScreen = document.getElementById('selection-screen');
const conversationScreen = document.getElementById('conversation-screen');
const employeeTypeTitle = document.getElementById('employee-type-title');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const backButton = document.getElementById('back-button');
const employeeTypeButtons = document.querySelectorAll('.employee-type');

// 현재 선택된 직원 유형
let currentEmployeeType = null;
let conversationStage = 0;

// 직원 유형 버튼 이벤트 리스너
employeeTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentEmployeeType = button.id;
        startConversation(currentEmployeeType);
    });
});

// 뒤로가기 버튼 이벤트 리스너
backButton.addEventListener('click', () => {
    selectionScreen.classList.add('active');
    conversationScreen.classList.remove('active');
    messagesContainer.innerHTML = '';
    currentEmployeeType = null;
    conversationStage = 0;
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
    conversationScreen.classList.add('active');
    
    employeeTypeTitle.textContent = employeeTypes[type].title;
    
    // 직원의 초기 메시지 표시
    addMessage(employeeTypes[type].initialMessage, 'employee');
    
    // 대화 단계 초기화
    conversationStage = 0;
}

// 메시지 추가 함수
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    
    // 스크롤을 최신 메시지로 이동
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 메시지 전송 함수
function sendMessage() {
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    // 사용자 메시지 추가
    addMessage(message, 'user');
    
    // 입력창 초기화
    messageInput.value = '';
    
    // 직원 응답
    setTimeout(() => {
        respondToMessage(message);
    }, 1000);
}

// 직원 응답 함수
function respondToMessage(userMessage) {
    if (!currentEmployeeType) return;
    
    // 현재 대화 단계에 따른 직원 응답 가져오기
    const response = employeeResponses[currentEmployeeType][conversationStage % employeeResponses[currentEmployeeType].length];
    
    // 응답 추가
    addMessage(response, 'employee');
    
    // 대화 단계 증가
    conversationStage++;
    
    // 팁으로 대화 가이드 표시
    const currentStage = (conversationStage - 1) % 5;
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
} 
# RAMON AI Flood Response Protocol - Demo Script

## 🎯 Intro
"안녕하십니까. 지금부터 Cisco 기술과 RAMON AI가 어떻게 협력하여 홍수와 같은 재난 상황에서 시민의 안전과 인프라를 보호하는지 시연하겠습니다."

---

## 🌊 Step 1: Detection (위기 감지)
**[화면: 하노이 도심 CCTV, 비가 내리고 수위가 오름]**

"첫 번째 단계는 **감지(Detection)**입니다.
현재 보시는 화면은 하노이 시내에 설치된 **Cisco Meraki MV72** 스마트 카메라가 촬영 중인 실시간 영상입니다.
갑작스러운 폭우가 쏟아지기 시작했습니다. 하지만 이 카메라는 단순히 촬용만 하는 것이 아닙니다.

화면 좌측 상단을 보시면 **'AI Virtual Gauge(가상 수위계)'**가 작동하고 있습니다.
AI가 영상 픽셀의 변화를 분석하여 실시간으로 수위를 측정하고 있네요. 현재 수위가 급격히 상승하고 있습니다."

---

## 📡 Step 2: Monitoring (인프라 감시)
**[화면: 네트워크 토폴로지 맵 & 연결 끊김(Fail) 발생]**

"두 번째 단계는 **인프라 모니터링(Monitoring)**입니다.
폭우로 인해 지상의 통신 시설이 침수되면서, 보시다시피 메인 ISP 회선이 **지연(Latency)되다가 결국 끊어졌습니다(FAIL).**

하지만 **Cisco ThousandEyes**가 이 경로 단절을 즉시 감지했습니다.
화면 중앙에 경고가 뜨면서, 시스템은 통신 두절을 막기 위해 **위성 네트워크(Satellite)**로의 전환을 권장하고 있습니다."

---

## 📊 Step 3: Analysis (데이터 분석 & 예측)
**[화면: Splunk 대시보드, 차트와 실시간 로그]**

"세 번째 단계는 **데이터 분석(Analysis)**입니다.
Cisco Meraki의 수위 데이터와 ThousandEyes의 네트워크 상태 정보가 **Splunk**로 모입니다.

좌측 차트를 보십시오. 수위(Water Level)는 올라가고, 네트워크 건강도(Net Health)는 바닥을 쳤습니다.

우측의 **'Intelligent Response Log'**를 주목해 주십시오.
실시간으로 수집되는 이벤트들이 타임스탬프와 함께 기록되고 있습니다.
**'ISP 게이트웨이 응답 없음(Unreachable)'**, **'수위 임계치 초과(Critical)'** 같은 위험 신호들이 붉은색 태그로 즉각 표시되는 것을 볼 수 있습니다.
동시에 시스템이 위성 업링크를 확보했다는 **'RESOLVED(해결됨)'** 로그까지 실시간으로 추적 가능합니다.

이 두 데이터를 결합하여 AI는 **'Risk Score 98.2'**라는 심각한 위험 점수를 도출했습니다.
이제 AI가 인간의 개입 없이 **자동 대응(Auto-Remediation)**을 시작합니다."

---

## 🤖 Step 4: AI Integrated Response (AI 통합 대응) - **하이라이트**
**[화면: 3분할 화면 (경보 / 네트워크 / 구조)]**

"네 번째 단계, **RAMON AI의 통합 대응(Execution)**입니다. 여기가 시연의 핵심입니다.
RAMON AI Agent가 세 가지 미션을 **동시에** 수행하는 것을 보십시오.

1.  **[좌측] Public Safety**: 시민들에게 대피 사이렌을 울리고, 재난 문자를 발송하여 골든타임을 확보합니다.
2.  **[중앙] Network Resilience**: 끊어진 지상망 대신, **Starlink 위성망**을 0.05초 만에 활성화하여 통신을 즉시 복구합니다.
3.  **[우측] Life Saving**: CCTV 영상을 다시 분석하여 고립된 시민을 정확히 찾아내고(Bounding Box), 구조대에게 GPS 좌표를 전송합니다."

---

## 🛡️ Step 5: Mission Complete (작전 완료)
**[화면: Operational Success 리포트]**

"마지막 다섯 번째 단계, **작전 완료(Mission Complete)**입니다.
RAMON AI의 활약으로 모든 시스템이 안전하게 보호되었습니다(All Systems Secured).

성과를 보시면:
*   **Response Time**: 단 **0.05초** 만에 대응했습니다.
*   **Network Uptime**: 위성 전환을 통해 가동률 **100%**를 유지했습니다.
*   **Rescue Status**: 구조대가 정확한 위치로 파견되었습니다.

Cisco의 강력한 인프라와 RAMON AI의 결합으로, 우리는 예측 불가능한 재난 앞에서도 가장 안전하고 빠른 대응 체계를 구축할 수 있습니다. 감사합니다."

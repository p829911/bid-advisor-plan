import type {CSSProperties, ReactNode} from 'react';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {List, ListItem} from '@astryxdesign/core/List';
import {CodeBlock} from '@astryxdesign/core/CodeBlock';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Layout, LayoutContent, LayoutPanel} from '@astryxdesign/core/Layout';
import {Divider} from '@astryxdesign/core/Divider';
import {Icon} from '@astryxdesign/core/Icon';
import {Table} from '@astryxdesign/core/Table';
import {Outline, type OutlineItem} from '@astryxdesign/core/Outline';
import {useMediaQuery} from '@astryxdesign/core/hooks';
import {
  ExclamationTriangleIcon,
  LightBulbIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

// ---------------------------------------------------------------------------
// 목차
// ---------------------------------------------------------------------------

const OUTLINE_ITEMS: OutlineItem[] = [
  {id: 'part1', label: 'Part 1. 프로덕트', level: 2},
  {id: 'summary', label: '요약', level: 3},
  {id: 'pivot', label: '방향 전환: 가격 추천을 하지 않는 이유', level: 3},
  {id: 'problem', label: '고객 업무와 문제', level: 3},
  {id: 'goals', label: '목표와 비목표', level: 3},
  {id: 'features', label: '기능 범위', level: 3},
  {id: 'alerts', label: '알림 설계', level: 3},
  {id: 'docsummary', label: '첨부파일 AI 요약', level: 3},
  {id: 'eligibility', label: '자격 자동 대조', level: 3},
  {id: 'analysis', label: '분석 기능 (2차)', level: 3},
  {id: 'competition', label: '경쟁 서비스와 우리 강점', level: 3},
  {id: 'metrics', label: '성공 지표', level: 3},
  {id: 'part2', label: 'Part 2. 개발·운영', level: 2},
  {id: 'sources', label: '데이터 원천과 제약', level: 3},
  {id: 'arch', label: '아키텍처', level: 3},
  {id: 'cost', label: '운영 비용', level: 3},
  {id: 'schedule', label: '일정', level: 3},
  {id: 'contract', label: '계약·인계', level: 3},
  {id: 'risks', label: '리스크와 원칙', level: 3},
  {id: 'validation', label: '검증 항목', level: 3},
  {id: 'questions', label: '논의할 것', level: 3},
];

const outlinePanel: CSSProperties = {
  position: 'sticky',
  top: 'var(--spacing-6)',
  alignSelf: 'start',
  paddingBlockStart: 'var(--spacing-12)',
};

// ---------------------------------------------------------------------------
// 공용 조각
// ---------------------------------------------------------------------------

function Section({id, title, children}: {id: string; title: string; children: ReactNode}) {
  return (
    <VStack gap={4}>
      <Heading id={id} level={3}>
        {title}
      </Heading>
      {children}
    </VStack>
  );
}

function Para({children}: {children: ReactNode}) {
  return <Text type="body">{children}</Text>;
}

function Bullets({items}: {items: ReactNode[]}) {
  return (
    <List density="compact" listStyle="disc">
      {items.map((it, i) => (
        <ListItem key={i} label={<>{it}</>} />
      ))}
    </List>
  );
}

function Callout({
  tone,
  title,
  children,
}: {
  tone: 'idea' | 'warn';
  title: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <VStack gap={2}>
        <HStack gap={2} vAlign="center">
          <Icon
            icon={tone === 'idea' ? LightBulbIcon : ExclamationTriangleIcon}
            size="sm"
            color="secondary"
          />
          <Text type="body" weight="semibold">
            {title}
          </Text>
        </HStack>
        <Text type="body" color="secondary">
          {children}
        </Text>
      </VStack>
    </Card>
  );
}

type Row = Record<string, string> & {id: string};

function SimpleTable({cols, rows}: {cols: [string, string][]; rows: string[][]}) {
  const data: Row[] = rows.map((r, i) => {
    const o: Row = {id: String(i)};
    cols.forEach(([k], j) => {
      o[k] = r[j];
    });
    return o;
  });
  return (
    <Table
      data={data}
      idKey="id"
      density="compact"
      verticalAlign="top"
      columns={cols.map(([key, header]) => ({key, header}))}
    />
  );
}

// ---------------------------------------------------------------------------
// 페이지
// ---------------------------------------------------------------------------

export default function PlanDoc() {
  const isMobile = useMediaQuery('(max-width: 768px)', true);

  return (
    <Layout
      height="auto"
      contentWidth={960}
      end={
        isMobile ? undefined : (
          <LayoutPanel isScrollable={false} label="목차" role="complementary" style={outlinePanel}>
            <Outline items={OUTLINE_ITEMS} />
          </LayoutPanel>
        )
      }
      content={
        <LayoutContent role="main" isScrollable={false} padding={8}>
          <VStack gap={8}>
            {/* 표지 */}
            <VStack gap={2}>
              <HStack gap={2} vAlign="center">
                <Icon icon={DocumentTextIcon} size="sm" color="secondary" />
                <Text type="supporting" color="secondary">
                  와인더스 · PRD v1.0 (논의용 초안) · 2026-11-27
                </Text>
              </HStack>
              <Text as="h1" type="display-1">
                입찰 도우미
              </Text>
              <Text type="body" color="secondary">
                공공입찰 공고를 대신 찾고, 첨부파일을 대신 읽고, 자격을 대신 확인해서 알려주는 도구. 해양환경·폐기물
                분야 고객 A와 함께 만든다. 이전 버전(v0.2 &quot;입찰가 어드바이저&quot;)의 가격 추천 방향은 검증 결과에
                따라 폐기했다.
              </Text>
              {isMobile && <Outline items={OUTLINE_ITEMS} />}
            </VStack>

            {/* ============================ PART 1 ============================ */}
            <VStack gap={2}>
              <Heading id="part1" level={2}>
                Part 1. 프로덕트
              </Heading>
              <Divider />
            </VStack>

            <Section id="summary" title="요약">
              <Callout tone="idea" title="가격은 대표님이 정한다. 그 앞의 일은 우리가 한다.">
                투찰가는 추첨으로 정해지는 예정가격 때문에 데이터로 더 잘 맞힐 수 없다는 게 10년치 기록 검증의
                결론이다. 대신 대표님이 매일 손으로 하는 일 — 공고 찾기, 첨부파일 읽기, 단가·계량·거리 확인, 자격
                확인, 결과 확인 — 을 자동으로 해서 디스코드로 바로 알려준다. 앞으로 쌓이는 공개 데이터로 발주처와
                경쟁 업체를 분석해 판단을 돕는 기반도 같이 만든다.
              </Callout>
              <Bullets
                items={[
                  'MVP: 맞춤 공고 수집 → 자격 자동 대조 → 첨부파일 AI 요약 → 디스코드 즉시 알림(새 공고·정정/취소·개찰 결과) + 웹 화면(공고 상세·나의 투찰 기록)',
                  '2차: 발주처·경쟁 업체 분석, 톤당 단가 비교, "1순위 업체 재투찰" 지표, 월간 판 변화 리포트',
                  '하지 않음: 투찰가·사정률 추천, 추첨 번호 추천, 자동 투찰, 업체 간 조율',
                ]}
              />
            </Section>

            <Section id="pivot" title="방향 전환: 가격 추천을 하지 않는 이유">
              <Para>
                고객 A의 2016~2026년 용역 투찰 651건과 공개 개찰 데이터로 네 가지 방식을 시험했다. 기준은 &quot;대표님이
                실제로 쓴 가격보다 1순위가 더 많이 나오는가&quot;다.
              </Para>
              <SimpleTable
                cols={[
                  ['way', '방식'],
                  ['res', '결과 (관내 2024년 이후 172건, 1순위 비율)'],
                ]}
                rows={[
                  ['참가 업체끼리 똑같이 나눌 때 기대값', '24.5%'],
                  ['데이터 모델(업체별 투찰 습관)', '29.1%'],
                  ['대표님 실제 선택', '32.6% ← 가장 좋음'],
                  ['남의 가격을 미리 안다면(불가능·불법)', '50.2%'],
                ]}
              />
              <Bullets
                items={[
                  '추첨 번호 선택은 결과와 상관이 없었다(순위 상관 −0.005).',
                  '경쟁 업체 가격은 예측되지 않았다(상관 0.2 미만). 미리 알아내는 건 담합이라 불법이다.',
                  '대신 "들어갈 수 있었는데 놓친 공고"가 있었다 → 공고 찾기·자격 확인 쪽이 실제 도움이 된다.',
                ]}
              />
              <Text type="supporting" color="secondary">
                상세: 분석 리포트(공개, 익명) https://p829911.github.io/bid-advisor-report/
              </Text>
            </Section>

            <Section id="problem" title="고객 업무와 문제 (인터뷰 2026-11-26)">
              <Bullets
                items={[
                  '공고를 하루에도 여러 번 사무실 PC에서 입찰정보 서비스로 확인한다. 공고문뿐 아니라 과업지시서·설계서·시방서까지 꼼꼼히 읽는다.',
                  '들어갈지 말지의 1순위 기준은 설계서의 톤당 처리 단가(낮으면 적자). 다음이 계량 조건(지정 장소 계량 등), 거리(먼 섬 등), 처음 해보는 일.',
                  '첨부에서 꼭 찾는 것: 단가 산출, 계량, 과업 기간, 위치, 특수사항(현장 암롤 박스 비치, 일 처리능력·보관량 조건, 인부 직접 고용 등).',
                  '처음 보는 발주처는 "과거 1순위 업체가 그 뒤에도 계속 들어오는지"로 마진을 가늠한다.',
                  '입찰정보 서비스에서 실제로 쓰는 메뉴는 발주처 분석, 경쟁 업체 투찰 성향, 공고·낙찰 결과 정도. 나머지는 거의 안 쓴다.',
                  '평균 마진 체감 10~20%. 원하는 것은 "사람이 다 볼 수 없는 데이터를 모아 판단을 돕는 것, 쌓일수록 나아지는 것".',
                ]}
              />
              <Callout tone="warn" title="문제의 핵심">
                하루 수십 건의 공고와 공고마다 3~5개의 한글·PDF·엑셀 첨부를 사람이 매번 열어 같은 항목(단가·계량·
                기간·위치·자격)을 찾고 있다. 놓치면 기회를 잃고, 잘못 읽으면 손해 보는 계약을 한다.
              </Callout>
            </Section>

            <Section id="goals" title="목표와 비목표">
              <SimpleTable
                cols={[
                  ['g', '목표'],
                  ['n', '비목표'],
                ]}
                rows={[
                  ['맞는 공고를 놓치지 않고 바로 받는다', '투찰가·사정률을 정해주지 않는다'],
                  ['첨부 읽는 시간을 공고당 수 분으로 줄인다', '낙찰 확률을 올려준다고 약속하지 않는다'],
                  ['자격 미달·조건 착오로 인한 헛수고·손해를 막는다', '자동 참가신청·자동 투찰을 하지 않는다'],
                  ['투찰 결과와 판단 근거가 자동으로 쌓인다', '나라장터 밖 시스템(한전·LH 등)은 1차 범위에 없다'],
                ]}
              />
            </Section>

            <Section id="features" title="기능 범위">
              <SimpleTable
                cols={[
                  ['f', '기능'],
                  ['d', '내용'],
                  ['s', '단계'],
                ]}
                rows={[
                  ['맞춤 공고 수집', '나라장터 용역 공고를 10~30분마다 수집. 업종·지역·발주처·키워드·금액 조건 묶음(여러 개 저장)', 'MVP'],
                  ['자격 자동 대조', '참가가능지역·면허 제한을 고객 허가·소재지와 비교 → 충족/미충족/확인 필요', 'MVP'],
                  ['첨부파일 AI 요약', '공고서·과업지시서·설계서(한글·PDF·엑셀)에서 단가·계량·기간·위치·특수사항·제출서류 추출, 근거 파일 표시', 'MVP'],
                  ['디스코드 알림', '새 공고·정정/취소(바뀐 점만)·개찰 결과(내 순위, 1순위와 차이) 즉시', 'MVP'],
                  ['공고 상세 화면', '요약 카드 + 일정 D-day + 원문·첨부 링크 + 메모(참여/보류/포기 이유)', 'MVP'],
                  ['나의 투찰 기록', '사업자번호로 공개 개찰 결과를 자동 정리(10년치 포함), 엑셀 내보내기', 'MVP'],
                  ['발주처·경쟁 업체 분석', '발주처별 참여 업체·1순위 업체·사정률 분포, 업체별 투찰 이력', '2차'],
                  ['톤당 단가 비교', '비슷한 공고의 톤당 단가와 비교(높음/보통/낮음) — 수익성 판단 보조', '2차'],
                  ['1순위 업체 재투찰 지표', '대표님 판단법을 자동화. 의미 있는지 검증 후 제공', '2차'],
                  ['월간 판 변화 리포트', '관내·지역 경쟁 강도, 새로 들어온 업체, 놓친 공고', '2차'],
                  ['카카오 알림톡·문자', '디스코드를 안 보게 되면 추가', '선택'],
                ]}
              />
            </Section>

            <Section id="alerts" title="알림 설계 (디스코드)">
              <Bullets
                items={[
                  '전용 서버에 채널을 나눈다: #새공고 · #개찰결과 (정정·취소는 원래 공고 알림에 이어서) · #개발-진행 · #리포트 · #피드백.',
                  '새 공고는 즉시. 한 카드에: 공고명, 발주처, 기초금액, 톤당 단가, 마감 D-day, 자격 판정, 첨부 요약 3줄, 나라장터 원문 링크.',
                  '정정·취소는 바뀐 항목만(예: 개찰일 12/8 → 12/10).',
                  '개찰 결과: 내 순위, 1순위 금액과 차이(%), 하한 미달 여부, 참가 업체 수.',
                  '마감 임박 알림은 요청이 없어 기본 꺼둠(원하면 켠다). 직원도 같은 서버에서 함께 받는다.',
                ]}
              />
              <CodeBlock
                code={`🆕 [용역] ○○군 해양쓰레기 정화사업 폐기물처리 용역
발주처 ○○군 · 기초금액 4,832만 원 · 마감 D-3 (12/02 12:00)
톤당 단가 약 43.9만 원 (4,832만 ÷ 110톤) · 계량: 관내 공인계량소, 업체 부담
기간 30일 · 위치 ○○읍 항포구 일원 (섬 지역 — 해상 운송 확인)
자격 ✅ 지역 · ✅ 허가 · ⚠️ 처리 품목(폐어망·폐목재 혼합) 확인
📎 공고서 · 과업지시서 · 설계서 → 나라장터 원문`}
                language="text"
              />
            </Section>

            <Section id="docsummary" title="첨부파일 AI 요약">
              <Bullets
                items={[
                  '첨부 목록·다운로드 주소는 입찰공고정보 API로 받는다(로그인 불필요). 한글(HWP) 공고서는 나라장터가 PDF 변환본도 같이 준다. HWPX·엑셀은 직접 글자로 바꾼다.',
                  '모델: Claude Sonnet 5.5. 실제 공고 2건으로 Haiku·Sonnet·Opus를 비교한 결과 사실 추출은 셋 다 정확했고, 조건 해석(처리 품목, 두 번째 참가 경로 등)은 Sonnet·Opus가 나았다.',
                  '뽑는 항목: 한 줄 요약, 과업량, 금액, 톤당 단가(설계서 단가 또는 금액÷물량), 계량, 기간, 위치, 참가 자격, 특수사항, 우리 회사 자격 대조, 놓치기 쉬운 마감·서류. 항목마다 근거 문서 표시.',
                  '문서에 없는 건 "문서에 없음"으로 쓰고 추측하지 않는다. 설계내역서가 빈 파일인 공고도 있어 금액÷물량 계산을 같이 보여준다.',
                ]}
              />
            </Section>

            <Section id="eligibility" title="자격 자동 대조">
              <Para>
                공고마다 API로 오는 참가가능지역·면허 제한을 고객 정보와 비교한다. 최근 공고로 시험해 &quot;나주시만&quot;,
                &quot;건설폐기물 중간처리업만&quot; 같은 조건이 정확히 잡히는 걸 확인했다.
              </Para>
              <SimpleTable
                cols={[
                  ['k', '고객 정보 (설정 화면에서 수정)'],
                  ['v', '예시'],
                ]}
                rows={[
                  ['허가 업종', '폐기물 중간재활용업(지정 외), 폐기물 수집·운반업(사업장 비배출계)'],
                  ['소재지', '전남 ○○군 (본점 기준)'],
                  ['장비·처리능력', '집게차·암롤 보유 대수, 일 처리능력, 허용보관량'],
                ]}
              />
              <Text type="supporting" color="secondary">
                판정은 충족 / 미충족 / 확인 필요(문서 조건이 애매하거나 고객 정보에 없는 항목) 3단계. 미충족 공고는 알림에서
                빼고 웹에서만 보이게 할지 함께 정한다.
              </Text>
            </Section>

            <Section id="analysis" title="분석 기능 (2차)">
              <Bullets
                items={[
                  '발주처 분석: 발주처별 공고 수·참여 업체·1순위 업체·사정률 분포. 입찰정보 서비스에서 고객이 실제로 쓰는 화면을 대체한다.',
                  '경쟁 업체 분석: 업체별 참여 지역·빈도·순위 이력. 가격 예측이 아니라 "누가 어디에 들어오는지"를 본다.',
                  '톤당 단가 비교: 첨부 요약에서 모은 단가로 비슷한 공고 대비 높음/보통/낮음.',
                  '1순위 업체 재투찰 지표: 1차 계산에서는 발주처 대부분이 73~100%로 차이가 작았다. "바로 다음 비슷한 공고"처럼 기준을 좁혀 다시 검증하고, 의미가 없으면 제공하지 않는다.',
                  '월간 판 변화 리포트: #리포트 채널로 매달 자동 게시.',
                ]}
              />
            </Section>

            <Section id="competition" title="경쟁 서비스와 우리 강점">
              <Para>
                입찰정보·분석·알림 서비스 76곳을 조사했다(폐업 17곳 제외). 대부분의 핵심 상품은 &quot;투찰가 추천&quot;이고,
                공고 모음·사정률 분석·업체 이력·계산기·알림은 공통 기능이다.
              </Para>
              <SimpleTable
                cols={[
                  ['t', '유형'],
                  ['ex', '예'],
                  ['p', '요금(조사일 기준)'],
                ]}
                rows={[
                  ['전통 입찰정보', '인포21C·비드프로·모두입찰 등', '연 11만~77만 원 + 성공보수형'],
                  ['AI 투찰가', '디마툴즈·일타비드·마이크로비드 등', '월 2만~25만 원'],
                  ['알림형', '오늘공고·공공알림·입찰참모 등', '무료~월 1만 원'],
                ]}
              />
              <SimpleTable
                cols={[
                  ['s', '우리 강점'],
                  ['w', '왜'],
                ]}
                rows={[
                  ['고객 업종에 맞춘 첨부 요약', '톤당 단가·계량·섬 여부·장비 조건처럼 폐기물 용역에서만 중요한 항목을 뽑는다'],
                  ['자격 자동 대조', '대부분의 서비스는 지역·업종 필터까지만. 면허 제한·소재지 기준까지 판정하는 곳은 드물다'],
                  ['디스코드 즉시 알림', '전통 서비스는 앱·카톡 중심. 직원과 함께 받고 채널별로 나눌 수 있다'],
                  ['고객 소유', '프로그램·데이터가 고객 것. 구독이 끊겨도 기록이 남는다'],
                ]}
              />
            </Section>

            <Section id="metrics" title="성공 지표 (베타 2개월)">
              <Bullets
                items={[
                  '맞는 공고 놓침 0건: 고객이 다른 경로로 알게 된 공고가 우리 알림에 없었던 경우를 센다.',
                  '첨부 요약 정확도: 고객이 #피드백에 올린 오류 건수, 주요 항목(금액·과업량·계량·기간) 틀림 0건 목표.',
                  '입찰정보 서비스 접속 횟수 감소(고객 자가 보고).',
                  '참여 결정까지 걸리는 시간(고객 체감, 공고당).',
                ]}
              />
            </Section>

            {/* ============================ PART 2 ============================ */}
            <VStack gap={2}>
              <Heading id="part2" level={2}>
                Part 2. 개발·운영
              </Heading>
              <Divider />
            </VStack>

            <Section id="sources" title="데이터 원천과 제약">
              <SimpleTable
                cols={[
                  ['s', '원천'],
                  ['u', '쓰는 곳'],
                  ['c', '제약'],
                ]}
                rows={[
                  ['조달청 입찰공고정보 API(공공데이터포털)', '공고·정정·취소·첨부·참가가능지역·면허 제한·변경이력', '기능별 하루 1,000회. 지역·면허·첨부는 공고번호가 아닌 기간으로 받아 걸러야 한다'],
                  ['조달청 낙찰정보 API', '개찰 결과·업체별 순위·복수예가', '이미 매일 수집 중'],
                  ['나라장터 첨부 다운로드', '공고서·과업지시서·설계서', '발주처가 빈 파일을 올린 경우가 있다'],
                  ['코네틱(환경 분야 공공 포털)', '나라장터 밖 환경 분야 공고', '검증 항목 — 붙일 수 있는지 확인'],
                ]}
              />
              <Text type="supporting" color="secondary">
                공개 API만 쓴다. 다른 입찰정보 서비스의 데이터를 긁거나 계정을 공유하지 않는다.
              </Text>
            </Section>

            <Section id="arch" title="아키텍처">
              <CodeBlock
                code={`[수집기] 10~30분마다 ─ 입찰공고 API ─┐
                    낙찰정보 API ─┤→ [DB] 공고·자격·첨부·개찰·요약
[첨부 처리] 다운로드 → 글자 추출 → Claude 요약 ┘        │
                                                         ├→ [알림] 디스코드 웹훅
                                                         └→ [웹] 공고 상세·나의 기록·분석`}
                language="text"
              />
              <Bullets
                items={[
                  '운영은 AWS(고객 명의 계정). 작은 서버 1대 + 관리형 DB 또는 서버 내 DB, 첨부 원본은 S3.',
                  'Claude API도 고객 명의 계정(선불 크레딧, 월 한도). 개발 중 시험은 개발자 비용으로 한다.',
                  '웹 화면은 Astryx(React) 디자인 시스템, 모바일에서도 보이게.',
                  '웹 주소는 고객 명의 도메인 + Cloudflare. Cloudflare Access로 대표님·직원 이메일만 접속(별도 로그인 개발 불필요).',
                ]}
              />
            </Section>

            <Section id="cost" title="운영 비용 (고객 실비, 월)">
              <SimpleTable
                cols={[
                  ['i', '항목'],
                  ['a', '예상'],
                  ['n', '근거'],
                ]}
                rows={[
                  ['Claude API (첨부 요약)', '약 $16 (2만 원대)', '조건 맞는 공고 월 약 190~210건 × 공고당 약 110원. 월 한도 $30'],
                  ['AWS 서버·DB·저장소', '약 2만~4만 원', '소형 서버 1대 기준, 배포 시 확정'],
                  ['도메인 + Cloudflare', '연 약 1.5만~2만 원', '.com 기준. HTTPS·접속 제한(대표님·직원 이메일만)은 무료'],
                  ['디스코드', '0원', '웹훅 무료'],
                  ['공공데이터포털 API', '0원', ''],
                ]}
              />
            </Section>

            <Section id="schedule" title="일정">
              <SimpleTable
                cols={[
                  ['w', '기간'],
                  ['t', '할 일'],
                  ['o', '결과물'],
                ]}
                rows={[
                  ['11/25~12/9 (2주)', '데이터 수집, 경쟁 조사, 인터뷰, PRD', 'PRD 확정 (본 문서)'],
                  ['12/10~1/6 (4주)', '수집기·자격 대조·첨부 요약·디스코드 알림·공고 상세·나의 기록', 'MVP 오픈 (고객 사용 시작)'],
                  ['1/7~1/27 (3주)', '발주처·경쟁 업체 분석, 톤당 단가 비교, 월간 리포트, 피드백 반영', '2차 기능'],
                  ['1/28~2/3 (1주)', 'AWS 배포, 운영 문서, 계정·소스 인계', '인계 완료'],
                ]}
              />
              <Text type="supporting" color="secondary">
                MVP 알림은 개발 서버로 먼저 띄워서 1월 초부터 실제로 받아본다. 일정은 피드백에 따라 조정한다.
              </Text>
            </Section>

            <Section id="contract" title="계약·인계">
              <SimpleTable
                cols={[
                  ['k', '항목'],
                  ['v', '내용'],
                ]}
                rows={[
                  ['총액', '1,000만 원'],
                  ['지급', '착수금 200만 원(11/25 수령) · 중도금 400만 원(MVP 오픈 시) · 잔금 400만 원(인계 완료 시)'],
                  ['저작권', '프로그램·문서의 저작재산권 일체(2차적저작물작성권 포함)를 고객에게 양도'],
                  ['인계물', '소스코드, DB, 설정·운영 문서, 각종 계정'],
                  ['계정 명의', 'AWS·Claude·공공데이터포털·도메인/Cloudflare·디스코드 서버 모두 고객 명의(개발자는 초대받아 작업, 인계 후 권한 회수)'],
                  ['하자보수', '인계 후 1~3개월 무상, 이후 유지보수는 월 단위 별도 계약'],
                  ['운영 실비', '서버·API 사용료는 고객이 직접 결제'],
                  ['범위 밖', '나라장터 밖 공고(한전·LH 등), 공동도급 기업정보, 적격심사 점수 계산 → 별도 협의'],
                ]}
              />
            </Section>

            <Section id="risks" title="리스크와 원칙">
              <Bullets
                items={[
                  '가격 추천·업체 간 조율 기능은 만들지 않는다. 입찰 참여 여부나 가격을 다른 업체와 맞추는 것은 담합(공정거래법)이 될 수 있다.',
                  'AI 요약은 틀릴 수 있다. 근거 문서를 함께 보여주고, 투찰 전 원문 확인을 안내한다.',
                  'API 형식이 바뀔 수 있다(이번에도 서비스 이름이 바뀌어 한때 403). 오류는 #개발-진행에 자동 알림.',
                  '크레딧 부족·한도 초과 시 요약 없이 공고 알림은 계속 보낸다.',
                ]}
              />
            </Section>

            <Section id="validation" title="검증 항목 (개발 중 확인)">
              <Bullets
                items={[
                  '첨부 요약: 공고 20건으로 정확도·비용 실측.',
                  '1순위 업체 재투찰 지표: 기준을 좁혀 의미가 있는지.',
                  '톤당 단가: 설계서 단가와 금액÷물량 중 어느 쪽이 실제 판단과 맞는지.',
                  '코네틱 등 나라장터 밖 환경 분야 공고를 붙일 수 있는지.',
                  '과거 놓친 공고 85건의 실제 참가 자격 재확인(지역·면허).',
                ]}
              />
            </Section>

            <Section id="questions" title="논의할 것 (고객 A와)">
              <Bullets
                items={[
                  '맞춤 조건: 업종·지역(전남·제주)·키워드·금액 범위가 맞는지. 섬 지역·먼 지역을 알림에서 뺄지.',
                  '자격 미충족 공고는 알림에서 뺄지, 따로 모아 볼지.',
                  '알림 카드에 꼭 있어야 할 항목, 빼도 될 항목.',
                  '웹 화면을 얼마나 쓸지(알림만으로 충분한지).',
                  '2차 분석 기능의 우선순위(발주처 / 경쟁 업체 / 단가 비교 / 월간 리포트).',
                  'AWS 계정·도메인 준비 시점(MVP 웹 화면 전, 12월 중), 도메인 이름, 부가세 포함 여부.',
                ]}
              />
              <Text type="supporting" color="secondary">
                본 문서는 논의용 초안이다. 논의 결과를 반영해 v1.1로 확정한다.
              </Text>
            </Section>
          </VStack>
        </LayoutContent>
      }
    />
  );
}

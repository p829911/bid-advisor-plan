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
  {id: 'part1', label: 'Part 1. 프로덕트 기획', level: 2},
  {id: 'summary', label: '한 줄 요약', level: 3},
  {id: 'problem', label: '배경과 문제', level: 3},
  {id: 'insight', label: '핵심 인사이트', level: 3},
  {id: 'goals', label: '목표와 비목표', level: 3},
  {id: 'users', label: '타깃 사용자', level: 3},
  {id: 'features', label: '핵심 기능', level: 3},
  {id: 'flow', label: '사용자 흐름', level: 3},
  {id: 'metrics', label: '성공 지표', level: 3},
  {id: 'business', label: '경쟁과 비즈니스 모델', level: 3},
  {id: 'risks', label: '리스크와 컴플라이언스', level: 3},
  {id: 'roadmap', label: '로드맵', level: 3},
  {id: 'part2', label: 'Part 2. 개발 기획', level: 2},
  {id: 'arch', label: '아키텍처', level: 3},
  {id: 'sources', label: '데이터 소스', level: 3},
  {id: 'model', label: '데이터 모델', level: 3},
  {id: 'pipeline', label: '수집 파이프라인', level: 3},
  {id: 'engine', label: '추천 엔진', level: 3},
  {id: 'backtest', label: '백테스트 설계', level: 3},
  {id: 'screens', label: '화면과 API', level: 3},
  {id: 'stack', label: '기술 스택과 운영', level: 3},
  {id: 'schedule', label: '개발 일정', level: 3},
  {id: 'questions', label: '열린 질문', level: 3},
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
                  와인더스 · 프로덕트 &amp; 개발 기획서 v0.1 · 2026-11-22
                </Text>
              </HStack>
              <Text as="h1" type="display-1">
                입찰가 어드바이저
              </Text>
              <Text type="body" color="secondary">
                공공입찰(나라장터) 투찰가를 "감"이 아니라 데이터로 정하게 돕는 도구. 고객 인터뷰(해양환경
                분야 업체 대표) 내용을 바탕으로 정리한 초안이다.
              </Text>
              {isMobile && <Outline items={OUTLINE_ITEMS} />}
            </VStack>

            {/* ============================ PART 1 ============================ */}
            <VStack gap={2}>
              <Heading id="part1" level={2}>
                Part 1. 프로덕트 기획
              </Heading>
              <Divider />
            </VStack>

            <Section id="summary" title="한 줄 요약">
              <Callout tone="idea" title="예정가격은 못 맞힌다. 대신 경쟁자가 몰리는 곳을 피한다.">
                예정가격은 추첨으로 정해져서 사실상 무작위다. 하지만 경쟁 업체들이 습관적으로 쓰는 투찰률은
                데이터에 그대로 남는다. 과거 개찰 결과로 "같은 운이 왔을 때 1순위가 될 확률"이 가장 높은 투찰
                구간을 추천하고, 그 근거를 숫자로 보여준다.
              </Callout>
            </Section>

            <Section id="problem" title="배경과 문제">
              <Para>고객 A는 해양환경 분야 업체로, 공공입찰에 1년에 100건 넘게 참여하고 가끔 한 건씩 낙찰된다.</Para>
              <Bullets
                items={[
                  '입찰정보 서비스(인포21C)를 연 약 20만 원에 쓰고 있다. 공고 모음, 분석 화면, 모바일 앱을 쓴다.',
                  '같은 서비스에 "추천받아 낙찰되면 금액의 1%를 내는" 성공보수형 상품도 있지만 쓰지 않는다.',
                  '매번 "사정률을 어디로 쓸지"가 가장 큰 고민이다. 본인 표현으로는 "결국 제비뽑기", "대수의 법칙이라 의미가 있을까".',
                  '원하는 것: 참여 업체가 적은 소규모 입찰에서 쓸 만한 가격대, 그리고 고민하는 시간과 스트레스를 줄이는 것.',
                  '경쟁 업체들은 "맨날 쓰던 포인트를 고수"한다는 관찰이 있다. 이것이 이 제품의 출발점이다.',
                ]}
              />
            </Section>

            <Section id="insight" title="핵심 인사이트: 낙찰자는 어떻게 정해지나">
              <Para>나라장터 적격심사·최저가 계열 입찰은 대체로 아래 순서로 1순위가 정해진다.</Para>
              <List density="compact" listStyle="decimal">
                <ListItem label={<>발주처가 기초금액을 공개하고, 그 주변(보통 ±2~3%)에서 예비가격 15개를 만든다.</>} />
                <ListItem label={<>입찰한 업체들이 각자 예비가격 2개를 고른다. 가장 많이 뽑힌 4개의 평균이 예정가격이 된다.</>} />
                <ListItem label={<>예정가격 × 낙찰하한율(계약 종류·금액대별로 다름) 이상으로 쓴 업체 중 가장 낮은 금액이 1순위가 된다.</>} />
              </List>
              <SimpleTable
                cols={[
                  ['what', '요소'],
                  ['predict', '예측 가능성'],
                  ['use', '제품에서 쓰는 법'],
                ]}
                rows={[
                  ['예정가격(사정률)', '낮음. 추첨이라 거의 무작위', '발주처·금액대별 분포로만 다룬다(점 예측 안 함)'],
                  ['경쟁 업체 투찰률', '높음. 업체마다 습관이 강하다', '과거 개찰 결과로 몰리는 구간과 빈 구간을 찾는다'],
                  ['참여 업체 수', '중간. 공고 조건으로 추정 가능', '적을수록 빈 구간 효과가 커진다'],
                ]}
              />
              <Callout tone="idea" title="그래서 문제를 바꿔 푼다">
                "예정가격을 맞히자"가 아니라 "예정가격이 어디에 떨어지든 내가 1순위일 확률을 최대로"로 푼다.
                예정가격 분포 × 경쟁자 투찰 분포를 시뮬레이션해서 내 투찰률별 1순위 확률을 계산한다.
              </Callout>
            </Section>

            <Section id="goals" title="목표와 비목표">
              <SimpleTable
                cols={[
                  ['kind', '구분'],
                  ['item', '내용'],
                ]}
                rows={[
                  ['목표', '같은 입찰 수에서 1순위 횟수를 늘린다(백테스트로 검증된 만큼만 주장).'],
                  ['목표', '공고 하나당 투찰가 결정 시간을 몇 분 안으로 줄인다.'],
                  ['목표', '추천에는 항상 근거(분포 그래프, 과거 비슷한 공고, 확률)를 같이 보여준다.'],
                  ['비목표', '예정가격·낙찰을 "맞힌다"는 보장. 무작위 비중이 커서 불가능하다.'],
                  ['비목표', '자동 투찰. 투찰은 사용자가 공동인증서로 직접 한다.'],
                  ['비목표', '같은 입찰에 참여하는 여러 업체에게 동시에 가격 추천(담합 위험).'],
                ]}
              />
            </Section>

            <Section id="users" title="타깃 사용자">
              <Bullets
                items={[
                  '1차: 고객 A. 해양환경 분야, 연 100건 이상 투찰, 소규모·지역제한 입찰 위주.',
                  '2차(검증 후): 같은 구조로 입찰하는 소규모 공사·용역·물품 업체. 대표가 직접 투찰가를 정하고 입찰정보 서비스에 돈을 쓰는 곳.',
                  '사용 환경: 사무실 PC와 휴대폰. 공고 마감 직전에 급하게 정하는 경우가 많아 모바일에서 바로 읽혀야 한다.',
                ]}
              />
            </Section>

            <Section id="features" title="핵심 기능">
              <SimpleTable
                cols={[
                  ['phase', '단계'],
                  ['feature', '기능'],
                  ['desc', '설명'],
                ]}
                rows={[
                  ['MVP', '관심 공고 목록', '업종·지역·발주처 조건에 맞는 새 공고를 모아 보여준다.'],
                  ['MVP', '투찰률 추천', '공고마다 1순위 확률이 가장 높은 투찰률 구간과 후보 3개를 확률과 함께 제시한다.'],
                  ['MVP', '근거 화면', '이 발주처의 사정률 분포, 경쟁 업체 투찰률 분포(몰리는 곳/빈 곳), 비슷한 과거 공고 결과.'],
                  ['MVP', '내 기록', '내가 실제로 쓴 투찰률과 결과를 저장하고 추천과 비교한다.'],
                  ['이후', '알림', '새 공고·마감 임박·개찰 결과를 디스코드/카카오톡/이메일로 보낸다.'],
                  ['이후', '경쟁사 프로필', '자주 마주치는 업체별 투찰 습관(평균·분산·고집하는 포인트).'],
                  ['이후', '팀 계정', '직원이 공고를 정리하고 대표가 최종 결정하는 흐름.'],
                ]}
              />
            </Section>

            <Section id="flow" title="사용자 흐름">
              <List density="compact" listStyle="decimal">
                <ListItem label={<>처음 한 번: 업종(입찰 참가 자격), 지역, 주로 들어가는 발주처, 사업자번호를 등록한다.</>} />
                <ListItem label={<>매일: 새 공고 알림을 받고 들어갈 공고를 고른다.</>} />
                <ListItem label={<>공고 상세: 추천 투찰률 구간, 1순위 확률, 근거 그래프를 보고 최종 숫자를 정한다.</>} />
                <ListItem label={<>나라장터에서 직접 투찰한다(제품은 금액만 계산해 준다).</>} />
                <ListItem label={<>개찰 후: 결과가 자동으로 기록되고, 추천대로 썼다면 어땠는지 비교가 쌓인다.</>} />
              </List>
            </Section>

            <Section id="metrics" title="성공 지표">
              <SimpleTable
                cols={[
                  ['stage', '단계'],
                  ['metric', '지표'],
                  ['bar', '기준'],
                ]}
                rows={[
                  ['검증(백테스트)', '추천 투찰률로 썼을 때 1순위 비율', '고객 A의 실제 투찰과 무작위 투찰보다 의미 있게 높아야 진행'],
                  ['검증(백테스트)', '1순위 확률 보정(calibration)', '예측 확률 구간별 실제 1순위 비율이 비슷해야 함'],
                  ['운영', '공고당 결정 시간', '현재보다 확실히 짧아야 함(고객 체감 확인)'],
                  ['운영', '실제 낙찰 건수 추이', '분기 단위로 본다. 표본이 작아 단기 판단 금지'],
                  ['사업', '유료 전환 의향', '고객 A가 기존 서비스 대신 또는 추가로 돈을 낼 의향'],
                ]}
              />
            </Section>

            <Section id="business" title="경쟁과 비즈니스 모델">
              <SimpleTable
                cols={[
                  ['who', '대안'],
                  ['what', '제공하는 것'],
                  ['gap', '우리가 다른 점'],
                ]}
                rows={[
                  ['입찰정보 서비스(인포21C 등)', '공고 모음, 분석 화면, 앱. 연 20만 원 안팎, 성공보수형 추천 상품', '추천 근거와 확률을 투명하게 보여주고, 경쟁자 분포를 중심에 둔다'],
                  ['나라장터 기본 기능', '공고·개찰 결과 무료 조회, 키워드 알림', '분석과 추천이 없다'],
                  ['감과 습관', '대표의 경험', '같은 습관이 경쟁자와 겹치면 오히려 불리'],
                ]}
              />
              <Bullets
                items={[
                  '가설 1: 월 구독(입찰정보 서비스보다 낮거나 비슷한 가격) + 고객 A 무료 베타.',
                  '가설 2: 성공보수형은 이해충돌·정산 분쟁이 커서 초기에는 하지 않는다.',
                  '판매는 백테스트와 고객 A 운영 결과가 나온 뒤에 판단한다.',
                ]}
              />
            </Section>

            <Section id="risks" title="리스크와 컴플라이언스">
              <Callout tone="warn" title="입찰 담합 위험(공정거래법)">
                같은 입찰에 참여하는 여러 업체에 투찰가를 추천하면 담합으로 볼 여지가 있다. 판매 단계에서는
                "같은 공고에는 한 고객에게만 추천" 같은 장치와 법률 검토가 먼저다. 초기에는 고객 A 한 곳만 쓴다.
              </Callout>
              <Bullets
                items={[
                  '기대치: 무작위 비중이 커서 개선은 "확률이 조금 올라가는" 수준이다. 연 100건 이상이면 그 차이가 쌓인다는 것이 가치다.',
                  '데이터: 공공데이터포털 API(이용허락 제한 없음)만 쓴다. 다른 입찰정보 서비스의 데이터를 긁거나 계정을 공유해 쓰지 않는다.',
                  '자체 시스템 발주처: 한전·LH·수자원공사 등은 나라장터 밖이라 별도 수집이 필요하다(초기 범위 밖).',
                  '고객 정보: 사업자번호와 투찰 기록은 고객 자산이다. 암호화 저장, 제3자 제공 없음.',
                ]}
              />
            </Section>

            <Section id="roadmap" title="로드맵">
              <SimpleTable
                cols={[
                  ['phase', '단계'],
                  ['period', '기간'],
                  ['goal', '목표'],
                  ['exit', '다음 단계 조건'],
                ]}
                rows={[
                  ['0. 데이터 검증', '2주', '고객 A 업종·지역 1~2년치 개찰 결과 수집, 백테스트', '추천이 실제 투찰·무작위보다 낫다'],
                  ['1. 개인용 MVP', '3~4주', '공고 목록 + 추천 + 근거 화면(웹, 모바일 대응)', '고객 A가 매주 실제로 쓴다'],
                  ['2. 운영·알림', '4주', '알림, 내 기록 자동화, 경쟁사 프로필', '분기 결과와 체감 만족'],
                  ['3. 판매 검토', '이후', '담합 방지 장치, 가격, 다른 업종 확장', '법률 검토와 유료 의향 확인'],
                ]}
              />
            </Section>

            {/* ============================ PART 2 ============================ */}
            <VStack gap={2}>
              <Heading id="part2" level={2}>
                Part 2. 개발 기획
              </Heading>
              <Divider />
            </VStack>

            <Section id="arch" title="아키텍처">
              <CodeBlock
                language="text"
                width="100%"
                code={`[공공데이터포털 API] ──▶ 수집기(매일 + 백필) ──▶ DB
                                                  │
                         ┌────────────────────────┤
                         ▼                        ▼
               분포 추정·시뮬레이터 ──▶ 추천 API ──▶ 웹(React + Astryx)
                         ▲                        └──▶ 알림(디스코드/카톡/메일)
                         │
                    백테스트(시간순)`}
              />
              <Bullets
                items={[
                  '수집과 분석은 Python, 화면은 React + Astryx 디자인 시스템.',
                  '초기에는 단일 서버(작은 VM)와 SQLite/Postgres로 충분하다. 데이터는 하루 수천 건 수준.',
                ]}
              />
            </Section>

            <Section id="sources" title="데이터 소스 (공공데이터포털, 무료)">
              <SimpleTable
                cols={[
                  ['api', 'API'],
                  ['ops', '주요 오퍼레이션'],
                  ['use', '용도'],
                ]}
                rows={[
                  ['조달청_나라장터 입찰공고정보서비스', '공사·용역·물품 공고 목록(검색조건)', '새 공고, 기초금액, 참가제한지역, 업종'],
                  ['조달청_나라장터 낙찰정보서비스 (ScsbidInfoService)', '개찰결과 목록 / 개찰완료 목록(투찰업체별) / 예비가격상세', '업체별 투찰금액·투찰률·순위, 예비가격 15개와 추첨번호, 예정가격'],
                  ['같은 서비스', '유찰·재입찰 목록', '유찰 패턴, 재입찰 처리'],
                ]}
              />
              <Callout tone="warn" title="API 제약 (2026-11 기준)">
                낙찰정보서비스는 2026-11-10부터 요청당 조회기간이 7일로 줄었다. 개발계정 트래픽은 하루 1,000건이며,
                활용사례를 등록하면 운영계정으로 늘릴 수 있다. 개찰결과 조회는 응답이 느려 페이지 크기를 작게 잡아야 한다.
                인증키는 Decoding 원본 키를 쓴다.
              </Callout>
            </Section>

            <Section id="model" title="데이터 모델">
              <SimpleTable
                cols={[
                  ['table', '테이블'],
                  ['key', '키'],
                  ['fields', '주요 필드'],
                ]}
                rows={[
                  ['bid_notice', '공고번호+차수+분류', '공고명, 업무구분, 발주·수요기관, 업종, 참가제한지역, 기초금액, 추정가격, 낙찰방법, 하한율, 마감·개찰일시'],
                  ['opening_result', '공고 키+재입찰번호', '진행상태(개찰완료/유찰/재입찰), 참가업체수, 예정가격, 사정률'],
                  ['reserve_price', '공고 키+순번', '예비가격 15개, 추첨 여부, 추첨 횟수'],
                  ['bid', '공고 키+사업자번호', '업체명, 투찰금액, 투찰률, 순위, 비고'],
                  ['company_habit', '사업자번호', '투찰률 평균·분산, 자주 쓰는 값, 최근 참여 수(파생)'],
                  ['recommendation', '공고 키+버전', '후보 투찰률, 1순위 확률, 근거 요약, 생성 시각'],
                  ['my_bid', '고객+공고 키', '실제 투찰률, 결과, 추천과의 차이'],
                ]}
              />
            </Section>

            <Section id="pipeline" title="수집 파이프라인">
              <Bullets
                items={[
                  '백필: 고객 업종·지역 조건으로 최근 1~2년을 7일 창으로 쪼개 순차 수집. 하루 트래픽 한도 안에서 며칠에 걸쳐 진행하고, 진행 지점을 저장해 이어 받는다.',
                  '증분: 매일 새벽 전날 공고·개찰 결과를 수집. 마감 임박 공고는 낮에 한 번 더.',
                  '정합: 공고번호+차수+분류+재입찰번호를 복합키로 묶는다(다분류·재입찰 공고 대응).',
                  '검증: 응답 필드가 바뀌면 경고(스키마 검사), 누락 창은 재시도 큐로.',
                ]}
              />
            </Section>

            <Section id="engine" title="추천 엔진">
              <List density="compact" listStyle="decimal">
                <ListItem label={<>예정가격 분포: 발주처·업무구분·금액대별 과거 사정률(예정가격/기초금액) 분포를 추정한다. 데이터가 적으면 상위 묶음으로 단계적으로 넓힌다.</>} />
                <ListItem label={<>경쟁자 분포: 이 공고에 들어올 만한 업체 집합과 각 업체의 투찰률 습관(분포)을 과거 참여 이력으로 만든다. 참여 업체 수도 분포로 둔다.</>} />
                <ListItem label={<>시뮬레이션: 예비가격 15개 생성 → 업체별 2개 선택 → 상위 4개 평균으로 예정가격 → 하한선 계산 → 경쟁자 투찰 샘플링을 수천 번 반복한다.</>} />
                <ListItem label={<>추천: 내 투찰률 후보(0.001% 단위 격자)마다 1순위 확률을 계산하고, 확률이 높은 구간과 후보 3개를 낸다.</>} />
                <ListItem label={<>설명: 확률, 경쟁자가 몰리는 구간, 비슷한 과거 공고 5건을 같이 보여준다.</>} />
              </List>
              <CodeBlock
                language="text"
                width="100%"
                code={`P(1순위 | 내 투찰률 r)
  = E_예정가격[ 1{ r·기초 ≥ 하한선 } × Π_경쟁자 P( 경쟁자 < 하한선 또는 경쟁자 > r·기초 ) ]`}
              />
            </Section>

            <Section id="backtest" title="백테스트 설계">
              <Bullets
                items={[
                  '시간순 walk-forward: 공고 t의 추천에는 t 이전 개찰 결과만 쓴다(미래 정보 금지).',
                  '비교 기준: 고객 A가 실제 쓴 투찰률, 무작위 투찰률, 해당 발주처 평균 투찰률.',
                  '평가: 1순위 비율, 확률 보정도, 참여 업체 수 구간별 효과(소규모 입찰에서 특히).',
                  '판정 기준은 결과를 보기 전에 고정한다. 기준을 못 넘으면 추천 기능은 접고 공고 요약·알림 도구로만 남긴다.',
                ]}
              />
            </Section>

            <Section id="screens" title="화면과 API">
              <SimpleTable
                cols={[
                  ['screen', '화면'],
                  ['content', '내용'],
                  ['api', 'API'],
                ]}
                rows={[
                  ['공고 목록', '조건에 맞는 공고, 마감일, 기초금액, 예상 참여 업체 수', 'GET /notices?status=open'],
                  ['공고 상세', '추천 구간·후보 3개·확률, 사정률 분포, 경쟁자 분포, 비슷한 과거 공고', 'GET /notices/{id}/recommendation'],
                  ['내 기록', '투찰률·결과·추천 대비 차이, 분기 요약', 'GET/POST /my-bids'],
                  ['설정', '업종·지역·발주처·사업자번호, 알림 채널', 'GET/PUT /profile'],
                ]}
              />
            </Section>

            <Section id="stack" title="기술 스택과 운영">
              <SimpleTable
                cols={[
                  ['area', '영역'],
                  ['choice', '선택'],
                ]}
                rows={[
                  ['수집·분석', 'Python 3.12, httpx, pandas/numpy, 시뮬레이션은 numpy 벡터화'],
                  ['저장', 'SQLite로 시작 → 고객이 늘면 Postgres'],
                  ['API', 'FastAPI'],
                  ['웹', 'React + Vite + Astryx 디자인 시스템(모바일 우선)'],
                  ['배포', '작은 클라우드 VM + 회사 도메인 서브도메인, Cloudflare 앞단'],
                  ['알림', '디스코드 웹후크로 시작, 이후 카카오 알림톡/메일'],
                  ['보안', 'API 키는 서버 비밀 저장소에만, 고객 데이터 암호화, 로그에 사업자번호 마스킹'],
                ]}
              />
            </Section>

            <Section id="schedule" title="개발 일정 (Phase 0~1, 약 6주)">
              <SimpleTable
                cols={[
                  ['week', '주차'],
                  ['work', '작업'],
                  ['output', '산출물'],
                ]}
                rows={[
                  ['1주', 'API 키 발급, 수집기, 고객 업종 백필 시작', '원천 데이터 DB'],
                  ['2주', '분포 추정·시뮬레이터, 백테스트', '백테스트 보고서(진행/중단 판정)'],
                  ['3주', '추천 API, 공고 목록·상세 화면', '내부 데모'],
                  ['4주', '근거 그래프, 내 기록, 모바일 다듬기', '고객 A 베타 오픈'],
                  ['5~6주', '고객 피드백 반영, 알림', 'v0.2'],
                ]}
              />
            </Section>

            <Section id="questions" title="열린 질문 (고객 A에게 확인)">
              <Bullets
                items={[
                  '입찰 참가 자격(업종 면허)과 주로 들어가는 지역·발주처는?',
                  '주로 공사/용역/물품 중 어디이고, 적격심사인지 최저가인지?',
                  '지금 투찰률을 정하는 방식(고정값, 인포21C 분석, 감)과 최근 1년 투찰 기록을 받을 수 있는지?',
                  '자체 시스템 발주처(한전·LH 등) 비중은?',
                  '어떤 형태로 받고 싶은지(웹, 카톡 메시지, 엑셀)?',
                ]}
              />
              <Text type="supporting" color="secondary">
                본 문서는 초안이며, 백테스트 결과에 따라 범위와 일정이 바뀐다.
              </Text>
            </Section>
          </VStack>
        </LayoutContent>
      }
    />
  );
}

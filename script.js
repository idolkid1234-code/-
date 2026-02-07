const events = [
  {
    title: "애니메이션 영화 시사회 '루미에르'",
    date: "2026-01-03",
    category: "anime",
    location: "도쿄 TOHO 시네마즈",
  },
  {
    title: "팬클럽 새해 인사 이벤트",
    date: "2026-01-05",
    category: "voice",
    location: "도쿄 국제포럼",
  },
  {
    title: "사진집 전달회 '빛의 기록'",
    date: "2026-01-07",
    category: "voice",
    location: "아키하바라 이벤트 홀",
  },
  {
    title: "러브라이브! 스페셜 라이브 2026",
    date: "2026-01-11",
    category: "live",
    location: "사이타마 슈퍼 아레나",
  },
  {
    title: "아이돌마스터 올스타즈 프로듀서 미팅",
    date: "2026-01-14",
    category: "live",
    location: "니혼 무도칸",
  },
  {
    title: "우마무스메 4th 스테이지 라이브",
    date: "2026-01-18",
    category: "live",
    location: "교세라 돔 오사카",
  },
  {
    title: "애니메이션 영화 '폴라리스' 무대인사",
    date: "2026-01-21",
    category: "anime",
    location: "오사카 스테이션 시티 시네마",
  },
  {
    title: "PV 공개: 애니메이션 '메모리 크로니클'",
    date: "2026-01-23",
    category: "release",
    location: "공식 유튜브 채널",
  },
  {
    title: "Koe 주최 애니송 스페셜 내한 이벤트",
    date: "2026-01-25",
    category: "korea",
    location: "서울 올림픽홀",
  },
  {
    title: "Say U Fans 성우 토크 내한",
    date: "2026-01-27",
    category: "korea",
    location: "부산 영화의전당",
  },
  {
    title: "한국 팬미팅 투어 in 서울",
    date: "2026-01-31",
    category: "korea",
    location: "서울 예스24 라이브홀",
  },
  {
    title: "애니메이션 '솔라리아' 제작발표 라이브",
    date: "2026-02-02",
    category: "anime",
    location: "니코니코 생방송",
  },
  {
    title: "애니메이션 영화 내한 무대인사",
    date: "2026-02-05",
    category: "korea",
    location: "서울 CGV 용산아이파크몰",
  },
  {
    title: "애니송 라이브 in 서울",
    date: "2026-02-07",
    category: "korea",
    location: "서울 코엑스 오디토리움",
  },
];

const calendarGrid = document.getElementById("calendar-grid");
const eventsList = document.getElementById("events-list");
const monthLabel = document.getElementById("month-label");
const eventCount = document.getElementById("event-count");
const nextEvent = document.getElementById("next-event");
const filterButtons = document.querySelectorAll(".filter-chip");

let currentMonth = new Date(2026, 0, 1);
let activeFilter = "all";

const categoryLabels = {
  voice: "성우",
  anime: "애니메이션",
  live: "라이브",
  release: "공개",
  korea: "내한",
};

const formatDate = (date) =>
  date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const renderCalendar = () => {
  calendarGrid.innerHTML = "";
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  monthLabel.textContent = `${year}년 ${month + 1}월`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();

  const daysInMonth = lastDay.getDate();
  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
  const today = new Date();

  for (let i = 0; i < totalCells; i += 1) {
    const cellDate = new Date(year, month, i - startOffset + 1);
    const isCurrentMonth = cellDate.getMonth() === month;

    const dayElement = document.createElement("div");
    dayElement.classList.add("calendar__day");
    if (!isCurrentMonth) {
      dayElement.classList.add("is-muted");
    }
    if (isSameDay(cellDate, today)) {
      dayElement.classList.add("is-today");
    }

    const number = document.createElement("div");
    number.classList.add("calendar__day-number");
    number.textContent = cellDate.getDate();
    dayElement.appendChild(number);

    const dayEvents = filteredEvents().filter((eventItem) =>
      isSameDay(new Date(eventItem.date), cellDate)
    );

    if (dayEvents.length > 0) {
      const label = document.createElement("div");
      label.classList.add("calendar__event");
      label.textContent = dayEvents[0].title;
      dayElement.appendChild(label);
    }

    calendarGrid.appendChild(dayElement);
  }
};

const filteredEvents = () => {
  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();
  return events
    .filter((eventItem) => {
      const eventDate = new Date(eventItem.date);
      const isSameMonth =
        eventDate.getMonth() === month && eventDate.getFullYear() === year;
      const matchesFilter =
        activeFilter === "all" || eventItem.category === activeFilter;
      return isSameMonth && matchesFilter;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

const renderEvents = () => {
  const visibleEvents = filteredEvents();
  eventsList.innerHTML = "";

  visibleEvents.forEach((eventItem) => {
    const card = document.createElement("div");
    card.classList.add("event-card");

    const title = document.createElement("div");
    title.classList.add("event-card__title");
    title.textContent = eventItem.title;

    const meta = document.createElement("div");
    meta.classList.add("event-card__meta");
    meta.innerHTML = `<span>${formatDate(new Date(eventItem.date))}</span><span>${eventItem.location}</span>`;

    const tag = document.createElement("div");
    tag.classList.add("event-card__tag");
    tag.textContent = categoryLabels[eventItem.category];

    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(tag);

    eventsList.appendChild(card);
  });

  eventCount.textContent = String(visibleEvents.length).padStart(2, "0");

  if (visibleEvents.length > 0) {
    const closest = visibleEvents[0];
    nextEvent.textContent = `${closest.title.split(" ")[0]} · ${formatDate(
      new Date(closest.date)
    )}`;
  } else {
    nextEvent.textContent = "-";
  }
};

const updateView = () => {
  renderCalendar();
  renderEvents();
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    activeFilter = button.dataset.filter;
    updateView();
  });
});

const shiftMonth = (direction) => {
  currentMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + direction,
    1
  );
  updateView();
};

document.getElementById("prev-month").addEventListener("click", () => {
  shiftMonth(-1);
});

document.getElementById("next-month").addEventListener("click", () => {
  shiftMonth(1);
});

updateView();

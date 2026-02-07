const events = [
  {
    title: "사토미 사토 팬미팅 in 도쿄",
    date: "2025-08-02",
    category: "voice",
    location: "도쿄 가든 시어터",
  },
  {
    title: "애니메이션 '하늘빛 아리아' PV 공개",
    date: "2025-08-05",
    category: "release",
    location: "유튜브 공식 채널",
  },
  {
    title: "성우 유닛 라이브 'Echo Bloom'",
    date: "2025-08-09",
    category: "live",
    location: "요코하마 아레나",
  },
  {
    title: "극장판 '루미나스' 무대인사",
    date: "2025-08-12",
    category: "anime",
    location: "신주쿠 피카딜리",
  },
  {
    title: "호리에 유이 20주년 토크쇼",
    date: "2025-08-16",
    category: "voice",
    location: "아사쿠사 공회당",
  },
  {
    title: "애니메이션 OST 콘서트",
    date: "2025-08-20",
    category: "live",
    location: "오사카성 홀",
  },
  {
    title: "새 시즌 제작 발표 라이브",
    date: "2025-08-22",
    category: "anime",
    location: "니코니코 생방송",
  },
  {
    title: "라디오 공개녹음 with 시마자키 노부나가",
    date: "2025-08-24",
    category: "voice",
    location: "나고야 시민회관",
  },
  {
    title: "OVA '라이트 세이버' 선행 공개",
    date: "2025-08-28",
    category: "release",
    location: "아키하바라 극장",
  },
  {
    title: "애니메이션 이벤트 Summer Stage",
    date: "2025-08-30",
    category: "anime",
    location: "마쿠하리 멧세",
  },
];

const calendarGrid = document.getElementById("calendar-grid");
const eventsList = document.getElementById("events-list");
const monthLabel = document.getElementById("month-label");
const eventCount = document.getElementById("event-count");
const nextEvent = document.getElementById("next-event");
const filterButtons = document.querySelectorAll(".filter-chip");

let currentMonth = new Date(2025, 7, 1);
let activeFilter = "all";

const categoryLabels = {
  voice: "성우",
  anime: "애니메이션",
  live: "라이브",
  release: "공개",
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
  return events
    .filter((eventItem) => {
      const eventDate = new Date(eventItem.date);
      const isSameMonth = eventDate.getMonth() === month;
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

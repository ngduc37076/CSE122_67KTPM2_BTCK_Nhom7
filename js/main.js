/* ============================================================
   TripWeave AI — main.js
   Data nam trong file nay (khong fetch) nen mo bang file:// van chay.
   Navbar + sidebar + footer duoc gen mot lan, ca 15 trang dung chung.
   ============================================================ */
const TW = {};

/* ---------------- 1. DIEU HUONG ---------------- */
TW.nav = [
  { href: "traveler-discover.html", label: "Khám phá", key: "traveler" },
  { href: "traveler-trip-planner.html", label: "Kế hoạch chuyến đi", key: "traveler" },
  { href: "traveler-ai-itinerary.html", label: "Lịch trình thông minh", key: "traveler" },
  { href: "guide-dashboard.html", label: "Hướng dẫn viên", key: "guide" },
  { href: "partner-activity-management.html", label: "Đối tác", key: "partner" },
  { href: "admin-content-moderation.html", label: "Quản lý", key: "admin" },
];

/* Sidebar dashboard — dung theo mock [Duc]: 3 lien + 1 active */
TW.side = [
  { href: "guide-trip-review.html", label: "Đánh giá", key: "review" },
  { href: "partner-activity-management.html", label: "Hoạt động", key: "activity" },
  { href: "admin-content-moderation.html", label: "Kiểm duyệt", key: "moderation" },
];

/* ---------------- 2. DU LIEU DASHBOARD ---------------- */
TW.dash = {
  "guide-dashboard": {
    side: "activity", roleLabel: "Hướng dẫn viên",
    title: "Bảng điều khiển hướng dẫn viên",
    sub: "Theo dõi dữ liệu và xử lý nghiệp vụ.",
    stats: [["12", "Chuyến dẫn"], ["8", "Tuyến mới"], ["46", "Địa điểm"], ["94%", "Đánh giá tốt"]],
    rows: [
      ["Thủ đô Hà Nội", "Nguyễn Minh · 3 ngày", ["Chờ duyệt", "warning"], "18 phút trước"],
      ["Hạ Long Heritage", "Bộ lọc di sản hóa", ["Đã duyệt", "success"], "Hôm nay"],
      ["Bến Trong Experience", "Địa điểm nổi", ["Ẩn", "info"], "Hôm qua"],
    ],
  },
  "guide-trip-review": {
    side: "review", roleLabel: "Hướng dẫn viên",
    title: "Trip Review",
    sub: "Theo dõi dữ liệu và xử lý nghiệp vụ.",
    stats: [["12", "Chờ review"], ["38", "Đã duyệt"], ["5", "Cần sửa"], ["96%", "Tỷ lệ phản hồi"]],
    rows: [
      ["TRIP-1024", "Hà Nội, 3 ngày", ["Chờ review", "warning"], "10 phút trước"],
      ["TRIP-1023", "Hạ Long, 2 ngày", ["Đã duyệt", "success"], "1 giờ trước"],
      ["TRIP-1019", "Hội An, 4 ngày", ["Cần sửa", "danger"], "3 giờ trước"],
    ],
  },
  "guide-curated-collections": {
    side: "review", roleLabel: "Hướng dẫn viên",
    title: "Bộ sưu tập đã tuyển chọn",
    sub: "Theo dõi dữ liệu và xử lý nghiệp vụ.",
    stats: [["6", "Bộ đang mở"], ["2", "Chờ duyệt"], ["148", "Địa điểm"], ["2,4K", "Lượt lưu"]],
    rows: [
      ["Ẩm thực đường phố", "24 địa điểm", ["Đã đăng", "success"], "Hôm nay"],
      ["Hà Nội mùa thu", "18 địa điểm", ["Bản nháp", "neutral"], "2 ngày trước"],
      ["Cung trekking Tây Bắc", "31 địa điểm", ["Chờ duyệt", "warning"], "3 ngày trước"],
    ],
    derived: true,
  },
  "partner-activity-management": {
    side: "activity", roleLabel: "Đối tác địa phương",
    title: "Quản lý hoạt động",
    sub: "Theo dõi dữ liệu và xử lý nghiệp vụ.",
    stats: [["18", "Trải nghiệm"], ["15", "Đang mở"], ["327", "Lượt đặt"], ["48.2M", "Doanh thu"]],
    rows: [
      ["Workshop làm gốm", "Bát Tràng · 3 giờ", ["Đang mở", "success"], "Hôm nay"],
      ["Food Walk", "Phố Cổ · 2 giờ", ["Chưa mở", "warning"], "Hôm nay"],
      ["Sunset Coffee", "Tây Hồ · 1,5 tiếng", ["Ẩn", "danger"], "Hôm qua"],
    ],
  },
  "partner-interest-dashboard": {
    side: "activity", roleLabel: "Đối tác địa phương",
    title: "Dashboard sự quan tâm",
    sub: "Theo dõi dữ liệu và xử lý nghiệp vụ.",
    stats: [["1,284", "Lượt xem"], ["96", "Quan tâm"], ["37", "Đặt chỗ"], ["8", "Báo cáo"]],
    rows: [
      ["Workshop làm gốm", "34 lượt quan tâm", ["Đang mở", "success"], "Hôm nay"],
      ["Food Walk", "28 lượt quan tâm", ["Chưa mở", "warning"], "Hôm qua"],
      ["Sunset Coffee", "34 lượt quan tâm", ["Ẩn", "danger"], "2 ngày trước"],
    ],
    derived: true,
  },
  "partner-profile": {
    side: "activity", roleLabel: "Đối tác địa phương",
    title: "Hồ sơ đối tác",
    sub: "Theo dõi dữ liệu và xử lý nghiệp vụ.",
    stats: [["4,8", "Đánh giá"], ["126", "Lượt đánh giá"], ["12", "Hoạt động"], ["3 năm", "Đồng hành"]],
    rows: [
      ["Giấy phép kinh doanh", "Số 0101234567", ["Đã xác minh", "success"], "6 tháng trước"],
      ["Bảo hiểm trách nhiệm", "Hết hạn 12/2026", ["Sắp hết hạn", "warning"], "Hôm nay"],
      ["Địa chỉ xưởng", "Bát Tràng, Gia Lâm", ["Đã duyệt", "success"], "1 năm trước"],
    ],
    derived: true,
  },
  "admin-content-moderation": {
    side: "moderation", roleLabel: "Quản trị viên",
    title: "Kiểm duyệt nội dung",
    sub: "Theo dõi dữ liệu và xử lý nghiệp vụ.",
    stats: [["24", "Chờ duyệt"], ["1,284", "Đã duyệt"], ["37", "Bị từ chối"], ["8", "Báo cáo"]],
    rows: [
      ["Topwalk", "Hồ Gươm đêm", ["Đã duyệt", "success"], "Hôm nay"],
      ["Lăng gem", "Vị trí địa điểm", ["Chưa duyệt", "warning"], "Hôm nay"],
      ["Công viên thống nhất", "Hồ sơ địa điểm", ["Báo cáo", "danger"], "Hôm qua"],
    ],
  },
  "admin-category-management": {
    side: "moderation", roleLabel: "Quản trị viên",
    title: "Quản lý danh mục",
    sub: "Theo dõi dữ liệu và xử lý nghiệp vụ.",
    stats: [["9", "Danh mục"], ["7", "Đang bật"], ["2", "Đã ẩn"], ["312", "Địa điểm gán"]],
    rows: [
      ["Thiên nhiên", "86 địa điểm", ["Đang mở", "success"], "Hôm nay"],
      ["Văn hóa", "74 địa điểm", ["Đang mở", "success"], "Hôm qua"],
      ["Ẩm thực đường phố", "58 địa điểm", ["Ẩn", "danger"], "Tuần trước"],
    ],
    derived: true,
  },
  "admin-analytics": {
    side: "moderation", roleLabel: "Quản trị viên",
    title: "Analytics",
    sub: "Theo dõi dữ liệu và xử lý nghiệp vụ.",
    stats: [["12,8K", "Người dùng"], ["4,281", "Trips"], ["9,482", "AI requests"], ["68%", "Retention"]],
    rows: [
      ["AI Itinerary", "4,281 lượt", ["Đã duyệt", "success"], "Tháng này"],
      ["Discover", "18,2K lượt", ["Đã duyệt", "success"], "Tháng này"],
      ["Trip Planner", "8,7K lượt", ["Chưa duyệt", "warning"], "Tháng này"],
    ],
    derived: true,
  },
};

/* Vai tro can co de vao tung dashboard — suy ra tu tien to cua ten trang */
const DASH_ROLE = { guide: "guide", partner: "partner", admin: "admin" };
Object.keys(TW.dash).forEach((k) => {
  TW.dash[k].role = DASH_ROLE[k.split("-")[0]];
  TW.dash[k].canCreate = k === "partner-activity-management" || k === "admin-content-moderation";
});
TW.dash["admin-content-moderation"].live = "moderation";
TW.dash["partner-activity-management"].live = "partner";

/* ---------------- 3. DU LIEU TRANG TRAVELER ---------------- */
TW.places = [
  { name: "Hồ Hoàn Kiếm", city: "Hà Nội", category: "Thiên nhiên", rating: 4.9, price: 0, time: "1-2 giờ", emoji: "🌿", desc: "Đi dạo quanh hồ, check-in đền Ngọc Sơn." },
  { name: "Phố cổ Hà Nội", city: "Hà Nội", category: "Văn hóa", rating: 4.8, price: 0, time: "2-3 giờ", emoji: "🏮", desc: "36 phố phường, kiến trúc cũ và ẩm thực." },
  { name: "Lăng Chủ tịch", city: "Hà Nội", category: "Văn hóa", rating: 4.6, price: 0, time: "1-2 giờ", emoji: "🏛️", desc: "Quảng trường Ba Đình và khu di tích." },
  { name: "Chùa Trấn Quốc", city: "Hà Nội", category: "Tâm linh", rating: 4.7, price: 20000, time: "1 giờ", emoji: "🛕", desc: "Ngôi chùa bên hồ Tây, view hoàng hôn." },
  { name: "Vịnh Hạ Long", city: "Hạ Long", category: "Thiên nhiên", rating: 4.9, price: 290000, time: "Cả ngày", emoji: "⛰️", desc: "Du thuyền ngắm hàng nghìn đảo đá." },
  { name: "Phố cổ Hội An", city: "Hội An", category: "Văn hóa", rating: 4.8, price: 120000, time: "3-4 giờ", emoji: "🏮", desc: "Đèn lồng, nhà cổ và cầu Nhật Bản." },
  { name: "Bà Nà Hills", city: "Đà Nẵng", category: "Nghỉ dưỡng", rating: 4.7, price: 900000, time: "Cả ngày", emoji: "🚡", desc: "Cầu Vàng và khu làng Pháp trên núi." },
  { name: "Chợ Bến Thành", city: "TP.HCM", category: "Ẩm thực", rating: 4.5, price: 0, time: "2 giờ", emoji: "🛍️", desc: "Ăn sáng, mua đặc sản về làm quà." },
];

TW.interests = ["Thiên nhiên", "Văn hóa", "Ẩm thực", "Ảnh đẹp", "Đi bộ", "Trẻ em"];
TW.categories = ["Thiên nhiên", "Văn hóa", "Tâm linh", "Ẩm thực", "Nghỉ dưỡng", "Giải trí", "Khác"];

/* ---------------- 3b. TAI KHOAN MAU & PHIEN ---------------- */
/* Mat khau demo de nguyen plain text vi day la nguyen mau frontend, khong co backend. */
TW.users = [
  { email: "traveler@tripweave.io", password: "123456", name: "Trần Minh Anh", role: "traveler" },
  { email: "guide@tripweave.io", password: "123456", name: "Nguyễn Quốc Huy", role: "guide" },
  { email: "partner@tripweave.io", password: "123456", name: "Lê Thu Hà", role: "partner" },
  { email: "admin@tripweave.io", password: "123456", name: "Phạm Đức Toàn", role: "admin" },
];

TW.ROLE_LABEL = {
  traveler: "Du khách",
  guide: "Hướng dẫn viên",
  partner: "Đối tác địa phương",
  admin: "Quản trị viên",
};

const readStore = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const writeStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));

TW.session = () => readStore("tripweave_session", null);
TW.signIn = (user) => writeStore("tripweave_session", { email: user.email, name: user.name, role: user.role, at: Date.now() });
TW.signOut = () => localStorage.removeItem("tripweave_session");

TW.accounts = () => [...TW.users, ...readStore("tripweave_accounts", [])];
TW.findAccount = (email, password) =>
  TW.accounts().find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
TW.emailTaken = (email) => TW.accounts().some((u) => u.email.toLowerCase() === email.toLowerCase());
TW.saveAccount = (user) => {
  const list = readStore("tripweave_accounts", []);
  list.push(user);
  writeStore("tripweave_accounts", list);
};

/* ---------------- 3c. KHO DIA DIEM (mau + do nguoi dung gui) ---------------- */
TW.seedPlaces = TW.places.map((p, i) => ({ ...p, id: "seed-" + i, status: "approved", owner: "TripWeave", ownerRole: "seed", at: "Dữ liệu mẫu" }));
TW.userPlaces = () => readStore("tripweave_places", []);
TW.allPlaces = () => [...TW.seedPlaces, ...TW.userPlaces()];
TW.approvedPlaces = () => TW.allPlaces().filter((p) => p.status === "approved");

TW.submitPlace = (data) => {
  const s = TW.session();
  const list = TW.userPlaces();
  const place = {
    ...data,
    id: "u" + Date.now(),
    status: "pending",
    owner: s ? s.name : "Khách vãng lai",
    ownerEmail: s ? s.email : "",
    ownerRole: s ? s.role : "guest",
    at: new Date().toLocaleString("vi-VN"),
  };
  list.push(place);
  writeStore("tripweave_places", list);
  return place;
};

TW.decidePlace = (id, approve) => {
  writeStore("tripweave_places", TW.userPlaces().map((p) => (p.id === id ? { ...p, status: approve ? "approved" : "rejected" } : p)));
};

TW.resetPlaces = () => localStorage.removeItem("tripweave_places");

/* Cac hinh thai dang ve danh sach dia diem cung cap nhat khi kho thay doi */
const placeListeners = [];
const onPlacesChanged = (fn) => placeListeners.push(fn);
const emitPlacesChanged = () => placeListeners.forEach((fn) => fn());

/* ---------------- 4. TIEN ICH ---------------- */
TW.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
TW.money = (v) => (v === 0 ? "Miễn phí" : new Intl.NumberFormat("vi-VN").format(v) + "đ");

TW.toast = function (message, tone) {
  let host = document.querySelector(".toast-host");
  if (!host) {
    host = document.createElement("div");
    host.className = "toast-host";
    document.body.appendChild(host);
  }
  const el = document.createElement("div");
  el.className = "toast" + (tone ? " " + tone : "");
  el.setAttribute("role", "status");
  el.textContent = message;
  host.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 220);
  }, 2600);
};

/* ---------------- 4b. MODAL & FORM THEM DIA DIEM ---------------- */
function closeModal() {
  document.querySelector(".modal-layer")?.remove();
  document.removeEventListener("keydown", escClose);
}
function escClose(e) {
  if (e.key === "Escape") closeModal();
}

function openModal(html) {
  closeModal();
  const layer = document.createElement("div");
  layer.className = "modal-layer";
  layer.innerHTML = `<div class="modal-backdrop" data-close></div><div class="modal modal-wide" role="dialog" aria-modal="true">${html}</div>`;
  document.body.appendChild(layer);
  layer.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", escClose);
  layer.querySelector("input, select, button")?.focus();
  return layer;
}

const PLACE_FORM_HTML = `
<form class="form" id="placeForm" novalidate>
  <h2>Thêm địa điểm mới</h2>
  <p class="muted">Địa điểm bạn gửi sẽ vào hàng chờ kiểm duyệt. Quản trị viên duyệt thì nó mới xuất hiện công khai và được AI gợi ý.</p>
  <div class="form-grid">
    <div class="field">
      <label for="pName">Tên địa điểm</label>
      <input class="input" id="pName" name="name" placeholder="Cà phê Cổ Ngựa">
      <p class="field-error" data-error-for="name"></p>
    </div>
    <div class="field">
      <label for="pCity">Thành phố / vùng</label>
      <input class="input" id="pCity" name="city" placeholder="Hà Nội">
      <p class="field-error" data-error-for="city"></p>
    </div>
    <div class="field">
      <label for="pCat">Danh mục</label>
      <select class="select" id="pCat" name="category">${TW.categories.map((c) => `<option>${c}</option>`).join("")}</select>
    </div>
    <div class="field">
      <label for="pTime">Thời lượng tham quan</label>
      <input class="input" id="pTime" name="time" placeholder="2 giờ" value="2 giờ">
    </div>
    <div class="field">
      <label for="pPrice">Giá vé (VND, 0 = miễn phí)</label>
      <input class="input" id="pPrice" name="price" type="number" min="0" step="1000" value="0">
    </div>
    <div class="field">
      <label for="pEmoji">Biểu tượng</label>
      <input class="input" id="pEmoji" name="emoji" maxlength="4" value="📍">
    </div>
  </div>
  <div class="field">
    <label for="pDesc">Vì sao nơi này đáng ghé?</label>
    <textarea class="textarea" id="pDesc" name="desc" placeholder="Một câu mô tả ngắn gọn, dễ hiểu."></textarea>
    <p class="field-error" data-error-for="desc"></p>
  </div>
  <div class="row">
    <button class="btn btn-primary" type="submit">Gửi để kiểm duyệt</button>
    <button class="btn btn-outline" type="button" data-close>Hủy</button>
  </div>
</form>`;

function openPlaceForm(onDone) {
  const layer = openModal(PLACE_FORM_HTML);
  const form = layer.querySelector("#placeForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.querySelectorAll(".field-error").forEach((n) => (n.textContent = ""));
    form.querySelectorAll(".input").forEach((n) => n.classList.remove("invalid"));

    const val = (n) => form.elements[n].value.trim();
    let bad = false;
    const flag = (n, msg) => {
      form.querySelector(`[data-error-for="${n}"]`).textContent = msg;
      form.elements[n].classList.add("invalid");
      bad = true;
    };
    if (!val("name")) flag("name", "Vui lòng nhập tên địa điểm.");
    if (!val("city")) flag("city", "Vui lòng nhập thành phố hoặc vùng.");
    if (val("desc").length < 10) flag("desc", "Mô tả cần tối thiểu 10 ký tự.");
    if (bad) return;

    const place = TW.submitPlace({
      name: val("name"),
      city: val("city"),
      category: val("category"),
      time: val("time") || "Chưa rõ",
      price: Math.max(0, Number(val("price")) || 0),
      emoji: val("emoji") || "📍",
      desc: val("desc"),
      rating: 0,
    });
    closeModal();
    TW.toast("Đã gửi! Đang chờ quản trị viên duyệt.", "success");
    onDone ? onDone(place) : emitPlacesChanged();
  });
}

/* Khach vang lai muon gui thi hoi dang nhap truoc — de bai gui duoc gan cho ai */
function openSignInPrompt() {
  openModal(`
    <div class="modal-icon" aria-hidden="true">🔒</div>
    <h2>Bạn chưa đăng nhập</h2>
    <p class="muted">Địa điểm gửi lên cần gắn với một tài khoản để quản trị viên biết ai đã gửi. Bạn có thể dùng một trong bốn tài khoản mẫu.</p>
    <div class="row" style="justify-content:center;margin-top:14px">
      <a class="btn btn-primary" href="login.html">Đăng nhập để tiếp tục</a>
      <button class="btn btn-outline" type="button" data-close>Để sau</button>
    </div>`);
}

/* ---------------- 5. GEN VO TRANG ---------------- */
function navAccount() {
  const s = TW.session();
  if (!s) {
    return `<a class="btn btn-light btn-sm" href="login.html">Đăng nhập</a>
      <a class="btn btn-primary btn-sm" href="register.html">Đăng ký</a>`;
  }
  return `
    <a class="nav-user" href="${HOME_BY_ROLE[s.role] || "index.html"}" title="Về bảng điều khiển của bạn">
      <span class="nav-avatar" aria-hidden="true">${TW.esc((s.name || "?").trim().charAt(0).toUpperCase())}</span>
      <span class="nav-who"><b>${TW.esc(s.name)}</b><em>${TW.esc(TW.ROLE_LABEL[s.role] || s.role)}</em></span>
    </a>
    <button class="btn btn-outline btn-sm" data-signout>Đăng xuất</button>`;
}

function buildNavbar(activeKey) {
  const here = location.pathname.split("/").pop() || "index.html";
  const links = TW.nav
    .map((n) => `<a href="${n.href}"${n.href === here ? ' class="active" aria-current="page"' : ""}>${TW.esc(n.label)}</a>`)
    .join("");
  return `
  <nav class="navbar">
    <div class="container nav-inner">
      <a class="logo" href="index.html"><span class="logo-mark">✦</span><span>TripWeave <em>AI</em></span></a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="navLinks" aria-label="Mở menu">☰</button>
      <div class="nav-links" id="navLinks">${links}</div>
      <div class="nav-actions">${navAccount()}</div>
    </div>
  </nav>`;
}

function buildSidebar(cfg) {
  const links = TW.side
    .map((s) => `<a class="side-link${s.key === cfg.side ? " active" : ""}" href="${s.href}"${s.key === cfg.side ? ' aria-current="page"' : ""}>${TW.esc(s.label)}</a>`)
    .join("");
  return `
  <aside class="sidebar">
    <span class="side-brand">✦ TripWeave AI</span>
    <span class="side-role">${TW.esc(cfg.roleLabel)}</span>
    ${links}
  </aside>`;
}

function buildFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <h3>✦ TripWeave AI</h3>
          <p>Biến sở thích, ngân sách và quỹ thời gian thành hành trình cân bằng, có giải thích.</p>
        </div>
        <div>
          <h3>Sản phẩm</h3>
          <a href="traveler-discover.html">Khám phá</a>
          <a href="traveler-trip-planner.html">Trip Planner</a>
          <a href="traveler-ai-itinerary.html">AI Itinerary</a>
        </div>
        <div>
          <h3>Dành cho đối tác</h3>
          <a href="guide-dashboard.html">Hướng dẫn viên</a>
          <a href="partner-activity-management.html">Đối tác địa phương</a>
          <a href="admin-content-moderation.html">Quản trị viên</a>
        </div>
      </div>
      <p class="footer-bottom">BTL-07 · TripWeave AI · Team 7 — CSE122 Lập trình web</p>
    </div>
  </footer>`;
}

/* ---------------- 6. 4 TRANG THAI ---------------- */
/* Mac dinh = data that. loading/error/empty dung de demo dung 4 bang trang thai trong mock. */
let dashState = "default";

function stateLoading() {
  return `
  <div class="state-layer">
    <div class="loading-card"><div class="spinner"></div><span>Loading</span></div>
  </div>`;
}

function stateError() {
  return `
  <div class="state-layer">
    <div class="error-box" role="alert">
      <div>
        <h3>Không có kết nối internet !</h3>
        <p>Hãy:</p>
        <ul>
          <li>Kiểm tra cáp mạng, modem và bộ định tuyến (router)</li>
          <li>Kết nối lại với Wi-Fi</li>
          <li>Chạy Trình chẩn đoán mạng của Windows (Windows Network Diagnostics)</li>
        </ul>
      </div>
      <span class="error-face" aria-hidden="true">☹</span>
    </div>
  </div>`;
}

/* Du lieu that cua hai dashboard kiem duyet / doi tac — doc tu kho dia diem */
function liveData(cfg) {
  const mine = TW.userPlaces();
  const pend = mine.filter((p) => p.status === "pending");
  const ok = mine.filter((p) => p.status === "approved");
  const no = mine.filter((p) => p.status === "rejected");

  if (cfg.live === "moderation") {
    return {
      stats: [
        [String(pend.length), "Chờ duyệt"],
        [String(ok.length + TW.seedPlaces.length), "Đã duyệt"],
        [String(no.length), "Bị từ chối"],
        [String(mine.length), "Do người dùng gửi"],
      ],
      rows: pend.map((p) => [
        p.name,
        `${p.city} · ${p.category} · bởi ${p.owner}`,
        ["Chờ duyệt", "warning"],
        p.at,
        p.id,
      ]),
    };
  }

  const s = TW.session();
  const mineAsPartner = mine.filter((p) => p.ownerEmail === (s ? s.email : ""));
  const badge = (st) => (st === "approved" ? ["Đã duyệt", "success"] : st === "rejected" ? ["Bị từ chối", "danger"] : ["Chờ duyệt", "warning"]);
  return {
    stats: [
      [String(mineAsPartner.length), "Địa điểm đã gửi"],
      [String(mineAsPartner.filter((p) => p.status === "pending").length), "Đang chờ"],
      [String(mineAsPartner.filter((p) => p.status === "approved").length), "Đã lên sóng"],
      [String(mineAsPartner.filter((p) => p.status === "rejected").length), "Cần bổ sung"],
    ],
    rows: mineAsPartner.map((p) => [p.name, `${p.city} · ${p.category} · ${TW.money(p.price)}`, badge(p.status), p.at, null]),
  };
}

function renderDashBody(cfg) {
  if (dashState === "loading") return stateLoading();
  if (dashState === "error") return stateError();

  const empty = dashState === "empty";
  const data = cfg.live ? liveData(cfg) : cfg;
  const stats = data.stats
    .map(([v, l]) => `<div class="stat"><h3>${empty ? "0" : TW.esc(v)}</h3><p>${TW.esc(l)}</p></div>`)
    .join("");

  const cols = ["Mục", "Chi tiết", "Trạng thái", "Thời gian"];
  if (cfg.live === "moderation") cols.push("Thao tác");
  const head = cols.map((h) => `<th>${TW.esc(h)}</th>`).join("");

  const noRows = empty || (cfg.live && !data.rows.length);
  const emptyText = empty
    ? "Chưa có dữ liệu nào."
    : cfg.live === "partner"
      ? "Bạn chưa gửi địa điểm nào. Bấm “+ Thêm địa điểm” để đóng góp cho cộng đồng."
      : "Không có mục nào đang chờ. Duyệt hết rồi.";
  const body = noRows
    ? `<tr><td colspan="${cols.length}"><div class="empty"><span class="empty-icon">🗂️</span><p>${emptyText}</p></div></td></tr>`
    : data.rows
        .map((r) => {
          const [label, tone] = r[2];
          const action =
            cfg.live === "moderation"
              ? `<td data-label="Thao tác"><div class="row" style="gap:6px">
                    <button class="btn btn-primary btn-sm" data-approve="${TW.esc(r[4])}">Duyệt</button>
                    <button class="btn btn-danger btn-sm" data-reject="${TW.esc(r[4])}">Từ chối</button>
                  </div></td>`
              : "";
          return `<tr>
            <td data-label="Mục">${TW.esc(r[0])}</td>
            <td data-label="Chi tiết">${TW.esc(r[1])}</td>
            <td data-label="Trạng thái"><span class="status ${tone}">${TW.esc(label)}</span></td>
            <td data-label="Thời gian">${TW.esc(r[3])}</td>
            ${action}
          </tr>`;
        })
        .join("");

  const panelTitle = cfg.live === "moderation" ? "Hàng chờ kiểm duyệt" : cfg.live === "partner" ? "Địa điểm tôi đã gửi" : "Hoạt động gần đây";
  const createBtn = cfg.live === "partner" || cfg.canCreate
    ? `<button class="btn btn-primary btn-sm" data-add-place>+ Thêm địa điểm</button>`
    : "";

  return `
  <div class="stat-grid">${stats}</div>
  ${empty ? `<p><span class="empty-note">Hãy thêm thông tin của bạn</span></p>` : ""}
  <div class="panel">
    <div class="panel-head">
      <h2>${panelTitle}</h2>
      <div class="row" style="gap:8px">
        ${createBtn}
        ${cfg.live === "moderation" ? `<button class="btn btn-outline btn-sm" data-reset-places>Khôi phục dữ liệu mẫu</button>` : ""}
        <button class="btn btn-light btn-sm" data-refresh>Làm mới</button>
      </div>
    </div>
    <div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>
    ${
      cfg.live === "moderation"
        ? `<p class="tiny muted" style="margin-top:12px">Mẹo: vào <b>Khám phá</b> với tài khoản Du khách hoặc Đối tác, bấm “+ Thêm địa điểm”, rồi quay lại đây để duyệt.</p>`
        : ""
    }
  </div>`;
}

function mountDash(key) {
  const cfg = TW.dash[key];
  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="dash-body">
      ${buildSidebar(cfg)}
      <div class="dash-main">
        <div class="page-head">
          <div>
            <span class="role-chip">${TW.esc(cfg.roleLabel)}</span>
            <h1>${TW.esc(cfg.title)}</h1>
            <p class="sub">${TW.esc(cfg.sub)}</p>
          </div>
          <div class="head-actions">
            ${cfg.canCreate ? `<button class="btn btn-primary" data-add-place>+ Thêm địa điểm</button>` : `<button class="btn btn-primary" data-create>+ Tạo mới</button>`}
          </div>
        </div>
        <div id="dashBody">${renderDashBody(cfg)}</div>
      </div>
    </div>`;

  const redraw = () => {
    document.getElementById("dashBody").innerHTML = renderDashBody(cfg);
  };

  document.getElementById("dashBody").addEventListener("click", (e) => {
    if (e.target.closest("[data-refresh]")) return refreshDash(cfg, redraw);
    if (e.target.closest("[data-add-place]")) return openPlaceForm(emitPlacesChanged);
    const reset = e.target.closest("[data-reset-places]");
    if (reset) {
      TW.resetPlaces();
      TW.toast("Đã xoá địa điểm tự thêm, trở về dữ liệu mẫu.", "success");
      return emitPlacesChanged();
    }
    const yes = e.target.closest("[data-approve]");
    if (yes) {
      TW.decidePlace(yes.dataset.approve, true);
      TW.toast("Đã duyệt. Địa điểm xuất hiện công khai ngay.", "success");
      return emitPlacesChanged();
    }
    const no = e.target.closest("[data-reject]");
    if (no) {
      TW.decidePlace(no.dataset.reject, false);
      TW.toast("Đã từ chối đề xuất này.", "danger");
      return emitPlacesChanged();
    }
  });

  main.querySelector("[data-create]")?.addEventListener("click", () => TW.toast("Bản bài tập dùng dữ liệu mẫu, nên nút này chưa mở form nào."));
  main.querySelector("[data-add-place]")?.addEventListener("click", () => openPlaceForm(emitPlacesChanged));
  onPlacesChanged(redraw);
}

function refreshDash(cfg, redraw) {
  const host = document.getElementById("dashBody");
  dashState = "loading";
  host.innerHTML = renderDashBody(cfg);
  setTimeout(() => {
    dashState = "default";
    redraw();
    TW.toast("Đã làm mới dữ liệu.", "success");
  }, 900);
}

/* Trang dashboard sai vai tro hoac chua dang nhap */
function mountDenied(cfg) {
  const s = TW.session();
  const need = TW.ROLE_LABEL[cfg.role];
  const main = document.getElementById("main");
  main.innerHTML = `
    <div class="dash-body">
      ${buildSidebar(cfg)}
      <div class="dash-main">
        <div class="deny">
          <span class="deny-icon" aria-hidden="true">${s ? "🔒" : "👤"}</span>
          <h1>${s ? "Trang này dành cho " + TW.esc(need) : "Bạn chưa đăng nhập"}</h1>
          <p class="muted">${
            s
              ? `Bạn đang đăng nhập là <b>${TW.esc(s.name)}</b> (${TW.esc(TW.ROLE_LABEL[s.role] || s.role)}). Trang <b>${TW.esc(cfg.title)}</b> cần tài khoản vai trò <b>${TW.esc(need)}</b>.`
              : `Trang <b>${TW.esc(cfg.title)}</b> cần tài khoản vai trò <b>${TW.esc(need)}</b>.`
          }</p>
          <div class="deny-accounts">
            ${TW.users
              .filter((u) => u.role === cfg.role)
              .map(
                (u) => `<div class="deny-row">
                  <div><b>${TW.esc(u.name)}</b><p class="tiny muted">${TW.esc(u.email)} · mật khẩu ${TW.esc(u.password)}</p></div>
                  <button class="btn btn-primary btn-sm" type="button" data-demo-signin="${TW.esc(u.email)}">Dùng tài khoản này</button>
                </div>`,
              )
              .join("")}
          </div>
          <div class="row" style="justify-content:center;margin-top:18px">
            <a class="btn btn-outline" href="login.html">Đăng nhập bằng tài khoản khác</a>
            <a class="btn btn-outline" href="index.html">Về trang chủ</a>
          </div>
        </div>
      </div>
    </div>`;

  main.querySelector("[data-demo-signin]")?.addEventListener("click", (e) => {
    const u = TW.users.find((x) => x.email === e.currentTarget.dataset.demoSignin);
    TW.signIn(u);
    TW.toast(`Đã đăng nhập là ${u.name}.`, "success");
    setTimeout(() => location.reload(), 500);
  });
}

/* Thanh demo 4 trang thai — chi hien tren trang dashboard */
function mountStateBar(key) {
  const bar = document.createElement("div");
  bar.className = "state-bar";
  bar.innerHTML = ["default", "loading", "error", "empty"]
    .map((s) => `<button class="btn btn-ghost btn-sm${s === dashState ? " is-on" : ""}" data-state="${s}">${s}</button>`)
    .join("");
  bar.style.cssText =
    "position:fixed;left:16px;bottom:16px;z-index:115;display:flex;gap:6px;" +
    "padding:8px;border-radius:14px;background:rgba(52,69,111,.92);box-shadow:0 10px 28px rgba(15,23,42,.3)";
  bar.querySelectorAll("button").forEach((b) => {
    if (b.dataset.state !== dashState) b.style.opacity = ".6";
    b.addEventListener("click", () => {
      dashState = b.dataset.state;
      document.getElementById("dashBody").innerHTML = renderDashBody(TW.dash[key]);
      bar.querySelectorAll("button").forEach((x) => {
        const on = x.dataset.state === dashState;
        x.classList.toggle("is-on", on);
        x.style.opacity = on ? "1" : ".6";
      });
    });
  });
  document.body.appendChild(bar);
}

/* ---------------- 7. TRANG TRAVELER ---------------- */
function initDiscover() {
  const box = document.getElementById("placeList");
  if (!box) return;
  let category = "all";

  const draw = () => {
    const s = TW.session();
    const q = (document.getElementById("searchPlace").value || "").toLowerCase().trim();
    /* Cong khai: da duyet. Cua chinh minh: cho duyet / bi tu cung hien de minh con theo doi. */
    const visible =
      category === "mine"
        ? TW.userPlaces().filter((p) => s && p.ownerEmail === s.email)
        : TW.allPlaces().filter((p) => p.status === "approved" || (s && p.ownerEmail === s.email));
    const list = visible.filter(
      (p) => (p.name + " " + p.city + " " + p.category).toLowerCase().includes(q) &&
        (category === "all" || category === "mine" || p.category === category),
    );

    box.innerHTML = list.length
      ? list
          .map(
            (p) => `<article class="card place-card">
              <div class="place-cover" aria-hidden="true">${p.emoji}</div>
              <div class="place-body">
                <div class="row-between" style="gap:8px">
                  <h3>${TW.esc(p.name)}</h3>
                  ${p.status === "pending" ? `<span class="status warning">Chờ duyệt</span>` : ""}
                  ${p.status === "rejected" ? `<span class="status danger">Bị từ chối</span>` : ""}
                  ${s && p.ownerEmail === s.email && p.status === "approved" ? `<span class="chip">Bạn đã gửi</span>` : ""}
                </div>
                <p class="muted">${TW.esc(p.city)} · ${TW.esc(p.category)}</p>
                <p class="tiny muted">${TW.esc(p.desc)}</p>
                <div class="place-meta">
                  ${p.rating ? `<span class="rating">★ ${p.rating}</span>` : `<span class="chip">Mới gửi</span>`}
                  <span>${TW.esc(p.time)}</span>
                  <span>${TW.money(p.price)}</span>
                </div>
              </div>
            </article>`,
          )
          .join("")
      : `<div class="card empty" style="grid-column:1/-1"><span class="empty-icon">${category === "mine" ? "📮" : "🔍"}</span><p>${
          category === "mine"
            ? s
              ? "Bạn chưa gửi địa điểm nào. Địa điểm tự gửi sẽ hiện ở đây để bạn theo dõi tiến trình duyệt."
              : "Bạn đang xem với tư cách khách. Hãy đăng nhập để theo dõi địa điểm mình đã gửi."
            : "Không tìm thấy địa điểm phù hợp. Chưa có nơi bạn nghĩ tới? Bấm “+ Thêm địa điểm” để gợi ý cho cộng đồng."
        }</p></div>`;

    const count = document.getElementById("resultCount");
    if (count) {
      const waiting = list.filter((p) => p.status === "pending").length;
      count.textContent = `${list.length} địa điểm${waiting ? ` · ${waiting} đang chờ duyệt` : ""}`;
    }
  };

  document.getElementById("searchPlace").addEventListener("input", draw);
  document.querySelectorAll(".filter").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((x) => {
        x.classList.remove("active");
        x.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      category = btn.dataset.category;
      draw();
    }),
  );
  document.getElementById("addPlaceBtn")?.addEventListener("click", () => {
    if (!TW.session()) return openSignInPrompt();
    openPlaceForm(draw);
  });
  onPlacesChanged(draw);
  draw();
}

function initPlanner() {
  const list = document.getElementById("planList");
  if (!list) return;
  const sync = () => {
    const items = [...list.querySelectorAll(".activity")];
    document.getElementById("planCount").textContent = `${items.length} hoạt động`;
    const heavy = items.length > 4;
    document.getElementById("balanceNote").innerHTML = heavy
      ? `<b>Cân bằng lịch trình</b><p class="muted">⚠ Ngày của bạn có ${items.length} hoạt động, hơi dày. Cân nhắc bỏ bớt 1 điểm.</p>`
      : `<b>Cân bằng lịch trình</b><p class="muted">✓ Lịch trình đang hợp lý, không dồn quá nhiều điểm trong ngày.</p>`;
  };

  /* Mo hop chon dia diem that trong kho, thay vi gan ngau nhien */
  document.getElementById("addPlace").addEventListener("click", () => {
    const pool = TW.approvedPlaces();
    const layer = openModal(`
      <h2>Thêm hoạt động vào ngày</h2>
      <p class="muted">Chọn một địa điểm có sẵn, hoặc gửi địa điểm mới nếu chưa có.</p>
      <div class="picker">
        ${pool
          .map(
            (p) => `<button class="pick" type="button" data-pick="${TW.esc(p.id)}">
              <span class="pick-icon" aria-hidden="true">${p.emoji}</span>
              <span class="pick-body"><b>${TW.esc(p.name)}</b><em>${TW.esc(p.city)} · ${TW.esc(p.time)} · ${TW.esc(TW.money(p.price))}</em></span>
            </button>`,
          )
          .join("")}
      </div>
      <div class="row" style="margin-top:14px">
        <button class="btn btn-outline btn-sm" type="button" data-pick-new>＋ Chưa có nơi này, gửi địa điểm mới</button>
        <button class="btn btn-light btn-sm" type="button" data-close>Đóng</button>
      </div>`);

    layer.addEventListener("click", (e) => {
      if (e.target.closest("[data-pick-new]")) {
        closeModal(); if (!TW.session()) return openSignInPrompt();
        openPlaceForm((place) => {
          appendActivity(place, list, sync);
          TW.toast("Đã thêm vào lịch trình. Địa điểm vẫn đang chờ duyệt.", "success");
        });
        return;
      }
      const pick = e.target.closest("[data-pick]");
      if (!pick) return;
      const place = pool.find((p) => p.id === pick.dataset.pick);
      appendActivity(place, list, sync);
      closeModal();
      TW.toast(`Đã thêm ${place.name}.`, "success");
    });
  });

  list.addEventListener("click", (e) => {
    const row = e.target.closest(".activity");
    if (e.target.closest("[data-remove]") && row) {
      row.remove();
      sync();
    }
  });
  sync();
}

function appendActivity(place, list, sync) {
  const last = list.querySelector(".activity:last-child .activity-time");
  const hour = last ? Math.min(parseInt(last.textContent, 10) + 2, 20) : 8;
  list.insertAdjacentHTML(
    "beforeend",
    `<div class="activity">
       <span class="activity-time">${String(Math.min(hour, 20)).padStart(2, "0")}:00</span>
       <div class="activity-body"><b>${TW.esc(place.name)}</b><p>${TW.esc(place.desc)}</p></div>
       <button class="btn btn-outline btn-sm" data-remove>Xóa</button>
     </div>`,
  );
  sync();
}

function initAI() {
  const form = document.getElementById("aiForm");
  if (!form) return;
  const result = document.getElementById("aiResult");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const destination = form.destination.value.trim();
    const days = Number(form.days.value) || 1;
    const interests = [...form.querySelectorAll('input[name="interest"]:checked')].map((x) => x.value);

    let bad = false;
    form.querySelectorAll(".field-error").forEach((n) => (n.textContent = ""));
    form.querySelectorAll(".input").forEach((n) => n.classList.remove("invalid"));
    const flag = (name, msg) => {
      const note = form.querySelector(`[data-error-for="${name}"]`);
      if (note) note.textContent = msg;
      form.elements[name].classList.add("invalid");
      bad = true;
    };
    if (!destination) flag("destination", "Vui lòng nhập điểm đến.");
    if (!interests.length) {
      document.getElementById("interestError").textContent = "Hãy chọn ít nhất một sở thích.";
      bad = true;
    }
    if (bad) return;

    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    submit.textContent = "AI đang phân tích...";
    result.innerHTML = stateLoading();

    setTimeout(() => {
      const cap = { "Thư giãn": 1, "Vừa phải": 2, "Khám phá nhiều": 3 }[form.pace.value] || 2, maxPrice = { "Dưới 2 triệu": 150000, "2 – 5 triệu": 500000, "Trên 5 triệu": Infinity }[form.budget.value] ?? 500000;
      const picks = TW.approvedPlaces().map((p) => ({ p, s: (p.city.toLowerCase().includes(destination.toLowerCase()) ? 10 : 0) + (interests.includes(p.category) ? 3 : 0) + (p.price <= maxPrice ? 1 : 0) })).sort((a, b) => b.s - a.s).map((x) => x.p).slice(0, days * cap);
      if (!picks.length) {
        result.innerHTML = stateError();
        submit.disabled = false;
        submit.textContent = "✨ Tạo lịch trình bằng AI";
        return;
      }
      const perDay = Math.ceil(picks.length / days);
      let html = `<div class="ai-box">
        <div class="ai-step"><span class="ai-number">1</span><div><b>Đã hiểu nhu cầu</b>
          <p class="muted">${TW.esc(destination)} · ${days} ngày · ${TW.esc(interests.join(", "))}</p></div></div>
        <div class="ai-step"><span class="ai-number">2</span><div><b>Lịch trình đề xuất</b>
          <div class="itinerary" style="margin-top:10px">`;
      for (let d = 0; d < days; d++) {
        const slice = picks.slice(d * perDay, (d + 1) * perDay);
        html += `<div class="day-card"><div class="day-head"><b>Ngày ${d + 1}</b>
          <span class="status info">${slice.length} điểm</span></div>`;
        html += slice
          .map(
            (p, i) => `<div class="activity"><span class="activity-time">${i === 0 ? "08:30" : "14:00"}</span>
              <div class="activity-body"><b>${TW.esc(p.name)}</b><p>${TW.esc(p.desc)}</p></div></div>`,
          )
          .join("");
        html += `</div>`;
      }
      html += `</div></div></div>
        <div class="explain"><b>💡 Vì sao AI chọn?</b>
          <p class="muted">Điểm trùng với nơi bạn nhập được ưu tiên cao nhất, kế đến là địa điểm thuộc sở thích đã chọn, rồi tới mức giá phù hợp ngân sách. Mỗi ngày chỉ xếp ${cap} điểm để không dồn lịch.</p></div>
        <div class="row" style="margin-top:15px">
          <button class="btn btn-primary" data-accept>✓ Chấp nhận &amp; Lưu</button>
          <button class="btn btn-outline" data-edit>✎ Sửa</button>
          <button class="btn btn-outline" data-again>↻ Tạo lại</button>
          <button class="btn btn-danger" data-reject>Từ chối</button>
        </div>
      </div>`;
      result.innerHTML = html;
      result.classList.add("is-fading");
      submit.disabled = false;
      submit.textContent = "✨ Tạo lịch trình bằng AI";

      result.querySelector("[data-accept]").addEventListener("click", () => {
        const saved = JSON.parse(localStorage.getItem("tripweave_trips") || "[]");
        saved.push({ destination, days, interests, savedAt: new Date().toLocaleString("vi-VN") });
        localStorage.setItem("tripweave_trips", JSON.stringify(saved));
        TW.toast("Lịch trình đã được lưu!", "success");
      });
      result.querySelector("[data-edit]").addEventListener("click", () => {
        location.href = "traveler-trip-planner.html";
      });
      result.querySelector("[data-again]").addEventListener("click", () => form.requestSubmit());
      result.querySelector("[data-reject]").addEventListener("click", () => {
        result.innerHTML = `<div class="empty"><span class="empty-icon">🗑️</span>
          <p><b>Đã từ chối đề xuất.</b> Bạn có thể nhập lại nhu cầu hoặc tự tạo lịch trình thủ công.</p>
          <button class="btn btn-outline" onclick="location.reload()">Thử lại</button></div>`;
      });
    }, 1100);
  });
}

/* ---------------- 8. DANG NHAP / DANG KY ---------------- */
const HOME_BY_ROLE = {
  traveler: "traveler-discover.html",
  guide: "guide-dashboard.html",
  partner: "partner-activity-management.html",
  admin: "admin-content-moderation.html",
};

function initAuth() {
  const form = document.querySelector("[data-auth]");
  if (!form) return;
  const isRegister = form.hasAttribute("data-register") || !!form.elements.name;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.querySelectorAll(".field-error").forEach((n) => (n.textContent = ""));
    form.querySelectorAll(".input").forEach((n) => n.classList.remove("invalid"));

    let bad = false;
    const flag = (el, msg) => {
      const note = form.querySelector(`[data-error-for="${el.name}"]`);
      if (note) note.textContent = msg;
      el.classList.add("invalid");
      bad = true;
    };

    if (isRegister && !form.elements.name.value.trim()) flag(form.elements.name, "Vui lòng nhập họ tên.");
    const email = form.elements.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) flag(form.elements.email, "Email không hợp lệ.");
    const pass = form.elements.password.value;
    if (pass.length < 6) flag(form.elements.password, "Mật khẩu tối thiểu 6 ký tự.");
    if (isRegister && TW.emailTaken(email)) flag(form.elements.email, "Email này đã có tài khoản.");
    if (isRegister && form.elements.confirm.value !== pass) flag(form.elements.confirm, "Mật khẩu nhập lại không khớp.");
    if (bad) {
      TW.toast("Vui lòng sửa các trường bị đánh dấu.", "danger");
      return;
    }

    const role = form.elements.role.value;
    if (isRegister) {
      const account = { email, password: pass, name: form.elements.name.value.trim(), role };
      TW.saveAccount(account);
      TW.signIn(account);
      TW.toast("Đã tạo tài khoản. Chào mừng bạn!");
    } else {
      const found = TW.findAccount(email, pass);
      if (!found) {
        flag(form.elements.email, "Email hoặc mật khẩu không đúng.");
        TW.toast("Đăng nhập thất bại. Xem lại khối “Tài khoản minh họa” bên dưới.", "danger");
        return;
      }
      if (found.role !== role) {
        form.elements.role.value = found.role;
        TW.toast(`Tài khoản này thuộc vai trò ${TW.ROLE_LABEL[found.role]}, đã chuyển giúp bạn.`, "success");
      }
      TW.signIn(found);
      TW.toast(`Xin chào ${found.name}!`, "success");
    }
    setTimeout(() => (location.href = HOME_BY_ROLE[role]), 700);
  });
}

/* Khoi tao tung trang */
function initDemoAccounts() {
  const host = document.getElementById("demoAccounts");
  if (!host) return;
  host.innerHTML = `
    <h2>Tài khoản minh họa</h2>
    <p class="muted tiny">Bấm một dòng để điền sẵn email và mật khẩu, rồi nhấn Đăng nhập. Mỗi vai trò dẫn tới một khu vực khác nhau của trang.</p>
    <div class="demo-list">
      ${TW.users
        .map(
          (u) => `<button class="demo-row" type="button" data-demo="${TW.esc(u.email)}">
            <span class="demo-role">${TW.esc(TW.ROLE_LABEL[u.role])}</span>
            <span class="demo-who"><b>${TW.esc(u.name)}</b><em>${TW.esc(u.email)}</em></span>
            <span class="demo-pass">${TW.esc(u.password)}</span>
          </button>`,
        )
        .join("")}
    </div>`;
  host.addEventListener("click", (e) => {
    const row = e.target.closest("[data-demo]");
    if (!row) return;
    const u = TW.users.find((x) => x.email === row.dataset.demo);
    const form = document.querySelector("form[data-auth]");
    form.elements.email.value = u.email;
    form.elements.password.value = u.password;
    if (form.elements.role) form.elements.role.value = u.role;
    TW.toast(`Đã điền tài khoản ${TW.ROLE_LABEL[u.role]}.`, "success");
  });
}

/* ---------------- 9. KHOI DONG ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const page = body.dataset.page || "index";
  const isDash = body.dataset.shell === "dash";

  const skip = body.querySelector(".sr-only");
  skip.insertAdjacentHTML("afterend", buildNavbar(page));
  if (!isDash && body.dataset.footer !== "off") body.insertAdjacentHTML("beforeend", buildFooter());

  if (isDash && TW.dash[page]) {
    const cfg = TW.dash[page];
    const s = TW.session();
    body.classList.add("dash");
    if (!s || s.role !== cfg.role) {
      mountDenied(cfg);
    } else {
      mountDash(page);
      mountStateBar(page);
    }
  }

  document.querySelector(".nav-toggle")?.addEventListener("click", (e) => {
    const links = document.getElementById("navLinks");
    const open = links.classList.toggle("is-open");
    e.currentTarget.setAttribute("aria-expanded", String(open));
  });

  document.querySelector("[data-signout]")?.addEventListener("click", () => {
    TW.signOut();
    TW.toast("Đã đăng xuất.", "success");
    setTimeout(() => (location.href = "index.html"), 500);
  });

  initDiscover();
  initPlanner();
  initAI();
  initAuth();
  initDemoAccounts();
});

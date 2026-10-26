const TW = {};

/* ---------------- 1. DIEU HUONG ---------------- */

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

const HOME_BY_ROLE = {
  traveler: "#/admin-content-moderation.html",
  guide: "#/admin-content-moderation.html",
  partner: "partner-activity-management.html",
  admin: "#/admin-content-moderation.html",
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

TW.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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

function navAccount() {
  const s = TW.session();
  if (!s) {
    return `<a class="btn btn-light btn-sm" href="#/login.html">Đăng nhập</a>
      <a class="btn btn-primary btn-sm" href="#/register.html">Đăng ký</a>`;
  }
  return `
    <a class="nav-user" href="${HOME_BY_ROLE[s.role] || "partner-activity-management.html"}" title="Về bảng điều khiển của bạn">
      <span class="nav-avatar" aria-hidden="true">${TW.esc((s.name || "?").trim().charAt(0).toUpperCase())}</span>
      <span class="nav-who"><b>${TW.esc(s.name)}</b><em>${TW.esc(TW.ROLE_LABEL[s.role] || s.role)}</em></span>
    </a>
    <button class="btn btn-outline btn-sm" data-signout>Đăng xuất</button>`;
}

function buildNavbar(activeKey) {
  const here = location.pathname.split("/").pop() || "partner-activity-management.html";
  const links = TW.nav
    .map((n) => `<a href="${n.href}"${n.href === here ? ' class="active" aria-current="page"' : ""}>${TW.esc(n.label)}</a>`)
    .join("");
  return `
  <nav class="navbar">
    <div class="container nav-inner">
      <a class="logo" href="partner-activity-management.html"><span class="logo-mark">✦</span><span>TripWeave <em>AI</em></span></a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="navLinks" aria-label="Mở menu">☰</button>
      <div class="nav-links" id="navLinks">${links}</div>
      <div class="nav-actions">${navAccount()}</div>
    </div>
  </nav>`;
}

TW.nav = [
  { href: "partner-activity-management.html", label: "Đối tác", key: "partner" },
  { href: "#/partner-interest-dashboard.html", label: "Sự quan tâm", key: "partner" },
  { href: "#/partner-profile.html", label: "Hồ sơ đối tác", key: "partner" },
];

/* Sidebar dashboard : 3 lien + 1 active */

TW.side = [
  { href: "partner-activity-management.html", label: "Hoạt động", key: "activity" },
  { href: "#/partner-interest-dashboard.html", label: "Sự quan tâm", key: "interest" },
  { href: "#/partner-profile.html", label: "Hồ sơ", key: "profile" },
  { href: "#/admin-content-moderation.html", label: "Kiểm duyệt", key: "moderation" },
];

/* ---------------- 2. DU LIEU DASHBOARD ---------------- */

TW.dash = {  "partner-activity-management": {
    side: "activity", roleLabel: "Đối tác địa phương",
    title: "Quản lý hoạt động",
    sub: "Theo dõi dữ liệu và xử lý nghiệp vụ.",
    stats: [["18", "Trải nghiệm"], ["15", "Đang mở"], ["327", "Lượt đặt"], ["48.2M", "Doanh thu"]],
    rows: [
      ["Workshop làm gốm", "Bát Tràng · 3 giờ", ["Đang mở", "success"], "Hôm nay"],
      ["Food Walk", "Phố Cổ · 2 giờ", ["Chưa mở", "warning"], "Hôm nay"],
      ["Sunset Coffee", "Tây Hồ · 1,5 tiếng", ["Ẩn", "danger"], "Hôm qua"],
    ],
  },};

/* Vai tro can co de vao tung dashboard — suy ra tu tien to cua ten trang */

const DASH_ROLE = { guide: "guide", partner: "partner", admin: "admin" };

Object.keys(TW.dash).forEach((k) => {
  TW.dash[k].role = DASH_ROLE[k.split("-")[0]];
  TW.dash[k].canCreate = k === "partner-activity-management" || k === "admin-content-moderation";
});
TW.dash["partner-activity-management"].live = "partner";


/* ---------------- 3. DU LIEU TRANG TRAVELER ---------------- */

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
            <a class="btn btn-outline" href="#/login.html">Đăng nhập bằng tài khoản khác</a>
            <a class="btn btn-outline" href="partner-activity-management.html">Về trang chủ</a>
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

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const page = body.dataset.page || "index";
  const isDash = body.dataset.shell === "dash";

  const skip = body.querySelector(".sr-only");
  skip.insertAdjacentHTML("afterend", buildNavbar(page));

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
    setTimeout(() => (location.href = "partner-activity-management.html"), 500);
  });






});

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

TW.money = (v) => (v === 0 ? "Miễn phí" : new Intl.NumberFormat("vi-VN").format(v) + "đ");

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
      <a class="btn btn-primary" href="#/login.html">Đăng nhập để tiếp tục</a>
      <button class="btn btn-outline" type="button" data-close>Để sau</button>
    </div>`);
}

/* ---------------- 5. GEN VO TRANG ---------------- */

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

/* Ban tach tu dung: link nao bat dau bang #/ thuoc giao dien khac nen giu lai tai cho. */
const DEMO_ROLE = "partner";
const ELSEWHERE = {"traveler-discover.html":"Khám phá theo sở thích","traveler-trip-planner.html":"Xây dựng lịch trình cá nhân","traveler-ai-itinerary.html":"Lịch trình thông minh","guide-dashboard.html":"Bảng điều khiển hướng dẫn viên","guide-curated-collections.html":"Bộ sưu tập đã tuyển chọn","guide-trip-review.html":"Đánh giá chuyến đi","partner-activity-management.html":"Quản lý hoạt động","partner-interest-dashboard.html":"Dashboard sự quan tâm","partner-profile.html":"Hồ sơ đối tác","login.html":"trang Đăng nhập","register.html":"trang Đăng ký","admin-content-moderation.html":"trang Kiểm duyệt"};
function initIsolatedLinks() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#/"]');
    if (!a) return;
    e.preventDefault();
    const file = a.getAttribute("href").slice(2);
    if (file === "login.html") {
      const u = TW.users.find((x) => x.role === DEMO_ROLE);
      if (!u) return;
      TW.signIn(u);
      TW.toast("Đã đăng nhập nhanh bằng tài khoản " + TW.ROLE_LABEL[u.role] + ".", "success");
      setTimeout(() => location.reload(), 500);
      return;
    }
    TW.toast((ELSEWHERE[file] || file) + " thuộc một giao diện khác, không có trong bản tách này.");
  });
}
document.addEventListener("DOMContentLoaded", initIsolatedLinks);
